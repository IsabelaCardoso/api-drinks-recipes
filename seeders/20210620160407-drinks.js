module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Drinks',
      [{
        id: 1,
        userId: 1,
        strDrink: 'GG',
        strAlcoholic: 'Optional alcohol',
        strInstructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        strIngredient1: 'Galliano',
        strIngredient2: 'Ginger ale',
        strIngredient3: 'Ice',
        strMeasure1: '2 1/2 shots',
        published: new Date('2021-06-01T19:58:00.000Z'),
        updated: new Date('2021-06-01T19:58:51.000Z'),
      },
      {
        id: 2,
        userId: 2,
        strDrink: 'A1',
        strAlcoholic: 'Alcoholic',
        strInstructions: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        strIngredient1: 'Gin',
        strIngredient2: 'Grand Marnier',
        strIngredient3: 'Lemon Juice',
        strIngredient4: 'Grenadine',
        strMeasure1: '1 3/4 shot ',
        strMeasure2: '1 Shot',
        strMeasure3: '1/4 Shot',
        strMeasure4: '1/8 Shot',
        published: new Date('2021-05-01T19:58:00.000Z'),
        updated: new Date('2021-05-01T19:58:51.000Z'),
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
