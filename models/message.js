module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
            charset: 'utf8mb4'
        }
    });
    Message.associate = function(models) {
        // Message belongs to User in a one-to-one relationship - foreign key in Message
        Message.belongsTo(models.User, {
            onDelete: 'CASCADE' ,
            foreignKey: {
                allowNull: true
            }
        });
        // Message belongs to Room in a one-to-one relationship - foreign key in Message
        Message.belongsTo(models.Room, {
            onDelete: 'CASCADE' ,
            foreignKey: {
                allowNull: true
            }
        })
    };

    return Message;
};