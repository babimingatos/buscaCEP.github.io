
import { FiSearch } from "react-icons/fi";
import './style.css';
import { useState } from 'react';
import api from './servicos/api';


export default function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function pesquisa() {
    if (input === '') {
      alert("Digite algum CEP!")
      return;
    }
    try {
      const resposta = await api.get(`${input}/json`);
      console.log(resposta.data);
      setCep(resposta.data);
      setInput("");
    } catch {
      alert("Erro ao buscar o CEP!")
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="titulo">
        Buscador CEP
      </h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={pesquisa}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2> {cep.cep}</h2>
          <span><b> Logradouro: </b> {cep.logradouro}</span>
          <span><b> Bairro: </b> {cep.bairro}</span>
          <span> <b>Cidade: </b> {cep.localidade}- {cep.uf}</span>
        </main>
      )}
    </div>
  );
}