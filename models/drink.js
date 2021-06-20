module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define("Drink", {
    strDrink: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    strAlcoholic: DataTypes.STRING,
    strInstructions: DataTypes.STRING,
    strDrinkThumb: DataTypes.STRING,
    strIngredient1: DataTypes.STRING,
    strIngredient2: DataTypes.STRING,
    strIngredient3: DataTypes.STRING,
    strIngredient4: DataTypes.STRING,
    strIngredient5: DataTypes.STRING,
    strIngredient6: DataTypes.STRING,
    strIngredient7: DataTypes.STRING,
    strIngredient8: DataTypes.STRING,
    strIngredient9: DataTypes.STRING,
    strIngredient10: DataTypes.STRING,
    strMeasure1: DataTypes.STRING,
    strMeasure2: DataTypes.STRING,
    strMeasure3: DataTypes.STRING,
    strMeasure4: DataTypes.STRING,
    strMeasure5: DataTypes.STRING,
    strMeasure6: DataTypes.STRING,
    strMeasure7: DataTypes.STRING,
    strMeasure8: DataTypes.STRING,
    strMeasure9: DataTypes.STRING,
    strMeasure10: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  Drink.associate = (models) => {
    Drink.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }

  return Drink;
};
