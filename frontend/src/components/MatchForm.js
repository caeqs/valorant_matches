import React, { useState, useEffect } from 'react';
import './MatchForm.css';

function MatchForm({ match, onSave, onCancel }) {
  const [mapa, setMapa] = useState('');
  const [agente, setAgente] = useState('');
  const [placar, setPlacar] = useState('');
  const [resultado, setResultado] = useState('vitoria');

  const mapas = [
    'Ascent', 'Bind', 'Haven', 'Split', 'Icebox', 
    'Breeze', 'Fracture', 'Pearl', 'Lotus', 'Sunset'
  ];

  const agentes = [
    'Jett', 'Phoenix', 'Sage', 'Sova', 'Viper',
    'Cypher', 'Reyna', 'Killjoy', 'Breach', 'Omen',
    'Raze', 'Skye', 'Yoru', 'Astra', 'KAY/O',
    'Chamber', 'Neon', 'Fade', 'Harbor', 'Gekko',
    'Deadlock', 'Iso', 'Clove', 'Vyse'
  ];

  useEffect(() => {
    if (match) {
      setMapa(match.mapa);
      setAgente(match.agente);
      setPlacar(match.placar);
      setResultado(match.resultado);
    }
  }, [match]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ mapa, agente, placar, resultado });
  };

  return (
    <div className="match-form">
      <h2>{match ? 'Editar Partida' : 'Nova Partida'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mapa:</label>
          <select 
            value={mapa} 
            onChange={(e) => setMapa(e.target.value)}
            required
          >
            <option value="">Selecione um mapa</option>
            {mapas.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Agente:</label>
          <select 
            value={agente} 
            onChange={(e) => setAgente(e.target.value)}
            required
          >
            <option value="">Selecione um agente</option>
            {agentes.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Placar (ex: 13-11):</label>
          <input
            type="text"
            value={placar}
            onChange={(e) => setPlacar(e.target.value)}
            placeholder="13-11"
            pattern="\d{1,2}-\d{1,2}"
            required
          />
        </div>

        <div className="form-group">
          <label>Resultado:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="vitoria"
                checked={resultado === 'vitoria'}
                onChange={(e) => setResultado(e.target.value)}
              />
              Vitória
            </label>
            <label>
              <input
                type="radio"
                value="derrota"
                checked={resultado === 'derrota'}
                onChange={(e) => setResultado(e.target.value)}
              />
              Derrota
            </label>
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            {match ? 'Atualizar' : 'Salvar'}
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default MatchForm;