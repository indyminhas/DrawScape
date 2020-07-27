module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        room_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        route_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Room.associate = function(models) {
        // Room has one-to-many relationship with Message - foreign key in Message
        Room.hasMany(models.Message, {
            onDelete: 'CASCADE' ,
            hooks: true,
            foreignKey: {
                allowNull: true
            }
        });
        // Room has many-to-many relationship with User - junction table holds foreign keys
        Room.belongsToMany(models.User, { 
            as: 'playroom',
            onDelete: 'CASCADE' ,
            through: 'junctionTable'})

        Room.belongsTo(models.User, {
            onDelete: 'CASCADE' ,
            foreignKey:{
                allowNull:true
            }
        })
    };
    return Room;
};