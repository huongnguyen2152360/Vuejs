'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Todos', 'boardId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Boards",
            key: 'id'
          }
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Todos', 'boardId', { transaction: t })
      ])
    })
  }
};
