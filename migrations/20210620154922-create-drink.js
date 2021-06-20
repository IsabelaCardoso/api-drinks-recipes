'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      strDrink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      strAlcoholic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      strInstructions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      strDrinkThumb: {
        type: Sequelize.STRING,
      },
      strIngredient1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      strIngredient2: {
        type: Sequelize.STRING,
      },
      strIngredient3: {
        type: Sequelize.STRING,
      },
      strIngredient4: {
        type: Sequelize.STRING
      },
      strIngredient5: {
        type: Sequelize.STRING
      },
      strIngredient6: {
        type: Sequelize.STRING
      },
      strIngredient7: {
        type: Sequelize.STRING
      },
      strIngredient8: {
        type: Sequelize.STRING
      },
      strIngredient9: {
        type: Sequelize.STRING
      },
      strIngredient10: {
        type: Sequelize.STRING
      },
      strMeasure1: {
        type: Sequelize.STRING
      },
      strMeasure2: {
        type: Sequelize.STRING
      },
      strMeasure3: {
        type: Sequelize.STRING
      },
      strMeasure4: {
        type: Sequelize.STRING
      },
      strMeasure5: {
        type: Sequelize.STRING
      },
      strMeasure6: {
        type: Sequelize.STRING
      },
      strMeasure7: {
        type: Sequelize.STRING
      },
      strMeasure8: {
        type: Sequelize.STRING
      },
      strMeasure9: {
        type: Sequelize.STRING
      },
      strMeasure10: {
        type: Sequelize.STRING
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Drinks');
  }
};