'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        debited_account_id: 1,
        credited_account_id: 3,
        value: 10,
        created_at: '2022-01-08 04:05:06'
      },
      {
        debited_account_id: 1,
        credited_account_id: 4,
        value: 5,
        created_at: '2022-11-08 04:05:06'
      },
      {
        debited_account_id: 1,
        credited_account_id: 2,
        value: 15,
        created_at: '2022-10-15 04:05:06'
      },
      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 30,
        created_at: '2022-11-20 04:05:06'
      },
      {
        debited_account_id: 3,
        credited_account_id: 1,
        value: 15,
        created_at: '2022-08-30 04:05:06'
      },
      {
        debited_account_id: 4,
        credited_account_id: 2,
        value: 10,
        created_at: '2022-04-02 04:05:06'
      },
      {
        debited_account_id: 4,
        credited_account_id: 3,
        value: 15,
        created_at: '2022-09-09 04:05:06'
      },
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {})

  }
}
