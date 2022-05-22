
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
--Create Database "api_products"
--
CREATE DATABASE IF NOT EXISTS `api_products` DEFAULT CHARACTER SET latin1;
USE `api_products`;



CREATE TABLE IF NOT EXISTS `products` (
    `sku` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `price` varchar(255) NOT NULL,
    `type` varchar(255) NOT NULL,
    `properties` varchar(65535) NOT NULL,
    PRIMARY KEY (`sku`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;