import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchForm from './MatchForm';
import MatchList from './MatchList';
import './Dashboard.css';

function Dashboard({ token, onLogout }) {
  const [matches, setMatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const response = await axios.get('http://localhost:3000/matches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatches(response.data);
    } catch (err) {
      console.error('Erro ao carregar partidas:', err);
    }
  };

  const handleSaveMatch = async (matchData) => {
    try {
      if (editingMatch) {
        await axios.put(
          `http://localhost:3000/matches/${editingMatch.id}`,
          matchData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post('http://localhost:3000/matches', matchData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      loadMatches();
      setShowForm(false);
      setEditingMatch(null);
    } catch (err) {
      console.error('Erro ao salvar partida:', err);
    }
  };

  const handleDeleteMatch = async (id) => {
    if (window.confirm('Deseja realmente deletar esta partida?')) {
      try {
        await axios.delete(`http://localhost:3000/matches/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        loadMatches();
      } catch (err) {
        console.error('Erro ao deletar partida:', err);
      }
    }
  };

  const handleEditMatch = (match) => {
    setEditingMatch(match);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMatch(null);
  };

  const stats = {
    total: matches.length,
    vitorias: matches.filter(m => m.resultado === 'vitoria').length,
    derrotas: matches.filter(m => m.resultado === 'derrota').length,
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>VALORANT - Minhas Partidas</h1>
        <button onClick={onLogout} className="logout-btn">Sair</button>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total de Partidas</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card win">
          <h3>Vitórias</h3>
          <p>{stats.vitorias}</p>
        </div>
        <div className="stat-card loss">
          <h3>Derrotas</h3>
          <p>{stats.derrotas}</p>
        </div>
        <div className="stat-card">
          <h3>Taxa de Vitória</h3>
          <p>{stats.total > 0 ? ((stats.vitorias / stats.total) * 100).toFixed(1) : 0}%</p>
        </div>
      </div>

      {!showForm && (
        <button 
          onClick={() => setShowForm(true)} 
          className="add-match-btn"
        >
          + Registrar Nova Partida
        </button>
      )}

      {showForm && (
        <MatchForm
          match={editingMatch}
          onSave={handleSaveMatch}
          onCancel={handleCancelForm}
        />
      )}

      <MatchList
        matches={matches}
        onEdit={handleEditMatch}
        onDelete={handleDeleteMatch}
      />
    </div>
  );
}

export default Dashboard;