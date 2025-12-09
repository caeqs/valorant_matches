import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    // Campo vazio
    if (!username.trim() || !password.trim()) {
      setError('Todos os campos devem ser preenchidos!');
      return false;
    }

    // Senha mínimo 4 dígitos
    if (password.length < 4) {
      setError('A senha deve ter no mínimo 4 caracteres!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
      
      onLogin(response.data.token);
    } catch (err) {
      setError('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>VALORANT</h1>
        <h2>Registro de Partidas</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className="error">{error}</p>}
          
          <button type="submit">Entrar</button>
        </form>
        
        <p className="register-link">
          Não tem uma conta? 
          <span onClick={onShowRegister}> Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}

export default Login;