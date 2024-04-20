-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: AssetManagement
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Assets`
--

DROP TABLE IF EXISTS `Assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serial_number` varchar(255) DEFAULT NULL,
  `make` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_price` decimal(10,2) DEFAULT NULL,
  `status` enum('in stock','issued','scrap') DEFAULT NULL,
  `asset_category_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  KEY `asset_category_id` (`asset_category_id`),
  CONSTRAINT `Assets_ibfk_1` FOREIGN KEY (`asset_category_id`) REFERENCES `AssetCategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assets`
--

LOCK TABLES `Assets` WRITE;
/*!40000 ALTER TABLE `Assets` DISABLE KEYS */;
INSERT INTO `Assets` VALUES (1,'ABCD1234','Dell','Latitude 7400','2023-02-28',1200.00,'in stock',1,'2024-04-18 06:28:27','2024-04-18 06:28:27',NULL),(2,'EFGH5678','Apple','iPhone 12','2023-03-15',999.00,'in stock',2,'2024-04-18 06:28:27','2024-04-18 06:28:27',NULL),(3,'IJKL9012','Bosch','Pro Impact Drill','2023-04-05',250.00,'in stock',4,'2024-04-18 06:28:27','2024-04-18 06:28:27',NULL),(4,'MAGS1234','Dell','Latitude 7400','2023-02-28',1900.00,'in stock',1,'2024-04-18 06:28:27','2024-04-18 06:34:42','2024-04-18 06:34:42'),(18,'MAGS1235','Dell','Latitude 7400','2023-02-28',1900.00,'in stock',1,'2024-04-18 06:28:57','2024-04-18 06:28:57',NULL),(20,'MAGS12349','Dell','Latitude 7400','2023-02-28',1900.00,'in stock',1,'2024-04-18 06:56:14','2024-04-18 07:04:20','2024-04-18 07:04:20');
/*!40000 ALTER TABLE `Assets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-18 16:08:12
