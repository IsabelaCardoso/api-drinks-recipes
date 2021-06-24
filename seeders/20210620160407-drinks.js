module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Drinks',
      [
        {
          name: 'GG',
          category: 'Optional alcohol',
          instructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
          image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        },
        {
          name: 'A1',
          category: 'Alcoholic',
          instructions: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
          image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        },
        {
          name: 'Zorro',
          category: 'Alcoholic',
          instructions: 'Add all and pour black coffee and add whipped cream on top.',
          image: 'https://www.thecocktaildb.com/images/media/drink/kvvd4z1485621283.jpg',
        },
        {
          name: 'Karsk',
          category: 'Alcoholic',
          instructions: 'Put a copper coin in a coffe-cup and fill up with coffee until you no longer see the coin, then add alcohol until you see the coin. Norwegian speciality.',
          image: 'https://www.thecocktaildb.com/images/media/drink/808mxk1487602471.jpg',
        },
        {
          name: 'Bijou',
          category: 'Alcoholic',
          instructions: 'Stir in mixing glass with ice and strain',
          image: 'https://www.thecocktaildb.com/images/media/drink/rysb3r1513706985.jpg',
        },
        {
          name: 'Derby',
          category: 'Alcoholic',
          instructions: 'Pour all ingredients into a mixing glass with ice. Stir. Strain into a cocktail glass. Garnish with a sprig of fresh mint in the drink.',
          image: 'https://www.thecocktaildb.com/images/media/drink/52weey1606772672.jpg',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Drinks', null, {});
  },
};
