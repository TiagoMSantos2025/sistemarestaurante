module.exports = (sequelize) => {
  const Mesa = sequelize.define('Mesa', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: sequelize.Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: sequelize.Sequelize.ENUM('disponivel', 'ocupada', 'fechada'),
      defaultValue: 'disponivel'
    }
  }, {
    tableName: 'mesas',
    timestamps: true
  });

  return Mesa;
};