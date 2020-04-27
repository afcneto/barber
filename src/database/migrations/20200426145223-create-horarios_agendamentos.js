module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('horarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      horario: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
    },
      {
        timeStamps: true
      });
  },

  down: queryInterface => {
    return queryInterface.dropTable('horarios');
  },
};
