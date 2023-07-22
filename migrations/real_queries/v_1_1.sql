CREATE TABLE `cafes` (
  `uuid` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(100) NOT NULL,
  `lat` decimal(10,7) NOT NULL DEFAULT '123.1234567',
  `lng` decimal(10,7) NOT NULL DEFAULT '123.1234567',
  `place_name` varchar(45) NOT NULL,
  `overview` varchar(150) DEFAULT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '5.0',
  PRIMARY KEY (`uuid`)
);