<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\SecurityRequestAttributes;

class CustomAuthenticator extends AbstractLoginFormAuthenticator {

    private UrlGeneratorInterface $urlGenerator;
    private EntityManagerInterface $entityManager;

    public function __construct(UrlGeneratorInterface $urlGenerator,
                                EntityManagerInterface $entityManager)
    {
        $this->urlGenerator = $urlGenerator;
        $this->entityManager = $entityManager;
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate('app_login');
    }

    public function authenticate(Request $request): Passport
    {
        $email = $request->request->get('_username');
        $password = $request->request->get('_password');
        $csrf_token = $request->request->get('_csrf_token');
        $remember_me = $request->request->get('_remember_me', 'off') == "on";

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($user and !$user->isVerified()){
            throw new CustomUserMessageAuthenticationException('security.login.email_not_verified', [
                '%email%' => $email
            ]);
        }

        $options = [
            new CsrfTokenBadge('authenticate', $csrf_token),
        ];
        if ($remember_me){
            $options[] = new RememberMeBadge();
        }
        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($password),
            $options,
        );
   }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): Response
    {
        if ($exception->getMessage() == "security.login.email_not_verified"){
            $email = $request->request->get('_username');
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
            if ($user and !$user->isVerified()){
                $url = $this->urlGenerator->generate('app_register_verify_email', ['token' => $user->getRegistrationToken()]);
                return new RedirectResponse($url);
            }
        }

//        $url = $this->getLoginUrl($request);
//
//        return new RedirectResponse($url);
        return parent::onAuthenticationFailure($request, $exception); // TODO: Change the autogenerated stub
    }
}