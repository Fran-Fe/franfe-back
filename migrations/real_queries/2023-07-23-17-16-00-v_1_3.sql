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
  `author_name` varchar(45) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `relative_time_description` varchar(50) NOT NULL,
  `text` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cafe_thumbnail_s3` (
  `bucket_url` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cafe_uuid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`bucket_url`,`cafe_uuid`),
  UNIQUE KEY `bucket_url` (`bucket_url`)
);

