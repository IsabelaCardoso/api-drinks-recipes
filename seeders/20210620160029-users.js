module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        fullName: 'User LastName',
        email: 'test@test.com',
        password: '123456',
      },
      {
        id: 2,
        fullName: 'Test User LastName',
        email: 'user@user.com',
        password: '123456',
      },
      {
        id: 3,
        fullName: 'Other User LastName',
        email: 'other@user.com',
        password: '123456',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
