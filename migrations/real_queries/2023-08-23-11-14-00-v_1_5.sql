drop table cafe_photos_s3;

CREATE TABLE cafe_photo_urls (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  cafe_uuid VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  primary key (`id`)
);

drop table cafe_thumbnail_s3;

CREATE TABLE `cafe_thumbnail_urls` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafe_photo_url_id` bigint NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
);
