-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : database:3306
-- Généré le : mer. 18 déc. 2024 à 10:48
-- Version du serveur : 8.0.40
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app`
--

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id` int NOT NULL,
  `creator_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `privacy` tinyint(1) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `location` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `creator_id`, `title`, `description`, `privacy`, `start_date`, `end_date`, `location`, `image`, `deleted`) VALUES
(1, 6, 'Fête foraine', 'Plongez dans la magie de la fête foraine ! Venez découvrir un univers coloré et festif pour petits et grands. Au programme : manèges palpitants, jeux d\'adresse, stands gourmands avec barbe à papa, churros et pommes d\'amour. Laissez-vous émerveiller par des animations captivantes, des spectacles lumineux et une ambiance musicale envoûtante. Entre rires, sensations fortes et moments de partage, vivez une expérience inoubliable dans une atmosphère joyeuse et conviviale. À ne pas manquer !', 1, '2024-12-20 09:00:00', '2024-12-22 23:59:00', 'Limoges', '1734508745113_654209.jpeg', NULL),
(2, 6, 'Soirée Pyjama', 'Elden ring toute la soirée', 0, '2024-12-20 18:00:00', '2024-12-21 04:00:00', 'Chez moi', '1734509936359_16544.jpg', NULL),
(3, 7, 'Gala de l\'association La Marguerite', 'Participez au Gala de l\'association La Marguerite, une soirée conviviale et chaleureuse placée sous le signe de la solidarité. Rejoignez-nous pour un dîner simple mais savoureux, accompagné de quelques animations et moments de partage. Cet événement est l’occasion de soutenir nos actions en faveur des malades chroniques tout en passant un moment agréable ensemble. Chaque contribution compte, et votre présence sera une belle marque de soutien. À très bientôt !', 1, '2024-12-04 19:00:00', '2024-12-05 04:30:00', '95 rue Abbé Pierre, Landouge', '1734510385985_605911.jpeg', NULL),
(4, 7, 'Forum des aidants', 'Ne manquez pas le Forum des Aidants, un rendez-vous dédié à ceux qui accompagnent au quotidien un proche en situation de dépendance. Venez échanger avec des professionnels, découvrir des ressources utiles et participer à des ateliers pratiques pour mieux vivre votre rôle d’aidant. Un espace d’écoute et de conseils vous attend, dans une ambiance bienveillante et solidaire. Prenez soin de vous tout en prenant soin des autres. Entrée libre et ouverte à tous !', 1, '2024-12-18 10:00:00', '2024-12-18 20:00:00', 'Limoges', '1734511576040_320298.png', NULL),
(5, 7, 'Journée Répit et convivialité', 'Participez à la Journée Répit et Convivialité, un moment dédié aux aidants pour souffler, échanger et se ressourcer. Profitez d’ateliers bien-être, d’animations légères et d’espaces de détente dans une ambiance chaleureuse et bienveillante. Rencontrez d\'autres aidants, partagez vos expériences et repartez avec des outils pratiques pour mieux gérer votre quotidien. Une pause précieuse pour vous reconnecter et prendre soin de vous. L\'entrée est libre, venez nombreux !', 1, '2024-12-27 08:30:00', '2024-12-27 18:30:00', '95 rue Abbé Pierre, Landouge', '1734511759704_962901.jpg', NULL),
(6, 8, 'Journée portes ouvertes IUT Limoges', 'Découvrez l’IUT de Limoges lors de sa Journée Portes Ouvertes ! Venez explorer nos locaux, rencontrer les enseignants, étudiants et personnels pour échanger sur nos formations. Participez à des présentations, visites guidées et démonstrations qui vous plongeront dans la vie de l’IUT. Une occasion idéale pour poser toutes vos questions et préparer votre avenir. Que vous soyez futur étudiant ou simplement curieux, nous serons ravis de vous accueillir !', 1, '2024-12-21 08:00:00', '2024-12-21 18:00:00', 'IUT de Limoges', '1734512018674_522725.jpg', NULL),
(7, 8, 'La nuit du code', 'Plongez dans **La Nuit du Code**, un événement collaboratif au sein de l’IUT de Limoges ! Pendant 24 heures, les étudiants de 3e année accompagneront les 2e année pour relever ensemble un défi de programmation autour d’un projet innovant. Une occasion unique de partager des connaissances, de renforcer l’esprit d’équipe et de développer des compétences en conditions réelles. Entre entraide, créativité et passion, vivez une expérience intense et enrichissante au cœur de la communauté étudiante.', 1, '2025-01-08 09:00:00', '2025-01-09 10:00:00', 'IUT de Limoges', '1734512273364_302105.jpg', NULL),
(8, 9, 'Tennis Cup de décembre', 'Participez à la Tennis Cup de décembre, un tournoi festif pour clôturer l’année en beauté ! Surpassez-vous sur les courts et partagez la magie des fêtes avec des joueurs de tous niveaux. Matches, bonne humeur et surprises vous attendent, suivis d’une remise de prix et d’un moment convivial autour d’un goûter hivernal. Inscrivez-vous dès maintenant et terminez l’année sur une belle note sportive !', 1, '2024-12-09 09:00:00', '2024-12-22 23:59:00', 'Paris', '1734512620189_470039.jpg', NULL),
(9, 9, 'Tennis Cup de novembre', 'Rejoignez-nous pour la Tennis Cup de novembre, un tournoi automnal mêlant compétition et convivialité ! Que vous soyez amateur ou confirmé, venez mesurer vos talents sur les courts dans une ambiance dynamique et chaleureuse. Au programme : matchs palpitants, remise de trophées et moments de partage autour d’une collation. Inscrivez-vous vite et venez célébrer le sport sous les couleurs de l’automne !', 1, '2024-11-11 09:00:00', '2024-11-24 23:59:00', 'Paris', '1734512699482_893136.jpg', NULL),
(10, 9, 'Tennis Cup de janvier', 'Lancez l’année avec énergie en participant à la Tennis Cup de janvier ! Ce premier tournoi de l’année est l’occasion idéale de reprendre le sport après les fêtes et de démarrer l’année sous le signe de la compétition et du plaisir. Venez vibrer au rythme des échanges, rencontrer d’autres passionnés et repartir avec des souvenirs mémorables. Préparez vos raquettes et rejoignez-nous pour un début d’année sportif et motivant !', 1, '2025-01-13 09:00:00', '2025-01-26 23:59:00', 'Paris', '1734512811396_68148.jpg', NULL),
(11, 10, 'Ouverture de Koffee', 'Découvrez **Koffee**, votre nouveau lieu de rencontre et de gourmandise ! Nous sommes ravis de vous accueillir pour l’ouverture de notre café, un espace chaleureux où savourer des boissons artisanales, des pâtisseries maison et des plats légers. Venez déguster nos créations uniques, travailler ou simplement vous détendre dans une ambiance cosy. Nous avons hâte de partager avec vous ce moment spécial. Rendez-vous dès [date d\'ouverture] pour une expérience caféinée inoubliable !', 1, '2024-12-24 09:00:00', '2024-12-24 21:00:00', '19 rue Jérôme', '1734513308442_957622.jpg', NULL),
(12, 11, 'La Nuit des Étoiles Filantes', '\nVenez vivre un moment magique lors de La Nuit des Étoiles Filantes ! Cette soirée dédiée à l’observation des étoiles vous invite à admirer le ciel nocturne dans toute sa splendeur. Armés de télescopes et accompagnés d’experts, vous pourrez observer des étoiles filantes, en apprendre davantage sur les constellations et profiter d\'une ambiance calme et étoilée. Un événement à ne pas manquer pour les passionnés d\'astronomie et les curieux de tout âge !', 1, '2025-08-10 19:00:00', '2025-08-14 02:00:00', 'Dicathem', '1734515307353_13498.jpeg', NULL),
(14, 11, 'Fête de fin d\'année', 'Venez célébrer la **Fête de fin d\'année** dans une ambiance festive et chaleureuse ! Profitez d\'une soirée conviviale avec des animations, de la musique, des jeux et un délicieux repas pour clôturer l\'année en beauté. C\'est l\'occasion de partager un moment agréable entre amis, famille ou collègues, de revenir sur les meilleurs souvenirs de l\'année écoulée et d\'accueillir la nouvelle avec joie et enthousiasme. Ne manquez pas ce rendez-vous festif pour bien terminer l\'année et faire place à de nou', 1, '2024-12-31 10:00:00', '2025-01-01 10:00:00', 'Limoges', '1734515981039_379400.jpg', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb3_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `bio` longtext COLLATE utf8mb3_unicode_ci,
  `age` int DEFAULT NULL,
  `profile_picture` varchar(30) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `plain_password` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `is_active` datetime DEFAULT NULL,
  `password_token` varchar(1000) COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `bio`, `age`, `profile_picture`, `plain_password`, `is_active`, `password_token`) VALUES
(5, 'admin@admin', '[\"ROLE_ADMIN\"]', '$2y$10$Xy8ZmCMvvdDO74JbBBktLeK88FScueAER60bNP6KDutzAVk/QdScy', 'admin', 'admin', 'Je m\'appelle admin admin, et je suis un utilisateur de l\'application.', 0, NULL, NULL, NULL, NULL),
(6, 'corentin.pouget.19@gmail.com', '[]', '$2y$10$naKdvdUhzFav04mePuLequS5HQ0eM.FjQFS2svFzQCT94n4a/u/xi', 'Corentin', 'Pouget', 'Je m\'appelle Corentin Pouget, et je suis un utilisateur de l\'application.', 20, '1734508422093_50302.webp', NULL, NULL, NULL),
(7, 'john@doe', '[]', '$2y$10$SRED0wXgNVO4pRgRkwlU3ea1IQdjkTuT8555hind4HP99rYpAvHv.', 'John', 'Doe', 'Je m\'appelle John Doe, directeur de l\'association La Marguerite à Landouge. Tous uni pour le soutien des malades chroniques.', 31, '1734510031716_764528.jpeg', NULL, NULL, NULL),
(8, 'josue@perault', '[]', '$2y$10$Etg.AsyJArrMl2K5/BcxYuk7izUwP4eddNcMDVq1uWEYJxDFuf/Yy', 'Josué', 'Perraul', 'Je m\'appelle Josué Perraul, et je suis un utilisateur de l\'application.', 0, NULL, NULL, NULL, NULL),
(9, 'jane@doe', '[]', '$2y$10$SrwnYdtsQOKPd2Eiu41tz.oeiwxRvs.LoGVqnQv2hJ.uMy7FV.Lsi', 'Jane', 'Doe', 'Je m\'appelle Jane Doe, et je suis un utilisateur de l\'application.', 21, '1734512425063_771430.jpg', NULL, NULL, NULL),
(10, 'arthur@leywins', '[]', '$2y$10$ArjH6D35uMqITaxtTBfpbu0.OU6CU4rGdCgmBIjbAq0WpEBaXdUQO', 'Arthur', 'Leywins', 'Je m\'appelle Arthur Leywins, et je suis un utilisateur de l\'application.', 21, '1734512958772_572191.jpg', NULL, NULL, NULL),
(11, 'caera@denoir', '[]', '$2y$10$ZYrcPSp84MXGkpSZnDmIruiMgXCQPzlq1b2JF1.9RsEhONrEECE4i', 'Caera', 'Denoir', 'Je m\'appelle Caera Denoir, et je suis un utilisateur de l\'application.', 21, '1734515052651_208938.jpeg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_event`
--

