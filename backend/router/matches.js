const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Match = require("../models/Match.js"); // ✅ CORRETO: caminho relativo
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const filePath = path.join(__dirname, "..", "db", "matches.json");

// Middleware de autenticação
function autenticarToken(req, res, next) {
  const authH = req.headers["authorization"];
  const token = authH && authH.split(" ")[1];
  if (!token) return res.status(401).send("Token não encontrado");

  try {
    const user = jwt.verify(token, process.env.TOKEN);
    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(403).send("Token inválido");
  }
}

// GET - Listar todas as partidas do usuário
router.get("/", autenticarToken, (req, res) => {
  const user = res.locals.user;
  
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro no servidor!");
    }

    try {
      const jsonData = JSON.parse(data);
      const userMatches = jsonData.matches.filter(
        (match) => match.email === user.email
      );
      return res.status(200).json(userMatches);
    } catch (parseErr) {
      return res.status(500).send("Erro ao analisar a lista de partidas.");
    }
  });
});

// POST - Criar nova partida
router.post("/", autenticarToken, (req, res) => {
  const { mapa, agente, placar, resultado } = req.body;
  const user = res.locals.user;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro no servidor!");
    }

    try {
      const jsonData = JSON.parse(data);
      const id = jsonData.matches.length > 0 
        ? Math.max(...jsonData.matches.map(m => m.id)) + 1 
        : 1;

      const novaPartida = new Match(
        id,
        user.email,
        mapa,
        agente,
        placar,
        resultado,
        new Date().toISOString()
      );

      jsonData.matches.push(novaPartida);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Erro ao salvar a partida!");
        }
        res.status(201).json({
          message: "Partida registrada com sucesso!",
          match: novaPartida
        });
      });
    } catch (parseErr) {
      return res.status(500).send("Erro ao processar dados.");
    }
  });
});

// PUT - Atualizar partida existente
router.put("/:id", autenticarToken, (req, res) => {
  const { id } = req.params;
  const { mapa, agente, placar, resultado } = req.body;
  const user = res.locals.user;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro no servidor!");
    }

    try {
      const jsonData = JSON.parse(data);
      const matchIndex = jsonData.matches.findIndex(
        (match) => match.id === parseInt(id) && match.email === user.email
      );

      if (matchIndex === -1) {
        return res.status(404).send("Partida não encontrada!");
      }

      jsonData.matches[matchIndex] = {
        ...jsonData.matches[matchIndex],
        mapa,
        agente,
        placar,
        resultado,
      };

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Erro ao atualizar a partida!");
        }
        res.status(200).json({
          message: "Partida atualizada com sucesso!",
          match: jsonData.matches[matchIndex]
        });
      });
    } catch (parseErr) {
      return res.status(500).send("Erro ao processar dados.");
    }
  });
});

// DELETE - Deletar partida
router.delete("/:id", autenticarToken, (req, res) => {
  const { id } = req.params;
  const user = res.locals.user;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro no servidor!");
    }

    try {
      const jsonData = JSON.parse(data);
      const matchIndex = jsonData.matches.findIndex(
        (match) => match.id === parseInt(id) && match.email === user.email
      );

      if (matchIndex === -1) {
        return res.status(404).send("Partida não encontrada!");
      }

      jsonData.matches.splice(matchIndex, 1);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Erro ao deletar a partida!");
        }
        res.status(200).json({
          message: "Partida deletada com sucesso!"
        });
      });
    } catch (parseErr) {
      return res.status(500).send("Erro ao processar dados.");
    }
  });
});

module.exports = router;