-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2024 at 05:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `avani`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `cnic` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `persons` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `days_left` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `full_name`, `phone`, `cnic`, `address`, `email`, `persons`, `start_date`, `end_date`, `room_id`, `user_id`, `total_price`, `days_left`, `status`, `created_at`, `updated_at`) VALUES
(18, 'ffh', '686', '86868', '6jvjv', 'jhgj', 1, '2024-04-11', '2024-04-12', 1, 1, 2000.00, 1, 'Rejected', '2024-04-10 09:57:00', '2024-04-10 09:58:13'),
(19, 'qkh', '676', '66', 'hghh', '8', 2, '2024-04-14', '2024-04-15', 2, 1, 4000.00, 1, 'Rejected', '2024-04-10 09:57:25', '2024-04-10 10:00:08'),
(20, 'khjh', '979', '979', 'jgj', 'ijgh', 2, '2024-04-20', '2024-04-21', 3, 1, 3000.00, 1, 'Rejected', '2024-04-10 09:57:46', '2024-04-10 10:06:32'),
(21, 'lk', '987987', '8789', 'jhgj', 'jgjhgu', 1, '2024-04-29', '2024-04-30', 2, 1, 4000.00, 1, 'Accepted', '2024-04-10 10:05:56', '2024-04-11 19:44:33'),
(22, 'qwq', '11', '121', 'asa', 'asasdas', 1, '2024-05-01', '2024-05-02', 3, 1, 3000.00, 1, 'Pending', '2024-04-11 16:17:38', '2024-04-11 16:17:38'),
(23, 'wqw', '121212', '21121', 'wq', 'SA', 1, '2024-04-12', '2024-04-22', 5, 5, 10000.00, 10, 'Pending', '2024-04-11 16:18:22', '2024-04-11 16:18:22'),
(24, 'Manjunath K R', '4354354353', '4435553', 'Hubli', 'manju@gmail.com', 1, '2024-04-19', '2024-04-20', 6, 1, 1000.00, 1, 'Pending', '2024-04-17 20:29:11', '2024-04-17 20:29:11');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `breakfast` tinyint(1) NOT NULL,
  `description` text DEFAULT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `type`, `price`, `size`, `capacity`, `breakfast`, `description`, `image1`, `image2`, `image3`, `image4`, `images`, `is_available`) VALUES
(1, '1 BHK with AC', '1 BHK AC', 2000.00, 1, 2, 0, '1 BHK with AC kitchen hall and car parking', '1712682784072-640120036.JPG', '1712682784128-812668598.JPG', '1712682784189-970863288.JPG', '1712682784233-826794503.JPG', NULL, 1),
(2, '2 BHK with AC', '2 BHK AC', 4000.00, 1, 4, 0, '2 BHK with AC both room hall kitchen and car parking', '1712682943946-847963804.JPG', '1712682943981-851190546.JPG', '1712682944010-426372102.JPG', NULL, NULL, 1),
(3, '1 BHK without AC', '1 BHK NON AC', 3000.00, 1, 3, 0, '1 BHK without AC kitchen hall car parking', '1712684093323-543622469.JPG', '1712684093387-949521613.JPG', '1712684093456-5811509.JPG', '1712684093510-58176277.JPG', NULL, 1),
(4, 'Room 101 without AC', '101 NON AC', 1000.00, 1, 2, 0, 'Room 101 without AC attach bathroom', '1712684206126-424494551.JPG', '1712684206190-316341424.JPG', '1712684206352-651703310.JPG', '1712684206371-708903106.JPG', NULL, 1),
(5, 'Room 102 without AC', 'Room 102 NON AC', 1000.00, 1, 1, 0, 'Room 101 without AC with attach bathroom', '1712684266414-296546977.JPG', '1712684266478-832255026.JPG', '1712684266542-70686525.JPG', '1712684266568-483146040.JPG', NULL, 1),
(6, 'Room 103 without AC', 'Room 103 NON AC', 1000.00, 1, 2, 0, 'Room 101 without AC with attach bathroom', '1712684338579-360624100.JPG', '1712684338681-476514741.JPG', '1712684338751-384101305.JPG', '1712684338775-7520092.JPG', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trekking`
--

CREATE TABLE `trekking` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `breakfast` tinyint(1) NOT NULL,
  `description` text DEFAULT NULL,
  `map` varchar(255) NOT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trekking`
--

INSERT INTO `trekking` (`id`, `name`, `type`, `price`, `size`, `capacity`, `breakfast`, `description`, `map`, `image1`, `image2`, `image3`, `image4`) VALUES
(1, '', '', 0.00, 0, 1, 0, 'Amazing place for trekking', 'https://maps.app.goo.gl/MVVwX3snY4zfCaWc7', NULL, NULL, NULL, NULL),
(2, 'Kiran', '', 1000.00, 0, 10, 0, 'Amazing place for trekking', 'https://maps.app.goo.gl/MVVwX3snY4zfCaWc7', '1713420054421-371717079.jpg', '1713420054422-131736615.jpg', '1713420054428-505659223.jpg', '1713420054432-246697023.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(20) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `number`, `is_admin`) VALUES
(1, 'manju@gmail.com', '123456', 'Manjunath K R', '+917766778891', 0),
(5, 'vinayak@gmail.com', '123456', 'vinayak', '+918787675614', 0),
(7, 'pramod@gmail.com', '$2b$10$2jbuG/AAbAVk4Tg69fGaBujTBPkmoR3tf.iKyygRS0JKXP4ALyr1u', 'Pramod ', '+919916787716', 0),
(12, 'sachin@gmail.com', '$2b$10$WcEeYIGoCUZdFlA/LJ1eBOeM4nKnTPuYJbu4sPHGEcqsAKiKGxLMa', 'sachin', '+919901889910', 0),
(18, 'admin@gmail.com', 'adminadmin', 'Admin', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trekking`
--
ALTER TABLE `trekking`
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
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `trekking`
--
ALTER TABLE `trekking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
