<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;

class CustomAuthenticator extends AbstractLoginFormAuthenticator {

    private UrlGeneratorInterface $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
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
}