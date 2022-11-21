'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        balance: 115.00
      },
      {
        balance: 95.00
      },
      {
        balance: 110.00
      },
      {
        balance: 80.00
      }
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {})
  }
}
