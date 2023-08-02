CREATE TABLE `cafe_options` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafe_uuid` varchar(45) NOT NULL,
  `option` varchar(45) NOT NULL,
  `option_on` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
)

CREATE TABLE `cafe_hashtags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafe_uuid` varchar(32) NOT NULL,
  `hashtag` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `cafe_reviews` (
  `id` bigint NOT NULL,
  `cafe_uuid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cafe_thumbnail_s3` (
  `bucket_url` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cafe_uuid` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`bucket_url`,`cafe_uuid`),
  UNIQUE KEY `bucket_url` (`bucket_url`)
);

CREATE TABLE `cafe_review_texts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafe_review_id` bigint NOT NULL,
  `text` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
);
