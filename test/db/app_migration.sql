CREATE TABLE if not EXISTS `cafes` (
  `uuid` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(100) NOT NULL,
  `lat` decimal(10,7) NOT NULL DEFAULT '123.1234567',
  `lng` decimal(10,7) NOT NULL DEFAULT '123.1234567',
  `place_name` varchar(45) NOT NULL,
  `overview` varchar(150) DEFAULT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '5.0',
  PRIMARY KEY (`uuid`)
);

CREATE TABLE if not EXISTS `cafe_click_counts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafe_uuid` varchar(45) NOT NULL,
  `user_comparison_count` bigint NOT NULL DEFAULT '0',
  `user_compare_win_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE `cafe_options` (
  `cafe_uuid` varchar(45) NOT NULL,
  `option` varchar(45) NOT NULL,
  `option_on` tinyint(1) NOT NULL DEFAULT '0'
);

CREATE TABLE `cafe_hashtags` (
  `cafe_uuid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `hashtag` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
);

CREATE TABLE `cafe_reviews` (
  `id` bigint NOT NULL,
  `cafe_uuid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `text` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cafe_thumbnail_s3` (
  `bucket_url` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cafe_uuid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`bucket_url`,`cafe_uuid`),
  UNIQUE KEY `bucket_url` (`bucket_url`)
);


