'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

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
