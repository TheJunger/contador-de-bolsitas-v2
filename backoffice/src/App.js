import './App.css';
import { Login } from './Login';
import { MainMenu } from './Mainmenu';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || '');


  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login setToken={(token) => {setToken(token); localStorage.setItem('token', token);
        }}/>} />
          <Route path="/main-menu" element={<MainMenu token={token}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
