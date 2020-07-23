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
    User.associate = function(models) {
        // User has one-to-many relationship with Message - foreign key in Message
        User.hasMany(models.Message, {
            foreignKey: {
                allowNull: false
            }
        });
        // User has many-to-many relationship with Room - junction table holds foreign keys
        User.belongsToMany(models.Room, { 
            through: 'junctionTable'})
    };
    return User;
};