module.exports = (sequelize) => {
  const Pedido = sequelize.define('Pedido', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mesaId: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mesas',
        key: 'id'
      }
    },
    status: {
      type: sequelize.Sequelize.ENUM('aberto', 'preparando', 'pronto', 'entregue', 'fechado'),
      defaultValue: 'aberto'
    },
    total: {
      type: sequelize.Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    }
  }, {
    tableName: 'pedidos',
    timestamps: true
  });

  return Pedido;
};