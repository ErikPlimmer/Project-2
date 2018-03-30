var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
          },
        petName: {
            type: DataTypes.STRING,
            allowNull: true
          },
        petType: {
            type: DataTypes.STRING,
            allowNull: true
          },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true
          },
        location: {
            type: DataTypes.STRING,
            allowNull: true
          },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
              isEmail: true
            }
            },
        password: {
            type: DataTypes.STRING,
            allowNull: true
          }
        
    });
    Users.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      Users.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });
    return Users;
};