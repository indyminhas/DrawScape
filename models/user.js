const bcrypt = require("bcrypt");
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });
    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    })

    User.associate = function(models) {
        // User has one-to-many relationship with Message - foreign key in Message
        User.hasMany(models.Message, {
            onDelete: 'CASCADE',
            hooks: true,
            foreignKey: {
                allowNull: true
            }
        });
        // User has many-to-many relationship with Room - junction table holds foreign keys
        User.belongsToMany(models.Room, { 
            as: 'playroom',
            onDelete: 'CASCADE' ,
            through: 'junctionTable'})
            
        User.hasMany(models.Room,{
            onDelete: 'CASCADE' ,
            hooks: true,
            foreignKey:{allowNull:true}
        })
    };
    return User;
};