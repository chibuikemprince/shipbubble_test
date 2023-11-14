'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE DATABASE IF NOT EXISTS shippbubble;');
    await queryInterface.sequelize.query('CREATE DATABASE IF NOT EXISTS shippbubble_test;');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP DATABASE IF EXISTS shippbubble;');
    await queryInterface.sequelize.query('DROP DATABASE IF EXISTS shippbubble_test;');
  }
};