CREATE TABLE `user_event` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `token` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `validation` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `user_event`
--

INSERT INTO `user_event` (`id`, `user_id`, `event_id`, `token`, `validation`) VALUES
(1, 6, 1, 'a3eb621bc05063bcc12ef708cba15e01fee0d648da9c9a0a7c05ddeecd47bd3a', 1),
(2, 6, 2, 'c654900bc9fb385c845df449284d1a61d6ae8649e32df5c2e66596695e5058c2', 1),
(3, 7, 3, '056ab82e26e26a0c5e592cf63c79074500f9a7fb30269702a2685d4dd5bb4ec7', 1),
(4, 7, 4, 'aeca5cf53829fb2082b4a237c592feb212287c773aab753f79e30b7d9c583b15', 1),
(5, 7, 5, 'fa0fa331c8c61a88e5b431fec2ca958e654270ad3083881eb2f1786d3fc44a51', 1),
(6, 8, 6, 'ce4ac05f13211aa0c5c647c1388252ce808efcf1efd22eb1beeb0ac77b1ba6e7', 1),
(7, 8, 7, '6b82e1cc1eff6cfb35c0507a8a895b19a9c7b3d77f9822c509a40c4056969750', 1),
(8, 8, 4, 'f9acbb88ac304252cf04f41436a7c54b9435a3865ebfaa2761b520daa8c9333e', 1),
(9, 8, 1, 'd7d4048e1e753fb8ce78ddb634eef23e68def23ce219a455bc5ae5c35d43c563', 1),
(10, 8, 5, 'd4f561493d49e315b270082815edf53ea585fcc718a815fa1727369ff07fd0f7', 1),
(11, 9, 8, '048a13e362b2609a5e6edc9c56c54fd2b9e0a38539499c4c749211eafce66901', 1),
(12, 9, 9, '5b3079aadcbd58d4d46301c568e989fc8e3b80915239cac665b04e5429a71f40', 1),
(13, 9, 1, '4cbe0b01caa78cdb2f1026561265a6547101837de7a4e51a649e441d2d296f87', 1),
(14, 9, 10, '7f9765d6539e361bd40c3a8dac359c8149d6adf60fb21391dd300136c1dbbb88', 1),
(15, 10, 11, '824980c5d8bc19ceef43f022d32112ba1df270bb86ac14772bd00903e59e4c54', 1),
(16, 10, 1, '7240926b68884eff2f42bbeaa049cdfa531b459ca9faae6de6ef8cb38ad52385', 1),
(17, 10, 8, 'f2a62436da2f11c93d663263f1b261dd0fa5653d358d52792d4d2bf1a052c33b', 1),
(18, 11, 12, '086d09400e5b7b88b408c47bb1f42795d16568aa8c2d90075528bc4644b08d1e', 1),
(19, 11, 1, 'efee940993bfcdf942a0e0f9a873ca0a2fd1b9eed09287c046dd0d1df923827e', 1),
(20, 11, 8, '7a73052d658a8136a63508b0321b42a8abf2ee1b6508719d51366612c735ffe4', 1),
(21, 11, 6, '1de13dd6569c2162c92d6afbd77f7834c152f1c48048d754bf8f03ff18272cbf', 1),
(23, 11, 14, '20f09c0d40426070984582d747f78bdfb65521f151ade5ae4f829aa1225dac29', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_3BAE0AA761220EA6` (`creator_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- Index pour la table `user_event`
--
ALTER TABLE `user_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D96CF1FFA76ED395` (`user_id`),
  ADD KEY `IDX_D96CF1FF71F7E88B` (`event_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `user_event`
--
ALTER TABLE `user_event`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `FK_3BAE0AA761220EA6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_event`
--
ALTER TABLE `user_event`
  ADD CONSTRAINT `FK_D96CF1FF71F7E88B` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
  ADD CONSTRAINT `FK_D96CF1FFA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
