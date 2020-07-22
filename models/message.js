module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    // Turned off for v1 functionality
    // Message.associate = function(models) {
    //     // Message belongs to User in a one-to-one relationship - foreign key in Message
    //     Message.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    //     // Message belongs to Room in a one-to-one relationship - foreign key in Message
    //     Message.belongsTo(models.Room, { 
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // };
    return Message;
};