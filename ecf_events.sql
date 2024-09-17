-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 17 sep. 2024 à 09:42
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecf_events`
--

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `description` text,
  `date` datetime NOT NULL,
  `location` varchar(300) NOT NULL,
  `max_participants` int DEFAULT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `date`, `location`, `max_participants`, `created_by`) VALUES
(1, 'Summer Conference 2024', 'Une conférence annuelle sur la tech', '2024-07-15 09:00:00', 'Convention Center, New York', 500, 1),
(2, 'Summer Conference 2024', 'Une conférence annuelle sur la tech', '2024-07-15 09:00:00', 'Convention Center, New York', 500, 1),
(3, 'festival de rock', 'ceci est un festival de rock', '2024-09-27 14:56:00', 'toulouse', 150, 1),
(4, 'concert de rap', 'test', '2024-09-27 14:40:00', 'marseille', 466, 1),
(5, 'dégustation de grands vins', 'dégustation de grands vins de bordeaux entre passionnés', '2024-09-26 16:28:00', 'Bordeaux', 150, 1),
(6, 'soiree jardinage', 'le plus beau jardin que vous n\'avez jamais eu', '2024-09-27 16:37:00', 'aix', 1, 1),
(7, 'ping pong', 'ping pong', '2024-09-26 17:02:00', 'le havre', 2, 1),
(8, 'soiree netflix', 'une soiree netflix entre voisins', '2024-09-30 11:11:00', 'vichy', 20, 1);

-- --------------------------------------------------------

--
-- Structure de la table `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE IF NOT EXISTS `registration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_event` (`user_id`,`event_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `registration`
--

INSERT INTO `registration` (`id`, `user_id`, `event_id`, `registration_date`) VALUES
(15, 3, 1, '2024-09-16 14:48:23'),
(16, 3, 2, '2024-09-16 14:48:25'),
(17, 3, 3, '2024-09-16 14:48:26'),
(18, 3, 4, '2024-09-16 14:48:28'),
(19, 2, 1, '2024-09-16 14:48:39'),
(22, 2, 4, '2024-09-16 14:48:44'),
(29, 7, 1, '2024-09-16 16:43:01'),
(31, 2, 2, '2024-09-16 16:52:01'),
(35, 7, 4, '2024-09-16 17:24:40'),
(38, 7, 7, '2024-09-17 11:04:59'),
(39, 7, 6, '2024-09-17 11:05:13'),
(40, 7, 3, '2024-09-17 11:05:23'),
(41, 7, 2, '2024-09-17 11:23:37');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(300) NOT NULL,
  `firstname` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` text NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `lastname`, `firstname`, `email`, `password`, `role`) VALUES
(1, 'MENDO', 'Virginie', 'test@test.fr', '$2y$10$5s8jKzs1RhXUUw/lySguVuDxHMTNgfzQdMhkaiNHujeGnsz1qEHka', 1),
(2, 'doe', 'john', 'jd@gmail.com', '$2y$10$UDA3DJxQxMVgm82D6YVq/.OcyNSC/PLMmBPe9UaQuw95SN.7jVUGq', 0),
(3, 'pagnol', 'marcel', 'mp@gmail.com', '$2y$10$JqOGSnb.gY5TY5rb1ZNWkecHcMYUfI.LHqhryNdssmEDJW4EGLmJq', 0),
(4, 'lgx', 'jerome', 'jlgx@gmail.com', '$2y$10$YjAX90Vq4cxA4vA7PI1w3OLmG6Pb1RryHxqy24tsJGsOnnedRAw2O', 0),
(6, 'machin', 'paul', 'jlgx@gmail.comm', '$2y$10$r.WMFJNAbgu6KWedhj4mUezj.sDdLTVpqXQaiTg5DlLXI9Suk/7w2', 0),
(7, 'machin', 'paul', 'supremus@maximus', '$2y$10$m0OTTesRw6QxK4Ll4niLh.2Jlxqd9hXalXxI23DU6CgDHbdlkWKeC', 0),
(8, 'machin', 'paul', 'supremus@maximuss', '$2y$10$mTS6/39p2q8nZbFGE6DMwuakw70kiwo7bGncI.vGNKHW3TRqnjYT6', 0),
(9, 'gallagher', 'joffrey', 'b_tapie@finance.com', '$2y$10$9XwagdZ7OHyUffKcUks4OeEjlVwx1ihHFYr7wnyXtPBOBIA7Hok9y', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `registration`
--
ALTER TABLE `registration`
  ADD CONSTRAINT `registration_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `registration_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
