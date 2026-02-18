# Sistema de Gerenciamento de Restaurante

Este é um sistema completo para gerenciamento de restaurantes com painéis administrativos, cozinha e cardápio acessível via QR code.

## Funcionalidades

- Painel administrativo (balcão) para gerenciar mesas e pedidos
- Painel para cozinha para acompanhar pedidos em andamento
- QR codes únicos para cada mesa que levam diretamente ao cardápio
- Cardápio digital onde clientes podem fazer seus pedidos
- Controle de status dos pedidos (aberto, em preparo, pronto, entregue, fechado)

## Estrutura do Projeto

- `backend/` - Servidor Node.js com Express e banco de dados SQLite
- `frontend/` - Aplicação React com páginas para administração, cozinha e cardápio

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor iniciará na porta 5000.

### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   O aplicativo estará disponível em `http://localhost:3000`.

## Uso

### Painel Administrativo (Balcão)

Acesse `http://localhost:3000/admin` para:

- Adicionar novas mesas
- Remover mesas
- Fechar contas das mesas
- Visualizar e gerar QR codes para as mesas

### Painel da Cozinha

Acesse `http://localhost:3000/cozinha` para:

- Ver pedidos em andamento
- Atualizar status dos pedidos (em preparo, pronto)

### Cardápio Digital

Os clientes acessam o cardápio escaneando o QR code da mesa ou acessando:

`http://localhost:3000/cardapio/{numero_da_mesa}`

Onde `{numero_da_mesa}` é o ID da mesa.

## Desenvolvimento

Para executar ambos os servidores simultaneamente durante o desenvolvimento:

1. Execute o backend:
   ```bash
   cd backend
   npm start
   ```

2. Em outro terminal, execute o frontend:
   ```bash
   cd frontend
   npm start
   ```

O proxy configurado no frontend encaminhará as requisições para o backend em `http://localhost:5000`.