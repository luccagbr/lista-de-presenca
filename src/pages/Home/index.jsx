import React, { useState, useEffect } from 'react';
import './styles.css'
import { Card } from '../../components/Card'

export function Home() {
  const [studantName, setStudantName] = useState()
  const [studants, setStudants] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ''})

  function handleAddStudant() {
    const newStudant = {
      name: studantName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudants(prevState => [...prevState, newStudant]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/luccagbr')
     .then(response => response.json())
     .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
     })
     .catch()
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil"></img>
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={e => setStudantName(e.target.value)}  
      />
      <button type="button" onClick={handleAddStudant}>
        Adicionar
      </button>

      {
        studants.map(studant => (
          <Card 
            key={studant.time}
            name={studant.name} 
            time={studant.time}
          />
        ))
      }
    </div>
  )
}