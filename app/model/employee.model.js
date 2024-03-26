module.exports = (sequelize,DataType) => {
    const Employee = sequelize.define("employee", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
        },
        position: {
            type: DataType.STRING,
            allowNull: false,
        }
    });
    return Employee;
};