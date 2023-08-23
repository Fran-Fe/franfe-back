drop table cafe_photos_s3;

CREATE TABLE cafe_photo_urls (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  cafe_uuid VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL
);
