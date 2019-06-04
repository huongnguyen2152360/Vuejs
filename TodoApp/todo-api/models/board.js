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
        }
    });
    return Board
}