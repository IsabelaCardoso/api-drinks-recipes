module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Ingredients',
      [
        {
          ingredient: 'Galliano"',
          measure: '2 1/2 shots ',
          drinkId: 1,
        },
        {
          ingredient: 'Ginger al',
          measure: ' ',
          drinkId: 1,
        },
        {
          ingredient: 'Ice',
          measure: ' ',
          drinkId: 1,
        },
        {
          ingredient: 'Gin',
          measure: '1 3/4 shot',
          drinkId: 2,
        },
        {
          ingredient: 'Grand Marnier',
          measure: '1 Shot',
          drinkId: 2,
        },
        {
          ingredient: 'Lemon Juice',
          measure: '1/4 Shot',
          drinkId: 2,
        },
        {
          ingredient: 'Grenadine',
          measure: '1/8 Shot',
          drinkId: 2,
        },
        {
          ingredient: 'Sambuca',
          measure: '2 cl ',
          drinkId: 3,
        },
        {
          ingredient: 'Baileys irish cream',
          measure: '2 cl ',
          drinkId: 3,
        },
        {
          ingredient: 'White Creme de Menthe',
          measure: '2 cl ',
          drinkId: 3,
        },
        {
          ingredient: 'Coffee',
          measure: '1 part',
          drinkId: 4,
        },
        {
          ingredient: 'Grain alcohol',
          measure: '2 parts',
          drinkId: 4,
        },
        {
          ingredient: 'Orange Bitters',
          measure: '1 dash',
          drinkId: 5,
        },
        {
          ingredient: 'Green Chartreuse',
          measure: '1 oz',
          drinkId: 5,
        },
        {
          ingredient: 'Gin',
          measure: '1 oz',
          drinkId: 5,
        },
        {
          ingredient: 'Sweet Vermouth',
          measure: '1 oz',
          drinkId: 5,
        },
        {
          ingredient: 'Gin',
          measure: '6 cl',
          drinkId: 6,
        },
        {
          ingredient: 'Peach Bitters',
          measure: '2 dashes',
          drinkId: 6,
        },
        {
          ingredient: 'Mint',
          measure: '2 Fresh leaves',
          drinkId: 6,
        },  
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Ingredients', null, {});
  },
};
