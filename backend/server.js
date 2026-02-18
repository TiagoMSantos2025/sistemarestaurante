const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const qr = require('qrcode');

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Configuração do aplicativo
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Testar conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
  .catch(err => console.error('Erro na conexão com o banco de dados:', err));

// Modelos
const Mesa = require('./models/Mesa')(sequelize);
const Pedido = require('./models/Pedido')(sequelize);
const ItemPedido = require('./models/ItemPedido')(sequelize);

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: false })
  .then(() => console.log('Modelos sincronizados com o banco de dados'))
  .catch(err => console.error('Erro ao sincronizar modelos:', err));

// Rotas
app.get('/', (req, res) => {
  res.send('API do Sistema de Restaurante');
});

// Rotas para Mesas

// Rota para obter todas as mesas
app.get('/api/mesas', async (req, res) => {
  try {
    const mesas = await Mesa.findAll();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar uma nova mesa
app.post('/api/mesas', async (req, res) => {
  try {
    const { numero } = req.body;
    const mesa = await Mesa.create({ numero });
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para deletar uma mesa
app.delete('/api/mesas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Mesa.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas para Pedidos

// Rota para obter todos os pedidos
app.get('/api/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [{ model: ItemPedido }]
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo pedido
app.post('/api/pedidos', async (req, res) => {
  try {
    const { mesaId, nomeCliente, status = 'aberto', total = 0 } = req.body;
    const pedido = await Pedido.create({ mesaId, nomeCliente, status, total });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar o status de um pedido
app.put('/api/pedidos/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Pedido.update({ status }, { where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas para Itens de Pedido

// Rota para criar um novo item de pedido
app.post('/api/itens-pedido', async (req, res) => {
  try {
    const { pedidoId, nome, descricao, preco, quantidade = 1 } = req.body;
    const itemPedido = await ItemPedido.create({ pedidoId, nome, descricao, preco, quantidade });
    res.status(201).json(itemPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para gerar QR code de uma mesa
app.get('/api/mesas/:id/qrcode', async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      return res.status(404).json({ error: 'Mesa não encontrada' });
    }
    
    const url = `${req.protocol}://${req.get('host')}/cardapio/${id}`;
    qr.toDataURL(url, (err, url) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ qrcode: url, url });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter pedidos de uma mesa
app.get('/api/mesas/:id/pedidos', async (req, res) => {
  try {
    const { id } = req.params;
    const pedidos = await Pedido.findAll({
      where: { mesaId: id },
      include: [{ model: ItemPedido }]
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para fechar mesa (encerrar pedidos)
app.put('/api/mesas/:id/fechar', async (req, res) => {
  try {
    const { id } = req.params;
    await Pedido.update(
      { status: 'fechado' },
      { where: { mesaId: id, status: 'aberto' } }
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});