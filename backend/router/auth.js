const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, "..", "db", "users.json");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Rota de Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const data = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(data);
  const usuarios = jsonData.users;
  
  const usuarioEncontrado = usuarios.find((userDb) => userDb.username === username);

  if (!usuarioEncontrado) {
    return res.status(404).send("Usuário não encontrado");
  }

  const senhaCorreta = await bcrypt.compare(password, usuarioEncontrado.password);
  
  if (!senhaCorreta) {
    return res.status(401).send("Senha incorreta");
  }
  
  const token = jwt.sign(usuarioEncontrado, process.env.TOKEN);

  res.status(200).json({ 
    message: "Login com sucesso!", 
    token: token 
  });
});

// Rota de Criação de Usuário
router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  const data = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(data);
  const usuarios = jsonData.users;
  
  const usuarioEncontrado = usuarios.find((userDb) => userDb.email === email);

  if (usuarioEncontrado) {
    return res.status(400).send("Esse e-mail já está sendo usado.");
  }

  const usernameEncontrado = usuarios.find((userDb) => userDb.username === username);

  if (usernameEncontrado) {
    return res.status(400).send("Esse nome de usuário já está sendo usado.");
  }

  const id = usuarios.length > 0 
    ? Math.max(...usuarios.map(u => u.id)) + 1 
    : 0;
  
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(password, salt);

  const userNovo = new User(id, username, email, senhaCriptografada);
  usuarios.push(userNovo);

  jsonData.users = usuarios;
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  res.status(200).send("Usuário criado com sucesso!");
}); 

module.exports = router;