import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register({ onBackToLogin, onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    // Campos vazios
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Todos os campos devem ser preenchidos!');
      return false;
    }

    // Email válido
    if (!validateEmail(email)) {
      setError('Email inválido!');
      return false;
    }

    // Senha mínimo 4 dígitos
    if (password.length < 4) {
      setError('A senha deve ter no mínimo 4 caracteres!');
      return false;
    }

    // Senhas iguais
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

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
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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