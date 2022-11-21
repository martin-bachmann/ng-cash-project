'use strict'
const { hash } = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'joao.gomes',
        password: await hash('123456', 10),
        account_id: 1
      },
      {
        username: 'ferreira1988',
        password: await hash('123456', 10),
        account_id: 2
      },
      {
        username: 'CarolinaSouza',
        password: await hash('123456', 10),
        account_id: 3
      },
      {
        username: 'arthur1981',
        password: await hash('123456', 10),
        account_id: 4
      },
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
