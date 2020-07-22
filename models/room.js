module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        room_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    // Turned off for v1 functionality
    // Room.associate = function(models) {
    //     // Room has one-to-many relationship with Message - foreign key in Message
    //     Room.hasMany(models.Message, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    //     // Room has many-to-many relationship with User - junction table holds foreign keys
    //     Room.belongsToMany(models.User, { 
    //         through: 'junctionTable'})
    // };
    return Room;
};