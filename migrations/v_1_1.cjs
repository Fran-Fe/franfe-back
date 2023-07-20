'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.query('CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT,`name` varchar(255) NOT NULL,`email` varchar(255) NOT NULL,`password` varchar(255) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;')
    /**
     * Add altering commands here.
     *
     * Example:
     *     await queryInterface.createTable('users', {
     *       id: {
     *         type: Sequelize.INTEGER,
     *         primaryKey: true,
     *         autoIncrement: false
     *       },
     *       name: Sequelize.STRING,
     *       email: Sequelize.STRING,
     *       password: Sequelize.STRING,
     *     });
     */
  },

  async down (queryInterface, Sequelize) {

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
