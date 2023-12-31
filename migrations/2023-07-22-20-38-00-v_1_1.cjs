'use strict';
const fs = require('fs');
const getRealQueryFileName = require('./fileName.cjs');
const path = require('path');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileName = getRealQueryFileName(__filename);
    const filePath = path.join(__dirname, fileName);

    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      await queryInterface.sequelize.query(data.toString())

    } catch (err) {
      console.error(err);
    }

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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cafes');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
