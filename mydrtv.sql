-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2018 at 02:58 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mydrtv`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddUpdateComment`(IN `_comment_uid` VARCHAR(64), IN `_comment` TEXT, IN `_user_uid` VARCHAR(64), IN `_video_uid` VARCHAR(64))
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
    SELECT * FROM comment WHERE comment_uid = _comment_uid AND user_uid = _user_uid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddUpdateUser`(IN `_user_uid` VARCHAR(64), IN `_email` VARCHAR(255), IN `_name` VARCHAR(255), IN `_password_Salt` VARCHAR(50), IN `_password` VARCHAR(255), IN `_user_role_name` VARCHAR(64))
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddUpdateVideo`(IN `_video_uid` VARCHAR(64), IN `_year_of_production` VARCHAR(50), IN `_title` VARCHAR(250), IN `_genre` VARCHAR(250), IN `_rating` INT, IN `_url` VARCHAR(250), IN `_type` VARCHAR(250), IN `_poster` VARCHAR(250))
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
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_uid` varchar(64) NOT NULL,
  `comment` text NOT NULL,
  `date_time_posted` datetime NOT NULL,
  `user_uid` varchar(64) DEFAULT NULL,
  `video_uid` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`comment_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_uid`, `comment`, `date_time_posted`, `user_uid`, `video_uid`) VALUES
('1e0ae851-6cad-11e8-a576-005056c00001', 'sup', '2018-06-10 14:51:52', 'd7038148-6ca4-11e8-a576-005056c00001', '28050c4f-5f4e-11e8-b069-4ccc6ae28920'),
('6102533d-6cad-11e8-a576-005056c00001', 'hey', '2018-06-10 14:53:44', 'd7038148-6ca4-11e8-a576-005056c00001', '28050c4f-5f4e-11e8-b069-4ccc6ae28920'),
('b278223c-6cac-11e8-a576-005056c00001', 'hey', '2018-06-10 14:48:51', NULL, '28050c4f-5f4e-11e8-b069-4ccc6ae28920'),
('be233311-6ca9-11e8-a576-005056c00001', 'hey', '2018-06-10 14:27:42', 'a94518e6-5b8e-11e8-9f1d-005056825f2d', '28050c4f-5f4e-11e8-b069-4ccc6ae28920'),
('e2da6210-6ca9-11e8-a576-005056c00001', 'hey', '2018-06-10 14:28:44', 'a94518e6-5b8e-11e8-9f1d-005056825f2d', '28050c4f-5f4e-11e8-b069-4ccc6ae28920'),
('fd38ecd2-6ca9-11e8-a576-005056c00001', 'amazing movie! ', '2018-06-10 14:29:28', 'a94518e6-5b8e-11e8-9f1d-005056825f2d', '28050c4f-5f4e-11e8-b069-4ccc6ae28920'),
('ff9b9ca9-6cac-11e8-a576-005056c00001', 'hey', '2018-06-10 14:51:01', 'd7038148-6ca4-11e8-a576-005056c00001', '28050c4f-5f4e-11e8-b069-4ccc6ae28920');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_uid` varchar(64) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password_salt` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_role_uid` varchar(64) NOT NULL,
  PRIMARY KEY (`user_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_uid`, `email`, `name`, `password_salt`, `password`, `user_role_uid`) VALUES
('c5fb8617-5f47-11e8-b069-4ccc6ae28920', 'johnny@live.dk', 'Johnny Bravo', '3245a5b2b3b3143552278bfc37fe3d05', '3b35df944b6faffbae396b375ab9af9225a328ace857e9432d0ed4c470860295dca3643fb92d6e2e00cdc43e739a38e78066ecddbf7630a0c8ae19bf075f432c', '4a302ab1-5f3e-11e8-b069-4ccc6ae28920'),
('d7038148-6ca4-11e8-a576-005056c00001', 'test@me.com', 'Vasilena Chobanova', '2d70647bc5e7c1379e18348e097fb5a4', 'abbe5418faa775cb5e615ded2c4ce5ef584f2f0619d7577323f45d5b03dc7ce4245013dccd056297a56d8d33a43354d8c1b858fb20cc58a68cfaf639ca2c1e4b', '4a302ab1-5f3e-11e8-b069-4ccc6ae28920');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE IF NOT EXISTS `user_role` (
  `user_role_uid` varchar(64) NOT NULL,
  `user_role_name` varchar(64) NOT NULL,
  PRIMARY KEY (`user_role_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_role_uid`, `user_role_name`) VALUES
('44ed95ae-5f3e-11e8-b069-4ccc6ae28920', 'Admin'),
('4a302ab1-5f3e-11e8-b069-4ccc6ae28920', 'Basic');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE IF NOT EXISTS `video` (
  `video_uid` varchar(64) NOT NULL,
  `year_of_production` varchar(50) NOT NULL,
  `title` varchar(250) NOT NULL,
  `genre` varchar(250) NOT NULL,
  `rating` decimal(10,1) NOT NULL,
  `url` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `poster` varchar(250) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`video_uid`, `year_of_production`, `title`, `genre`, `rating`, `url`, `type`, `poster`, `date_added`) VALUES
('25ce9306-6b5a-11e8-bf69-4ccc6ae28920', '2001', 'Monsters, Inc.', 'Animation', '8.1', 'test', 'Movie', 'monstersincposter.jpg', '2018-06-08 22:25:23'),
('28050c4f-5f4e-11e8-b069-4ccc6ae28920', '2001', 'Harry Potter and the Philosophers Stone', 'Fantasy', '7.6', 'harry-potter-philosopher.mkv', 'Movie', 'harrypotterposter.jpg', '2018-05-07 00:23:48'),
('2f714d92-6b5e-11e8-bf69-4ccc6ae28920', '2013', 'Frozen', 'Animation', '7.5', 'test', 'Movie', 'frozenposter.jpg', '2018-06-08 22:54:12'),
('6d170443-6a33-11e8-84dc-4ccc6ae28920', '2016', 'Deadpool', 'Action', '8.0', 'test', 'Movie', 'deadpoolposter.jpg', '2018-06-07 11:16:08'),
('6e1cf3e3-5f4f-11e8-b069-4ccc6ae28920', '2017 -', 'The Handmaids Tale: Faithful', 'Drama', '8.6', 'the-handmaids-tale-faithful.mkv', 'TvProgram', 'handmaidstale.jpg', '2018-06-07 00:23:48'),
('7a5dedd2-6a37-11e8-84dc-4ccc6ae28920', '2016', 'Moana', 'Animation', '7.6', 'test', 'Movie', 'moanaposter.jpg', '2018-06-07 11:45:08'),
('a19c80bf-6a38-11e8-84dc-4ccc6ae28920', '2016', 'Arrival', 'Sci-Fi', '7.9', 'test', 'Movie', 'arrivalposter.jpg', '2018-06-07 11:53:24'),
('df905136-6a37-11e8-84dc-4ccc6ae28920', '2013 -', 'Orange Is the New Black', 'Comedy', '8.2', 'test', 'TvProgram', 'orangeisthenewblackposter.jpg', '2018-06-07 11:47:58');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
