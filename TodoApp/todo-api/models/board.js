'use strict'
module.exports = (sequelize, DataType) => {
    const Board = sequelize.define('Board', {
        // attributes
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        deleted: {
            type: DataType.BOOLEAN,
            defaultValue: false
        }
    },{});
    Board.associate = function (models) {
        models.Todo.belongsTo(models.Board, { foreignKey: 'boardId' });
    };
    return Board
}