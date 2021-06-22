module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    ingredient: DataTypes.STRING,
    measure: DataTypes.STRING,
    drinkId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Drink, { foreignKey: 'drinkId', as: 'drink' });
  };
  
  return Ingredient;
};
