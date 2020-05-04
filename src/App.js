import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositorys, setRepositorys] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositorys(response.data);
    });
  }, []);
  
  
  async function handleAddRepository() {
    // TODO
    /*
  
    url: "https://github.com/josepholiveira",
    title: "Desafio ReactJS",
    techs: ["React", "Node.js"],

    */

      const response = await api.post('repositories',{
        url: "https://github.com/josepholiveira",
        title: `Desafio ReactJS ${Date.now()}`,
        techs: ["React", "Node.js"],
      });

      const repository = response.data;

      setRepositorys([ ... repositorys, repository])


  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const newRepositorys = repositorys.filter(repositorys => repositorys.id !== id);

    setRepositorys(newRepositorys);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
