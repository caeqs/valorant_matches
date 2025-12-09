import React from 'react';
import './MatchList.css';

function MatchList({ matches, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (matches.length === 0) {
    return (
      <div className="no-matches">
        <p>Nenhuma partida registrada ainda.</p>
        <p>Comece registrando sua primeira partida!</p>
      </div>
    );
  }

  return (
    <div className="match-list">
      <h2>Histórico de Partidas</h2>
      <div className="matches-grid">
        {matches.map((match) => (
          <div 
            key={match.id} 
            className={`match-card ${match.resultado}`}
          >
            <div className="match-header">
              <span className={`resultado-badge ${match.resultado}`}>
                {match.resultado === 'vitoria' ? 'VITÓRIA' : 'DERROTA'}
              </span>
              <span className="match-placar">{match.placar}</span>
            </div>
            
            <div className="match-info">
              <div className="info-row">
                <strong>Mapa:</strong> {match.mapa}
              </div>
              <div className="info-row">
                <strong>Agente:</strong> {match.agente}
              </div>
              <div className="info-row date">
                <strong>Data:</strong> {formatDate(match.data)}
              </div>
            </div>

            <div className="match-actions">
              <button 
                onClick={() => onEdit(match)}
                className="edit-btn"
              >
                Editar
              </button>
              <button 
                onClick={() => onDelete(match.id)}
                className="delete-btn"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchList;