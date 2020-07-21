module.exports = function(sequelize, DataTypes) {
    var Word = sequelize.define("Word", {
        word: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 1
            }
        },
        difficulty_category: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });
    return Word;
};