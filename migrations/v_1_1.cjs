'use strict';
import fs from 'fs';
import { getRealQueryFileName } from './fileName.js';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const filePath = getRealQueryFileName(__filename);

    fs.readFile(filePath, 'utf-8', async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        await queryInterface.query(data);
        console.log(data);
      }
    })


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

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
