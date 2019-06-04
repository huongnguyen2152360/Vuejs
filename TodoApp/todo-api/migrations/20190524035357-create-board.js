'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 50]
        }
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Boards');
  }
};