import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register({ onBackToLogin, onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:3000/auth/create', {
        username,
        email,
        password
      });
      
      setSuccess('Conta criada com sucesso!');
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Erro ao criar conta!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>VALORANT</h1>
        <h2>Criar Conta</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
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
          {success && <p className="success">{success}</p>}
          
          <button type="submit">Cadastrar</button>
        </form>
        
        <p className="login-link">
          Já tem uma conta? 
          <span onClick={onBackToLogin}> Faça login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;