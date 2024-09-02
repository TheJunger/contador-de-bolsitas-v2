import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';
import { Register } from './Register';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch('http://192.168.100.9:5050/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      setToken(data.access_token);
      navigate('main-menu')
    } else {
      alert(data.message);
    }

 };

  return (
    <>
      {showRegister ? <Register setToken={setToken} setShowRegister={setShowRegister} /> :
      <div className='loginContainer'>
        <form className='formlogincontainer' onSubmit={handleSubmit}>
          <div className='formlogintitle'>Iniciar Sesion</div>
          <label>
            <div>Nombre de Usuario:</div>
            <input className='formlogininput' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <div>Contraseña:</div>
            <input className='formlogininput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className='formloginregister' onClick={() => setShowRegister(true)}>Registrarse</div>
          <button className='formloginbutton' type="submit">Entrar</button>
        </form>
      </div>
      }
    </>
  );
};

export {Login};
