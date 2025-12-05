module.exports = (sequelize, DataTypes) => {
    const Method = sequelize.define("Method", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        methodName: { type: DataTypes.STRING, allowNull: false, unique: true },
        matrix: { type: DataTypes.ENUM("WATER", "SOIL", "AIR", "OTHER"), allowNull: false },
        description: DataTypes.TEXT,
        units: DataTypes.STRING,
        detectionLimit: DataTypes.FLOAT,
    })
    return Method;
}
