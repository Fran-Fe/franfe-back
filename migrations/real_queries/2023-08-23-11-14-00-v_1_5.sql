drop table cafe_photos_s3;

CREATE TABLE cafe_photo_urls (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  cafe_uuid VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  category_id int NOT NULL DEFAULT '0',
  primary key (`id`)
);

drop table cafe_thumbnail_s3;
