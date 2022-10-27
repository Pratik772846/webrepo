-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 27, 2022 at 08:51 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `email`, `password`) VALUES
(1, 'yogesh@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `custid` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`custid`, `name`, `email`, `password`, `address`) VALUES
(3, 'yogesh', 'yogesh@gmail.com', '123', 'jai'),
(10, '123', '123@gmail.com', '1234', '1234'),
(9, 'Ykumar', 'yogi@gmail.com', '123456', 'jaipur');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `pid` int(11) NOT NULL,
  `custid` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pid` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `type` varchar(15) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pid`, `name`, `price`, `description`, `type`) VALUES
(1, 'Apple', 90, 'Fruits are an excellent source of essential vitamins and minerals,and they are high in fiber. Fruits also provide a wide range of health-boosting antioxidants, including flavonoids. ', 'grocery'),
(2, 'Milk', 54, 'It\'s packed with important nutrients like calcium, phosphorus, B vitamins, potassium and vitamin D. Plus, it\'s an excellent source of protein. Drinking milk and dairy products may prevent osteoporosis and bone fractures and even help you maintain a healthy weight.', 'grocery'),
(3, 'Bread', 25, 'Bread contains a wide range of vitamins and minerals including B group vitamins thiamine(B1), Niacin (B3) which are important for releasing energy from food and maintaining healthy skin, eyes and nails.', 'grocery'),
(4, 'Eggs', 12, 'Raw eggs are rich in protein and other micronutrients. The fatty acids they have can help \r\nyour metabolism. They contain most of the essential amino acids, and one egg provides 27% of the daily choline requirements.', 'grocery'),
(5, 'Butter', 50, 'Butter contains vitamin D,a nutrient that is vital for bone growth and development. \r\nIt also has calcium, which is essential for bone strength. Calcium also helps prevent diseases such as osteoporosis, a condition that makes bones weak and fragile. It can help \r\nmake your skin healthier.', 'grocery'),
(6, 'facewash', 165, 'A facial cleanser is a skincare product used to remove make-up, dead skin cells, oil, dirt,and other types of pollutants from the skin, helping to keep pores clear and prevent skin conditions such as acne.', 'DE'),
(7, 'Body Lotion', 245, 'A lotion is a topical preparation, applied to the skin with bare hands or cotton wool, with the intent to moisturise and/or treat the skin. Most body lotions are meant to simply keep the skin soft, smooth and healthy, but they can also have anti-ageing properties and contain fragrances.', 'DE'),
(8, 'Toothpaste', 85, 'Toothpaste is a paste or gel to be used with a toothbrush to maintain and improve oral health and aesthetics. Toothpaste is a \r\nkey part of your daily oral hygiene routine. Along with your toothbrush and floss it \r\nhelps to remove food debris and plaque from your teeth and gums.', 'DE'),
(9, 'Soap', 35, 'A cleansing and emulsifying agent made usually by action of alkali on fat or fatty acids and consisting essentially of sodium or potassium salts of such acids.', 'DE'),
(10, 'Hand wash', 65, 'Hand wash, also known as hand hygiene, is the act of cleaning one\'s hands with soap or handwash and water to remove viruses/bacteria/microorganisms, dirt, grease, or other harmful and unwanted substances stuck to the hands.', 'DE'),
(11, 'chocolate', 110, 'chocolate, food product made from cocoa beans, consumed as candy and used to make beverages and to flavour or coat various confections and bakery products. Rich in carbohydrates, it is an excellent source of quick energy.', 'confectionary'),
(12, 'cookies', 140, 'chocolate, food product made from cocoa beans, consumed as candy and used to make beverages and to flavour or coat various confections and bakery products. Rich in carbohydrates, it is an excellent source of quick energy.', 'confectionary'),
(13, 'cakes', 45, 'It should be fluffy, spongy, and moist. Having fewer ingredients and proper baking methods make the cake more appealing. Using quality ingredients are always add-ons. Flavours- The most necessary feature of any cake is its flavour.', 'confectionary'),
(14, 'Breakfast cerials', 230, 'The grains are relatively easy to handle and store because of their low water content, and they are very high in food value. Cereals contain a higher percentage of carbohydrates than any other food plants as well as a considerable amount of protein and some fats. There are even vitamins present.', 'confectionary'),
(15, 'ice creams', 30, 'Ice cream is a frozen dairy dessert obtained by freezing the ice cream mix with continuous agitation. It contains milk products, sweetening materials, stabilizers, colors, flavors, and egg products. ', 'confectionary'),
(16, 'Slippers', 310, 'A slipper is a kind of indoor shoe that slips easily on and off your foot. You may prefer to walk around barefoot unless it\'s really cold, in case you wear slippers. Slippers are cozy, and they\'re often warm too.', 'others'),
(17, 'brush', 50, 'A brush is a common tool with bristles, wire or other filaments. It generally consists of a handle or block to which filaments are affixed in either a parallel or perpendicular orientation, depending on the way the brush is to be gripped during use.', 'others'),
(18, 'pens', 20, 'A pen is a common writing \r\ninstrument that applies ink to a surface, \r\nusually paper, for writing or drawing.', 'others'),
(19, 'napkins', 30, 'A napkin, serviette or face towelette is a square of cloth or paper tissue used at the table for wiping the mouth and fingers while eating. It is usually small and folded, sometimes in intricate designs and shapes.', 'others'),
(20, 'bottles', 40, 'A bottle is a narrow-necked container made of an impermeable material in various shapes and sizes that stores and transports liquids.', 'others');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `reqid` int(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`reqid`, `name`, `description`, `email`) VALUES
(1, 'rose', 'beautiful flower', 'yogesh@gmail.com'),
(2, 'Yogesh', 'beautiful flower', 'yogi@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`custid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`pid`,`custid`),
  ADD KEY `custid` (`custid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`reqid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `custid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `reqid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
