<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', TextType::class, [
                'bulma_icon' => [
                    'icon' => 'envelope',
                    'position' => 'left',
                ],
            ])
//            ->add('agreeTerms', CheckboxType::class, [
//                'mapped' => false,
//                'label' => 'Conditions d\'utilisation',
//                'constraints' => [
//                    new IsTrue([
//                        'message' => 'Vous devez accepter les conditions d\'utilisation',
//                    ]),
//                ],
//            ])
//            ->add('plainPassword', PasswordType::class, [
//
//                'label' => 'Mot de passe',
//                'attr' => [
//                    'autocomplete' => 'new-password',
//                ],
//            ])
            ->add('plainPassword', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les deux mots de passe sont différents.',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,
                'mapped' => false,
                'first_options'  => [
                    // instead of being set onto the object directly,
                    // this is read and encoded in the controller
                    'label' => 'Mot de passe',
                    'attr' => [
                        'autocomplete' => 'new-password',
                    ],
                    'bulma_icon' => [
                        'icon' => 'lock',
                        'position' => 'left',
                    ],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Veuillez saisir un mot de passe',
                        ]),
                        new Length([
                            'min' => 8,
                            'minMessage' => 'Le mot de passe doit contenir au minimum {{ limit }} caractères',
                            // max length allowed by Symfony for security reasons
                            'max' => 4096,
                        ]),
                    ],
                ],
                'second_options' => [
                    'label' => 'Confirmer mot de passe',
                    'bulma_icon' => [
                        'icon' => 'lock',
                        'position' => 'left',
                    ],
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
