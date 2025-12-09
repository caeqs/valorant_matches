import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatchForm.css';

function MatchForm({ match, onSave, onCancel }) {
  const [mapa, setMapa] = useState('');
  const [agente, setAgente] = useState('');
  const [placar, setPlacar] = useState('');
  const [resultado, setResultado] = useState('vitoria');
  const [mapas, setMapas] = useState([]);
  const [agentes, setAgentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadValorantContent();
  }, []);

  useEffect(() => {
    if (match) {
      setMapa(match.mapa);
      setAgente(match.agente);
      setPlacar(match.placar);
      setResultado(match.resultado);
    }
  }, [match]);

  const loadValorantContent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/valorant/content');
      setMapas(response.data.mapas);
      setAgentes(response.data.agentes);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      // Fallback para lista estática se a API falhar
      setMapas([
        { name: 'Ascent' }, { name: 'Bind' }, { name: 'Haven' }, 
        { name: 'Split' }, { name: 'Icebox' }, { name: 'Breeze' },
        { name: 'Fracture' }, { name: 'Pearl' }, { name: 'Lotus' }, 
        { name: 'Sunset' }, { name: 'Abyss' }
      ]);
      setAgentes([
        { name: 'Jett' }, { name: 'Phoenix' }, { name: 'Sage' }, 
        { name: 'Sova' }, { name: 'Viper' }, { name: 'Cypher' },
        { name: 'Reyna' }, { name: 'Killjoy' }, { name: 'Breach' }, 
        { name: 'Omen' }, { name: 'Raze' }, { name: 'Skye' },
        { name: 'Yoru' }, { name: 'Astra' }, { name: 'KAY/O' },
        { name: 'Chamber' }, { name: 'Neon' }, { name: 'Fade' },
        { name: 'Harbor' }, { name: 'Gekko' }, { name: 'Deadlock' },
        { name: 'Iso' }, { name: 'Clove' }, { name: 'Vyse' }
      ]);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ mapa, agente, placar, resultado });
  };

  if (loading) {
    return (
      <div className="match-form">
        <h2>Carregando dados do Valorant...</h2>
      </div>
    );
  }

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
            {mapas.map((m, index) => (
              <option key={m.id || index} value={m.name}>{m.name}</option>
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
            {agentes.map((a, index) => (
              <option key={a.id || index} value={a.name}>{a.name}</option>
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