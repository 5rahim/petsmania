-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2020 at 04:58 AM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petsmania`
--

-- --------------------------------------------------------

--
-- Table structure for table `animals`
--

CREATE TABLE `animals` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `code_sick` varchar(255) NOT NULL,
  `code_dirty` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animals`
--

INSERT INTO `animals` (`id`, `type`, `code`, `code_sick`, `code_dirty`, `breed`, `price`) VALUES
(1, 'Jack Russel Terrier', 'dog_1', 'dog_1_sick', 'dog_1_dirty', 'dog', 500),
(5, 'Mastiff', 'dog_5', 'dog_5_sick', 'dog_5_dirty', 'dog', 80000),
(6, 'Malamute', 'dog_10', 'dog_10_sick', 'dog_10_dirty', 'dog', 80000);

-- --------------------------------------------------------

--
-- Table structure for table `animals_membership`
--

CREATE TABLE `animals_membership` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `health` int(11) NOT NULL,
  `moral` int(11) NOT NULL,
  `hygiene` int(11) NOT NULL,
  `performance` int(11) NOT NULL,
  `adoption_date` int(11) NOT NULL,
  `disease` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `nbChild` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `owner_token` text NOT NULL,
  `pxTop` int(11) NOT NULL,
  `pxLeft` int(11) NOT NULL,
  `zIndex` int(11) NOT NULL,
  `garden` text NOT NULL,
  `inGarden` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `inAction` int(11) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `animals_membership`
--

INSERT INTO `animals_membership` (`id`, `name`, `health`, `moral`, `hygiene`, `performance`, `adoption_date`, `disease`, `gender`, `nbChild`, `code`, `owner_token`, `pxTop`, `pxLeft`, `zIndex`, `garden`, `inGarden`, `age`, `inAction`, `token`) VALUES
(1, 'Xavier', 100, 60, 100, 10, 0, '', 'MM', 0, 'dog_3', '8ab7baeff15399ddebc3f19666d0a806', 111, 166, 3, '1c89a29b42f7d5acb964faf53e60ff184498d1ce', 1, 251, 0, '944b47908c74e31fd3d68da065e2f303149ba139'),
(2, 'Baudoin', 100, 60, 100, 10, 0, '', 'MM', 0, 'dog_10', '8ab7baeff15399ddebc3f19666d0a806', 70, 347, 4, '1c89a29b42f7d5acb964faf53e60ff184498d1ce', 1, 251, 0, '608e1c7e3761915a4592ba0dabebb92a6d65448e'),
(3, 'Kenian', 100, 60, 100, 10, 0, '', 'MM', 0, 'dog_5', '8ab7baeff15399ddebc3f19666d0a806', 102, 417, 2, '1c89a29b42f7d5acb964faf53e60ff184498d1ce', 1, 251, 0, '300de671cf8e012590c0e961ef45fbb80434233b'),
(4, 'Guy', 60, 50, 80, 10, 0, '', 'MM', 0, 'cat_1', '8ab7baeff15399ddebc3f19666d0a806', 57, 717, 0, '1c89a29b42f7d5acb964faf53e60ff184498d1ce', 1, 251, 0, '61bc971a2de2bb0ff9940e7e0c549cb23453e028');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `adding` int(11) NOT NULL,
  `recession` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `foodRecession` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `adding`, `recession`, `code`, `price`, `foodRecession`) VALUES
(1, 'Pomme', 20, 10, 'apple', 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `food_membership`
--

CREATE TABLE `food_membership` (
  `id` int(11) NOT NULL,
  `owner_token` varchar(255) NOT NULL,
  `inGarden` int(11) NOT NULL,
  `garden` text NOT NULL,
  `code` varchar(255) NOT NULL,
  `percent` int(11) NOT NULL,
  `pxTop` int(11) NOT NULL,
  `pxLeft` int(11) NOT NULL,
  `zIndex` int(11) NOT NULL,
  `expirationTime` int(11) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_membership`
--

INSERT INTO `food_membership` (`id`, `owner_token`, `inGarden`, `garden`, `code`, `percent`, `pxTop`, `pxLeft`, `zIndex`, `expirationTime`, `token`) VALUES
(1, '8ab7baeff15399ddebc3f19666d0a806', 0, '0', 'apple', 100, 0, 0, 0, 0, '07469789be8ac2606e588a2e92ebd35feeda432a'),
(2, '8ab7baeff15399ddebc3f19666d0a806', 0, '0', 'apple', 100, 0, 0, 0, 0, '8f96ec7c80ea08a95b775d56c09c6e43f1c6b8bd'),
(3, '8ab7baeff15399ddebc3f19666d0a806', 0, '0', 'salad', 100, 0, 0, 0, 0, '745f36d657f768d801e8b1423398399ef52a3328');

-- --------------------------------------------------------

--
-- Table structure for table `gardens`
--

CREATE TABLE `gardens` (
  `id` int(11) NOT NULL,
  `owner_token` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gardens`
--

INSERT INTO `gardens` (`id`, `owner_token`, `code`, `token`) VALUES
(1, '8ab7baeff15399ddebc3f19666d0a806', 'DEFAULT', '1c89a29b42f7d5acb964faf53e60ff184498d1ce'),
(2, '8ab7baeff15399ddebc3f19666d0a806', 'DEFAULT', '0d41aacafa6923438268bd3833ff0976dec42016');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `money` int(11) NOT NULL,
  `diamond` int(11) NOT NULL,
  `join_date` varchar(255) NOT NULL,
  `ban` int(11) NOT NULL,
  `hasAnimal` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `email`, `password`, `money`, `diamond`, `join_date`, `ban`, `hasAnimal`, `token`) VALUES
(1, 'Afrozack', 'bonfohzaki@gmail.com', '1dc8a4fa1338818e2f863ade510f100f', 500, 10, '1483530666791', 0, 1, '8ab7baeff15399ddebc3f19666d0a806');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `animals_membership`
--
ALTER TABLE `animals_membership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_membership`
--
ALTER TABLE `food_membership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gardens`
--
ALTER TABLE `gardens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `animals_membership`
--
ALTER TABLE `animals_membership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `food_membership`
--
ALTER TABLE `food_membership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gardens`
--
ALTER TABLE `gardens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
