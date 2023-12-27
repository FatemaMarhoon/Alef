-- MySQL dump 10.13  Distrib 8.1.0, for macos14.0 (arm64)
--
-- Host: inhousevm.westeurope.cloudapp.azure.com    Database: db202000513
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `road` varchar(255) DEFAULT NULL,
  `building` varchar(255) DEFAULT NULL,
  `preschool_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `address_preschool_id` (`preschool_id`),
  KEY `longitude` (`longitude`),
  KEY `latitude` (`latitude`),
  CONSTRAINT `address_preschool_id` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (2,50.54547593839437,26.16523486242255,'Manama','4565','1234',2,'2023-11-14 19:46:05','2023-11-14 19:46:05'),(3,50.602797009050846,26.145573197894418,'Al Eker','9865','411',1,'2023-11-14 19:46:05','2023-12-06 17:11:09'),(5,50.1955808,26.2183582,'Zallaq','1192','0098',6,'2023-11-30 15:44:51','2023-11-30 15:44:51'),(6,50.5444509,26.2255629,'Sanabis','838','969',35,'2023-12-09 21:31:41','2023-12-09 21:31:41'),(7,50.506442824418315,26.233699640802598,'Ras Al-Bar','121','44',28,'2023-12-11 14:28:01','2023-12-11 14:28:01');
/*!40000 ALTER TABLE `Addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Application_Evaluations`
--

DROP TABLE IF EXISTS `Application_Evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Application_Evaluations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color_size_recognition` int(11) DEFAULT NULL,
  `belongings_memory` int(11) DEFAULT NULL,
  `task_completion` int(11) DEFAULT NULL,
  `total_mark` int(11) DEFAULT NULL,
  `letter_number_distinction` int(11) DEFAULT NULL,
  `stimuli_discrimination` int(11) DEFAULT NULL,
  `auditory_memory` int(11) DEFAULT NULL,
  `quick_responses` int(11) DEFAULT NULL,
  `sustained_attention` int(11) DEFAULT NULL,
  `environmental_perception` int(11) DEFAULT NULL,
  `quick_comprehension` int(11) DEFAULT NULL,
  `math_problem_solving` int(11) DEFAULT NULL,
  `quranic_verses_recall` int(11) DEFAULT NULL,
  `first_time_attention` int(11) DEFAULT NULL,
  `focus_on_significant_stimuli` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application__evaluations_application_id` (`application_id`),
  CONSTRAINT `Application_Evaluations_application_id_foreign_idx` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Application_Evaluations`
--

LOCK TABLES `Application_Evaluations` WRITE;
/*!40000 ALTER TABLE `Application_Evaluations` DISABLE KEYS */;
INSERT INTO `Application_Evaluations` VALUES (7,3,3,3,39,2,3,3,3,3,3,2,3,2,3,3,'2023-12-04 05:00:17','2023-12-04 05:00:17',62),(8,1,1,1,14,1,1,1,1,1,1,1,1,1,1,1,'2023-12-04 05:56:50','2023-12-04 05:56:50',54),(9,1,1,1,14,1,1,1,1,1,1,1,1,1,1,1,'2023-12-05 23:41:32','2023-12-05 23:41:32',55),(10,1,1,2,17,3,1,1,1,1,1,1,1,1,1,1,'2023-12-05 23:43:55','2023-12-05 23:43:55',67),(11,1,1,1,14,1,1,1,1,1,1,1,1,1,1,1,'2023-12-12 11:46:40','2023-12-12 11:46:40',56),(12,1,3,1,19,3,1,2,1,1,1,1,1,1,1,1,'2023-12-12 15:19:09','2023-12-12 15:19:09',61),(13,3,3,2,37,3,2,3,3,3,2,3,2,3,2,3,'2023-12-24 22:12:51','2023-12-24 22:12:51',57),(14,1,1,1,14,1,1,1,1,1,1,1,1,1,1,1,'2023-12-25 19:01:36','2023-12-25 19:01:36',63);
/*!40000 ALTER TABLE `Application_Evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Applications`
--

DROP TABLE IF EXISTS `Applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guardian_type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `student_CPR` int(9) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `guardian_name` varchar(255) NOT NULL,
  `phone` int(8) NOT NULL,
  `student_DOB` datetime NOT NULL,
  `medical_history` varchar(255) DEFAULT NULL,
  `personal_picture` varchar(255) NOT NULL,
  `certificate_of_birth` varchar(255) NOT NULL,
  `passport` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `applications_preschool_id` (`preschool_id`),
  KEY `applications_user_id` (`created_by`) USING BTREE,
  CONSTRAINT `Applications_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Applications_user_id_foreign_idx` FOREIGN KEY (`created_by`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applications`
--

LOCK TABLES `Applications` WRITE;
/*!40000 ALTER TABLE `Applications` DISABLE KEYS */;
INSERT INTO `Applications` VALUES (51,'Father','Accepted','email@email.com','Muneera Mansoor',205204780,'Female','KG1','Mansoor Ahmed',35412698,'2023-11-22 00:00:00','-','Alef logo.png','Alef logo.png','Alef - Variation 2.png','2023-11-23 11:00:36','2023-12-03 08:00:59',17,1),(54,'Mother','Accepted','test@gmail.com','Manar Mohammed',205204780,'Female','KG1','Fatema Ahmed',36985214,'2020-06-10 00:00:00','nothing','e5e27c61-3865-42f4-813e-5edd0b7b3c2f.jpeg','47be2854-74eb-4511-99ad-6a84e7b4a696.jpeg','6f0db12c-956a-4c53-80b7-af4d954d5834.jpeg','2023-11-27 13:19:55','2023-12-04 16:52:03',17,1),(55,'Grandparent','Accepted','test@gmail.com','Fatima Ali',205204780,'Female','KG1','Maryam Ali',32659874,'2023-11-08 00:00:00','-','profilePic.png','Book lover-pana (1).png','Screenshot 2023-11-16 164853.png','2023-11-27 21:16:55','2023-12-05 23:41:36',17,1),(56,'Mother','Accepted','mohammed.ali@gmail.com','Manar Ahmed',205204798,'Female','KG2','Noor Ali',32371545,'2023-11-28 00:00:00','-','Screenshot 2023-11-13 231754.png','Screenshot 2023-03-21 201947.png','Screenshot 2023-11-16 062911.png','2023-11-27 21:27:22','2023-12-12 11:48:20',17,1),(57,'Father','Cancelled','test@gmail.com','Nader Ahmed',85204780,'Male','KG1','Isa Isa',36985214,'2023-11-02 00:00:00','-','Screenshot 2023-04-13 001732.png','Screenshot 2023-04-13 001655.png','Screenshot 2023-04-06 225214.png','2023-11-27 21:29:36','2023-12-25 19:08:29',17,1),(58,'Mother','Pending','k.alekri@outlook.com','Fatema Salman ',228200730,'Female','KG2','Zainab Mohammed',32371545,'2023-11-06 00:00:00','-','Screenshot 2023-10-21 014439.png','Screenshot 2023-10-30 143056.png','Screenshot 2023-10-30 143205.png','2023-11-28 09:42:00','2023-11-28 09:42:00',17,1),(59,'Mother','Pending','test@gmail.com','Mohammed Ali',653298541,'Female','KG2','Noor Ahmed',36985214,'2023-11-22 00:00:00','-','Screenshot 2023-03-27 011930.png','Screenshot 2023-03-27 012005.png','Screenshot 2023-03-27 012021.png','2023-11-28 09:59:03','2023-11-28 09:59:03',17,1),(60,'Mother','Pending','test@gmail.com','Sara Mohammed',98561235,'Female','KG1','Alaa Mansoor',32213598,'2023-11-14 00:00:00','-','Screenshot 2023-03-25 023709.png','Screenshot 2023-04-06 225214.png','Screenshot 2023-04-15 030619.png','2023-11-28 10:01:47','2023-11-28 10:01:47',17,1),(61,'Father','Accepted','test@gmail.com','Manar Mahmood',875985236,'Female','KG2','Abdulla Isa',62626985,'2023-11-19 00:00:00','-','Screenshot 2023-04-13 001957.png','Screenshot 2023-04-13 001655.png','Screenshot 2023-04-13 001824.png','2023-11-28 10:18:07','2023-12-12 15:19:17',17,1),(62,'Mother','Accepted','k.alekri@outlook.com','Maryam Mahmood',123456789,'Female','KG2','Fatema Ali',12345678,'2023-11-22 03:00:00','-','DB Tables.png','Screenshot 2023-04-15 030619.png','Screenshot 2023-04-15 030643.png','2023-11-28 10:22:38','2023-12-04 05:35:49',26,1),(63,'Mother','Pending','k.alekri@outlook.com','Maram Ali',548641874,'Female','KG2','Najeeba Ahmed',32371545,'2023-11-22 00:00:00','-','Screenshot 2023-06-04 174354.png','Screenshot 2023-06-04 150814.png','Screenshot 2023-05-19 224153.png','2023-11-28 10:25:35','2023-11-28 10:25:35',17,1),(64,'Mother','Cancelled','z@g.xi','Dana Ahmed',326587419,'female','','Maryam Alawi',36874125,'2023-11-28 21:00:00','no','personal_picture','certificate_of_birth','passport','2023-11-28 22:19:47','2023-11-28 22:19:47',26,2),(65,'Father','Pending','z@w','Noor Ahmed',741852368,'female','KG1','Saeed Ahmed',39874152,'2023-12-03 00:00:00','no','personal_picture','certificate_of_birth','passport','2023-12-03 18:34:44','2023-12-03 18:34:44',28,2),(66,'Father','Pending','Zoozii@gmail.com','Ali Muneer',987654122,'male','KG1','Muneer Hassan',34343434,'2023-12-03 00:00:00','no','personal_picture','certificate_of_birth','passport','2023-12-03 18:37:11','2023-12-03 18:37:11',28,2),(67,'Father','Accepted','sos@help.com','Maryam Ahmed',208796325,'female','KG1','Hussain Ali',32658741,'2023-12-04 00:00:00','cd','personal_picture','certificate_of_birth','passport','2023-12-04 12:08:55','2023-12-06 01:47:42',30,1),(68,'Father','Cancelled','yousif@gmail.com','Marwa Yusif',210498402,'Female','KG2','Yousif Ahmed',32651498,'2021-04-02 03:00:00','nothing','kawthar photo.png','id.png','NEW PASSPORT.jpg','2023-12-15 10:25:29','2023-12-15 10:25:29',17,1),(69,'Father','Pending','not@crying.com','Jenan Muneer',509876543,'female','KG1','Muneer Mahdi',12345678,'2023-12-15 00:00:00','-','IMG_0002.png.JPG','IMG_0002.png.JPG','IMG_0002.png.JPG','2023-12-15 14:06:40','2023-12-25 18:57:54',39,1),(77,'Father','Cancelled','not@crying.com','Fatema Merza',123456789,'female','KG1','Merza Ali',68780807,'2023-12-15 00:00:00','-','IMG_0002.png.JPG','image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg','IMG_0002.png.JPG','2023-12-15 21:32:22','2023-12-25 23:06:06',39,1);
/*!40000 ALTER TABLE `Applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `time` time DEFAULT NULL,
  `preschool_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_application_id` (`application_id`),
  KEY `Appointments_preschool_id` (`preschool_id`),
  CONSTRAINT `Appointments_application_id_foreign_idx` FOREIGN KEY (`application_id`) REFERENCES `Applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Appointments_preschool_id` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointments`
--

LOCK TABLES `Appointments` WRITE;
/*!40000 ALTER TABLE `Appointments` DISABLE KEYS */;
INSERT INTO `Appointments` VALUES (15,'2023-12-03 00:00:00','08:00:00',2,'2023-12-02 23:03:06','2023-12-02 23:03:06',64),(16,'2023-11-04 00:00:00','08:00:00',1,'2023-12-03 00:54:17','2023-12-03 00:54:17',64),(17,'2023-12-04 00:00:00','10:00:00',1,'2023-12-03 00:54:17','2023-12-03 18:32:52',59),(18,'2023-12-05 00:00:00','09:00:00',2,'2023-12-03 18:39:14','2023-12-03 18:39:14',66),(19,'2023-11-04 00:00:00','08:00:00',2,'2023-12-03 00:54:17','2023-12-03 00:54:17',64),(20,'2023-12-08 00:00:00','09:00:00',1,'2023-12-04 03:30:54','2023-12-04 03:30:54',58),(22,'2023-12-05 03:00:00','09:30:00',2,'2023-12-04 12:09:06','2023-12-04 12:09:06',67),(23,'2023-12-09 00:00:00','01:39:00',1,'2023-12-09 00:44:01','2023-12-09 00:44:01',54),(24,'2023-12-09 00:00:00','09:30:00',1,'2023-12-09 00:48:02','2023-12-09 00:48:02',56);
/*!40000 ALTER TABLE `Appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attachments`
--

DROP TABLE IF EXISTS `Attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `request_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `attachments_request_id` (`request_id`),
  CONSTRAINT `Attachments_request_id_foreign_idx` FOREIGN KEY (`request_id`) REFERENCES `Stationary_Requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attachments`
--

LOCK TABLES `Attachments` WRITE;
/*!40000 ALTER TABLE `Attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendances`
--

DROP TABLE IF EXISTS `Attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attendance_status` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Attendances_student_id_foreign_idx` (`student_id`),
  CONSTRAINT `Attendances_student_id_foreign_idx` FOREIGN KEY (`student_id`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendances`
--

LOCK TABLES `Attendances` WRITE;
/*!40000 ALTER TABLE `Attendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `classroom` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  `supervisor` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Classes_preschool_id_foreign_idx` (`preschool_id`),
  KEY `Classes_supervisor_foreign_idx` (`supervisor`),
  CONSTRAINT `Classes_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Classes_supervisor_foreign_idx` FOREIGN KEY (`supervisor`) REFERENCES `Staffs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (27,'Alward','KG2',4,'12','2023-11-23 08:09:27','2023-12-09 12:06:10',1,10),(110,'Alzuhoor','KG2',12,'15','2023-11-30 17:44:26','2023-12-07 14:47:40',1,2),(111,'Alfarashat','KG2',11,'13','2023-11-30 17:44:26','2023-11-30 17:44:26',1,1),(131,'Alnoor','KG2',11,'3','2023-12-07 10:36:43','2023-12-07 10:36:43',1,5),(135,'efef','KG1',25,'12','2023-12-12 15:34:00','2023-12-12 15:34:00',1,16),(136,'aasa','KG1',23,'12','2023-12-12 15:34:00','2023-12-12 15:34:00',1,16),(138,'knknknnk','KG1',2,'3','2023-12-12 23:48:59','2023-12-12 23:48:59',1,32);
/*!40000 ALTER TABLE `Classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event_Classes`
--

DROP TABLE IF EXISTS `Event_Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event_Classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_class_id` (`class_id`),
  KEY `class_event_id` (`event_id`),
  CONSTRAINT `class_event_id` FOREIGN KEY (`event_id`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `event_class_id` FOREIGN KEY (`class_id`) REFERENCES `Classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_Classes`
--

LOCK TABLES `Event_Classes` WRITE;
/*!40000 ALTER TABLE `Event_Classes` DISABLE KEYS */;
INSERT INTO `Event_Classes` VALUES (32,27,23,'2023-12-01 01:09:14','2023-12-01 01:09:14'),(39,110,34,'2023-12-06 01:29:35','2023-12-06 01:29:35'),(40,110,35,'2023-12-06 01:30:48','2023-12-06 01:30:48'),(41,110,36,'2023-12-06 01:32:49','2023-12-06 01:32:49'),(63,110,53,'2023-12-21 20:23:59','2023-12-21 20:23:59'),(64,111,53,'2023-12-21 20:23:59','2023-12-21 20:23:59'),(67,27,55,'2023-12-23 14:33:09','2023-12-23 14:33:09'),(68,111,55,'2023-12-23 14:33:09','2023-12-23 14:33:09'),(69,110,56,'2023-12-24 14:37:36','2023-12-24 14:37:36'),(70,111,56,'2023-12-24 14:37:36','2023-12-24 14:37:36');
/*!40000 ALTER TABLE `Event_Classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `notify_parents` tinyint(1) DEFAULT NULL,
  `notify_staff` tinyint(1) DEFAULT NULL,
  `public_event` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Events_created_by_foreign_idx` (`created_by`),
  KEY `Events_preschool_id_foreign_idx` (`preschool_id`),
  CONSTRAINT `Events_created_by_foreign_idx` FOREIGN KEY (`created_by`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Events_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (4,'prohept\'s birthday','2024-01-11 00:00:00',1,0,1,'This is a sample event for testing.','2023-11-25 21:08:28','2023-11-25 21:08:28',17,2),(13,'create test ??','2024-01-08 00:00:00',1,1,0,'just a test with postman','2023-11-25 23:36:00','2023-12-01 16:21:45',17,1),(23,'Event with Classes updated','2023-11-15 00:00:00',0,1,0,'event specifically created for some classes only','2023-11-27 05:18:28','2023-12-01 00:43:48',17,1),(29,'Palestine Day','2023-12-04 03:00:00',0,0,1,'Supporting Palestine !','2023-12-03 01:21:11','2023-12-03 01:21:11',18,1),(30,'Green Day','2023-11-04 03:00:00',0,0,1,'Wear green shirts and join us!','2023-12-03 23:10:02','2023-12-03 23:10:02',18,1),(32,'Bahraini Women\'s Day','2023-12-09 03:00:00',1,0,1,'Celebrating Womens!','2023-12-06 01:25:18','2023-12-08 22:28:07',18,1),(34,'Happiness Day','2023-12-16 03:00:00',1,0,0,'Let\'s Celebrate Happiness Day Together!!','2023-12-06 01:29:34','2023-12-06 01:29:34',18,1),(35,'Colors Day','2023-12-18 03:00:00',1,0,0,'Colors Event !!','2023-12-06 01:30:47','2023-12-06 01:30:47',18,1),(36,'Hobbies Day','2023-12-12 03:00:00',1,0,0,'Let\'s play and try new hobbies.','2023-12-06 01:32:47','2023-12-06 01:32:47',18,1),(40,'Arabic Day !','2023-12-19 03:00:00',1,1,1,'Let\'s celebrate our language! ','2023-12-18 23:14:01','2023-12-18 23:14:01',17,1),(41,'Camping Day','2023-12-20 03:00:00',1,1,1,'Let\'s celebrate camping season !','2023-12-18 23:41:54','2023-12-18 23:41:54',17,1),(53,'testing teacher app','2023-12-21 20:22:48',0,0,0,'9a7ib al399r w al zamaaan','2023-12-21 20:23:59','2023-12-21 20:23:59',42,1),(55,'meow event!','2024-02-01 03:00:00',0,0,0,'the kids are the cats','2023-12-23 14:33:08','2023-12-23 14:33:08',42,1),(56,'YA Rabiiii','2023-12-31 06:00:00',0,0,0,'demo is soon','2023-12-24 14:37:34','2023-12-24 14:37:34',42,1),(57,'test after update','2023-12-26 00:00:00',1,0,1,'nothing','2023-12-24 18:02:24','2023-12-24 18:02:24',17,1),(58,'test after update','2023-12-26 00:00:00',1,0,1,'nothing','2023-12-24 18:03:27','2023-12-24 18:03:27',17,1),(59,'test after update','2023-12-24 00:00:00',1,0,1,'nothing','2023-12-24 18:10:50','2023-12-24 18:10:50',17,1),(60,'test after update','2023-12-24 00:00:00',1,0,1,'nothing','2023-12-24 18:11:12','2023-12-24 18:11:12',17,1);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grade_Capacities`
--

DROP TABLE IF EXISTS `Grade_Capacities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Grade_Capacities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grade` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Grade_Capacities_preschool_id_foreign_idx` (`preschool_id`),
  CONSTRAINT `Grade_Capacities_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grade_Capacities`
--

LOCK TABLES `Grade_Capacities` WRITE;
/*!40000 ALTER TABLE `Grade_Capacities` DISABLE KEYS */;
INSERT INTO `Grade_Capacities` VALUES (3,'KG1',50,'2023-11-17 15:15:37','2023-11-17 15:15:37',2),(6,'KG1',60,'2023-12-19 15:11:29','2023-12-25 13:54:20',1),(7,'KG2',70,'2023-12-19 15:11:29','2023-12-25 13:54:21',1);
/*!40000 ALTER TABLE `Grade_Capacities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logs`
--

DROP TABLE IF EXISTS `Logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `original_values` longtext DEFAULT NULL,
  `current_values` longtext DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `logs_user_id` (`user_id`),
  CONSTRAINT `Logs_user_id_foreign_idx` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logs`
--

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;
INSERT INTO `Logs` VALUES (6,'Student Creation','{\"student_name\":\"Yaseen Sami\",\"DOB\":\"2023-12-02\",\"grade\":\"KG1\",\"CPR\":\"987654321\",\"contact_number1\":\"12345679\",\"contact_number2\":\"12345679\",\"guardian_name\":\"Yaseen Ahmed\",\"enrollment_date\":\"2023-12-09\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Male\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"personal_picture\":\"Use Case Model.png\"}','Student created','2023-12-05 23:15:44','2023-12-05 23:15:44','2023-12-05 23:15:44',28),(7,'Student Creation','{\"student_name\":\"Salem Ali\",\"DOB\":\"2023-12-11\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"33223322\",\"contact_number2\":\"33223322\",\"guardian_name\":\"Ali Ahmed\",\"enrollment_date\":\"2023-12-18\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Male\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"personal_picture\":\"Use Case Model.png\"}','Student created','2023-12-05 23:19:45','2023-12-05 23:19:45','2023-12-05 23:19:45',28),(8,'Student Creation','{\"student_name\":\"Fatema Mirza\",\"DOB\":\"2021-06-06\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"32323232\",\"contact_number2\":\"32323232\",\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"personal_picture\":\"IMG_2818.jpg\"}','{\"student_name\":\"Fatema Mirza\",\"DOB\":\"2021-06-06\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"32323232\",\"contact_number2\":\"32323232\",\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"personal_picture\":\"IMG_2818.jpg\"}','2023-12-06 09:41:39','2023-12-06 09:41:39','2023-12-06 09:41:39',28),(9,'Student Update','{\"id\":68,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Fatema Mirza\",\"grade\":\"KG1\",\"DOB\":\"2021-06-06T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-06T06:41:39.000Z\",\"updatedAt\":\"2023-12-06T06:41:39.000Z\"}','{\"id\":68,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Fatema Merza\",\"grade\":\"KG1\",\"DOB\":\"2021-06-06T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-06T06:41:39.000Z\",\"updatedAt\":\"2023-12-06T06:43:57.710Z\"}','2023-12-06 09:43:57','2023-12-06 09:43:57','2023-12-06 09:43:57',28),(10,'Student Deletion','{\"id\":67,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"zzz\",\"grade\":\"KG1\",\"DOB\":\"2023-12-03T21:00:00.000Z\",\"CPR\":212121212,\"contact_number1\":21212121,\"contact_number2\":21212121,\"guardian_name\":\"ede\",\"enrollment_date\":\"2023-12-05T22:47:45.000Z\",\"medical_history\":\"cd\",\"gender\":\"female\",\"personal_picture\":\"personal_picture\",\"certificate_of_birth\":\"certificate_of_birth\",\"passport\":\"passport\",\"hasConsent\":null,\"user_id\":30,\"createdAt\":\"2023-12-05T22:47:45.000Z\",\"updatedAt\":\"2023-12-05T22:47:45.000Z\"}','Student deleted','2023-12-06 09:47:00','2023-12-06 09:47:00','2023-12-06 09:47:00',28),(11,'Student Creation Validation Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 09:51:05','2023-12-06 09:51:05','2023-12-06 09:51:05',28),(12,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-06 10:07:05','2023-12-06 10:07:05','2023-12-06 10:07:05',28),(13,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-06 10:07:28','2023-12-06 10:07:28','2023-12-06 10:07:28',28),(14,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 10:08:41','2023-12-06 10:08:41','2023-12-06 10:08:41',28),(15,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-06 10:08:43','2023-12-06 10:08:43','2023-12-06 10:08:43',28),(16,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 10:09:22','2023-12-06 10:09:22','2023-12-06 10:09:22',28),(17,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 10:14:21','2023-12-06 10:14:21','2023-12-06 10:14:21',18),(18,'Error','{\"student_name\":\"fatema yousif ali\",\"gender\":\"Female\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\"}','{\"error\":\"us is not defined\"}','2023-12-06 10:22:15','2023-12-06 10:22:15','2023-12-06 10:22:15',18),(19,'Student Update','{\"id\":40,\"preschool_id\":1,\"class_id\":125,\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-06T07:22:15.000Z\"}','{\"id\":40,\"preschool_id\":1,\"class_id\":125,\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-06T07:22:15.000Z\"}','2023-12-06 10:22:40','2023-12-06 10:22:40','2023-12-06 10:22:40',18),(20,'Student Update','{\"id\":39,\"preschool_id\":1,\"class_id\":110,\"student_name\":\"Sulaiman Ahmed\",\"grade\":\"KG1\",\"DOB\":\"2021-10-19T00:00:00.000Z\",\"CPR\":332233221,\"contact_number1\":32321233,\"contact_number2\":32321233,\"guardian_name\":\"Hassan Redha\",\"enrollment_date\":\"2023-11-21T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Apple.png\",\"certificate_of_birth\":\"Slider.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:10:01.000Z\",\"updatedAt\":\"2023-12-04T13:13:09.000Z\"}','{\"id\":39,\"preschool_id\":1,\"class_id\":110,\"student_name\":\"Sulaiman Ahmed .\",\"grade\":\"KG1\",\"DOB\":\"2021-10-19T00:00:00.000Z\",\"CPR\":332233221,\"contact_number1\":32321233,\"contact_number2\":32321233,\"guardian_name\":\"Hassan Redha\",\"enrollment_date\":\"2023-11-21T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Apple.png\",\"certificate_of_birth\":\"Slider.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:10:01.000Z\",\"updatedAt\":\"2023-12-06T12:20:01.695Z\"}','2023-12-06 15:20:01','2023-12-06 15:20:01','2023-12-06 15:20:01',18),(21,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Ameena Ali\",\"CPR\":123456789,\"phone\":32324356,\"hire_date\":\"2023-12-05T00:00:00.000Z\",\"email\":\"f6em.2011@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Ameena Ali\",\"CPR\":123456789,\"phone\":32324356,\"hire_date\":\"2023-12-05T00:00:00.000Z\",\"email\":\"f6em.2011@gmail.com\",\"preschool_id\":1}','2023-12-06 15:29:58','2023-12-06 15:29:58','2023-12-06 15:29:58',18),(22,'Error','{\"id\":15,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Nurse\",\"name\":\"Somona\",\"CPR\":123456789,\"phone\":32321213,\"hire_date\":\"2023-12-04T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:37:58.000Z\",\"updatedAt\":\"2023-12-04T13:37:58.000Z\"}','\"student is not defined\"','2023-12-06 15:32:39','2023-12-06 15:32:39','2023-12-06 15:32:39',18),(23,'Error','{\"id\":15,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Nurse\",\"name\":\"Somona\",\"CPR\":123456789,\"phone\":32321213,\"hire_date\":\"2023-12-04T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:37:58.000Z\",\"updatedAt\":\"2023-12-04T13:37:58.000Z\"}','\"student is not defined\"','2023-12-06 15:33:20','2023-12-06 15:33:20','2023-12-06 15:33:20',18),(24,'Staff Update','{\"id\":15,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"Somona\",\"CPR\":123456789,\"phone\":32321213,\"hire_date\":\"2023-12-04T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:37:58.000Z\",\"updatedAt\":\"2023-12-04T13:37:58.000Z\"}','{\"id\":15,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Nurse\",\"name\":\"Somona\",\"CPR\":123456789,\"phone\":32321213,\"hire_date\":\"2023-12-04T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:37:58.000Z\",\"updatedAt\":\"2023-12-06T12:33:37.068Z\"}','2023-12-06 15:33:37','2023-12-06 15:33:37','2023-12-06 15:33:37',18),(25,'Staff Deletion','{\"id\":15,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Nurse\",\"name\":\"Somona\",\"CPR\":123456789,\"phone\":32321213,\"hire_date\":\"2023-12-04T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:37:58.000Z\",\"updatedAt\":\"2023-12-06T12:33:37.000Z\"}','Staff deleted','2023-12-06 15:37:43','2023-12-06 15:37:43','2023-12-06 15:37:43',18),(26,'Error','{\"staff_role_name\":\"\",\"name\":\"\",\"CPR\":0,\"phone\":0,\"hire_date\":null,\"preschool_id\":1}','\"staff_role_name is required\"','2023-12-06 15:39:20','2023-12-06 15:39:20','2023-12-06 15:39:20',18),(27,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"meow\",\"supervisor\":\"16\",\"classroom\":\"1\",\"capacity\":1}','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"meow\",\"supervisor\":\"16\",\"classroom\":\"1\",\"capacity\":1}','2023-12-06 15:50:19','2023-12-06 15:50:19','2023-12-06 15:50:19',18),(28,'Stationary Creation','{\"stationary_name\":\"Ruler\",\"quantity_available\":2,\"preschool_id\":1}','{\"stationary_name\":\"Ruler\",\"quantity_available\":2,\"preschool_id\":1}','2023-12-06 16:14:51','2023-12-06 16:14:51','2023-12-06 16:14:51',18),(29,'Stationary Update','{\"id\":13,\"stationary_name\":\"Ruler\",\"quantity_available\":2,\"createdAt\":\"2023-12-06T13:14:52.000Z\",\"updatedAt\":\"2023-12-06T13:14:52.000Z\",\"preschool_id\":1}','{\"id\":13,\"stationary_name\":\"Ruler\",\"quantity_available\":4,\"createdAt\":\"2023-12-06T13:14:52.000Z\",\"updatedAt\":\"2023-12-06T13:15:04.093Z\",\"preschool_id\":1}','2023-12-06 16:15:04','2023-12-06 16:15:04','2023-12-06 16:15:04',18),(30,'Stationary Deletion','{\"id\":13,\"stationary_name\":\"Ruler\",\"quantity_available\":4,\"createdAt\":\"2023-12-06T13:14:52.000Z\",\"updatedAt\":\"2023-12-06T13:15:04.000Z\",\"preschool_id\":1}','Stationary deleted','2023-12-06 16:17:09','2023-12-06 16:17:09','2023-12-06 16:17:09',18),(31,'Stationary Req Creation','{\"status_name\":\"Pending\",\"staff_id\":2,\"stationary_id\":4,\"requested_quantity\":2,\"notes\":\"kkk\",\"preschool_id\":1}','{\"status_name\":\"Pending\",\"staff_id\":2,\"stationary_id\":4,\"requested_quantity\":2,\"notes\":\"kkk\",\"preschool_id\":1}','2023-12-06 16:26:36','2023-12-06 16:26:36','2023-12-06 16:26:36',18),(32,'Stationary Req Deletion','{\"id\":24,\"status_name\":\"Pending\",\"preschool_id\":1,\"staff_id\":2,\"stationary_id\":4,\"requested_quantity\":4,\"notes\":\"kkkjjj\",\"createdAt\":\"2023-12-06T13:26:36.000Z\",\"updatedAt\":\"2023-12-06T13:28:28.000Z\"}','Stationary Req deleted','2023-12-06 16:29:36','2023-12-06 16:29:36','2023-12-06 16:29:36',18),(33,'Stationary Req Update','{\"id\":23,\"status_name\":\"Pending\",\"preschool_id\":1,\"staff_id\":2,\"stationary_id\":8,\"requested_quantity\":2,\"notes\":\"????\",\"createdAt\":\"2023-12-03T04:55:47.000Z\",\"updatedAt\":\"2023-12-06T13:29:44.000Z\"}','{\"id\":23,\"status_name\":\"Pending\",\"preschool_id\":1,\"staff_id\":2,\"stationary_id\":8,\"requested_quantity\":2,\"notes\":\"????jn\",\"createdAt\":\"2023-12-03T04:55:47.000Z\",\"updatedAt\":\"2023-12-06T13:30:53.555Z\"}','2023-12-06 16:30:53','2023-12-06 16:30:53','2023-12-06 16:30:53',18),(34,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student name is required\"}','2023-12-06 23:35:13','2023-12-06 23:35:13','2023-12-06 23:35:13',18),(35,'Error','{\"student_name\":\"fatoomi\",\"DOB\":\"2024-01-16\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"CPR is required\"}','2023-12-06 23:36:02','2023-12-06 23:36:02','2023-12-06 23:36:02',18),(36,'Error','{\"student_name\":\"fatoomi\",\"DOB\":\"2024-01-16\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"32323232\",\"contact_number2\":\"32323232\",\"guardian_name\":\"as\",\"enrollment_date\":\"2023-12-06\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\"}','{\"error\":\"DOB must be between 2018 and 2023\"}','2023-12-06 23:36:41','2023-12-06 23:36:41','2023-12-06 23:36:41',18),(37,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"Alnoor\",\"supervisor\":\"5\",\"classroom\":\"3\",\"capacity\":11}','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"Alnoor\",\"supervisor\":\"5\",\"classroom\":\"3\",\"capacity\":11}','2023-12-07 10:36:42','2023-12-07 10:36:42','2023-12-07 10:36:42',18),(38,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"Alsalaam\",\"supervisor\":\"16\",\"classroom\":\"2\",\"capacity\":10}','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"Alsalaam\",\"supervisor\":\"16\",\"classroom\":\"2\",\"capacity\":10}','2023-12-07 10:36:42','2023-12-07 10:36:42','2023-12-07 10:36:42',18),(39,'Student Update','{\"id\":44,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Maryam Mahmood\",\"grade\":\"KG2\",\"DOB\":\"2023-11-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":12345678,\"contact_number2\":12345678,\"guardian_name\":\"Fatema Ali\",\"enrollment_date\":\"2023-12-04T02:35:50.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"DB Tables.png\",\"certificate_of_birth\":\"Screenshot 2023-04-15 030619.png\",\"passport\":\"Screenshot 2023-04-15 030643.png\",\"hasConsent\":null,\"user_id\":26,\"createdAt\":\"2023-12-04T02:35:50.000Z\",\"updatedAt\":\"2023-12-04T02:35:50.000Z\"}','{\"id\":44,\"preschool_id\":1,\"class_id\":\"131\",\"student_name\":\"Maryam Mahmood\",\"grade\":\"KG2\",\"DOB\":\"2023-11-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":12345678,\"contact_number2\":12345678,\"guardian_name\":\"Fatema Ali\",\"enrollment_date\":\"2023-12-04T02:35:50.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"DB Tables.png\",\"certificate_of_birth\":\"Screenshot 2023-04-15 030619.png\",\"passport\":\"Screenshot 2023-04-15 030643.png\",\"hasConsent\":null,\"user_id\":26,\"createdAt\":\"2023-12-04T02:35:50.000Z\",\"updatedAt\":\"2023-12-07T07:37:09.325Z\"}','2023-12-07 10:37:09','2023-12-07 10:37:09','2023-12-07 10:37:09',18),(40,'Student Update','{\"id\":53,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Kawthar Ali\",\"grade\":\"KG2\",\"DOB\":\"2023-12-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32324545,\"contact_number2\":32324545,\"guardian_name\":\"Ahmed \",\"enrollment_date\":\"2023-12-14T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:03:27.000Z\",\"updatedAt\":\"2023-12-05T20:03:27.000Z\"}','{\"id\":53,\"preschool_id\":1,\"class_id\":\"131\",\"student_name\":\"Kawthar Ali\",\"grade\":\"KG2\",\"DOB\":\"2023-12-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32324545,\"contact_number2\":32324545,\"guardian_name\":\"Ahmed \",\"enrollment_date\":\"2023-12-14T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:03:27.000Z\",\"updatedAt\":\"2023-12-07T07:37:10.312Z\"}','2023-12-07 10:37:10','2023-12-07 10:37:10','2023-12-07 10:37:10',18),(41,'Student Update','{\"id\":51,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Sara Salman\",\"grade\":\"KG2\",\"DOB\":\"2023-12-11T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Salman Ahmed\",\"enrollment_date\":\"2023-12-26T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"rightArrow.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"Kawthar.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T19:42:57.000Z\",\"updatedAt\":\"2023-12-05T19:42:57.000Z\"}','{\"id\":51,\"preschool_id\":1,\"class_id\":\"132\",\"student_name\":\"Sara Salman\",\"grade\":\"KG2\",\"DOB\":\"2023-12-11T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Salman Ahmed\",\"enrollment_date\":\"2023-12-26T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"rightArrow.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"Kawthar.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T19:42:57.000Z\",\"updatedAt\":\"2023-12-07T07:37:11.121Z\"}','2023-12-07 10:37:11','2023-12-07 10:37:11','2023-12-07 10:37:11',18),(42,'Student Update','{\"id\":51,\"preschool_id\":1,\"class_id\":132,\"student_name\":\"Sara Salman\",\"grade\":\"KG2\",\"DOB\":\"2023-12-11T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Salman Ahmed\",\"enrollment_date\":\"2023-12-26T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"rightArrow.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"Kawthar.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T19:42:57.000Z\",\"updatedAt\":\"2023-12-07T07:37:11.000Z\"}','{\"id\":51,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Sara Salman\",\"grade\":\"KG2\",\"DOB\":\"2023-12-11T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Salman Ahmed\",\"enrollment_date\":\"2023-12-26T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"rightArrow.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"Kawthar.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T19:42:57.000Z\",\"updatedAt\":\"2023-12-07T07:55:44.041Z\"}','2023-12-07 10:55:44','2023-12-07 10:55:44','2023-12-07 10:55:44',18),(43,'Student Update','{\"id\":44,\"preschool_id\":1,\"class_id\":131,\"student_name\":\"Maryam Mahmood\",\"grade\":\"KG2\",\"DOB\":\"2023-11-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":12345678,\"contact_number2\":12345678,\"guardian_name\":\"Fatema Ali\",\"enrollment_date\":\"2023-12-04T02:35:50.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"DB Tables.png\",\"certificate_of_birth\":\"Screenshot 2023-04-15 030619.png\",\"passport\":\"Screenshot 2023-04-15 030643.png\",\"hasConsent\":null,\"user_id\":26,\"createdAt\":\"2023-12-04T02:35:50.000Z\",\"updatedAt\":\"2023-12-07T07:37:09.000Z\"}','{\"id\":44,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Maryam Mahmood\",\"grade\":\"KG2\",\"DOB\":\"2023-11-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":12345678,\"contact_number2\":12345678,\"guardian_name\":\"Fatema Ali\",\"enrollment_date\":\"2023-12-04T02:35:50.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"DB Tables.png\",\"certificate_of_birth\":\"Screenshot 2023-04-15 030619.png\",\"passport\":\"Screenshot 2023-04-15 030643.png\",\"hasConsent\":null,\"user_id\":26,\"createdAt\":\"2023-12-04T02:35:50.000Z\",\"updatedAt\":\"2023-12-07T07:56:09.981Z\"}','2023-12-07 10:56:10','2023-12-07 10:56:10','2023-12-07 10:56:10',18),(44,'Student Update','{\"id\":53,\"preschool_id\":1,\"class_id\":131,\"student_name\":\"Kawthar Ali\",\"grade\":\"KG2\",\"DOB\":\"2023-12-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32324545,\"contact_number2\":32324545,\"guardian_name\":\"Ahmed \",\"enrollment_date\":\"2023-12-14T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:03:27.000Z\",\"updatedAt\":\"2023-12-07T07:37:10.000Z\"}','{\"id\":53,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Kawthar Ali\",\"grade\":\"KG2\",\"DOB\":\"2023-12-22T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32324545,\"contact_number2\":32324545,\"guardian_name\":\"Ahmed \",\"enrollment_date\":\"2023-12-14T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:03:27.000Z\",\"updatedAt\":\"2023-12-07T07:59:36.648Z\"}','2023-12-07 10:59:36','2023-12-07 10:59:36','2023-12-07 10:59:36',18),(45,'Student Update','{\"id\":39,\"preschool_id\":1,\"class_id\":110,\"student_name\":\"Sulaiman Ahmed .\",\"grade\":\"KG1\",\"DOB\":\"2021-10-19T00:00:00.000Z\",\"CPR\":332233221,\"contact_number1\":32321233,\"contact_number2\":32321233,\"guardian_name\":\"Hassan Redha\",\"enrollment_date\":\"2023-11-21T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Apple.png\",\"certificate_of_birth\":\"Slider.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:10:01.000Z\",\"updatedAt\":\"2023-12-06T12:20:01.000Z\"}','{\"id\":39,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Sulaiman Ahmed .\",\"grade\":\"KG1\",\"DOB\":\"2021-10-19T00:00:00.000Z\",\"CPR\":332233221,\"contact_number1\":32321233,\"contact_number2\":32321233,\"guardian_name\":\"Hassan Redha\",\"enrollment_date\":\"2023-11-21T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Apple.png\",\"certificate_of_birth\":\"Slider.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:10:01.000Z\",\"updatedAt\":\"2023-12-07T07:59:59.182Z\"}','2023-12-07 10:59:59','2023-12-07 10:59:59','2023-12-07 10:59:59',18),(46,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"132\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:09:20','2023-12-07 11:09:20','2023-12-07 11:09:20',18),(47,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"132\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:14:43','2023-12-07 11:14:43','2023-12-07 11:14:43',18),(48,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"132\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:27:46','2023-12-07 11:27:46','2023-12-07 11:27:46',18),(49,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"132\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:28:24','2023-12-07 11:28:24','2023-12-07 11:28:24',18),(50,'Student Update','{\"id\":33,\"preschool_id\":1,\"class_id\":111,\"student_name\":\"ali raed\",\"grade\":\"KG2\",\"DOB\":\"2020-11-27T21:00:00.000Z\",\"CPR\":776677661,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"ali saeed\",\"enrollment_date\":\"2022-10-27T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Kawthar.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":25,\"createdAt\":\"2023-11-28T17:47:25.000Z\",\"updatedAt\":\"2023-12-01T11:17:23.000Z\"}','{\"id\":33,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"ali raed\",\"grade\":\"KG2\",\"DOB\":\"2020-11-27T21:00:00.000Z\",\"CPR\":776677661,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"ali saeed\",\"enrollment_date\":\"2022-10-27T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Kawthar.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":25,\"createdAt\":\"2023-11-28T17:47:25.000Z\",\"updatedAt\":\"2023-12-07T08:31:24.964Z\"}','2023-12-07 11:31:25','2023-12-07 11:31:25','2023-12-07 11:31:25',18),(51,'Student Update','{\"id\":29,\"preschool_id\":1,\"class_id\":111,\"student_name\":\"ahlam\",\"grade\":\"KG2\",\"DOB\":\"2022-10-17T21:00:00.000Z\",\"CPR\":221122332,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Ahmed Sami\",\"enrollment_date\":\"2023-11-05T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"Kawthar.png\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:46:49.000Z\",\"updatedAt\":\"2023-12-01T11:17:26.000Z\"}','{\"id\":29,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"ahlam\",\"grade\":\"KG2\",\"DOB\":\"2022-10-17T21:00:00.000Z\",\"CPR\":221122332,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Ahmed Sami\",\"enrollment_date\":\"2023-11-05T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"Kawthar.png\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:46:49.000Z\",\"updatedAt\":\"2023-12-07T08:31:44.220Z\"}','2023-12-07 11:31:44','2023-12-07 11:31:44','2023-12-07 11:31:44',18),(52,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"111\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:38:41','2023-12-07 11:38:41','2023-12-07 11:38:41',18),(53,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"111\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:39:39','2023-12-07 11:39:39','2023-12-07 11:39:39',18),(54,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"111\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:40:05','2023-12-07 11:40:05','2023-12-07 11:40:05',18),(55,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"111\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:40:54','2023-12-07 11:40:54','2023-12-07 11:40:54',18),(56,'Student Update','{\"id\":27,\"preschool_id\":1,\"class_id\":111,\"student_name\":\"Zahraa\",\"grade\":\"KG2\",\"DOB\":\"2022-01-27T21:00:00.000Z\",\"CPR\":191919192,\"contact_number1\":33443355,\"contact_number2\":33443355,\"guardian_name\":\"Ali Rami\",\"enrollment_date\":\"2023-11-12T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:42:31.000Z\",\"updatedAt\":\"2023-12-01T11:17:26.000Z\"}','{\"id\":27,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Zahraa\",\"grade\":\"KG2\",\"DOB\":\"2022-01-27T21:00:00.000Z\",\"CPR\":191919192,\"contact_number1\":33443355,\"contact_number2\":33443355,\"guardian_name\":\"Ali Rami\",\"enrollment_date\":\"2023-11-12T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:42:31.000Z\",\"updatedAt\":\"2023-12-07T08:41:22.011Z\"}','2023-12-07 11:41:22','2023-12-07 11:41:22','2023-12-07 11:41:22',18),(57,'Error','{\"DOB\":null,\"enrollment_date\":null}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:42:50','2023-12-07 11:42:50','2023-12-07 11:42:50',18),(58,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"111\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:55:16','2023-12-07 11:55:16','2023-12-07 11:55:16',18),(59,'Error','{\"DOB\":null,\"enrollment_date\":null,\"class_id\":\"111\"}','{\"error\":\"notNull Violation: DOB is required,\\nnotNull Violation: Enrollment date is required\"}','2023-12-07 11:56:34','2023-12-07 11:56:34','2023-12-07 11:56:34',18),(60,'Student Update','{\"id\":33,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"ali raed\",\"grade\":\"KG2\",\"DOB\":\"2020-11-27T21:00:00.000Z\",\"CPR\":776677661,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"ali saeed\",\"enrollment_date\":\"2022-10-27T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Kawthar.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":25,\"createdAt\":\"2023-11-28T17:47:25.000Z\",\"updatedAt\":\"2023-12-07T08:31:24.000Z\"}','{\"id\":33,\"preschool_id\":1,\"class_id\":\"111\",\"student_name\":\"ali raed\",\"grade\":\"KG2\",\"DOB\":\"2020-11-27T21:00:00.000Z\",\"CPR\":776677661,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"ali saeed\",\"enrollment_date\":\"2022-10-27T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Kawthar.png\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":25,\"createdAt\":\"2023-11-28T17:47:25.000Z\",\"updatedAt\":\"2023-12-07T08:59:59.149Z\"}','2023-12-07 11:59:59','2023-12-07 11:59:59','2023-12-07 11:59:59',18),(61,'Student Update','{\"id\":68,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Fatema Merza\",\"grade\":\"KG1\",\"DOB\":\"2021-06-06T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-06T06:41:39.000Z\",\"updatedAt\":\"2023-12-06T06:43:57.000Z\"}','{\"id\":68,\"preschool_id\":1,\"class_id\":\"27\",\"student_name\":\"Fatema Merza\",\"grade\":\"KG1\",\"DOB\":\"2021-06-06T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-06T06:41:39.000Z\",\"updatedAt\":\"2023-12-07T10:11:12.904Z\"}','2023-12-07 13:11:13','2023-12-07 13:11:13','2023-12-07 13:11:13',18),(62,'Student Update','{\"id\":39,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Sulaiman Ahmed .\",\"grade\":\"KG1\",\"DOB\":\"2021-10-19T00:00:00.000Z\",\"CPR\":332233221,\"contact_number1\":32321233,\"contact_number2\":32321233,\"guardian_name\":\"Hassan Redha\",\"enrollment_date\":\"2023-11-21T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Apple.png\",\"certificate_of_birth\":\"Slider.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:10:01.000Z\",\"updatedAt\":\"2023-12-07T07:59:59.000Z\"}','{\"id\":39,\"preschool_id\":1,\"class_id\":\"27\",\"student_name\":\"Sulaiman Ahmed .\",\"grade\":\"KG1\",\"DOB\":\"2021-10-19T00:00:00.000Z\",\"CPR\":332233221,\"contact_number1\":32321233,\"contact_number2\":32321233,\"guardian_name\":\"Hassan Redha\",\"enrollment_date\":\"2023-11-21T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Apple.png\",\"certificate_of_birth\":\"Slider.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:10:01.000Z\",\"updatedAt\":\"2023-12-07T10:12:14.162Z\"}','2023-12-07 13:12:14','2023-12-07 13:12:14','2023-12-07 13:12:14',18),(63,'Student Update','{\"id\":29,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"ahlam\",\"grade\":\"KG2\",\"DOB\":\"2022-10-17T21:00:00.000Z\",\"CPR\":221122332,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Ahmed Sami\",\"enrollment_date\":\"2023-11-05T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"Kawthar.png\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:46:49.000Z\",\"updatedAt\":\"2023-12-07T08:31:44.000Z\"}','{\"id\":29,\"preschool_id\":1,\"class_id\":\"27\",\"student_name\":\"ahlam\",\"grade\":\"KG2\",\"DOB\":\"2022-10-17T21:00:00.000Z\",\"CPR\":221122332,\"contact_number1\":33221122,\"contact_number2\":33221122,\"guardian_name\":\"Ahmed Sami\",\"enrollment_date\":\"2023-11-05T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"Kawthar.png\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:46:49.000Z\",\"updatedAt\":\"2023-12-07T11:33:25.982Z\"}','2023-12-07 14:33:26','2023-12-07 14:33:26','2023-12-07 14:33:26',18),(64,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"Alnoor\",\"supervisor\":\"16\",\"classroom\":\"15\",\"capacity\":5}','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"Alnoor\",\"supervisor\":\"16\",\"classroom\":\"15\",\"capacity\":5}','2023-12-07 15:55:12','2023-12-07 15:55:12','2023-12-07 15:55:12',18),(65,'Student Update','{\"id\":40,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-06T07:22:15.000Z\"}','{\"id\":40,\"preschool_id\":1,\"class_id\":\"133\",\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-07T12:55:31.151Z\"}','2023-12-07 15:55:31','2023-12-07 15:55:31','2023-12-07 15:55:31',18),(66,'Student Update','{\"id\":49,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Manar Mohammed\",\"grade\":\"KG1\",\"DOB\":\"2020-06-09T21:00:00.000Z\",\"CPR\":205204780,\"contact_number1\":36985214,\"contact_number2\":36985214,\"guardian_name\":\"Fatema Ahmed\",\"enrollment_date\":\"2023-12-04T13:52:03.000Z\",\"medical_history\":\"nothing\",\"gender\":\"Female\",\"personal_picture\":\"e5e27c61-3865-42f4-813e-5edd0b7b3c2f.jpeg\",\"certificate_of_birth\":\"47be2854-74eb-4511-99ad-6a84e7b4a696.jpeg\",\"passport\":\"6f0db12c-956a-4c53-80b7-af4d954d5834.jpeg\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-04T13:52:03.000Z\",\"updatedAt\":\"2023-12-04T13:52:03.000Z\"}','{\"id\":49,\"preschool_id\":1,\"class_id\":\"133\",\"student_name\":\"Manar Mohammed\",\"grade\":\"KG1\",\"DOB\":\"2020-06-09T21:00:00.000Z\",\"CPR\":205204780,\"contact_number1\":36985214,\"contact_number2\":36985214,\"guardian_name\":\"Fatema Ahmed\",\"enrollment_date\":\"2023-12-04T13:52:03.000Z\",\"medical_history\":\"nothing\",\"gender\":\"Female\",\"personal_picture\":\"e5e27c61-3865-42f4-813e-5edd0b7b3c2f.jpeg\",\"certificate_of_birth\":\"47be2854-74eb-4511-99ad-6a84e7b4a696.jpeg\",\"passport\":\"6f0db12c-956a-4c53-80b7-af4d954d5834.jpeg\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-04T13:52:03.000Z\",\"updatedAt\":\"2023-12-07T12:55:32.157Z\"}','2023-12-07 15:55:32','2023-12-07 15:55:32','2023-12-07 15:55:32',18),(67,'Class Update','{\"id\":133,\"class_name\":\"Alnoor\",\"preschool_id\":1,\"supervisor\":16,\"grade\":\"KG1\",\"capacity\":5,\"classroom\":\"15\",\"createdAt\":\"2023-12-07T12:55:13.000Z\",\"updatedAt\":\"2023-12-07T12:55:13.000Z\"}','{\"id\":133,\"class_name\":\"Alnoor\",\"preschool_id\":1,\"supervisor\":16,\"grade\":\"KG1\",\"capacity\":\"1\",\"classroom\":\"15\",\"createdAt\":\"2023-12-07T12:55:13.000Z\",\"updatedAt\":\"2023-12-07T12:56:15.585Z\"}','2023-12-07 15:56:15','2023-12-07 15:56:15','2023-12-07 15:56:15',18),(68,'Class Deletion','{\"id\":133,\"class_name\":\"Alnoor\",\"preschool_id\":1,\"supervisor\":16,\"grade\":\"KG1\",\"capacity\":1,\"classroom\":\"15\",\"createdAt\":\"2023-12-07T12:55:13.000Z\",\"updatedAt\":\"2023-12-07T12:56:15.000Z\"}','Class deleted','2023-12-07 15:56:38','2023-12-07 15:56:38','2023-12-07 15:56:38',18),(69,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student name is required\"}','2023-12-08 14:03:10','2023-12-08 14:03:10','2023-12-08 14:03:10',18),(70,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student name is required\"}','2023-12-08 14:03:13','2023-12-08 14:03:13','2023-12-08 14:03:13',18),(71,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student name is required\"}','2023-12-08 14:03:24','2023-12-08 14:03:24','2023-12-08 14:03:24',18),(72,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student name is required\"}','2023-12-08 14:04:22','2023-12-08 14:04:22','2023-12-08 14:04:22',18),(73,'Error','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":21107335,\"phone\":39867456,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"preschool_id\":1}','\"CPR must be a 9-digit integer\"','2023-12-08 23:47:15','2023-12-08 23:47:15','2023-12-08 23:47:15',17),(74,'Error','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":21107335,\"phone\":39867456,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"preschool_id\":1}','\"CPR must be a 9-digit integer\"','2023-12-08 23:47:51','2023-12-08 23:47:51','2023-12-08 23:47:51',17),(75,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":39867456,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":39867456,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"preschool_id\":1}','2023-12-08 23:48:17','2023-12-08 23:48:17','2023-12-08 23:48:17',17),(76,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-08 23:52:12','2023-12-08 23:52:12','2023-12-08 23:52:12',17),(77,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"preschool_id\":1}','2023-12-08 23:52:33','2023-12-08 23:52:33','2023-12-08 23:52:33',17),(78,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"f6em.2011@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"f6em.2011@gmail.com\",\"preschool_id\":1}','2023-12-08 23:52:56','2023-12-08 23:52:56','2023-12-08 23:52:56',17),(79,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"fatema.marhoon@outlook.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"fatema.marhoon@outlook.com\",\"preschool_id\":1}','2023-12-08 23:53:41','2023-12-08 23:53:41','2023-12-08 23:53:41',17),(80,'Staff Deletion','{\"id\":19,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"202000513@student.polytechnic.bh\",\"createdAt\":\"2023-12-08T20:52:33.000Z\",\"updatedAt\":\"2023-12-08T20:52:33.000Z\"}','Staff deleted','2023-12-08 23:55:35','2023-12-08 23:55:35','2023-12-08 23:55:35',17),(81,'Staff Deletion','{\"id\":21,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"fatema.marhoon@outlook.com\",\"createdAt\":\"2023-12-08T20:53:41.000Z\",\"updatedAt\":\"2023-12-08T20:53:41.000Z\"}','Staff deleted','2023-12-08 23:56:36','2023-12-08 23:56:36','2023-12-08 23:56:36',17),(82,'Staff Deletion','{\"id\":20,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"f6em.2011@gmail.com\",\"createdAt\":\"2023-12-08T20:52:57.000Z\",\"updatedAt\":\"2023-12-08T20:52:57.000Z\"}','Staff deleted','2023-12-08 23:56:42','2023-12-08 23:56:42','2023-12-08 23:56:42',17),(83,'Error','{\"status_name\":\"Pending\",\"staff_id\":2,\"stationary_id\":\"\",\"requested_quantity\":0,\"notes\":\"\",\"preschool_id\":1}','{\"error\":\"stationary_id is required\"}','2023-12-08 23:59:00','2023-12-08 23:59:00','2023-12-08 23:59:00',17),(84,'Error','{\"status_name\":\"Pending\",\"staff_id\":2,\"stationary_id\":\"\",\"requested_quantity\":0,\"notes\":\"\",\"preschool_id\":1}','{\"error\":\"stationary_id is required\"}','2023-12-08 23:59:03','2023-12-08 23:59:03','2023-12-08 23:59:03',17),(85,'Error','{\"status_name\":\"Pending\",\"staff_id\":2,\"stationary_id\":\"\",\"requested_quantity\":0,\"notes\":\"\",\"preschool_id\":1}','{\"error\":\"stationary_id is required\"}','2023-12-08 23:59:13','2023-12-08 23:59:13','2023-12-08 23:59:13',17),(86,'Stationary Creation','{\"stationary_name\":\"\",\"quantity_available\":0,\"preschool_id\":1}','{\"stationary_name\":\"\",\"quantity_available\":0,\"preschool_id\":1}','2023-12-08 23:59:24','2023-12-08 23:59:24','2023-12-08 23:59:24',17),(87,'Error','{\"stationary_name\":\"\",\"quantity_available\":0,\"preschool_id\":1}','{\"error\":\"Validation error: Stationary name cannot be empty\"}','2023-12-08 23:59:24','2023-12-08 23:59:24','2023-12-08 23:59:24',17),(88,'Staff Deletion','{\"id\":18,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"AA\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-08T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-08T20:52:13.000Z\",\"updatedAt\":\"2023-12-08T20:52:13.000Z\"}','Staff deleted','2023-12-08 23:59:40','2023-12-08 23:59:40','2023-12-08 23:59:40',17),(89,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 11:05:24','2023-12-09 11:05:24','2023-12-09 11:05:24',17),(90,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 11:07:27','2023-12-09 11:07:27','2023-12-09 11:07:27',17),(91,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"fatima.marhoon5@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"fatima.marhoon5@gmail.com\",\"preschool_id\":1}','2023-12-09 11:07:52','2023-12-09 11:07:52','2023-12-09 11:07:52',17),(92,'Staff Deletion','{\"id\":23,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-09T08:07:28.000Z\",\"updatedAt\":\"2023-12-09T08:07:28.000Z\"}','Staff deleted','2023-12-09 11:09:02','2023-12-09 11:09:02','2023-12-09 11:09:02',17),(93,'Staff Deletion','{\"id\":24,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33224433,\"hire_date\":\"2023-12-28T00:00:00.000Z\",\"email\":\"fatima.marhoon5@gmail.com\",\"createdAt\":\"2023-12-09T08:07:53.000Z\",\"updatedAt\":\"2023-12-09T08:07:53.000Z\"}','Staff deleted','2023-12-09 11:09:08','2023-12-09 11:09:08','2023-12-09 11:09:08',17),(94,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33445566,\"hire_date\":\"2023-12-25T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Marhoon\",\"CPR\":123456789,\"phone\":33445566,\"hire_date\":\"2023-12-25T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 11:09:35','2023-12-09 11:09:35','2023-12-09 11:09:35',17),(95,'Class Update','{\"id\":27,\"class_name\":\"Alward\",\"preschool_id\":1,\"supervisor\":10,\"grade\":\"KG2\",\"capacity\":10,\"classroom\":\"12\",\"createdAt\":\"2023-11-23T05:09:27.000Z\",\"updatedAt\":\"2023-12-07T12:48:04.000Z\"}','{\"id\":27,\"class_name\":\"Alward\",\"preschool_id\":1,\"supervisor\":10,\"grade\":\"KG2\",\"capacity\":\"4\",\"classroom\":\"12\",\"createdAt\":\"2023-11-23T05:09:27.000Z\",\"updatedAt\":\"2023-12-09T09:06:10.246Z\"}','2023-12-09 12:06:10','2023-12-09 12:06:10','2023-12-09 12:06:10',18),(96,'Student Update','{\"id\":27,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Zahraa\",\"grade\":\"KG2\",\"DOB\":\"2022-01-27T21:00:00.000Z\",\"CPR\":191919192,\"contact_number1\":33443355,\"contact_number2\":33443355,\"guardian_name\":\"Ali Rami\",\"enrollment_date\":\"2023-11-12T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:42:31.000Z\",\"updatedAt\":\"2023-12-07T08:41:22.000Z\"}','{\"id\":27,\"preschool_id\":1,\"class_id\":\"27\",\"student_name\":\"Zahraa\",\"grade\":\"KG2\",\"DOB\":\"2022-01-27T21:00:00.000Z\",\"CPR\":191919192,\"contact_number1\":33443355,\"contact_number2\":33443355,\"guardian_name\":\"Ali Rami\",\"enrollment_date\":\"2023-11-12T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":false,\"user_id\":null,\"createdAt\":\"2023-11-28T15:42:31.000Z\",\"updatedAt\":\"2023-12-09T09:06:29.907Z\"}','2023-12-09 12:06:30','2023-12-09 12:06:30','2023-12-09 12:06:30',18),(97,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Mirza\",\"CPR\":123456798,\"phone\":33445566,\"hire_date\":\"2023-12-18T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Mirza\",\"CPR\":123456798,\"phone\":33445566,\"hire_date\":\"2023-12-18T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:29:54','2023-12-09 14:29:54','2023-12-09 14:29:54',17),(98,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Mirza\",\"CPR\":123456798,\"phone\":33445566,\"hire_date\":\"2023-12-18T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"Fatema Mirza\",\"CPR\":123456798,\"phone\":33445566,\"hire_date\":\"2023-12-18T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:32:39','2023-12-09 14:32:39','2023-12-09 14:32:39',17),(99,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"fattte\",\"CPR\":123456789,\"phone\":33446677,\"hire_date\":\"2023-12-12T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"fattte\",\"CPR\":123456789,\"phone\":33446677,\"hire_date\":\"2023-12-12T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:33:33','2023-12-09 14:33:33','2023-12-09 14:33:33',17),(100,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"fatemaaa\",\"CPR\":121212122,\"phone\":33112233,\"hire_date\":\"2023-12-12T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"fatemaaa\",\"CPR\":121212122,\"phone\":33112233,\"hire_date\":\"2023-12-12T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:37:15','2023-12-09 14:37:15','2023-12-09 14:37:15',17),(101,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"faaatemaaaaa\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-01T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"faaatemaaaaa\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-01T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:38:50','2023-12-09 14:38:50','2023-12-09 14:38:50',17),(102,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"faaatemaaaaa\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-01T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"faaatemaaaaa\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-01T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:43:02','2023-12-09 14:43:02','2023-12-09 14:43:02',17),(103,'Staff Creation','{\"staff_role_name\":\"Teacher\",\"name\":\"faaatemaaaaa\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-01T00:00:00.000Z\",\"email\":\"12marhoon@gmail.com\",\"preschool_id\":1}','{\"staff_role_name\":\"Teacher\",\"name\":\"faaatemaaaaa\",\"CPR\":123456789,\"phone\":33223322,\"hire_date\":\"2023-12-01T00:00:00.000Z\",\"email\":\"12marhoon@gmail.com\",\"preschool_id\":1}','2023-12-09 14:46:05','2023-12-09 14:46:05','2023-12-09 14:46:05',17),(104,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"Alnoor\",\"supervisor\":\"16\",\"classroom\":\"3\",\"capacity\":1}','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"Alnoor\",\"supervisor\":\"16\",\"classroom\":\"3\",\"capacity\":1}','2023-12-12 12:08:08','2023-12-12 12:08:08','2023-12-12 12:08:08',17),(105,'Class Deletion','{\"id\":134,\"class_name\":\"Alnoor\",\"preschool_id\":1,\"supervisor\":16,\"grade\":\"KG1\",\"capacity\":1,\"classroom\":\"3\",\"createdAt\":\"2023-12-12T09:08:08.000Z\",\"updatedAt\":\"2023-12-12T09:08:08.000Z\"}','Class deleted','2023-12-12 12:10:09','2023-12-12 12:10:09','2023-12-12 12:10:09',17),(106,'Request Creation','{\"preschool_name\":\"Al Kawthar\",\"representitive_name\":\"Kawthar Mohammed\",\"CR\":\"CR-985632\",\"phone\":\"+97332371545\",\"email\":\"k.alekri@outlook.com\",\"plan_id\":\"1\"}','{\"preschool_name\":\"Al Kawthar\",\"representitive_name\":\"Kawthar Mohammed\",\"CR\":\"CR-985632\",\"phone\":\"+97332371545\",\"email\":\"k.alekri@outlook.com\",\"plan_id\":\"1\"}','2023-12-12 13:58:05','2023-12-12 13:58:05','2023-12-12 13:58:05',17),(107,'Request Creation','{\"preschool_name\":\"Alnoor\",\"representitive_name\":\"Maryam Taraif\",\"CR\":\"CR-54615\",\"phone\":\"36985214\",\"email\":\"aloor@gmail.com\",\"plan_id\":\"2\"}','{\"preschool_name\":\"Alnoor\",\"representitive_name\":\"Maryam Taraif\",\"CR\":\"CR-54615\",\"phone\":\"36985214\",\"email\":\"aloor@gmail.com\",\"plan_id\":\"2\"}','2023-12-12 14:02:16','2023-12-12 14:02:16','2023-12-12 14:02:16',17),(108,'Application Update','{\"id\":61,\"email\":\"test@gmail.com\",\"preschool_id\":1,\"guardian_type\":\"Father\",\"status\":\"Accepted\",\"student_name\":\"Manar Mahmood\",\"student_CPR\":875985236,\"guardian_name\":\"Abdulla Isa\",\"phone\":\"62626985\",\"gender\":\"Female\",\"grade\":\"KG2\",\"student_DOB\":\"2023-11-18T21:00:00.000Z\",\"medical_history\":\"-\",\"personal_picture\":\"Screenshot 2023-04-13 001957.png\",\"certificate_of_birth\":\"Screenshot 2023-04-13 001655.png\",\"passport\":\"Screenshot 2023-04-13 001824.png\",\"createdAt\":\"2023-11-28T07:18:07.000Z\",\"updatedAt\":\"2023-11-28T07:18:07.000Z\",\"created_by\":17}','{\"id\":61,\"email\":\"test@gmail.com\",\"preschool_id\":1,\"guardian_type\":\"Father\",\"status\":\"Accepted\",\"student_name\":\"Manar Mahmood\",\"student_CPR\":875985236,\"guardian_name\":\"Abdulla Isa\",\"phone\":\"62626985\",\"gender\":\"Female\",\"grade\":\"KG2\",\"student_DOB\":\"2023-11-18T21:00:00.000Z\",\"medical_history\":\"-\",\"personal_picture\":\"Screenshot 2023-04-13 001957.png\",\"certificate_of_birth\":\"Screenshot 2023-04-13 001655.png\",\"passport\":\"Screenshot 2023-04-13 001824.png\",\"createdAt\":\"2023-11-28T07:18:07.000Z\",\"updatedAt\":\"2023-12-12T12:19:17.775Z\",\"created_by\":17}','2023-12-12 15:19:18','2023-12-12 15:19:18','2023-12-12 15:19:18',17),(109,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"efef\",\"supervisor\":\"16\",\"classroom\":\"12\",\"capacity\":25}','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"efef\",\"supervisor\":\"16\",\"classroom\":\"12\",\"capacity\":25}','2023-12-12 15:34:00','2023-12-12 15:34:00','2023-12-12 15:34:00',17),(110,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"aasa\",\"supervisor\":\"16\",\"classroom\":\"12\",\"capacity\":23}','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"aasa\",\"supervisor\":\"16\",\"classroom\":\"12\",\"capacity\":23}','2023-12-12 15:34:00','2023-12-12 15:34:00','2023-12-12 15:34:00',17),(111,'Student Update','{\"id\":45,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Sara Mohd Ali\",\"grade\":\"KG1\",\"DOB\":\"2023-12-03T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32324343,\"contact_number2\":32113211,\"guardian_name\":\"Mohd Ali\",\"enrollment_date\":\"2023-12-04T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-04T12:31:56.000Z\",\"updatedAt\":\"2023-12-04T12:31:56.000Z\"}','{\"id\":45,\"preschool_id\":1,\"class_id\":\"135\",\"student_name\":\"Sara Mohd Ali\",\"grade\":\"KG1\",\"DOB\":\"2023-12-03T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32324343,\"contact_number2\":32113211,\"guardian_name\":\"Mohd Ali\",\"enrollment_date\":\"2023-12-04T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-04T12:31:56.000Z\",\"updatedAt\":\"2023-12-12T12:34:39.041Z\"}','2023-12-12 15:34:39','2023-12-12 15:34:39','2023-12-12 15:34:39',17),(112,'Student Update','{\"id\":50,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Salma Ali\",\"grade\":\"KG1\",\"DOB\":\"2023-12-19T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Ali Saleh\",\"enrollment_date\":\"2023-12-21T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T19:40:33.000Z\",\"updatedAt\":\"2023-12-05T19:40:33.000Z\"}','{\"id\":50,\"preschool_id\":1,\"class_id\":\"135\",\"student_name\":\"Salma Ali\",\"grade\":\"KG1\",\"DOB\":\"2023-12-19T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Ali Saleh\",\"enrollment_date\":\"2023-12-21T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"IMG_2818.jpg\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T19:40:33.000Z\",\"updatedAt\":\"2023-12-12T12:34:40.082Z\"}','2023-12-12 15:34:40','2023-12-12 15:34:40','2023-12-12 15:34:40',17),(113,'Student Update','{\"id\":40,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-07T12:55:31.000Z\"}','{\"id\":40,\"preschool_id\":1,\"class_id\":\"136\",\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-12T12:34:40.938Z\"}','2023-12-12 15:34:41','2023-12-12 15:34:41','2023-12-12 15:34:41',17),(114,'Student Update','{\"id\":55,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Yaseen Sami\",\"grade\":\"KG1\",\"DOB\":\"2023-12-02T00:00:00.000Z\",\"CPR\":987654321,\"contact_number1\":12345679,\"contact_number2\":12345679,\"guardian_name\":\"Yaseen Ahmed\",\"enrollment_date\":\"2023-12-09T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:15:45.000Z\",\"updatedAt\":\"2023-12-05T20:15:45.000Z\"}','{\"id\":55,\"preschool_id\":1,\"class_id\":\"136\",\"student_name\":\"Yaseen Sami\",\"grade\":\"KG1\",\"DOB\":\"2023-12-02T00:00:00.000Z\",\"CPR\":987654321,\"contact_number1\":12345679,\"contact_number2\":12345679,\"guardian_name\":\"Yaseen Ahmed\",\"enrollment_date\":\"2023-12-09T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:15:45.000Z\",\"updatedAt\":\"2023-12-12T12:34:41.809Z\"}','2023-12-12 15:34:41','2023-12-12 15:34:41','2023-12-12 15:34:41',17),(115,'Student Update','{\"id\":56,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Salem Ali\",\"grade\":\"KG1\",\"DOB\":\"2023-12-11T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Ali Ahmed\",\"enrollment_date\":\"2023-12-18T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:19:46.000Z\",\"updatedAt\":\"2023-12-05T20:19:46.000Z\"}','{\"id\":56,\"preschool_id\":1,\"class_id\":\"136\",\"student_name\":\"Salem Ali\",\"grade\":\"KG1\",\"DOB\":\"2023-12-11T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Ali Ahmed\",\"enrollment_date\":\"2023-12-18T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Male\",\"personal_picture\":\"Use Case Model.png\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-05T20:19:46.000Z\",\"updatedAt\":\"2023-12-12T12:35:22.158Z\"}','2023-12-12 15:35:22','2023-12-12 15:35:22','2023-12-12 15:35:22',17),(116,'Error','{\"student_name\":\"fatemaaaa\",\"DOB\":\"2023-12-26\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"CPR is required\"}','2023-12-12 23:25:56','2023-12-12 23:25:56','2023-12-12 23:25:56',17),(117,'Error','{\"student_name\":\"fatemaaaa\",\"DOB\":\"2023-12-26\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"33223322\",\"contact_number2\":\"33223322\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"Female\"}','{\"error\":\"guardian name is required\"}','2023-12-12 23:26:21','2023-12-12 23:26:21','2023-12-12 23:26:21',17),(118,'Error','{\"student_name\":\"fatemaaaa\",\"DOB\":\"2023-12-26\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"33223322\",\"contact_number2\":\"33223322\",\"guardian_name\":\"frrrrrrrrr\",\"enrollment_date\":\"2023-12-19\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"Female\"}','{\"error\":\"medical history is required\"}','2023-12-12 23:26:42','2023-12-12 23:26:42','2023-12-12 23:26:42',17),(119,'Error','{\"student_name\":\"fatemaaaa\",\"DOB\":\"2023-12-26\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"33223322\",\"contact_number2\":\"33223322\",\"guardian_name\":\"frrrrrrrrr\",\"enrollment_date\":\"2023-12-19\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-12 23:28:01','2023-12-12 23:28:01','2023-12-12 23:28:01',17),(120,'Error','{\"student_name\":\"fatemaaaa\",\"DOB\":\"2023-12-26\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"33223322\",\"contact_number2\":\"33223322\",\"guardian_name\":\"frrrrrrrrr\",\"enrollment_date\":\"2023-12-19\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-12 23:28:30','2023-12-12 23:28:30','2023-12-12 23:28:30',17),(121,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"testtttttt\",\"supervisor\":\"32\",\"classroom\":\"33\",\"capacity\":1}','{\"preschool_id\":1,\"grade\":\"KG2\",\"class_name\":\"testtttttt\",\"supervisor\":\"32\",\"classroom\":\"33\",\"capacity\":1}','2023-12-12 23:42:51','2023-12-12 23:42:51','2023-12-12 23:42:51',17),(122,'Class Creation','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"knknknnk\",\"supervisor\":\"32\",\"classroom\":\"3\",\"capacity\":2}','{\"preschool_id\":1,\"grade\":\"KG1\",\"class_name\":\"knknknnk\",\"supervisor\":\"32\",\"classroom\":\"3\",\"capacity\":2}','2023-12-12 23:48:57','2023-12-12 23:48:57','2023-12-12 23:48:57',17),(123,'Application Creation','{\"email\":\"yousif@gmail.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Marwa Yusif\",\"guardian_name\":\"Yousif Ahmed\",\"student_CPR\":\"210498402\",\"phone\":\"32651498\",\"student_DOB\":\"2021-04-02T00:00:00.000Z\",\"medical_history\":\"nothing\",\"created_by\":\"17\",\"gender\":\"Female\",\"grade\":\"KG2\",\"certificate_of_birth\":\"id.png\",\"passport\":\"NEW PASSPORT.jpg\",\"personal_picture\":\"kawthar photo.png\"}','{\"email\":\"yousif@gmail.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Marwa Yusif\",\"guardian_name\":\"Yousif Ahmed\",\"student_CPR\":\"210498402\",\"phone\":\"32651498\",\"student_DOB\":\"2021-04-02T00:00:00.000Z\",\"medical_history\":\"nothing\",\"created_by\":\"17\",\"gender\":\"Female\",\"grade\":\"KG2\",\"certificate_of_birth\":\"id.png\",\"passport\":\"NEW PASSPORT.jpg\",\"personal_picture\":\"kawthar photo.png\"}','2023-12-15 10:25:28','2023-12-15 10:25:28','2023-12-15 10:25:28',17),(124,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 14:06:40','2023-12-15 14:06:40','2023-12-15 14:06:40',39),(125,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 14:48:06','2023-12-15 14:48:06','2023-12-15 14:48:06',39),(126,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 14:49:43','2023-12-15 14:49:43','2023-12-15 14:49:43',39),(127,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Jenan\",\"guardian_name\":\"Muneer\",\"student_CPR\":\"509876543\",\"phone\":\"12345678\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 14:52:10','2023-12-15 14:52:10','2023-12-15 14:52:10',39),(128,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Ali Muneer\",\"guardian_name\":\"Muneer Mahdi\",\"student_CPR\":\"232456374\",\"phone\":\"39292226\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"male\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"image_picker_B8F104E8-30B5-4AA0-BA6F-B95CD6A054EA-80176-00006B9B449B5E06.jpg\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Ali Muneer\",\"guardian_name\":\"Muneer Mahdi\",\"student_CPR\":\"232456374\",\"phone\":\"39292226\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"male\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"image_picker_B8F104E8-30B5-4AA0-BA6F-B95CD6A054EA-80176-00006B9B449B5E06.jpg\"}','2023-12-15 19:24:09','2023-12-15 19:24:09','2023-12-15 19:24:09',39),(129,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Ali Muneer\",\"guardian_name\":\"Muneer Mahdi\",\"student_CPR\":\"232456374\",\"phone\":\"39292226\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"male\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"image_picker_B8F104E8-30B5-4AA0-BA6F-B95CD6A054EA-80176-00006B9B449B5E06.jpg\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Ali Muneer\",\"guardian_name\":\"Muneer Mahdi\",\"student_CPR\":\"232456374\",\"phone\":\"39292226\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"male\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"image_picker_B8F104E8-30B5-4AA0-BA6F-B95CD6A054EA-80176-00006B9B449B5E06.jpg\"}','2023-12-15 19:29:01','2023-12-15 19:29:01','2023-12-15 19:29:01',39),(130,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Ali Muneer\",\"guardian_name\":\"Muneer Mahdi\",\"student_CPR\":\"232456374\",\"phone\":\"39292226\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"male\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"image_picker_B8F104E8-30B5-4AA0-BA6F-B95CD6A054EA-80176-00006B9B449B5E06.jpg\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"Ali Muneer\",\"guardian_name\":\"Muneer Mahdi\",\"student_CPR\":\"232456374\",\"phone\":\"39292226\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"-\",\"created_by\":\"39\",\"gender\":\"male\",\"grade\":\"KG1\",\"certificate_of_birth\":\"IMG_0002.png.JPG\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"image_picker_B8F104E8-30B5-4AA0-BA6F-B95CD6A054EA-80176-00006B9B449B5E06.jpg\"}','2023-12-15 19:31:46','2023-12-15 19:31:46','2023-12-15 19:31:46',39),(131,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 21:13:24','2023-12-15 21:13:24','2023-12-15 21:13:24',39),(132,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 21:32:21','2023-12-15 21:32:21','2023-12-15 21:32:21',39),(133,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 21:33:23','2023-12-15 21:33:23','2023-12-15 21:33:23',39),(134,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 21:35:30','2023-12-15 21:35:30','2023-12-15 21:35:30',39),(135,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 21:40:55','2023-12-15 21:40:55','2023-12-15 21:40:55',39),(136,'Application Creation','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','{\"email\":\"not@crying.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Father\",\"status\":\"Pending\",\"student_name\":\"yyyyyyy\",\"guardian_name\":\"bhb\",\"student_CPR\":\"123456789\",\"phone\":\"68780807\",\"student_DOB\":\"2023-12-15T00:00:00.000\",\"medical_history\":\"bj\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"image_picker_FD7A7609-1B3B-4F27-9F58-A6AA3037B99C-80176-00006EEC4C5032E5.jpg\",\"passport\":\"IMG_0002.png.JPG\",\"personal_picture\":\"IMG_0002.png.JPG\"}','2023-12-15 21:58:16','2023-12-15 21:58:16','2023-12-15 21:58:16',39),(137,'Staff Update','{\"id\":11,\"preschool_id\":1,\"user_id\":null,\"staff_role_name\":\"Administrative Staff\",\"name\":\"Amna Alawi\",\"CPR\":123456789,\"phone\":32323232,\"hire_date\":\"2023-12-26T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:27:45.000Z\",\"updatedAt\":\"2023-12-04T13:27:45.000Z\"}','{\"id\":11,\"preschool_id\":1,\"user_id\":41,\"staff_role_name\":\"Administrative Staff\",\"name\":\"Amna Alawi\",\"CPR\":123456789,\"phone\":32323232,\"hire_date\":\"2023-12-26T00:00:00.000Z\",\"email\":\"ifatima.marhoon@gmail.com\",\"createdAt\":\"2023-12-04T13:27:45.000Z\",\"updatedAt\":\"2023-12-16T15:12:34.622Z\"}','2023-12-16 18:12:34','2023-12-16 18:12:34','2023-12-16 18:12:34',17),(138,'Error','{\"id\":2,\"preschool_id\":1,\"user_id\":42,\"staff_role_name\":\"Teacher\",\"name\":\"Nawra\",\"CPR\":21010020,\"phone\":33223322,\"hire_date\":\"2023-11-08T08:30:30.000Z\",\"email\":\"n@gmail.com\",\"createdAt\":\"2023-11-08T08:35:42.000Z\",\"updatedAt\":\"2023-11-15T16:58:22.000Z\",\"Preschool\":{\"id\":1,\"preschool_name\":\"Alrayaheen\",\"plan_id\":3,\"request_id\":1,\"subscription_expiry_date\":\"2024-11-21T13:58:11.000Z\",\"minimum_age\":3,\"maximum_age\":5,\"monthly_fees\":65,\"cirriculum\":\"Learning through playing\",\"registration_fees\":85,\"phone\":\"39904800\",\"email\":\"alrayaheen@gmail.com\",\"logo\":\"Screenshot 2023-12-10 211225.png\",\"representitive_name\":\"Nafeesa Alasfoor\",\"description\":null,\"CR\":\"CR98651\",\"createdAt\":\"2023-11-05T18:35:26.000Z\",\"updatedAt\":\"2023-12-10T18:12:43.000Z\"}}','\"CPR must be a 9-digit integer\"','2023-12-18 23:25:51','2023-12-18 23:25:51','2023-12-18 23:25:51',17),(139,'Application Creation','{\"email\":\"Zainab@gmail.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Grandparent\",\"status\":\"Pending\",\"student_name\":\"hhgg\",\"guardian_name\":\"The only \",\"student_CPR\":\"555555555\",\"phone\":\"55555599\",\"student_DOB\":\"2023-12-20T00:00:00.000\",\"medical_history\":\"gggg\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"Passport.png .JPG\",\"passport\":\"Med-certificate.png.JPG\",\"personal_picture\":\"Personal-picture.png.JPG\"}','{\"email\":\"Zainab@gmail.com\",\"preschool_id\":\"1\",\"guardian_type\":\"Grandparent\",\"status\":\"Pending\",\"student_name\":\"hhgg\",\"guardian_name\":\"The only \",\"student_CPR\":\"555555555\",\"phone\":\"55555599\",\"student_DOB\":\"2023-12-20T00:00:00.000\",\"medical_history\":\"gggg\",\"created_by\":\"39\",\"gender\":\"female\",\"grade\":\"KG1\",\"certificate_of_birth\":\"Passport.png .JPG\",\"passport\":\"Med-certificate.png.JPG\",\"personal_picture\":\"Personal-picture.png.JPG\"}','2023-12-20 18:01:39','2023-12-20 18:01:39','2023-12-20 18:01:39',39),(140,'Application Update','{\"id\":57,\"email\":\"test@gmail.com\",\"preschool_id\":1,\"guardian_type\":\"Father\",\"status\":\"Rejected\",\"student_name\":\"Nader Ahmed\",\"student_CPR\":85204780,\"guardian_name\":\"Isa Isa\",\"phone\":36985214,\"gender\":\"Male\",\"grade\":\"KG1\",\"student_DOB\":\"2023-11-02T00:00:00.000Z\",\"medical_history\":\"-\",\"personal_picture\":\"Screenshot 2023-04-13 001732.png\",\"certificate_of_birth\":\"Screenshot 2023-04-13 001655.png\",\"passport\":\"Screenshot 2023-04-06 225214.png\",\"createdAt\":\"2023-11-27T21:29:36.000Z\",\"updatedAt\":\"2023-11-27T21:29:36.000Z\",\"created_by\":17}','{\"id\":57,\"email\":\"test@gmail.com\",\"preschool_id\":1,\"guardian_type\":\"Father\",\"status\":\"Rejected\",\"student_name\":\"Nader Ahmed\",\"student_CPR\":85204780,\"guardian_name\":\"Isa Isa\",\"phone\":36985214,\"gender\":\"Male\",\"grade\":\"KG1\",\"student_DOB\":\"2023-11-02T00:00:00.000Z\",\"medical_history\":\"-\",\"personal_picture\":\"Screenshot 2023-04-13 001732.png\",\"certificate_of_birth\":\"Screenshot 2023-04-13 001655.png\",\"passport\":\"Screenshot 2023-04-06 225214.png\",\"createdAt\":\"2023-11-27T21:29:36.000Z\",\"updatedAt\":\"2023-12-25T18:57:52.900Z\",\"created_by\":17}','2023-12-25 18:57:53','2023-12-25 18:57:53','2023-12-25 18:57:53',17),(141,'Application Update','{\"id\":57,\"email\":\"test@gmail.com\",\"preschool_id\":1,\"guardian_type\":\"Father\",\"status\":\"Cancelled\",\"student_name\":\"Nader Ahmed\",\"student_CPR\":85204780,\"guardian_name\":\"Isa Isa\",\"phone\":36985214,\"gender\":\"Male\",\"grade\":\"KG1\",\"student_DOB\":\"2023-11-02T00:00:00.000Z\",\"medical_history\":\"-\",\"personal_picture\":\"Screenshot 2023-04-13 001732.png\",\"certificate_of_birth\":\"Screenshot 2023-04-13 001655.png\",\"passport\":\"Screenshot 2023-04-06 225214.png\",\"createdAt\":\"2023-11-27T21:29:36.000Z\",\"updatedAt\":\"2023-12-25T18:57:52.000Z\",\"created_by\":17}','{\"id\":57,\"email\":\"test@gmail.com\",\"preschool_id\":1,\"guardian_type\":\"Father\",\"status\":\"Cancelled\",\"student_name\":\"Nader Ahmed\",\"student_CPR\":85204780,\"guardian_name\":\"Isa Isa\",\"phone\":36985214,\"gender\":\"Male\",\"grade\":\"KG1\",\"student_DOB\":\"2023-11-02T00:00:00.000Z\",\"medical_history\":\"-\",\"personal_picture\":\"Screenshot 2023-04-13 001732.png\",\"certificate_of_birth\":\"Screenshot 2023-04-13 001655.png\",\"passport\":\"Screenshot 2023-04-06 225214.png\",\"createdAt\":\"2023-11-27T21:29:36.000Z\",\"updatedAt\":\"2023-12-25T19:08:29.248Z\",\"created_by\":17}','2023-12-25 19:08:29','2023-12-25 19:08:29','2023-12-25 19:08:29',17);
/*!40000 ALTER TABLE `Logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id` (`user_id`),
  CONSTRAINT `Notifications_user_id_foreign_idx` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
INSERT INTO `Notifications` VALUES (3,'Congratulations!','Your application has been accepted. Please pay any pending fees.',0,'2023-12-06 01:18:14','2023-12-06 01:18:14',NULL),(4,'Congratulations!','Your application has been accepted. Please pay any pending fees.',0,'2023-12-06 01:19:34','2023-12-06 01:19:34',NULL),(5,'Congratulations!','Your application has been accepted. Please pay any pending fees.',0,'2023-12-06 01:47:44','2023-12-06 01:47:44',NULL),(6,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 19:28:19','2023-12-07 19:28:19',18),(7,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 19:29:28','2023-12-07 19:29:28',18),(8,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 22:04:19','2023-12-07 22:04:19',18),(9,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 22:06:31','2023-12-07 22:06:31',18),(10,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 22:10:21','2023-12-07 22:10:21',18),(11,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 22:11:23','2023-12-07 22:11:23',18),(12,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 22:59:37','2023-12-07 22:59:37',18),(13,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 23:00:40','2023-12-07 23:00:40',18),(14,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 23:12:37','2023-12-07 23:12:37',18),(15,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 23:16:41','2023-12-07 23:16:41',18),(16,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 23:19:38','2023-12-07 23:19:38',18),(17,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 23:33:45','2023-12-07 23:33:45',18),(18,'Test web socket','sending noification usin postman and websocket',0,'2023-12-07 23:36:49','2023-12-07 23:36:49',18),(19,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 06:12:13','2023-12-08 06:12:13',18),(20,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 06:12:45','2023-12-08 06:12:45',18),(21,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 06:14:34','2023-12-08 06:14:34',18),(22,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 06:16:10','2023-12-08 06:16:10',18),(23,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 06:19:48','2023-12-08 06:19:48',18),(24,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 06:20:56','2023-12-08 06:20:56',18),(25,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 07:28:04','2023-12-08 07:28:04',18),(26,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 07:47:59','2023-12-08 07:47:59',18),(27,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 08:23:11','2023-12-08 08:23:11',19),(28,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 08:25:29','2023-12-08 08:25:29',19),(29,'Test web socket','sending noification usin postman and websocket',0,'2023-12-08 08:26:07','2023-12-08 08:26:07',19),(30,'Test web socket','sending noification using postman and websocket',0,'2023-12-08 08:26:27','2023-12-08 08:26:27',18),(31,'New Event Added','National Day will be celebrated on the 14th of December!',1,'2023-12-08 08:54:58','2023-12-19 04:36:25',17),(32,'New Event Added','National Day will be celebrated on the 14th of December!',1,'2023-12-08 08:57:47','2023-12-19 04:36:25',17),(33,'New Event Added','National Day will be celebrated on the 14th of December!',1,'2023-12-08 08:58:16','2023-12-19 04:36:25',17),(34,'New Event Added','National Day will be celebrated on the 14th of December!',1,'2023-12-08 09:12:38','2023-12-19 04:36:25',17),(35,'New Event Added','National Day will be celebrated on the 14th of December!',1,'2023-12-08 09:15:30','2023-12-19 04:36:25',17),(36,'New Event Added','National Day will be celebrated on the 14th of December!',1,'2023-12-08 09:29:35','2023-12-19 04:36:25',17),(37,'Appointment Reminder','You\'ve an upcoming appointment after 30 mins.',1,'2023-12-08 15:11:11','2023-12-19 04:36:25',17),(38,'Appointment Reminder','You\'ve an upcoming appointment after 30 mins.',0,'2023-12-08 15:11:50','2023-12-08 15:11:50',18),(39,'Appointment Reminder','You\'ve an upcoming appointment after 30 mins.',0,'2023-12-08 15:12:08','2023-12-08 15:12:08',18),(40,'Upcoming Event','This is a reminder that you have a scheduled event \"Bahraini Women\'s Day\" for tommorrow.',1,'2023-12-08 23:16:03','2023-12-19 04:36:25',17),(41,'Upcoming Event','This is a reminder that you have a scheduled event \"Bahraini Women\'s Day\" for tommorrow.',0,'2023-12-08 23:16:03','2023-12-08 23:16:03',19),(42,'Upcoming Event','This is a reminder that you have a scheduled event \"Bahraini Women\'s Day\" for tommorrow.',1,'2023-12-08 23:27:03','2023-12-19 04:36:25',17),(43,'Upcoming Event','This is a reminder that you have a scheduled event \"Bahraini Women\'s Day\" for tommorrow.',0,'2023-12-08 23:27:03','2023-12-08 23:27:03',19),(44,'Upcoming Event','This is a reminder that you have a scheduled event \"Bahraini Women\'s Day\" for tommorrow.',1,'2023-12-08 23:30:02','2023-12-19 04:36:25',17),(45,'Upcoming Event','This is a reminder that you have a scheduled event \"Bahraini Women\'s Day\" for tommorrow.',0,'2023-12-08 23:30:02','2023-12-08 23:30:02',19),(46,'Test For Popup :(','Just wanted to see the pop-up again!',1,'2023-12-08 23:39:54','2023-12-19 04:36:25',17),(47,'Test For Popup :(','Just wanted to see the pop-up again!',1,'2023-12-08 23:40:23','2023-12-19 04:36:25',17),(48,'Test For Popup :(','Just wanted to see the pop-up again!',1,'2023-12-08 23:56:16','2023-12-19 04:36:25',17),(49,'Test For Popup :(','Just wanted to see the pop-up again!',1,'2023-12-09 00:15:04','2023-12-19 04:36:25',17),(50,'Test For notifying red icon :(','Just wanted to see the pop-up again!',1,'2023-12-09 00:19:09','2023-12-19 04:36:25',17),(51,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:36:23','2023-12-12 11:36:23',NULL),(52,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:38:17','2023-12-12 11:38:17',NULL),(53,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:38:44','2023-12-12 11:38:44',NULL),(54,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:39:20','2023-12-12 11:39:20',NULL),(55,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:39:52','2023-12-12 11:39:52',NULL),(56,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:40:39','2023-12-12 11:40:39',NULL),(57,'Payment Reminder','You have pending payments, please reiew and act accordingly.',0,'2023-12-12 11:50:58','2023-12-12 11:50:58',NULL),(58,'Payment Reminder','You have pending payments, please reiew and act accordingly.',1,'2023-12-12 15:24:11','2023-12-19 04:36:25',17),(59,'Upcoming Appoinment ','Reminder: You have a scheduled appointment for applicant: yyyyyyy after 30 mins.',0,'2023-12-19 07:30:02','2023-12-19 07:30:02',17),(60,'Upcoming Event','This is a reminder that you have a scheduled event \"test after update\" for tommorrow.',0,'2023-12-25 16:25:06','2023-12-25 16:25:06',17),(61,'Upcoming Event','This is a reminder that you have a scheduled event \"test after update\" for tommorrow.',0,'2023-12-25 16:25:07','2023-12-25 16:25:07',19),(62,'Upcoming Event','This is a reminder that you have a scheduled event \"test after update\" for tommorrow.',0,'2023-12-25 16:25:08','2023-12-25 16:25:08',38),(63,'Upcoming Event','This is a reminder that you have a scheduled event \"test after update\" for tommorrow.',0,'2023-12-25 16:25:10','2023-12-25 16:25:10',17),(64,'Upcoming Event','This is a reminder that you have a scheduled event \"test after update\" for tommorrow.',0,'2023-12-25 16:25:11','2023-12-25 16:25:11',19),(65,'Upcoming Event','This is a reminder that you have a scheduled event \"test after update\" for tommorrow.',0,'2023-12-25 16:25:12','2023-12-25 16:25:12',38),(66,'Overdue Payment','Monthly Fees is now overdue. Please settle it promptly. Thank you!',0,'2023-12-25 16:37:05','2023-12-25 16:37:05',30),(67,'Overdue Payment','Monthly Fees is now overdue. Please settle it promptly. Thank you!',0,'2023-12-25 16:37:07','2023-12-25 16:37:07',30),(68,'Overdue Payment','Monthly Fees is now overdue. Please settle it promptly. Thank you!',0,'2023-12-25 16:50:06','2023-12-25 16:50:06',30),(69,'Overdue Payment','Monthly Fees is now overdue. Please settle it promptly. Thank you!',0,'2023-12-25 16:50:07','2023-12-25 16:50:07',30);
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payments`
--

DROP TABLE IF EXISTS `Payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `fees` double DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `paid_on` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_student_id` (`student_id`),
  CONSTRAINT `Payments_student_id_foreign_idx` FOREIGN KEY (`student_id`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
INSERT INTO `Payments` VALUES (3,'Paid','Registration Fees',85,'2023-12-04 16:52:04','Registration Fees','2023-12-04 22:35:00','2023-12-04 16:52:04','2023-12-04 22:35:00',49),(4,'Paid','Registration Fees',100,'2023-12-04 16:01:35',NULL,'2023-12-07 00:03:13','2023-12-04 16:01:35','2023-12-07 00:03:13',38),(5,'Overdue','Registration Fees',0,'2023-12-06 03:00:00','nothing',NULL,'2023-12-05 01:30:43','2023-12-25 16:50:02',30),(6,'Paid','Monthly Fees',70,'2023-12-12 03:10:02',NULL,'2023-12-05 18:54:51','2023-12-05 03:10:02','2023-12-05 18:54:51',27),(8,'Overdue','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-25 16:50:02',29),(9,'Overdue','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-25 16:50:02',30),(10,'Paid','Monthly Fees',65,'2023-12-12 03:12:02',NULL,'2023-12-09 04:56:14','2023-12-05 03:12:02','2023-12-09 04:56:14',33),(11,'Overdue','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-25 16:50:02',34),(12,'Overdue','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-25 16:50:02',35),(13,'Overdue','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-25 16:50:02',36),(14,'Overdue','Monthly Fees',65,'2023-12-12 03:12:03',NULL,NULL,'2023-12-05 03:12:03','2023-12-25 16:50:02',37),(15,'Overdue','Monthly Fees',65,'2023-12-12 03:12:03',NULL,NULL,'2023-12-05 03:12:03','2023-12-25 16:50:02',38),(16,'Overdue','Monthly Fees',65,'2023-12-12 03:12:03',NULL,NULL,'2023-12-05 03:12:03','2023-12-25 16:50:02',39),(17,'Paid','Monthly Fees',65,'2023-12-12 03:14:02',NULL,'2023-12-25 16:51:21','2023-12-05 03:14:02','2023-12-25 16:51:21',27),(18,'Overdue','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-25 16:50:02',29),(19,'Overdue','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-25 16:50:02',30),(20,'Paid','Monthly Fees',65,'2023-12-12 03:14:02',NULL,'2023-12-09 05:34:20','2023-12-05 03:14:02','2023-12-09 05:34:20',33),(21,'Overdue','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-25 16:50:02',34),(22,'Overdue','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-25 16:50:02',35),(23,'Overdue','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-25 16:50:02',36),(24,'Overdue','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-25 16:50:02',37),(25,'Overdue','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-25 16:50:02',38),(26,'Overdue','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-25 16:50:02',39),(27,'Overdue','Monthly Fees',65,'2023-12-12 03:17:02',NULL,NULL,'2023-12-05 03:17:02','2023-12-25 16:50:02',27),(28,'Overdue','Monthly Fees',65,'2023-12-12 03:17:02',NULL,NULL,'2023-12-05 03:17:02','2023-12-25 16:50:02',29),(29,'Overdue','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-25 16:50:02',30),(30,'Overdue','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-25 16:50:02',33),(31,'Overdue','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-25 16:50:02',34),(32,'Overdue','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-25 16:50:02',35),(33,'Overdue','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-25 16:50:02',36),(34,'Overdue','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-25 16:50:02',37),(35,'Overdue','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-25 16:50:02',38),(36,'Overdue','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-25 16:50:02',39),(37,'Overdue','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-25 16:50:02',40),(38,'Overdue','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-25 16:50:02',44),(39,'Overdue','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-25 16:50:02',45),(40,'Overdue','Monthly Fees',65,'2023-12-12 03:17:05',NULL,NULL,'2023-12-05 03:17:05','2023-12-25 16:50:02',49),(41,'Overdue','Monthly Fees',65,'2023-12-12 03:18:01',NULL,NULL,'2023-12-05 03:18:01','2023-12-25 16:50:02',27),(42,'Overdue','Monthly Fees',65,'2023-12-12 03:18:01',NULL,NULL,'2023-12-05 03:18:01','2023-12-25 16:50:02',29),(43,'Overdue','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-25 16:50:02',30),(44,'Paid','Monthly Fees',65,'2023-12-12 03:18:02',NULL,'2023-12-09 03:25:27','2023-12-05 03:18:02','2023-12-09 03:25:27',33),(45,'Overdue','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-25 16:50:02',34),(46,'Overdue','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-25 16:50:02',35),(47,'Overdue','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-25 16:50:02',36),(48,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',37),(49,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',38),(50,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',39),(51,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',40),(52,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',44),(53,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',45),(54,'Overdue','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-25 16:50:02',49),(55,'Overdue','Monthly Fees',65,'2023-12-12 03:22:01',NULL,NULL,'2023-12-05 03:22:01','2023-12-25 16:50:02',27),(57,'Overdue','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-25 16:50:02',30),(58,'Paid','Monthly Fees',65,'2023-12-12 03:22:02',NULL,'2023-12-09 02:58:10','2023-12-05 03:22:02','2023-12-09 02:58:10',33),(59,'Overdue','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-25 16:50:02',34),(60,'Overdue','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-25 16:50:02',35),(61,'Overdue','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-25 16:50:02',36),(62,'Overdue','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-25 16:50:02',37),(63,'Overdue','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-25 16:50:02',38),(64,'Overdue','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-25 16:50:02',39),(65,'Overdue','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-25 16:50:02',40),(66,'Paid','Monthly Fees',65,'2023-12-12 03:22:03',NULL,'2023-12-24 21:35:41','2023-12-05 03:22:03','2023-12-24 21:35:41',44),(67,'Overdue','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-25 16:50:02',45),(68,'Overdue','Monthly Fees',65,'2023-12-12 03:22:04',NULL,NULL,'2023-12-05 03:22:04','2023-12-25 16:50:02',49),(79,'Paid','Registration Fees',85,'2023-12-12 15:19:18','Registration Fees','2023-12-21 04:10:00','2023-12-12 15:19:18','2023-12-21 04:10:00',69);
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preschool_Media`
--

DROP TABLE IF EXISTS `Preschool_Media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preschool_Media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Preschool_Media_preschool_id_foreign_idx` (`preschool_id`),
  CONSTRAINT `Preschool_Media_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preschool_Media`
--

LOCK TABLES `Preschool_Media` WRITE;
/*!40000 ALTER TABLE `Preschool_Media` DISABLE KEYS */;
INSERT INTO `Preschool_Media` VALUES (4,'Screenshot 2023-12-10 210202.png','2023-12-10 21:07:47','2023-12-10 21:07:47',1),(5,'Screenshot 2023-12-10 210211.png','2023-12-10 21:07:47','2023-12-10 21:07:47',1),(6,'Screenshot 2023-12-10 210426.png','2023-12-10 21:07:47','2023-12-10 21:07:47',1),(7,'Screenshot 2023-12-10 210509.png','2023-12-10 21:07:47','2023-12-10 21:07:47',1),(8,'Screenshot 2023-12-10 211431.png','2023-12-10 21:15:51','2023-12-10 21:15:51',1),(9,'Screenshot 2023-12-10 211458.png','2023-12-10 21:15:51','2023-12-10 21:15:51',1),(10,'Screenshot 2023-12-10 211531.png','2023-12-10 21:15:51','2023-12-10 21:15:51',1),(14,'Screenshot 2023-12-10 211741.png','2023-12-10 21:18:21','2023-12-10 21:18:21',1),(15,'Screenshot 2023-12-10 211839.png','2023-12-10 21:20:34','2023-12-10 21:20:34',1),(16,'Screenshot 2023-12-10 211906.png','2023-12-10 21:20:34','2023-12-10 21:20:34',1);
/*!40000 ALTER TABLE `Preschool_Media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preschools`
--

DROP TABLE IF EXISTS `Preschools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preschools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preschool_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `CR` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `representitive_name` varchar(255) DEFAULT NULL,
  `subscription_expiry_date` datetime DEFAULT NULL,
  `cirriculum` varchar(255) DEFAULT NULL,
  `minimum_age` int(11) DEFAULT NULL,
  `maximum_age` int(11) DEFAULT NULL,
  `monthly_fees` int(11) DEFAULT NULL,
  `registration_fees` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `request_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `preschools_request_id` (`request_id`),
  KEY `Preschools_plan_id_fk` (`plan_id`),
  CONSTRAINT `Preschools_plan_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `Subscription_Plans` (`id`),
  CONSTRAINT `Preschools_request_id_foreign_idx` FOREIGN KEY (`request_id`) REFERENCES `Requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preschools`
--

LOCK TABLES `Preschools` WRITE;
/*!40000 ALTER TABLE `Preschools` DISABLE KEYS */;
INSERT INTO `Preschools` VALUES (1,'Alrayaheen','39904800','alrayaheen@gmail.com','CR98651','Screenshot 2023-12-10 211225.png','Nafeesa Alasfoor','2024-11-21 16:58:11','Learning through playing',3,5,65,85,'Alrayaheen Preschool: Where playful minds soar! We nurture young learners through engaging activities, celebrating individuality, and transforming playtime into meaningful learning adventures. Join us and watch your child blossom!\r\n','2023-11-05 21:35:26','2023-12-10 21:12:43',1,3),(2,'Alef Kindergarten','33221122','','','',NULL,'2024-11-30 20:20:05','sleep and play, what\'s learning for 2yo kiddo ',2,5,80,100,NULL,'2023-11-09 17:20:05','2023-12-09 12:40:48',3,2),(6,'Sample Preschool',NULL,'','',NULL,NULL,NULL,'Math, Science, Arabic, English, Storytelling, Music and dance',NULL,NULL,NULL,NULL,NULL,'2023-11-15 18:55:02','2023-11-15 18:55:02',4,1),(28,'test3','33223322','test3@preschool.com','','',NULL,NULL,'tessst',1,4,40,20,NULL,'2023-11-26 21:01:52','2023-12-07 17:57:48',10,3),(34,'test3','33445566','ifatima.marhoon@gmail.com','CR32123',NULL,'FATEMA ALI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-06 20:53:00','2023-12-06 20:53:00',10,3),(35,'Anwaar Alghadeer','33221122','202000513@student.polytechnic.bh','CR23412',NULL,'Malaak',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-06 21:03:50','2023-12-06 21:03:50',8,1),(38,'Happy Kids Nursery','+9733659874','maryam@happykid.com','CR-789',NULL,'Maryam Sayed Ali Salman','2024-12-06 21:23:59','Math, Science, Arabic, English, Storytelling, Music and dance',NULL,NULL,NULL,NULL,NULL,'2023-12-06 21:23:59','2023-12-06 21:23:59',7,1),(39,'Al Kawthar','+97332371545','k.alekri@outlook.com','CR-985632',NULL,'Kawthar Mohammed','2024-12-12 15:28:26',NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-12 15:28:26','2023-12-12 15:28:26',11,1);
/*!40000 ALTER TABLE `Preschools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reports`
--

DROP TABLE IF EXISTS `Reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Reports_preschool_id_foreign_idx` (`preschool_id`),
  CONSTRAINT `Reports_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reports`
--

LOCK TABLES `Reports` WRITE;
/*!40000 ALTER TABLE `Reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Requests`
--

DROP TABLE IF EXISTS `Requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `preschool_name` varchar(255) NOT NULL,
  `representitive_name` varchar(255) NOT NULL,
  `CR` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `plan_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `requests_plan_id` (`plan_id`),
  CONSTRAINT `Requests_plan_id_foreign_idx` FOREIGN KEY (`plan_id`) REFERENCES `Subscription_Plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Requests`
--

LOCK TABLES `Requests` WRITE;
/*!40000 ALTER TABLE `Requests` DISABLE KEYS */;
INSERT INTO `Requests` VALUES (1,'Approved','Alrayaheen','Kawthar Mohammed Mahdi Alakri','CR178055','32371545','alrayaheen@gmail.com','2023-11-05 21:31:16','2023-12-04 17:00:36',2),(3,'Approved','Aldeyaa','Um taha','CR4567890','14567890','john.doe@example.com','2023-11-08 11:03:24','2023-11-08 11:03:24',1),(4,'Accepted','Sample Preschool','John Doe','CR4567890','14567890','john.doe@example.com','2023-11-08 11:04:22','2023-11-15 18:55:02',1),(5,'Accepted','Sample PreschoolTest','John Doe','CR4567890','14567890','john.doe@example.com','2023-11-08 11:08:41','2023-11-15 18:39:06',1),(6,'Accepted','Sample PreschoolTest','John Doe','CR4567890','14567890','john.doe@example.com','2023-11-08 11:12:49','2023-11-21 10:03:07',1),(7,'Approved','Happy Kids Nursery','Maryam Sayed Ali Salman','CR-789','+9733659874','maryam@happykid.com','2023-11-09 21:53:01','2023-12-06 21:23:58',1),(8,'Approved','Anwaar Alghadeer','Malaak','CR23412','33221122','202000513@student.polytechnic.bh','2023-11-11 12:08:04','2023-12-06 21:12:14',1),(9,'Accepted','tedt2','esraa','cr231312','22112233','e@gmail','2023-11-11 12:09:03','2023-11-27 11:46:45',2),(10,'Approved','test3','FATEMA ALI','CR32123','33445566','ifatima.marhoon@gmail.com','2023-11-11 12:10:00','2023-12-06 20:53:00',3),(11,'Approved','Al Kawthar','Kawthar Mohammed','CR-985632','+97332371545','k.alekri@outlook.com','2023-12-12 13:58:06','2023-12-12 15:28:25',1),(12,'Pending','Alnoor','Maryam Taraif','CR-54615','36985214','aloor@gmail.com','2023-12-12 14:02:17','2023-12-12 14:02:17',2);
/*!40000 ALTER TABLE `Requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20231101094445-create-user.js'),('20231101121927-create-preschool.js'),('20231102103118-create-payment.js'),('20231102103149-create-attendance.js'),('20231102103320-create-student-evaluation.js'),('20231102103353-create-student.js'),('20231102103451-create-report.js'),('20231102103524-create-event-class.js'),('20231102103614-create-class.js'),('20231102103637-create-attachment.js'),('20231102103722-create-stationary-request.js'),('20231102103820-create-event.js'),('20231102103842-create-staff.js'),('20231102103905-create-request.js'),('20231102104018-create-subscription-plan.js'),('20231102104055-create-address.js'),('20231102104115-create-stationary.js'),('20231102104119-add-foreign-keys.js'),('20231102110305-add-FKs.js'),('20231102112508-create-preschool-media.js'),('20231102113128-create-log.js'),('20231102113135-create-notification.js'),('20231102113204-create-application.js'),('20231102113226-create-application-evaluation.js'),('20231102113246-create-appointment.js'),('20231102113255-create-grade-capacity.js'),('20231102150744-create-static-values.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staffs`
--

DROP TABLE IF EXISTS `Staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staffs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_role_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `CPR` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `hire_date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Staffs_preschool_id_foreign_idx` (`preschool_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Staffs_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staffs`
--

LOCK TABLES `Staffs` WRITE;
/*!40000 ALTER TABLE `Staffs` DISABLE KEYS */;
INSERT INTO `Staffs` VALUES (1,'Teacher','Fatema',21010020,33223322,'2023-11-08 11:30:30','f@gmail.com','2023-11-08 11:30:30','2023-11-15 20:06:07',1,0),(2,'Teacher','Nawra',21010020,33223322,'2023-11-08 11:30:30','nawra.alhaji@gmail.com','2023-11-08 11:35:42','2023-11-15 19:58:22',1,42),(5,'Teacher','Maryam Ahmed',2030412,22222,'2023-11-07 00:00:00','maryam@gmail.com','2023-11-16 17:22:03','2023-11-16 17:22:03',1,0),(8,'Nurse','Samya Ahmed',112233445,33221122,'2023-11-29 00:00:00','samya@preschool.com','2023-11-29 10:17:14','2023-12-04 22:26:58',1,0),(9,'Cleaner','Anne Saw',123456789,33009911,'2023-11-20 00:00:00','anne@preschool.com','2023-11-29 10:18:23','2023-11-29 10:25:13',1,0),(10,'Teacher','Noura',123456789,33223322,'2023-11-30 00:00:00','ifatima.marhoon@gmail.com','2023-11-30 20:25:58','2023-11-30 20:25:58',1,27),(11,'Administrative Staff','Amna Alawi',123456789,32323232,'2023-12-26 03:00:00','ifatima.marhoon@gmail.com','2023-12-04 16:27:45','2023-12-16 18:12:34',1,41),(16,'Teacher','Ameena Ali',123456789,32324356,'2023-12-05 03:00:00','f6em.2011@gmail.com','2023-12-06 15:29:59','2023-12-06 15:29:59',1,NULL),(32,'Teacher','faaatemaaaaa',123456789,33223322,'2023-12-01 03:00:00','12marhoon@gmail.com','2023-12-09 14:46:06','2023-12-09 14:46:06',1,NULL);
/*!40000 ALTER TABLE `Staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Static_Values`
--

DROP TABLE IF EXISTS `Static_Values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Static_Values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) DEFAULT NULL,
  `ValueName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Static_Values`
--

LOCK TABLES `Static_Values` WRITE;
/*!40000 ALTER TABLE `Static_Values` DISABLE KEYS */;
INSERT INTO `Static_Values` VALUES (1,'Request Status','Pending','2023-11-02 15:25:19','2023-11-02 15:25:19'),(2,'Request Status','Approved','2023-11-02 15:25:19','2023-11-02 15:25:19'),(3,'Request Status','Declined','2023-11-02 15:25:19','2023-11-02 15:25:19'),(4,'Role','Parent','2023-11-02 15:25:19','2023-11-02 15:25:19'),(5,'Role','Teacher','2023-11-02 15:25:19','2023-11-02 15:25:19'),(6,'Role','Staff','2023-11-02 15:25:19','2023-11-02 15:25:19'),(7,'Role','Admin','2023-11-02 15:25:19','2023-11-02 15:25:19'),(8,'Role','Super Admin','2023-11-02 15:25:19','2023-11-02 15:25:19'),(9,'Guardian Type','Mother','2023-11-02 15:25:19','2023-11-02 15:25:19'),(10,'Guardian Type','Father','2023-11-02 15:25:19','2023-11-02 15:25:19'),(11,'Guardian Type','Grandparent','2023-11-02 15:25:19','2023-11-02 15:25:19'),(12,'Application Status','Pending','2023-11-02 15:28:04','2023-11-02 15:28:04'),(13,'Application Status','Waitlist','2023-11-02 15:28:04','2023-11-02 15:28:04'),(14,'Application Status','Accepted','2023-11-02 15:28:04','2023-11-02 15:28:04'),(15,'Application Status','Rejected','2023-11-02 15:28:04','2023-11-02 15:28:04'),(17,'Payment Status','Exempted','2023-11-02 15:29:09','2023-11-02 15:29:09'),(18,'Payment Status','Paid','2023-11-02 15:29:09','2023-11-02 15:29:09'),(19,'Payment Status','Pending','2023-11-02 15:29:09','2023-11-02 15:29:09'),(20,'Payment Status','Overdue','2023-11-02 15:29:09','2023-11-02 15:29:09'),(21,'Payment Type','Registration Fees','2023-11-02 15:29:59','2023-11-02 15:29:59'),(22,'Payment Type','Monthly Fees','2023-11-02 15:29:59','2023-11-02 15:29:59'),(23,'Attendance Status','Present','2023-11-02 15:29:59','2023-11-02 15:29:59'),(24,'Attendance Status','Late','2023-11-02 15:29:59','2023-11-02 15:29:59'),(25,'Attendance Status','Absent','2023-11-02 15:29:59','2023-11-02 15:29:59'),(26,'Gender','Female','2023-12-04 12:08:16','2023-12-04 12:08:16'),(27,'Gender','Male','2023-12-04 12:08:16','2023-12-04 12:08:16'),(28,'StaffRole','Teacher','2023-12-04 13:19:44','2023-12-04 13:19:44'),(29,'StaffRole','Nurse','2023-12-04 13:20:00','2023-12-04 13:20:00'),(30,'StaffRole','Cleaner','2023-12-04 13:20:13','2023-12-04 13:20:13'),(31,'StaffRole','Administrative Staff','2023-12-04 13:20:13','2023-12-04 13:20:13'),(32,'Payment Type','Trip Fees','2023-11-02 15:29:59','2023-11-02 15:29:59'),(33,'Payment Type','Activity Fees','2023-11-02 15:29:59','2023-11-02 15:29:59'),(34,'Payment Type','Other','2023-11-02 15:29:59','2023-11-02 15:29:59');
/*!40000 ALTER TABLE `Static_Values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stationaries`
--

DROP TABLE IF EXISTS `Stationaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stationaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stationary_name` varchar(255) DEFAULT NULL,
  `quantity_available` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Stationaries_preschool_id_foreign_idx` (`preschool_id`),
  CONSTRAINT `Stationaries_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stationaries`
--

LOCK TABLES `Stationaries` WRITE;
/*!40000 ALTER TABLE `Stationaries` DISABLE KEYS */;
INSERT INTO `Stationaries` VALUES (3,'Board Pens',10,'2023-11-08 11:23:00','2023-11-08 11:23:22',1),(4,'Board',1,'2023-11-11 18:14:17','2023-11-11 18:14:17',1),(5,'magic color',5,'2023-11-11 18:22:13','2023-11-11 18:22:13',1),(8,'Rulers',5,'2023-11-13 21:13:11','2023-11-13 21:13:25',1),(9,'Rubbers',100,'2023-11-21 09:27:29','2023-11-21 09:30:23',1),(11,'Clay',2,'2023-11-29 10:38:19','2023-11-29 10:38:19',1),(12,'Rulers',31,'2023-11-29 10:39:17','2023-11-29 10:49:51',1);
/*!40000 ALTER TABLE `Stationaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stationary_Requests`
--

DROP TABLE IF EXISTS `Stationary_Requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stationary_Requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  `requested_quantity` int(11) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `staff_id` int(11) NOT NULL,
  `stationary_id` int(11) NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Stationary_Requests_staff_id_foreign_idx` (`staff_id`),
  KEY `Stationary_Requests_stationary_id_foreign_idx` (`stationary_id`),
  KEY `Stationary_Requests_preschool_id_foreign_idx` (`preschool_id`) USING BTREE,
  CONSTRAINT `Stationary_Requests_staff_id_foreign_idx` FOREIGN KEY (`staff_id`) REFERENCES `Staffs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Stationary_Requests_stationary_id_foreign_idx` FOREIGN KEY (`stationary_id`) REFERENCES `Stationaries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stationary_Requests`
--

LOCK TABLES `Stationary_Requests` WRITE;
/*!40000 ALTER TABLE `Stationary_Requests` DISABLE KEYS */;
INSERT INTO `Stationary_Requests` VALUES (21,'Accepted',3,'-','2023-11-29 11:07:25','2023-12-04 17:04:26',2,4,1),(22,'Pending',1,'for class 1 ','2023-11-29 11:07:31','2023-11-29 11:49:14',2,4,1),(23,'Pending',2,'????jn','2023-12-03 07:55:47','2023-12-06 16:30:53',2,8,1);
/*!40000 ALTER TABLE `Stationary_Requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Evaluations`
--

DROP TABLE IF EXISTS `Student_Evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Evaluations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `neatness` int(11) DEFAULT NULL,
  `attentiveness` int(11) DEFAULT NULL,
  `communication` int(11) DEFAULT NULL,
  `emotional_intelligence` int(11) DEFAULT NULL,
  `comprehension` int(11) DEFAULT NULL,
  `grammatical_competence` int(11) DEFAULT NULL,
  `oral_communication` int(11) DEFAULT NULL,
  `sound_recognition` int(11) DEFAULT NULL,
  `reading_proficiency` int(11) DEFAULT NULL,
  `mathematics_proficiency` int(11) DEFAULT NULL,
  `islamic` int(11) DEFAULT NULL,
  `participation` int(11) DEFAULT NULL,
  `exploration` int(11) DEFAULT NULL,
  `arabic_writing_skills` int(11) DEFAULT NULL,
  `arabic_reading_skills` int(11) DEFAULT NULL,
  `arabic_listening_speaking_skills` int(11) DEFAULT NULL,
  `global_citizenship` int(11) DEFAULT NULL,
  `behavior` int(11) DEFAULT NULL,
  `punctuality` int(11) DEFAULT NULL,
  `confidence` int(11) DEFAULT NULL,
  `independence` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Student_Evaluations_student_id_foreign_idx` (`student_id`),
  CONSTRAINT `Student_Evaluations_student_id_foreign_idx` FOREIGN KEY (`student_id`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Evaluations`
--

LOCK TABLES `Student_Evaluations` WRITE;
/*!40000 ALTER TABLE `Student_Evaluations` DISABLE KEYS */;
INSERT INTO `Student_Evaluations` VALUES (4,100,67,67,67,67,67,67,67,67,67,67,67,67,67,67,99,92,99,87,85,97,'2023-12-18 09:05:45','2023-12-18 20:03:32',50),(5,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,'2023-12-18 10:58:41','2023-12-18 10:58:41',35),(6,100,100,87,90,100,93,94,89,65,67,67,67,67,67,67,99,92,99,87,85,97,'2023-12-18 16:06:52','2023-12-18 20:02:33',50),(7,88,109,88,92,85,90,88,92,85,90,88,92,85,90,88,85,90,88,85,90,88,'2023-12-18 17:56:27','2023-12-18 17:56:27',50),(8,99,99,99,99,99,90,88,92,85,90,88,92,85,90,88,85,90,88,85,90,88,'2023-12-18 18:22:46','2023-12-18 18:22:46',50),(9,1,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,0,'2023-12-18 18:32:00','2023-12-18 18:32:00',37),(10,188,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,0,'2023-12-18 19:27:32','2023-12-18 19:27:32',37),(11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'2023-12-18 21:24:35','2023-12-18 21:24:35',33),(12,4,4,4,313,4,4,4,4,4,4,4,4,4,4,4,44,4,4,4,4,0,'2023-12-21 18:53:02','2023-12-21 18:53:02',33);
/*!40000 ALTER TABLE `Student_Evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `CPR` int(11) DEFAULT NULL,
  `contact_number1` int(11) DEFAULT NULL,
  `contact_number2` int(11) DEFAULT NULL,
  `guardian_name` varchar(255) DEFAULT NULL,
  `enrollment_date` datetime DEFAULT NULL,
  `medical_history` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `preschool_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `grade` varchar(50) DEFAULT NULL,
  `personal_picture` varchar(255) DEFAULT NULL,
  `certificate_of_birth` varchar(255) DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `hasConsent` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Students_user_id_foreign_idx` (`user_id`),
  KEY `Students_preschool_id_foreign_idx` (`preschool_id`),
  KEY `Students_class_id_foreign_idx` (`class_id`),
  CONSTRAINT `Students_class_id_foreign_idx` FOREIGN KEY (`class_id`) REFERENCES `Classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Students_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Students_user_id_foreign_idx` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (27,'Zahraa','2022-01-28 00:00:00',191919192,33443355,33443355,'Ali Rami','2023-11-13 00:00:00','-','2023-11-28 18:42:31','2023-12-09 12:06:29',NULL,1,27,'Female','KG2','IMG_2818.jpg','IMG_2818.jpg','IMG_2818.jpg',0),(29,'ahlam','2022-10-18 00:00:00',221122332,33221122,33221122,'Ahmed Sami','2023-11-06 00:00:00','-','2023-11-28 18:46:49','2023-12-07 14:33:25',NULL,1,27,'Female','KG2','IMG_2818.jpg','Kawthar.png','IMG_2818.jpg',0),(30,'Fatema Ahmed','2022-01-31 00:00:00',221133445,33221133,33445566,'Ali saleh','2023-11-16 00:00:00','-','2023-11-28 19:36:35','2023-12-01 14:17:31',NULL,1,110,'Female','KG2','Kawthar.png','iPhone.png','IMG_2818.jpg',0),(33,'ali raed','2020-11-28 00:00:00',776677661,33223322,33223322,'ali saeed','2022-10-28 00:00:00','-','2023-11-28 20:47:25','2023-12-07 11:59:59',25,1,111,'Male','KG2','Kawthar.png','IMG_2818.jpg','IMG_2818.jpg',0),(34,'Khawla','2020-10-05 00:00:00',213121345,33224455,33445566,'Saeed Salman','2023-11-08 00:00:00','-','2023-11-29 07:36:19','2023-12-01 14:17:30',NULL,1,110,'Female','KG2','c.png','BG.png','Kawthar.png',0),(35,'Jaffar Salman','2021-06-29 00:00:00',221133445,33221122,33221122,'Salman Moosa S.','2023-11-29 00:00:00','-','2023-11-29 07:49:24','2023-12-03 07:42:26',26,1,110,'Male','KG2','IMG_2818.jpg','Apple.png','Apple.png',0),(36,'Jaffar','2021-06-29 00:00:00',221133445,33221122,33221122,'Salman Moosa','2023-11-29 00:00:00','-','2023-11-29 07:49:28','2023-12-01 14:17:27',NULL,1,110,'Male','KG2','IMG_2818.jpg','Apple.png','Apple.png',0),(37,'Wadeea','2022-06-29 00:00:00',665566558,33221122,33112233,'Hussain Ali','2023-11-13 00:00:00','-','2023-11-29 07:55:10','2023-12-01 14:17:29',NULL,1,110,'Female','KG2','Kawthar.png','Kawthar.png','BTN.png',0),(38,'Baneen','2022-10-29 00:00:00',998877665,22112211,33445566,'Salman Haji','2023-11-29 00:00:00','-','2023-11-29 07:59:13','2023-12-04 16:14:09',NULL,1,110,'Female','KG2','Kawthar.png','leftArrow.png','IMG_2818.jpg',1),(39,'Sulaiman Ahmed .','2021-10-19 03:00:00',332233221,32321233,32321233,'Hassan Redha','2023-11-22 00:00:00','-','2023-11-29 08:10:01','2023-12-07 13:12:14',NULL,1,27,'Male','KG1','Apple.png','Slider.png','Kawthar.png',1),(40,'fatema yousif ali','2023-11-16 00:00:00',221122112,33223322,33223322,'Yousif Ali','2023-11-29 00:00:00','-','2023-11-29 08:16:09','2023-12-12 15:34:40',NULL,1,136,'Female','KG1','iPhone.png','104490_apple_icon.png','Kawthar.png',1),(44,'Maryam Mahmood','2023-11-22 03:00:00',123456789,12345678,12345678,'Fatema Ali','2023-12-04 05:35:50','-','2023-12-04 05:35:50','2023-12-07 10:56:09',30,1,NULL,'Female','KG2','DB Tables.png','Screenshot 2023-04-15 030619.png','Screenshot 2023-04-15 030643.png',NULL),(45,'Sara Mohd Ali','2023-12-03 03:00:00',123456789,32324343,32113211,'Mohd Ali','2023-12-04 03:00:00','-','2023-12-04 15:31:56','2023-12-12 15:34:39',NULL,1,135,'Female','KG1','IMG_2818.jpg','IMG_2818.jpg','new-report.png',NULL),(49,'Manar Mohammed','2020-06-10 00:00:00',205204780,36985214,36985214,'Fatema Ahmed','2023-12-04 16:52:03','nothing','2023-12-04 16:52:03','2023-12-07 15:55:32',NULL,1,NULL,'Female','KG1','e5e27c61-3865-42f4-813e-5edd0b7b3c2f.jpeg','47be2854-74eb-4511-99ad-6a84e7b4a696.jpeg','6f0db12c-956a-4c53-80b7-af4d954d5834.jpeg',NULL),(50,'Salma Ali','2023-12-19 03:00:00',123456789,32323232,32323232,'Ali Saleh','2023-12-21 03:00:00','-','2023-12-05 22:40:33','2023-12-12 15:34:40',NULL,1,135,'Female','KG1','IMG_2818.jpg','IMG_2818.jpg','IMG_2818.jpg',NULL),(51,'Sara Salman','2023-12-11 03:00:00',123456789,33221122,33221122,'Salman Ahmed','2023-12-26 03:00:00','-','2023-12-05 22:42:57','2023-12-07 10:55:44',NULL,1,NULL,'Female','KG2','rightArrow.png','IMG_2818.jpg','Kawthar.png',NULL),(52,'fatema ahmed','2023-12-18 03:00:00',123456789,32324321,33221122,'ahmed sami','2023-12-14 03:00:00','-','2023-12-05 22:55:44','2023-12-05 22:55:44',NULL,1,NULL,'Female','KG1','Use Case Model.png','new-report.png','BTN.png',NULL),(53,'Kawthar Ali','2023-12-22 03:00:00',123456789,32324545,32324545,'Ahmed ','2023-12-14 03:00:00','-','2023-12-05 23:03:27','2023-12-07 10:59:36',NULL,1,NULL,'Female','KG2','Use Case Model.png','Use Case Model.png','Use Case Model.png',NULL),(54,'Hussain Rashid','2023-12-13 03:00:00',123456789,33445566,33445566,'Salem','2023-12-21 03:00:00','-','2023-12-05 23:10:27','2023-12-05 23:10:27',NULL,1,NULL,'Male','KG1','Use Case Model.png','Use Case Model.png','IMG_2818.jpg',NULL),(55,'Yaseen Sami','2023-12-02 03:00:00',987654321,12345679,12345679,'Yaseen Ahmed','2023-12-09 03:00:00','-','2023-12-05 23:15:45','2023-12-12 15:34:41',NULL,1,136,'Male','KG1','Use Case Model.png','Use Case Model.png','Use Case Model.png',NULL),(56,'Salem Ali','2023-12-11 03:00:00',123456789,33223322,33223322,'Ali Ahmed','2023-12-18 03:00:00','-','2023-12-05 23:19:46','2023-12-12 15:35:22',NULL,1,136,'Male','KG1','Use Case Model.png','Use Case Model.png','Use Case Model.png',NULL),(68,'Fatema Merza','2021-06-06 03:00:00',123456789,32323232,32323232,'Merza Yusuf','2023-12-06 03:00:00','-','2023-12-06 09:41:39','2023-12-07 13:11:12',39,1,27,'Female','KG1','IMG_2818.jpg','IMG_2818.jpg','new-report.png',NULL),(69,'Manar Mahmood','2023-11-19 00:00:00',875985236,62626985,62626985,'Abdulla Isa','2023-12-12 15:19:18','-','2023-12-12 15:19:18','2023-12-12 15:19:18',39,1,NULL,'Female','KG2','Screenshot 2023-04-13 001957.png','Screenshot 2023-04-13 001655.png','Screenshot 2023-04-13 001824.png',NULL);
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subscription_Plans`
--

DROP TABLE IF EXISTS `Subscription_Plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subscription_Plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `monthly_price` double DEFAULT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `plan_description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscription_Plans`
--

LOCK TABLES `Subscription_Plans` WRITE;
/*!40000 ALTER TABLE `Subscription_Plans` DISABLE KEYS */;
INSERT INTO `Subscription_Plans` VALUES (1,100,'Registration','Access to registration service only. ','2023-11-05 21:26:17','2023-11-05 21:26:17'),(2,200,'Management ','Access to registration and general management features.','2023-11-05 21:26:17','2023-11-05 21:26:17'),(3,250,'All Inclusive','Access to registration, general management, and teachers app.','2023-11-05 21:26:17','2023-11-05 21:26:17');
/*!40000 ALTER TABLE `Subscription_Plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Enabled',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_preschool_id` (`preschool_id`),
  CONSTRAINT `Users_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (17,'k.alekri@outlook.com','Admin','Kawthar Alakri','Enabled','2023-11-23 10:43:16','2023-12-12 13:54:55',1),(18,'202003447@student.polytechnic.bh','Teacher','Kawthar Mohammed','Enabled','2023-11-23 22:22:38','2023-11-23 22:22:38',1),(19,'zahraaalekri2@gmail.com','Staff','Zahraa Alekri','Enabled','2023-11-26 19:28:45','2023-12-12 15:16:36',1),(22,'zainabb@gg.com','Parent','Zainab','Enabled','2023-11-28 20:09:44','2023-11-28 20:09:44',NULL),(23,'zainab@12.com','Parent','zaynab','Enabled','2023-11-28 21:05:50','2023-11-28 21:05:50',NULL),(24,'fairy@magic.com','Parent','Fairy','Enabled','2023-11-28 21:14:42','2023-11-28 21:14:42',NULL),(25,'princess@gmail.com','Parent',':pp','Enabled','2023-11-28 21:27:21','2023-11-28 21:27:21',NULL),(26,'roro@rere.com','Parent','Roro','Enabled','2023-11-28 21:45:27','2023-11-28 21:45:27',NULL),(27,'ifatima.marhoon@gmail.com','Teacher','Noura','Enabled','2023-11-30 20:26:00','2023-11-30 20:26:00',1),(28,'zainab@alef.com','Parent','zainab','Enabled','2023-12-01 21:40:39','2023-12-01 21:40:39',NULL),(30,'zainab@android.com','Parent','android','Enabled','2023-12-06 01:11:52','2023-12-06 01:11:52',NULL),(31,'f6em.2011@gmail.com','Teacher','Ameena Ali','Enabled','2023-12-06 15:30:01','2023-12-06 15:30:01',1),(33,'maryam@happykid.com','Admin','Maryam Sayed Ali Salman','Enabled','2023-12-06 21:24:02','2023-12-06 21:24:02',38),(34,'alef.preschool@gmail.com','Super Admin','Kawthar Alekri','Enabled','2023-12-07 20:25:47','2023-12-07 20:25:47',NULL),(35,'fatema.marhoon@outlook.com','Teacher','AA','Enabled','2023-12-08 23:53:43','2023-12-08 23:53:43',1),(36,'fatima.marhoon5@gmail.com','Teacher','Fatema Marhoon','Enabled','2023-12-09 11:07:54','2023-12-09 11:07:54',1),(37,'12marhoon@gmail.com','Teacher','faaatemaaaaa','Enabled','2023-12-09 14:46:07','2023-12-09 14:46:07',1),(38,'ifatima.marhoon@gmail.com','Staff','Fatema ','Enabled','2023-12-12 15:17:11','2023-12-12 15:17:11',1),(39,'not@crying.com','Parent','Not Crying','Enabled','2023-12-14 02:55:27','2023-12-14 02:55:27',1),(42,'nawra.alhaji@gmail.com','Teacher','Nawra Alhaji','Enabled','2023-12-18 23:25:49','2023-12-18 23:25:49',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-26  0:00:40
