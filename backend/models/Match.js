class Match {
  constructor(id, email, mapa, agente, placar, resultado, data) {
    this.id = id;
    this.email = email; // Email do usuário dono da partida
    this.mapa = mapa; // Nome do mapa jogado
    this.agente = agente; // Nome do agente usado
    this.placar = placar; // Ex: "13-11"
    this.resultado = resultado; // "vitoria" ou "derrota"
    this.data = data; // Data da partida
  }
}

module.exports = Match;