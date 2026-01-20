module.exports = (sequelize, DataTypes) => {
  const Matrix = sequelize.define("Matrix", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    matrixName: { type: DataTypes.STRING, allowNull: false },
    matrixCode: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: DataTypes.TEXT,
  });
  return Matrix;
};
