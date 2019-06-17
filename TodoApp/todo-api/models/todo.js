'use strict'
module.exports = (sequelize, DataType) => {
    const Todo = sequelize.define('Todo', {
        // attributes
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        content: {
            type: DataType.STRING,
            allowNull: false
        },
        order: DataType.INTEGER,
        deleted: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        boardId: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
              model: "Boards",
              key: 'id'
            }
        }
    },{});
    Todo.associate = function (models) {
        models.Board.hasMany(models.Todo, { foreignKey: 'boardId' });
    };
    return Todo
}