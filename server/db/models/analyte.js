module.exports = (sequelize, DataTypes) => {
  const Analyte = sequelize.define("Analyte", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    analyteCode: { type: DataTypes.STRING, allowNull: false, unique: true },
    analyteName: { type: DataTypes.STRING, allowNull: true },
    description: DataTypes.STRING,
  });
  return Analyte;
};
