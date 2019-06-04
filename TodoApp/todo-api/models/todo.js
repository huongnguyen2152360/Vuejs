'use strict'
module.exports = (sequelize, DataType) => {
    const Todo = sequelize.define('todo', {
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
        dateCreated: {
            type: DataType.STRING,
            allowNull: false
        }
    });
    return Todo
}