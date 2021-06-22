module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define("Drink", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    instructions: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Drink.associate = (models) => {
    Drink.hasMany(models.Ingredient, { foreignKey: 'drinkId', as: 'ingredients' });
  };

  return Drink;
};
