const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./router/auth');
const matchesRoutes = require('./router/matches');
const valorantRoutes = require('./router/valorant');

app.use('/auth', authRoutes);
app.use('/matches', matchesRoutes);
app.use('/valorant', valorantRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});