<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class RegistrationController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @throws \Exception
     */
    #[Route('/creation-compte', name: 'app_register')]
    public function register(Request $request,
                             UserPasswordHasherInterface $userPasswordHasher,
                             EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            $user->setRoles(['ROLE_USER']);
            $user->setRegistrationToken($user->generateToken());
            $user->setRegistrationCode(sprintf('%04d', random_int(1, 9999)));

            $entityManager->persist($user);
            $entityManager->flush();

            // generate a signed url and email it to the user
            // TODO: setup email sending
//            $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
//                (new TemplatedEmail())
//                    ->from(new Address('tennis-teammates@gmail.com', 'Tennis Teammates'))
//                    ->to($user->getEmail())
//                    ->subject('Please Confirm your Email')
//                    ->htmlTemplate('registration/confirmation_email.html.twig')
//            );
            // do anything else you need here, like send an email

            return $this->render('registration/register-waiting-validation.html.twig', [
                'registrationToken' => $user->getRegistrationToken()
            ]);
        }

        return $this->render('registration/register-2.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }

    #[Route('/creation-compte/verification-email/{token}', name: 'app_register_verify_email')]
    public function verifyUserEmail($token): Response
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['registrationToken' => $token]);
        if (!$user){
            return $this->redirectToRoute('app_login');
        }

        return $this->render('registration/register-waiting-validation.html.twig', [
            "registrationToken" => $user->getRegistrationToken()
        ]);
    }

    #[Route('/creation-compte/verification-email/{token}/code', name: 'app_register_verify_email_code', methods: 'POST')]
    public function verifyUserEmailCode(Request $request,
                                        TranslatorInterface $translator,
                                        $token): Response
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['registrationToken' => $token]);
        if (!$user){
            return new JsonResponse(['message' => 'Invalid route.'], 404);
        }

        $requestBody = json_decode($request->getContent(), true);
        $code = $requestBody['code'];

        if ($user->getRegistrationCode() != $code){
            return new JsonResponse(['message' => $translator->trans("security.registration.invalid_code")]);
        }

        $user->setIsVerified(true);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $this->addFlash('success', $translator->trans('security.registration.valid_code'));

        return new JsonResponse(['url' => $this->redirectToRoute('app_login')]);
    }
}
