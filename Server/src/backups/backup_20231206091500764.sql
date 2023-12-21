-- MySQL dump 10.13  Distrib 8.1.0, for macos14.0 (x86_64)
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
  CONSTRAINT `address_preschool_id` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (2,50.54547593839437,26.16523486242255,'Manama','4565','1234',2,'2023-11-14 19:46:05','2023-11-14 19:46:05'),(3,50.60279667377472,26.145573197894418,'Eker','9865','411',1,'2023-11-14 19:46:05','2023-12-06 07:07:48'),(4,50.54547593839437,26.16523486242255,'Isa Town ','213','111',28,'2023-11-30 15:43:14','2023-11-30 15:43:14'),(5,50.1955808,26.2183582,'Zallaq','1192','0098',6,'2023-11-30 15:44:51','2023-11-30 15:44:51');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Application_Evaluations`
--

LOCK TABLES `Application_Evaluations` WRITE;
/*!40000 ALTER TABLE `Application_Evaluations` DISABLE KEYS */;
INSERT INTO `Application_Evaluations` VALUES (7,3,3,3,39,2,3,3,3,3,3,2,3,2,3,3,'2023-12-04 05:00:17','2023-12-04 05:00:17',62),(8,1,1,1,14,1,1,1,1,1,1,1,1,1,1,1,'2023-12-04 05:56:50','2023-12-04 05:56:50',54),(9,1,1,1,14,1,1,1,1,1,1,1,1,1,1,1,'2023-12-05 23:41:32','2023-12-05 23:41:32',55),(10,1,1,2,17,3,1,1,1,1,1,1,1,1,1,1,'2023-12-05 23:43:55','2023-12-05 23:43:55',67);
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
  `student_CPR` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `guardian_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applications`
--

LOCK TABLES `Applications` WRITE;
/*!40000 ALTER TABLE `Applications` DISABLE KEYS */;
INSERT INTO `Applications` VALUES (51,'Father','Accepted','email@email.com','test 12545',0,'Female','KG1','test edkhwn','123456','2023-11-22 00:00:00','-','Alef logo.png','Alef logo.png','Alef - Variation 2.png','2023-11-23 11:00:36','2023-12-03 08:00:59',17,1),(54,'Mother','Accepted','test@gmail.com','Manar Mohammed',205204780,'Female','KG1','Fatema Ahmed','36985214','2020-06-10 00:00:00','nothing','e5e27c61-3865-42f4-813e-5edd0b7b3c2f.jpeg','47be2854-74eb-4511-99ad-6a84e7b4a696.jpeg','6f0db12c-956a-4c53-80b7-af4d954d5834.jpeg','2023-11-27 13:19:55','2023-12-04 16:52:03',17,1),(55,'Grandparent','Accepted','test@gmail.com','success message test',121,'Female','KG1','tets','123469897','2023-11-08 00:00:00','-','profilePic.png','Book lover-pana (1).png','Screenshot 2023-11-16 164853.png','2023-11-27 21:16:55','2023-12-05 23:41:36',17,1),(56,'Mother','Pending','mohammed.ali@gmail.com','message 2',12,'Female','KG2','es','+97332371545 ','2023-11-28 00:00:00','-','Screenshot 2023-11-13 231754.png','Screenshot 2023-03-21 201947.png','Screenshot 2023-11-16 062911.png','2023-11-27 21:27:22','2023-11-27 21:27:22',17,1),(57,'Father','Pending','test@gmail.com','khuih',5555,'Male','KG1','lijoi','36985214','2023-11-02 00:00:00','-','Screenshot 2023-04-13 001732.png','Screenshot 2023-04-13 001655.png','Screenshot 2023-04-06 225214.png','2023-11-27 21:29:36','2023-11-27 21:29:36',17,1),(58,'Mother','Pending','k.alekri@outlook.com','testtingggg',123565,'Female','KG2','dewdw','+97332371545','2023-11-06 00:00:00','-','Screenshot 2023-10-21 014439.png','Screenshot 2023-10-30 143056.png','Screenshot 2023-10-30 143205.png','2023-11-28 09:42:00','2023-11-28 09:42:00',17,1),(59,'Mother','Pending','test@gmail.com','Hi',6532,'Female','KG2','wdwd','36985214','2023-11-22 00:00:00','-','Screenshot 2023-03-27 011930.png','Screenshot 2023-03-27 012005.png','Screenshot 2023-03-27 012021.png','2023-11-28 09:59:03','2023-11-28 09:59:03',17,1),(60,'Mother','Pending','test@gmail.com','fd',9856,'Female','KG1','wrg','2135','2023-11-14 00:00:00','-','Screenshot 2023-03-25 023709.png','Screenshot 2023-04-06 225214.png','Screenshot 2023-04-15 030619.png','2023-11-28 10:01:47','2023-11-28 10:01:47',17,1),(61,'Father','Pending','test@gmail.com','agaaainnn',875,'Female','KG2','lwmlm','62626','2023-11-19 00:00:00','-','Screenshot 2023-04-13 001957.png','Screenshot 2023-04-13 001655.png','Screenshot 2023-04-13 001824.png','2023-11-28 10:18:07','2023-11-28 10:18:07',17,1),(62,'Mother','Accepted','k.alekri@outlook.com','Maryam Mahmood',123456789,'Female','KG2','Fatema Ali','12345678','2023-11-22 03:00:00','-','DB Tables.png','Screenshot 2023-04-15 030619.png','Screenshot 2023-04-15 030643.png','2023-11-28 10:22:38','2023-12-04 05:35:49',26,1),(63,'Mother','Pending','k.alekri@outlook.com','wlinilwk',548641,'Female','KG2','kwnfklewnd','+97332371545','2023-11-22 00:00:00','-','Screenshot 2023-06-04 174354.png','Screenshot 2023-06-04 150814.png','Screenshot 2023-05-19 224153.png','2023-11-28 10:25:35','2023-11-28 10:25:35',17,1),(64,'Mother','Waitlist','z@g.xi','jojo',121111,'female','','Roro','123131','2023-11-28 21:00:00','no','personal_picture','certificate_of_birth','passport','2023-11-28 22:19:47','2023-11-28 22:19:47',26,2),(65,'Father','Pending','z@w','aaa',1111,'female','KG1','bbb','1234','2023-12-03 00:00:00','no','personal_picture','certificate_of_birth','passport','2023-12-03 18:34:44','2023-12-03 18:34:44',28,2),(66,'Father','Pending','Zoozii@gmail.com','Ali Muneer',121212121,'male','KG1','Muneer','34343434','2023-12-03 00:00:00','no','personal_picture','certificate_of_birth','passport','2023-12-03 18:37:11','2023-12-03 18:37:11',28,2),(67,'Father','Accepted','sos@help.com','zzz',212121212,'female','KG1','ede','21212121','2023-12-04 00:00:00','cd','personal_picture','certificate_of_birth','passport','2023-12-04 12:08:55','2023-12-06 01:47:42',30,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointments`
--

