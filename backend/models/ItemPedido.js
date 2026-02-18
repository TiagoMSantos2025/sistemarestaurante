module.exports = (sequelize) => {
  const ItemPedido = sequelize.define('ItemPedido', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pedidoId: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos',
        key: 'id'
      }
    },
    nome: {
      type: sequelize.Sequelize.STRING,
      allowNull: false
    },
    descricao: {
      type: sequelize.Sequelize.TEXT
    },
    preco: {
      type: sequelize.Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    quantidade: {
      type: sequelize.Sequelize.INTEGER,
      defaultValue: 1
    },
    status: {
      type: sequelize.Sequelize.ENUM('pendente', 'preparando', 'pronto', 'entregue'),
      defaultValue: 'pendente'
    }
  }, {
    tableName: 'itens_pedido',
    timestamps: true
  });

  return ItemPedido;
};