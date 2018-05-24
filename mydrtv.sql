CREATE DATABASE  IF NOT EXISTS `mydrtv` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydrtv`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydrtv
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_uid` varchar(64) NOT NULL,
  `coment` text NOT NULL,
  `date_time_posted` datetime NOT NULL,
  `user_uid` varchar(64) DEFAULT NULL,
  `video_uid` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`comment_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_uid` varchar(64) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password_salt` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_role_uid` varchar(64) NOT NULL,
  PRIMARY KEY (`user_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('c5fb8617-5f47-11e8-b069-4ccc6ae28920','johnny@live.dk','Johnny Bravo','3245a5b2b3b3143552278bfc37fe3d05','3b35df944b6faffbae396b375ab9af9225a328ace857e9432d0ed4c470860295dca3643fb92d6e2e00cdc43e739a38e78066ecddbf7630a0c8ae19bf075f432c','4a302ab1-5f3e-11e8-b069-4ccc6ae28920');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_role_uid` varchar(64) NOT NULL,
  `user_role_name` varchar(64) NOT NULL,
  PRIMARY KEY (`user_role_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('44ed95ae-5f3e-11e8-b069-4ccc6ae28920','Admin'),('4a302ab1-5f3e-11e8-b069-4ccc6ae28920','Basic');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `video_uid` varchar(64) NOT NULL,
  `year_of_production` varchar(50) NOT NULL,
  `title` varchar(250) NOT NULL,
  `genre` varchar(250) NOT NULL,
  `rating` decimal(10,1) NOT NULL,
  `url` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `poster` varchar(250) NOT NULL,
  PRIMARY KEY (`video_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES ('28050c4f-5f4e-11e8-b069-4ccc6ae28920','2001','Harry Potter and the Philosophers Stone','Fantasy',7.6,'harry-potter-philosopher.mkv','Movie','harrypotterposter.jpg'),('6e1cf3e3-5f4f-11e8-b069-4ccc6ae28920','2017','The Handmaids Tale: Faithful','Drama',8.6,'the-handmaids-tale-faithful.mkv','TvProgram','handmaidstale.jpg');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydrtv'
--

--
-- Dumping routines for database 'mydrtv'
--
/*!50003 DROP PROCEDURE IF EXISTS `AddUpdateComment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sola`@`localhost` PROCEDURE `AddUpdateComment`(
IN _comment_uid varchar(64),
IN _comment TEXT,
IN _user_uid varchar(64),
IN _video_uid varchar(64)
)
BEGIN
	IF _comment_uid IS NULL THEN
    SET _comment_uid = UUID();
	BEGIN
		INSERT INTO comment (comment_uid, comment, date_time_posted, user_uid, video_uid)
        VALUES (_comment_uid, _comment, NOW(), _user_uid, _video_uid);
    END;
    ELSE 
    BEGIN
		UPDATE comment
        SET comment = _comment,
			_date_time_posted = NOW()
		WHERE comment_uid = _comment_uid AND user_uid = _user_uid;
    END;
    END IF;
    SELECT * FROM comment_uid WHERE comment_uid = _comment_uid AND user_uid = _user_uid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AddUpdateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sola`@`localhost` PROCEDURE `AddUpdateUser`(
IN _user_uid varchar(64),
IN _email varchar(255),
IN _name varchar(255),
IN _password_Salt varchar(50),
IN _password varchar(255),
IN _user_role_name varchar(64)
)
BEGIN
	IF _user_uid IS NULL THEN
    SET _user_uid = UUID();
    if _user_role_name = 'Admin' then
	SELECT @user_role_uid := user_role_uid from user_role where user_role_name = _user_role_name;
	elseif _user_role_name = 'Basic' then
	SELECT @user_role_uid := user_role_uid from user_role where user_role_name = _user_role_name;
	END IF;
    BEGIN
		INSERT INTO user (user_uid, email, name, password_salt, password, user_role_uid)
        VALUES (_user_uid, _email, _name, _password_salt, _password, @user_role_uid);
    END;
    ELSE
    BEGIN
		UPDATE user
        SET email = _email,
			name = _name,
			password_salt = _password_salt,
            password = _password
		WHERE user_uid = _user_uid;
    END;
    END IF;
    SELECT user_uid, email, name, (SELECT user_role_name FROM user_role WHERE user_role_uid = @user_role_uid) AS user_role FROM user WHERE user_uid = _user_uid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AddUpdateVideo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sola`@`localhost` PROCEDURE `AddUpdateVideo`(
IN _video_uid varchar(64),
IN _year_of_production DATE,
IN _title varchar(250),
IN _genre  varchar(250),
IN _rating int,
IN _url varchar(250),
IN _type varchar(250),
IN _poster varchar(250)
)
BEGIN
	IF _video_uid IS NULL THEN
    SET _video_uid = UUID();
	BEGIN
		INSERT INTO video (video_uid, year_of_production, title, genre, rating, url, type, poster)
        VALUES (_video_uid, _year_of_production, _title, _genre, _rating, _url, _type, _poster);
    END;
    ELSE 
    BEGIN
		UPDATE video
        SET year_of_production = _year_of_production,
			title = _title,
            genre = _genre,
            rating = _rating,
            url = _url,
            type = _type
		WHERE video_uid = _video_uid;
    END;
    END IF;
    SELECT * FROM video WHERE video_uid = _video_uid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-24 14:42:29
