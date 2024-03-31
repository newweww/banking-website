/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.36 : Database - clicknextdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`clicknextdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `clicknextdb`;

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `login` */

insert  into `login`(`id`,`username`,`password`,`user_id`) values 
(3,'user1','user',5),
(4,'user2','user',6);

/*Table structure for table `transaction` */

DROP TABLE IF EXISTS `transaction`;

CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `date_time` varchar(20) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `remain` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `transaction` */

insert  into `transaction`(`transaction_id`,`date_time`,`action`,`remain`,`amount`,`user_id`) values 
(54,'2024-03-09 04:48:55.','withdraw',2000,4000,6),
(55,'2024-03-09 04:49:39.','deposit',14000,8000,6),
(56,'2024-03-09 04:49:58.','withdraw',4000,2000,5),
(57,'2024-03-09 04:50:04.','deposit',6000,2000,5),
(58,'2024-03-09 04:50:17.','withdraw',5999,1,6),
(59,'2024-03-09 04:50:38.','deposit',6001,1,6),
(60,'2024-03-09 05:00:59.','withdraw',5981,20,6),
(61,'2024-03-09 05:01:10.','deposit',20000,20000,6),
(62,'2024-03-09 05:01:45.','withdraw',19750,250,6),
(63,'2024-03-09 05:01:53.','deposit',20750,1000,6),
(64,'2024-03-09 05:02:50.','withdraw',3980,20,6),
(65,'2024-03-09 05:08:54.','withdraw',8000,2000,5),
(66,'2024-03-09 05:09:01.','deposit',11000,3000,5),
(67,'2024-03-09 05:14:43.','withdraw',4460,20,6),
(68,'2024-03-09 05:19:48.','withdraw',4210,250,6),
(70,'2024-03-09 05:20:19.','withdraw',4210,0,6),
(72,'2024-03-09 05:20:27.','withdraw',3610,0,6),
(74,'2024-03-09 05:21:35.','deposit',3010,0,6),
(76,'2024-03-09 05:22:00.','deposit',3010,0,6),
(78,'2024-03-09 05:26:17.','deposit',10,0,6),
(80,'2024-03-09 05:27:30.','deposit',10000,0,6),
(82,'2024-03-09 05:28:53.','deposit',10500,0,6),
(84,'2024-03-09 05:30:12.','deposit',10750,0,6),
(86,'2024-03-09 05:30:29.','deposit',11000,0,6),
(88,'2024-03-09 05:30:50.','deposit',11000,0,6),
(89,'2024-03-09 05:31:56.','deposit',11500,250,6);

/*Table structure for table `transfer` */

DROP TABLE IF EXISTS `transfer`;

CREATE TABLE `transfer` (
  `transfer_id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `remain` int DEFAULT NULL,
  `actions` varchar(20) DEFAULT NULL,
  `from_user` varchar(20) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`transfer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `transfer` */

insert  into `transfer`(`transfer_id`,`date_time`,`user`,`remain`,`actions`,`from_user`,`amount`) values 
(37,'2024-03-09 04:42:31','user1',8000,'transfer','user2',2000),
(38,'2024-03-09 04:42:31','user2',12000,'receive','user1',2000),
(39,'2024-03-09 04:44:08','user1',6000,'transfer','user2',2000),
(40,'2024-03-09 04:44:08','user2',14000,'receive','user1',2000),
(41,'2024-03-09 05:02:05','user1',4000,'transfer','user1',2000),
(42,'2024-03-09 05:02:05','user1',8000,'receive','user1',2000),
(43,'2024-03-09 05:02:59','user2',2980,'transfer','user1',1000),
(44,'2024-03-09 05:02:59','user1',9000,'receive','user2',1000),
(45,'2024-03-09 05:08:09','user2',1980,'transfer','user1',1000),
(46,'2024-03-09 05:08:09','user1',10000,'receive','user2',1000),
(47,'2024-03-09 05:09:18','user1',8500,'transfer','user2',2500),
(48,'2024-03-09 05:09:18','user2',4480,'receive','user1',2500),
(49,'2024-03-09 05:23:33','user2',5510,'transfer','user1',2500),
(50,'2024-03-09 05:23:33','user1',11000,'receive','user2',2500),
(51,'2024-03-09 05:25:35','user2',5510,'transfer','',0),
(52,'2024-03-09 05:25:35','',5510,'receive','user2',0);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `balance` int DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`user_id`,`balance`,`name`) values 
(5,16500,'user1'),
(6,11500,'user2');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
