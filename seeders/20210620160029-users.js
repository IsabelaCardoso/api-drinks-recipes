module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        firstName: 'Isa',
        lastName: 'Cardoso',
        email: 'test@test.com',
        password: '123456',
      },
      {
        id: 2,
        firstName: 'Cat',
        lastName: 'Cardoso',
        email: 'cat@gato.com',
        password: '123456',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
