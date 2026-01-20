export default (sequelize, DataTypes) => {
  return sequelize.define("Case", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
