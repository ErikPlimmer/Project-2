module.exports = function(sequelize, DataType) {
    const Pets = sequelize.define("Pets", {
        type: DataType.STRING,
        image: DataType.LONGBLOB,
        description: DataType.STRING,
        score: DataType.STRING
        
    });
    return Pets;
};