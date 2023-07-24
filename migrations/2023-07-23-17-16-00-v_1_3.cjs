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
      const sqls_string = fs.readFileSync(filePath, 'utf-8').toString();

      for (const sql_string of sqls_string.split('\n\n')) {
        if (!sql_string){
          break;
        }

        await queryInterface.sequelize.query(sql_string.replace('\n', ' '));
      }

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
    await queryInterface.dropTable('cafe_options');
    await queryInterface.dropTable('cafe_hashtags');
    await queryInterface.dropTable('cafe_reviews');
    await queryInterface.dropTable('cafe_thumbnail_s3');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
