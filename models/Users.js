module.exports = function(sequelize, DataType) {
    const Users = sequelize.define("Users", {
        name: DataType.STRING,
        scores: DataType.STRING
        
    });
    return Users;
};