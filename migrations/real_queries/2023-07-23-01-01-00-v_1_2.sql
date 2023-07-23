CREATE TABLE if not EXISTS `cafe_click_counts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cafe_uuid` varchar(45) NOT NULL,
  `user_comparison_count` bigint NOT NULL DEFAULT '0',
  `user_compare_win_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);