LOCK TABLES `Appointments` WRITE;
/*!40000 ALTER TABLE `Appointments` DISABLE KEYS */;
INSERT INTO `Appointments` VALUES (15,'2023-12-03 00:00:00','08:00:00',2,'2023-12-02 23:03:06','2023-12-02 23:03:06',64),(16,'2023-11-04 00:00:00','08:00:00',1,'2023-12-03 00:54:17','2023-12-03 00:54:17',64),(17,'2023-12-04 00:00:00','10:00:00',1,'2023-12-03 00:54:17','2023-12-03 18:32:52',59),(18,'2023-12-05 00:00:00','09:00:00',2,'2023-12-03 18:39:14','2023-12-03 18:39:14',66),(19,'2023-11-04 00:00:00','08:00:00',2,'2023-12-03 00:54:17','2023-12-03 00:54:17',64),(20,'2023-12-08 00:00:00','09:00:00',1,'2023-12-04 03:30:54','2023-12-04 03:30:54',58),(22,'2023-12-05 03:00:00','09:30:00',2,'2023-12-04 12:09:06','2023-12-04 12:09:06',67);
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
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (26,'Almahdi','KG1',20,'-','2023-11-23 08:09:27','2023-11-23 08:09:27',1,2),(27,'Alward','KG1',10,'-','2023-11-23 08:09:27','2023-11-23 08:09:27',1,2),(85,'Alshams','KG1',7,'1','2023-11-26 10:00:58','2023-11-26 10:00:58',1,1),(89,'chamomile','KG2',14,'7','2023-11-29 18:28:51','2023-11-29 18:28:51',1,1),(110,'Alzuhoor','KG2',12,'15','2023-11-30 17:44:26','2023-11-30 17:44:26',1,1),(111,'Alfarashat','KG2',11,'13','2023-11-30 17:44:26','2023-11-30 17:44:26',1,1),(124,'Alnoor','KG1',7,'3','2023-12-01 14:52:28','2023-12-01 14:52:28',1,1),(125,'Alshams','KG1',6,'1','2023-12-01 14:52:28','2023-12-01 14:52:28',1,1),(126,'','KG2',12,'dcrc','2023-12-05 13:55:14','2023-12-05 13:55:14',1,5),(127,'crcr','KG2',11,'crr','2023-12-05 13:55:14','2023-12-05 13:55:14',1,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_Classes`
--

LOCK TABLES `Event_Classes` WRITE;
/*!40000 ALTER TABLE `Event_Classes` DISABLE KEYS */;
INSERT INTO `Event_Classes` VALUES (31,26,23,'2023-12-01 01:09:14','2023-12-01 01:09:14'),(32,27,23,'2023-12-01 01:09:14','2023-12-01 01:09:14'),(33,85,23,'2023-12-01 01:09:14','2023-12-01 01:09:14'),(35,26,13,'2023-12-01 16:21:44','2023-12-01 16:21:44'),(36,110,31,'2023-12-06 01:23:01','2023-12-06 01:23:01'),(37,110,32,'2023-12-06 01:25:20','2023-12-06 01:25:20'),(38,110,33,'2023-12-06 01:27:39','2023-12-06 01:27:39'),(39,110,34,'2023-12-06 01:29:35','2023-12-06 01:29:35'),(40,110,35,'2023-12-06 01:30:48','2023-12-06 01:30:48'),(41,110,36,'2023-12-06 01:32:49','2023-12-06 01:32:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (4,'prohept\'s birthday','2023-12-31 00:00:00',1,0,1,'This is a sample event for testing.','2023-11-25 21:08:28','2023-11-25 21:08:28',17,2),(13,'create test ??','2023-11-28 00:00:00',1,1,0,'just a test with postman','2023-11-25 23:36:00','2023-12-01 16:21:45',17,1),(23,'Event with Classes updated','2023-11-04 00:00:00',0,1,0,'event specifically created for some classes only','2023-11-27 05:18:28','2023-12-01 00:43:48',17,1),(29,'Palestine Day','2023-12-04 03:00:00',0,0,1,'Supporting Palestine !','2023-12-03 01:21:11','2023-12-03 01:21:11',18,1),(30,'Green Day','2023-11-04 03:00:00',0,0,1,'Wear green shirts and join us!','2023-12-03 23:10:02','2023-12-03 23:10:02',18,1),(31,'Bahraini Women\'s Day','2023-12-22 03:00:00',1,0,0,'Celebrating Womens!','2023-12-06 01:23:00','2023-12-06 01:23:00',18,1),(32,'Bahraini Women\'s Day','2023-12-22 03:00:00',1,0,0,'Celebrating Womens!','2023-12-06 01:25:18','2023-12-06 01:25:18',18,1),(33,'Happiness Day','2023-12-16 03:00:00',1,0,0,'Let\'s Celebrate Happiness Day Together!!','2023-12-06 01:27:38','2023-12-06 01:27:38',18,1),(34,'Happiness Day','2023-12-16 03:00:00',1,0,0,'Let\'s Celebrate Happiness Day Together!!','2023-12-06 01:29:34','2023-12-06 01:29:34',18,1),(35,'Colors Day','2023-12-18 03:00:00',1,0,0,'Colors Event !!','2023-12-06 01:30:47','2023-12-06 01:30:47',18,1),(36,'Hobbies Day','2023-12-12 03:00:00',1,0,0,'Let\'s play and try new hobbies.','2023-12-06 01:32:47','2023-12-06 01:32:47',18,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grade_Capacities`
--

LOCK TABLES `Grade_Capacities` WRITE;
/*!40000 ALTER TABLE `Grade_Capacities` DISABLE KEYS */;
INSERT INTO `Grade_Capacities` VALUES (1,'KG1',50,'2023-11-14 20:55:13','2023-11-14 20:55:13',1),(2,'KG2',60,'2023-11-14 20:55:13','2023-11-14 20:55:13',1),(3,'KG1',50,'2023-11-17 15:15:37','2023-11-17 15:15:37',2),(4,'KG1',50,'2023-11-28 15:39:02','2023-11-28 15:39:02',29),(5,'KG2',50,'2023-11-28 15:39:02','2023-11-28 15:39:02',29);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logs`
--

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;
INSERT INTO `Logs` VALUES (6,'Student Creation','{\"student_name\":\"Yaseen Sami\",\"DOB\":\"2023-12-02\",\"grade\":\"KG1\",\"CPR\":\"987654321\",\"contact_number1\":\"12345679\",\"contact_number2\":\"12345679\",\"guardian_name\":\"Yaseen Ahmed\",\"enrollment_date\":\"2023-12-09\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Male\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"personal_picture\":\"Use Case Model.png\"}','Student created','2023-12-05 23:15:44','2023-12-05 23:15:44','2023-12-05 23:15:44',28),(7,'Student Creation','{\"student_name\":\"Salem Ali\",\"DOB\":\"2023-12-11\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"33223322\",\"contact_number2\":\"33223322\",\"guardian_name\":\"Ali Ahmed\",\"enrollment_date\":\"2023-12-18\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Male\",\"certificate_of_birth\":\"Use Case Model.png\",\"passport\":\"Use Case Model.png\",\"personal_picture\":\"Use Case Model.png\"}','Student created','2023-12-05 23:19:45','2023-12-05 23:19:45','2023-12-05 23:19:45',28),(8,'Student Creation','{\"student_name\":\"Fatema Mirza\",\"DOB\":\"2021-06-06\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"32323232\",\"contact_number2\":\"32323232\",\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"personal_picture\":\"IMG_2818.jpg\"}','{\"student_name\":\"Fatema Mirza\",\"DOB\":\"2021-06-06\",\"grade\":\"KG1\",\"CPR\":\"123456789\",\"contact_number1\":\"32323232\",\"contact_number2\":\"32323232\",\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06\",\"medical_history\":\"-\",\"preschool_id\":\"1\",\"gender\":\"Female\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"personal_picture\":\"IMG_2818.jpg\"}','2023-12-06 09:41:39','2023-12-06 09:41:39','2023-12-06 09:41:39',28),(9,'Student Update','{\"id\":68,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Fatema Mirza\",\"grade\":\"KG1\",\"DOB\":\"2021-06-06T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-06T06:41:39.000Z\",\"updatedAt\":\"2023-12-06T06:41:39.000Z\"}','{\"id\":68,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"Fatema Merza\",\"grade\":\"KG1\",\"DOB\":\"2021-06-06T00:00:00.000Z\",\"CPR\":123456789,\"contact_number1\":32323232,\"contact_number2\":32323232,\"guardian_name\":\"Merza Yusuf\",\"enrollment_date\":\"2023-12-06T00:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"IMG_2818.jpg\",\"certificate_of_birth\":\"IMG_2818.jpg\",\"passport\":\"new-report.png\",\"hasConsent\":null,\"user_id\":null,\"createdAt\":\"2023-12-06T06:41:39.000Z\",\"updatedAt\":\"2023-12-06T06:43:57.710Z\"}','2023-12-06 09:43:57','2023-12-06 09:43:57','2023-12-06 09:43:57',28),(10,'Student Deletion','{\"id\":67,\"preschool_id\":1,\"class_id\":null,\"student_name\":\"zzz\",\"grade\":\"KG1\",\"DOB\":\"2023-12-03T21:00:00.000Z\",\"CPR\":212121212,\"contact_number1\":21212121,\"contact_number2\":21212121,\"guardian_name\":\"ede\",\"enrollment_date\":\"2023-12-05T22:47:45.000Z\",\"medical_history\":\"cd\",\"gender\":\"female\",\"personal_picture\":\"personal_picture\",\"certificate_of_birth\":\"certificate_of_birth\",\"passport\":\"passport\",\"hasConsent\":null,\"user_id\":30,\"createdAt\":\"2023-12-05T22:47:45.000Z\",\"updatedAt\":\"2023-12-05T22:47:45.000Z\"}','Student deleted','2023-12-06 09:47:00','2023-12-06 09:47:00','2023-12-06 09:47:00',28),(11,'Student Creation Validation Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 09:51:05','2023-12-06 09:51:05','2023-12-06 09:51:05',28),(12,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-06 10:07:05','2023-12-06 10:07:05','2023-12-06 10:07:05',28),(13,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-06 10:07:28','2023-12-06 10:07:28','2023-12-06 10:07:28',28),(14,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 10:08:41','2023-12-06 10:08:41','2023-12-06 10:08:41',28),(15,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"Cannot read properties of undefined (reading \'0\')\"}','2023-12-06 10:08:43','2023-12-06 10:08:43','2023-12-06 10:08:43',28),(16,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 10:09:22','2023-12-06 10:09:22','2023-12-06 10:09:22',28),(17,'Error','{\"student_name\":\"\",\"DOB\":\"\",\"grade\":\"\",\"CPR\":\"\",\"contact_number1\":\"\",\"contact_number2\":\"\",\"guardian_name\":\"\",\"enrollment_date\":\"\",\"medical_history\":\"\",\"preschool_id\":\"1\",\"gender\":\"\"}','{\"error\":\"student_name is required\"}','2023-12-06 10:14:21','2023-12-06 10:14:21','2023-12-06 10:14:21',18),(18,'Error','{\"student_name\":\"fatema yousif ali\",\"gender\":\"Female\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\"}','{\"error\":\"us is not defined\"}','2023-12-06 10:22:15','2023-12-06 10:22:15','2023-12-06 10:22:15',18),(19,'Student Update','{\"id\":40,\"preschool_id\":1,\"class_id\":125,\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-06T07:22:15.000Z\"}','{\"id\":40,\"preschool_id\":1,\"class_id\":125,\"student_name\":\"fatema yousif ali\",\"grade\":\"KG1\",\"DOB\":\"2023-11-15T21:00:00.000Z\",\"CPR\":221122112,\"contact_number1\":33223322,\"contact_number2\":33223322,\"guardian_name\":\"Yousif Ali\",\"enrollment_date\":\"2023-11-28T21:00:00.000Z\",\"medical_history\":\"-\",\"gender\":\"Female\",\"personal_picture\":\"iPhone.png\",\"certificate_of_birth\":\"104490_apple_icon.png\",\"passport\":\"Kawthar.png\",\"hasConsent\":true,\"user_id\":null,\"createdAt\":\"2023-11-29T05:16:09.000Z\",\"updatedAt\":\"2023-12-06T07:22:15.000Z\"}','2023-12-06 10:22:40','2023-12-06 10:22:40','2023-12-06 10:22:40',18);
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
  `notification_title` varchar(255) DEFAULT NULL,
  `notification_content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id` (`user_id`),
  CONSTRAINT `Notifications_user_id_foreign_idx` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
INSERT INTO `Notifications` VALUES (3,'Congratulations!','Your application has been accepted. Please pay any pending fees.','2023-12-06 01:18:14','2023-12-06 01:18:14',NULL),(4,'Congratulations!','Your application has been accepted. Please pay any pending fees.','2023-12-06 01:19:34','2023-12-06 01:19:34',NULL),(5,'Congratulations!','Your application has been accepted. Please pay any pending fees.','2023-12-06 01:47:44','2023-12-06 01:47:44',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
INSERT INTO `Payments` VALUES (3,'Paid','Registration Fees',85,'2023-12-04 16:52:04','Registration Fees','2023-12-04 22:35:00','2023-12-04 16:52:04','2023-12-04 22:35:00',49),(4,'Pending','Registration Fees',100,'2023-12-04 16:01:35',NULL,NULL,'2023-12-04 16:01:35','2023-12-04 16:01:35',38),(5,'Pending','Registration Fees',0,'2023-12-06 03:00:00','nothing',NULL,'2023-12-05 01:30:43','2023-12-05 01:30:43',30),(6,'Paid','Monthly Fees',70,'2023-12-12 03:10:02',NULL,'2023-12-05 18:54:51','2023-12-05 03:10:02','2023-12-05 18:54:51',27),(8,'Pending','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-05 03:12:02',29),(9,'Pending','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-05 03:12:02',30),(10,'Pending','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-05 03:12:02',33),(11,'Pending','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-05 03:12:02',34),(12,'Pending','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-05 03:12:02',35),(13,'Pending','Monthly Fees',65,'2023-12-12 03:12:02',NULL,NULL,'2023-12-05 03:12:02','2023-12-05 03:12:02',36),(14,'Pending','Monthly Fees',65,'2023-12-12 03:12:03',NULL,NULL,'2023-12-05 03:12:03','2023-12-05 03:12:03',37),(15,'Pending','Monthly Fees',65,'2023-12-12 03:12:03',NULL,NULL,'2023-12-05 03:12:03','2023-12-05 03:12:03',38),(16,'Pending','Monthly Fees',65,'2023-12-12 03:12:03',NULL,NULL,'2023-12-05 03:12:03','2023-12-05 03:12:03',39),(17,'Pending','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-05 03:14:02',27),(18,'Pending','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-05 03:14:02',29),(19,'Pending','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-05 03:14:02',30),(20,'Pending','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-05 03:14:02',33),(21,'Pending','Monthly Fees',65,'2023-12-12 03:14:02',NULL,NULL,'2023-12-05 03:14:02','2023-12-05 03:14:02',34),(22,'Pending','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-05 03:14:03',35),(23,'Pending','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-05 03:14:03',36),(24,'Pending','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-05 03:14:03',37),(25,'Pending','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-05 03:14:03',38),(26,'Pending','Monthly Fees',65,'2023-12-12 03:14:03',NULL,NULL,'2023-12-05 03:14:03','2023-12-05 03:14:03',39),(27,'Pending','Monthly Fees',65,'2023-12-12 03:17:02',NULL,NULL,'2023-12-05 03:17:02','2023-12-05 03:17:02',27),(28,'Pending','Monthly Fees',65,'2023-12-12 03:17:02',NULL,NULL,'2023-12-05 03:17:02','2023-12-05 03:17:02',29),(29,'Pending','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-05 03:17:03',30),(30,'Pending','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-05 03:17:03',33),(31,'Pending','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-05 03:17:03',34),(32,'Pending','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-05 03:17:03',35),(33,'Pending','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-05 03:17:03',36),(34,'Pending','Monthly Fees',65,'2023-12-12 03:17:03',NULL,NULL,'2023-12-05 03:17:03','2023-12-05 03:17:03',37),(35,'Pending','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-05 03:17:04',38),(36,'Pending','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-05 03:17:04',39),(37,'Pending','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-05 03:17:04',40),(38,'Pending','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-05 03:17:04',44),(39,'Pending','Monthly Fees',65,'2023-12-12 03:17:04',NULL,NULL,'2023-12-05 03:17:04','2023-12-05 03:17:04',45),(40,'Pending','Monthly Fees',65,'2023-12-12 03:17:05',NULL,NULL,'2023-12-05 03:17:05','2023-12-05 03:17:05',49),(41,'Pending','Monthly Fees',65,'2023-12-12 03:18:01',NULL,NULL,'2023-12-05 03:18:01','2023-12-05 03:18:01',27),(42,'Pending','Monthly Fees',65,'2023-12-12 03:18:01',NULL,NULL,'2023-12-05 03:18:01','2023-12-05 03:18:01',29),(43,'Pending','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-05 03:18:02',30),(44,'Pending','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-05 03:18:02',33),(45,'Pending','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-05 03:18:02',34),(46,'Pending','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-05 03:18:02',35),(47,'Pending','Monthly Fees',65,'2023-12-12 03:18:02',NULL,NULL,'2023-12-05 03:18:02','2023-12-05 03:18:02',36),(48,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',37),(49,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',38),(50,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',39),(51,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',40),(52,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',44),(53,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',45),(54,'Pending','Monthly Fees',65,'2023-12-12 03:18:03',NULL,NULL,'2023-12-05 03:18:03','2023-12-05 03:18:03',49),(55,'Pending','Monthly Fees',65,'2023-12-12 03:22:01',NULL,NULL,'2023-12-05 03:22:01','2023-12-05 03:22:01',27),(57,'Pending','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-05 03:22:02',30),(58,'Pending','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-05 03:22:02',33),(59,'Pending','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-05 03:22:02',34),(60,'Pending','Monthly Fees',65,'2023-12-12 03:22:02',NULL,NULL,'2023-12-05 03:22:02','2023-12-05 03:22:02',35),(61,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',36),(62,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',37),(63,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',38),(64,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',39),(65,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',40),(66,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',44),(67,'Pending','Monthly Fees',65,'2023-12-12 03:22:03',NULL,NULL,'2023-12-05 03:22:03','2023-12-05 03:22:03',45),(68,'Pending','Monthly Fees',65,'2023-12-12 03:22:04',NULL,NULL,'2023-12-05 03:22:04','2023-12-05 03:22:04',49);
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
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `preschool_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Preschool_Media_preschool_id_foreign_idx` (`preschool_id`),
  CONSTRAINT `Preschool_Media_preschool_id_foreign_idx` FOREIGN KEY (`preschool_id`) REFERENCES `Preschools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preschool_Media`
--

LOCK TABLES `Preschool_Media` WRITE;
/*!40000 ALTER TABLE `Preschool_Media` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preschools`
--

LOCK TABLES `Preschools` WRITE;
/*!40000 ALTER TABLE `Preschools` DISABLE KEYS */;
INSERT INTO `Preschools` VALUES (1,'Alrayaheen','32371522','alrayaheen@gmail.com','','Alef logo.png','Nafeesa Alasfoor','2023-11-05 21:35:26','Learning through playing',3,5,65,85,NULL,'2023-11-05 21:35:26','2023-12-06 08:11:56',1,3),(2,'Alef Kindergarten',NULL,'','',NULL,NULL,'2024-11-30 20:20:05','sleep and play, what\'s learning for 2yo kiddo ',2,5,80,100,NULL,'2023-11-09 17:20:05','2023-11-09 17:20:05',3,2),(4,'test3',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-15 18:48:08','2023-11-15 18:48:08',10,3),(5,'Alghadeer',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-15 18:49:25','2023-11-15 18:49:25',8,1),(6,'Sample Preschool',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-15 18:55:02','2023-11-15 18:55:02',4,1),(7,'Alrayaheen',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-16 10:21:35','2023-11-16 10:21:35',1,2),(8,'Sample PreschoolTest',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-21 10:03:07','2023-11-21 10:03:07',6,1),(26,'test3',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-26 20:57:43','2023-11-26 20:57:43',10,3),(27,'test3',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-26 20:59:38','2023-11-26 20:59:38',10,3),(28,'test3',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-26 21:01:52','2023-11-26 21:01:52',10,3),(29,'test3',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-26 21:02:46','2023-11-26 21:02:46',10,3),(30,'tedt2',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-27 11:46:45','2023-11-27 11:46:45',9,2),(31,'Alghadeer',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-11-27 11:47:08','2023-11-27 11:47:08',8,1),(32,'Alrayaheen',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-03 11:20:24','2023-12-03 11:20:24',1,2),(33,'Alrayaheen',NULL,'','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-03 11:21:23','2023-12-03 11:21:23',1,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Requests`
--

LOCK TABLES `Requests` WRITE;
/*!40000 ALTER TABLE `Requests` DISABLE KEYS */;
INSERT INTO `Requests` VALUES (1,'Approved','Alrayaheen','Kawthar Mohammed Mahdi Alakri','CR178055','32371545','alrayaheen@gmail.com','2023-11-05 21:31:16','2023-12-04 17:00:36',2),(3,'Approved','Aldeyaa','Um taha','CR4567890','14567890','john.doe@example.com','2023-11-08 11:03:24','2023-11-08 11:03:24',1),(4,'Accepted','Sample Preschool','John Doe','CR4567890','14567890','john.doe@example.com','2023-11-08 11:04:22','2023-11-15 18:55:02',1),(5,'Accepted','Sample PreschoolTest','John Doe','CR4567890','14567890','john.doe@example.com','2023-11-08 11:08:41','2023-11-15 18:39:06',1),(6,'Accepted','Sample PreschoolTest','John Doe','CR4567890','14567890','john.doe@example.com','2023-11-08 11:12:49','2023-11-21 10:03:07',1),(7,'Accepted','Happy Kids Nursery','Maryam Sayed Ali Salman','CR-789','+9733659874','maryam@happykid.com','2023-11-09 21:53:01','2023-11-15 13:54:42',1),(8,'Accepted','Alghadeer','Malaak','CR23412','33221122','m@gmail.com','2023-11-11 12:08:04','2023-11-27 11:47:08',1),(9,'Accepted','tedt2','esraa','cr231312','22112233','e@gmail','2023-11-11 12:09:03','2023-11-27 11:46:45',2),(10,'Accepted','test3','FATEMA ALI','CR32123','33445566','f6um5x@gmail.com','2023-11-11 12:10:00','2023-11-26 21:02:46',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staffs`
--

LOCK TABLES `Staffs` WRITE;
/*!40000 ALTER TABLE `Staffs` DISABLE KEYS */;
INSERT INTO `Staffs` VALUES (1,'Teacher','Fatema',21010020,33223322,'2023-11-08 11:30:30','f@gmail.com','2023-11-08 11:30:30','2023-11-15 20:06:07',1,0),(2,'Teacher','Nawra',21010020,33223322,'2023-11-08 11:30:30','n@gmail.com','2023-11-08 11:35:42','2023-11-15 19:58:22',1,0),(5,'Teacher','Maryam Ahmed',2030412,22222,'2023-11-07 00:00:00','maryam@gmail.com','2023-11-16 17:22:03','2023-11-16 17:22:03',1,0),(8,'Nurse','Samya Ahmed',112233445,33221122,'2023-11-29 00:00:00','samya@preschool.com','2023-11-29 10:17:14','2023-12-04 22:26:58',1,0),(9,'Cleaner','Anne Saw',123456789,33009911,'2023-11-20 00:00:00','anne@preschool.com','2023-11-29 10:18:23','2023-11-29 10:25:13',1,0),(10,'Teacher','Noura',123456789,33223322,'2023-11-30 00:00:00','ifatima.marhoon@gmail.com','2023-11-30 20:25:58','2023-11-30 20:25:58',1,NULL),(11,'Administrative Staff','Amna Alawi',123456789,32323232,'2023-12-26 03:00:00','ifatima.marhoon@gmail.com','2023-12-04 16:27:45','2023-12-04 16:27:45',1,NULL),(15,'Cleaner','Somona',123456789,32321213,'2023-12-04 03:00:00','ifatima.marhoon@gmail.com','2023-12-04 16:37:58','2023-12-04 16:37:58',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stationary_Requests`
--

LOCK TABLES `Stationary_Requests` WRITE;
/*!40000 ALTER TABLE `Stationary_Requests` DISABLE KEYS */;
INSERT INTO `Stationary_Requests` VALUES (21,'Accepted',3,'-','2023-11-29 11:07:25','2023-12-04 17:04:26',2,4,1),(22,'Pending',1,'for class 1 ','2023-11-29 11:07:31','2023-11-29 11:49:14',2,4,1),(23,'Pending',2,'????','2023-12-03 07:55:47','2023-12-03 07:55:47',2,5,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Evaluations`
--

LOCK TABLES `Student_Evaluations` WRITE;
/*!40000 ALTER TABLE `Student_Evaluations` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (27,'Zahraa','2022-01-28 00:00:00',191919192,33443355,33443355,'Ali Rami','2023-11-13 00:00:00','-','2023-11-28 18:42:31','2023-12-01 14:17:26',NULL,1,111,'Female','KG2','IMG_2818.jpg','IMG_2818.jpg','IMG_2818.jpg',0),(29,'ahlam','2022-10-18 00:00:00',221122332,33221122,33221122,'Ahmed Sami','2023-11-06 00:00:00','-','2023-11-28 18:46:49','2023-12-01 14:17:26',NULL,1,111,'Female','KG2','IMG_2818.jpg','Kawthar.png','IMG_2818.jpg',0),(30,'Fatema Ahmed','2022-01-31 00:00:00',221133445,33221133,33445566,'Ali saleh','2023-11-16 00:00:00','-','2023-11-28 19:36:35','2023-12-01 14:17:31',NULL,1,110,'Female','KG2','Kawthar.png','iPhone.png','IMG_2818.jpg',0),(33,'ali raed','2020-11-28 00:00:00',776677661,33223322,33223322,'ali saeed','2022-10-28 00:00:00','-','2023-11-28 20:47:25','2023-12-01 14:17:23',25,1,111,'Male','KG2','Kawthar.png','IMG_2818.jpg','IMG_2818.jpg',0),(34,'Khawla','2020-10-05 00:00:00',213121345,33224455,33445566,'Saeed Salman','2023-11-08 00:00:00','-','2023-11-29 07:36:19','2023-12-01 14:17:30',NULL,1,110,'Female','KG2','c.png','BG.png','Kawthar.png',0),(35,'Jaffar Salman','2021-06-29 00:00:00',221133445,33221122,33221122,'Salman Moosa S.','2023-11-29 00:00:00','-','2023-11-29 07:49:24','2023-12-03 07:42:26',26,1,110,'Male','KG2','IMG_2818.jpg','Apple.png','Apple.png',0),(36,'Jaffar','2021-06-29 00:00:00',221133445,33221122,33221122,'Salman Moosa','2023-11-29 00:00:00','-','2023-11-29 07:49:28','2023-12-01 14:17:27',NULL,1,110,'Male','KG2','IMG_2818.jpg','Apple.png','Apple.png',0),(37,'Wadeea','2022-06-29 00:00:00',665566558,33221122,33112233,'Hussain Ali','2023-11-13 00:00:00','-','2023-11-29 07:55:10','2023-12-01 14:17:29',NULL,1,110,'Female','KG2','Kawthar.png','Kawthar.png','BTN.png',0),(38,'Baneen','2022-10-29 00:00:00',998877665,22112211,33445566,'Salman Haji','2023-11-29 00:00:00','-','2023-11-29 07:59:13','2023-12-04 16:14:09',NULL,1,110,'Female','KG2','Kawthar.png','leftArrow.png','IMG_2818.jpg',1),(39,'Sulaiman Ahmed','2021-10-19 03:00:00',332233221,32321233,32321233,'Hassan Redha','2023-11-22 00:00:00','-','2023-11-29 08:10:01','2023-12-04 16:13:09',NULL,1,110,'Male','KG1','Apple.png','Slider.png','Kawthar.png',1),(40,'fatema yousif ali','2023-11-16 00:00:00',221122112,33223322,33223322,'Yousif Ali','2023-11-29 00:00:00','-','2023-11-29 08:16:09','2023-12-06 10:22:15',NULL,1,125,'Female','KG1','iPhone.png','104490_apple_icon.png','Kawthar.png',1),(44,'Maryam Mahmood','2023-11-22 03:00:00',123456789,12345678,12345678,'Fatema Ali','2023-12-04 05:35:50','-','2023-12-04 05:35:50','2023-12-04 05:35:50',26,1,NULL,'Female','KG2','DB Tables.png','Screenshot 2023-04-15 030619.png','Screenshot 2023-04-15 030643.png',NULL),(45,'Sara Mohd Ali','2023-12-03 03:00:00',123456789,32324343,32113211,'Mohd Ali','2023-12-04 03:00:00','-','2023-12-04 15:31:56','2023-12-04 15:31:56',NULL,1,NULL,'Female','KG1','IMG_2818.jpg','IMG_2818.jpg','new-report.png',NULL),(49,'Manar Mohammed','2020-06-10 00:00:00',205204780,36985214,36985214,'Fatema Ahmed','2023-12-04 16:52:03','nothing','2023-12-04 16:52:03','2023-12-04 16:52:03',NULL,1,NULL,'Female','KG1','e5e27c61-3865-42f4-813e-5edd0b7b3c2f.jpeg','47be2854-74eb-4511-99ad-6a84e7b4a696.jpeg','6f0db12c-956a-4c53-80b7-af4d954d5834.jpeg',NULL),(50,'Salma Ali','2023-12-19 03:00:00',123456789,32323232,32323232,'Ali Saleh','2023-12-21 03:00:00','-','2023-12-05 22:40:33','2023-12-05 22:40:33',NULL,1,NULL,'Female','KG1','IMG_2818.jpg','IMG_2818.jpg','IMG_2818.jpg',NULL),(51,'Sara Salman','2023-12-11 03:00:00',123456789,33221122,33221122,'Salman Ahmed','2023-12-26 03:00:00','-','2023-12-05 22:42:57','2023-12-05 22:42:57',NULL,1,NULL,'Female','KG2','rightArrow.png','IMG_2818.jpg','Kawthar.png',NULL),(52,'fatema ahmed','2023-12-18 03:00:00',123456789,32324321,33221122,'ahmed sami','2023-12-14 03:00:00','-','2023-12-05 22:55:44','2023-12-05 22:55:44',NULL,1,NULL,'Female','KG1','Use Case Model.png','new-report.png','BTN.png',NULL),(53,'Kawthar Ali','2023-12-22 03:00:00',123456789,32324545,32324545,'Ahmed ','2023-12-14 03:00:00','-','2023-12-05 23:03:27','2023-12-05 23:03:27',NULL,1,NULL,'Female','KG2','Use Case Model.png','Use Case Model.png','Use Case Model.png',NULL),(54,'Hussain Rashid','2023-12-13 03:00:00',123456789,33445566,33445566,'Salem','2023-12-21 03:00:00','-','2023-12-05 23:10:27','2023-12-05 23:10:27',NULL,1,NULL,'Male','KG1','Use Case Model.png','Use Case Model.png','IMG_2818.jpg',NULL),(55,'Yaseen Sami','2023-12-02 03:00:00',987654321,12345679,12345679,'Yaseen Ahmed','2023-12-09 03:00:00','-','2023-12-05 23:15:45','2023-12-05 23:15:45',NULL,1,NULL,'Male','KG1','Use Case Model.png','Use Case Model.png','Use Case Model.png',NULL),(56,'Salem Ali','2023-12-11 03:00:00',123456789,33223322,33223322,'Ali Ahmed','2023-12-18 03:00:00','-','2023-12-05 23:19:46','2023-12-05 23:19:46',NULL,1,NULL,'Male','KG1','Use Case Model.png','Use Case Model.png','Use Case Model.png',NULL),(68,'Fatema Merza','2021-06-06 03:00:00',123456789,32323232,32323232,'Merza Yusuf','2023-12-06 03:00:00','-','2023-12-06 09:41:39','2023-12-06 09:43:57',NULL,1,NULL,'Female','KG1','IMG_2818.jpg','IMG_2818.jpg','new-report.png',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (17,'k.alekri@outlook.com','Admin','Kawthar Alekri','Enabled','2023-11-23 10:43:16','2023-11-23 10:43:16',1),(18,'202003447@student.polytechnic.bh','Teacher','Kawthar Mohammed','Enabled','2023-11-23 22:22:38','2023-11-23 22:22:38',1),(19,'zahraaalekri2@gmail.com','Staff','Zahraa Alekri','Enabled','2023-11-26 19:28:45','2023-11-26 19:28:45',1),(20,'f6um5x@gmail.com','Admin','FATEMA ALI','Enabled','2023-11-26 21:02:48','2023-11-26 21:02:48',29),(21,'m@gmail.com','Admin','Malaak','Enabled','2023-11-27 11:47:10','2023-11-27 11:47:10',31),(22,'zainabb@gg.com','Parent','Zainab','Enabled','2023-11-28 20:09:44','2023-11-28 20:09:44',NULL),(23,'zainab@12.com','Parent','zaynab','Enabled','2023-11-28 21:05:50','2023-11-28 21:05:50',NULL),(24,'fairy@magic.com','Parent','Fairy','Enabled','2023-11-28 21:14:42','2023-11-28 21:14:42',NULL),(25,'princess@gmail.com','Parent',':pp','Enabled','2023-11-28 21:27:21','2023-11-28 21:27:21',NULL),(26,'roro@rere.com','Parent','Roro','Enabled','2023-11-28 21:45:27','2023-11-28 21:45:27',NULL),(27,'ifatima.marhoon@gmail.com','Teacher','Noura','Enabled','2023-11-30 20:26:00','2023-11-30 20:26:00',1),(28,'zainab@alef.com','Parent','zainab','Enabled','2023-12-01 21:40:39','2023-12-01 21:40:39',NULL),(30,'zainab@android.com','Parent','android','Enabled','2023-12-06 01:11:52','2023-12-06 01:11:52',NULL);
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

-- Dump completed on 2023-12-06 12:15:38
