<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserCrudController extends AbstractCrudController
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            EmailField::new('email'),
            ArrayField::new('roles'),
            DateTimeField::new('isActive'),
            TextField::new('firstname'),
            TextField::new('lastname'),
            TextField::new('bio'),
            IntegerField::new('age'),
            TextField::new('profile_picture'),
            TextField::new('passwordToken')->onlyOnForms()->setRequired(false),
            TextField::new('plainPassword', 'Password')->onlyOnForms()->setRequired(false),
            // TextField::new('password'),
            // Ajoutez d'autres champs ici selon vos besoins
        ];
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if (!$entityInstance instanceof User) return;

        // Hash the password before persisting the entity
        if (!empty($entityInstance->getPlainPassword())) {
            $entityInstance->setPassword(
                $this->passwordHasher->hashPassword(
                    $entityInstance,
                    $entityInstance->getPlainPassword()
                )
            );
        }

        $entityInstance->setPlainPassword(null);

        parent::persistEntity($entityManager, $entityInstance);
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if (!$entityInstance instanceof User) return;

        // Check if the plainPassword field is empty
        if (!empty($entityInstance->getPlainPassword())) {
            // Hash the password before updating the entity
            $entityInstance->setPassword(
                $this->passwordHasher->hashPassword(
                    $entityInstance,
                    $entityInstance->getPlainPassword()
                )
            );
        } else {
            // Do not change the password if the field is empty
            $entityInstance->setPassword($entityManager->getUnitOfWork()->getOriginalEntityData($entityInstance)['password']);
        }
        $entityInstance->setPlainPassword(null);

        parent::updateEntity($entityManager, $entityInstance);
    }
}