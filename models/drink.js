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

  return Drink;
};