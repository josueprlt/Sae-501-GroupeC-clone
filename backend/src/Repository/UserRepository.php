<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }


    // public function countUsersByAgeRange(): array
    // {
    //     $conn = $this->getEntityManager()->getConnection();

    //     $sql = '
    //         SELECT age, COUNT(*) as count
    //         FROM user
    //         GROUP BY age
    //     ';

    //     $stmt = $conn->prepare($sql);
    //     $result = $stmt->executeQuery()->fetchAllAssociative();

    //     $data = [
    //         'under_18' => 0,
    //         '18_24' => 0,
    //         '25_34' => 0,
    //         '35_44' => 0,
    //         'above_45' => 0,
    //     ];

    //     foreach ($result as $row) {
    //         $age = (int) $row['age'];
    //         $count = (int) $row['count'];

    //         if ($age < 18) {
    //             $data['under_18'] += $count;
    //         } elseif ($age >= 18 && $age <= 24) {
    //             $data['18_24'] += $count;
    //         } elseif ($age >= 25 && $age <= 34) {
    //             $data['25_34'] += $count;
    //         } elseif ($age >= 35 && $age <= 44) {
    //             $data['35_44'] += $count;
    //         } else {
    //             $data['above_45'] += $count;
    //         }
    //     }

    //     return $data;
    // }



    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
