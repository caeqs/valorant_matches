import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });
      
      onLogin(response.data.token);
    } catch (err) {
      setError('Email ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>VALORANT</h1>
        <h2>Registro de Partidas</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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