INSERT INTO `franfe`.`cafes` (`uuid`, `address`, `lat`, `lng`, `place_name`, `overview`, `rating`) VALUES ('abc', 'aa', 123, 123, '11111', 'good', 5);

INSERT INTO `franfe`.`cafe_thumbnail_s3` (`bucket_url`, `cafe_uuid`, `category`) VALUES ('urlurlurl', 'abc', 1);

INSERT INTO `franfe`.`cafe_reviews` (`id`, `cafe_uuid`, `author_name`, `rating`, `relative_time_description`) VALUES (1, 'abc', 'rogan', 4, 'sdfasfsafdsa');

INSERT INTO `franfe`.`cafe_review_texts` (`id`, `cafe_review_id`, `text`) VALUES (1, 1, 'asdfsadfsdafsda');

INSERT INTO `franfe`.`cafe_options` (`cafe_uuid`, `option`, `option_on`) VALUES ('abc', 'asdf', 1);

INSERT INTO `franfe`.`cafe_options` (`cafe_uuid`, `option`, `option_on`) VALUES ('abc', '124', 0);

INSERT INTO `franfe`.`cafe_hashtags` (`cafe_uuid`, `hashtag`) VALUES ('abc', 'asdf');

INSERT INTO `franfe`.`cafe_hashtags` (`cafe_uuid`, `hashtag`) VALUES ('abc', '1241');

INSERT INTO `franfe`.`cafe_hashtags` (`cafe_uuid`, `hashtag`) VALUES ('abc', '41');

INSERT INTO `franfe`.`cafes` (`uuid`, `address`, `lat`, `lng`, `place_name`, `overview`, `rating`) VALUES ('abcabc', 'aa', 123, 123, '11111', 'good', 5);

INSERT INTO `franfe`.`cafe_thumbnail_s3` (`bucket_url`, `cafe_uuid`, `category`) VALUES ('urlurl', 'abcabc', 1);

INSERT INTO `franfe`.`cafe_reviews` (`id`, `cafe_uuid`, `author_name`, `rating`, `relative_time_description`) VALUES (2, 'abcabc', 'rogan', 4, 'sdfasfsafdsa');

INSERT INTO `franfe`.`cafe_review_texts` (`id`, `cafe_review_id`, `text`) VALUES (2, 2, 'asdfsadfsdafsda');

INSERT INTO `franfe`.`cafe_options` (`cafe_uuid`, `option`, `option_on`) VALUES ('abcabc', 'asdf', 1);

INSERT INTO `franfe`.`cafe_options` (`cafe_uuid`, `option`, `option_on`) VALUES ('abcabc', '124', 0);

INSERT INTO `franfe`.`cafe_hashtags` (`cafe_uuid`, `hashtag`) VALUES ('abcabc', 'asdf');

INSERT INTO `franfe`.`cafe_hashtags` (`cafe_uuid`, `hashtag`) VALUES ('abcabc', '1241');

INSERT INTO `franfe`.`cafe_hashtags` (`cafe_uuid`, `hashtag`) VALUES ('abcabc', '41');

INSERT INTO `franfe`.`cafe_click_counts` (`id`, `cafe_uuid`, `user_comparison_count`, `user_compare_win_count`) VALUES (2, 'abcabc', 0, 0);

INSERT INTO `franfe`.`cafe_click_counts` (`id`, `cafe_uuid`, `user_comparison_count`, `user_compare_win_count`) VALUES (1, 'abc', 0, 0);
