/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import './searchBar.css'

function SearchBar({ placeholder, data }) {

  const [dataFiltrada, setDataFiltrada] = useState([]);

  function mapResults() {
    return dataFiltrada.slice(0, 10).map((value, key) => {
      return (
        <a className="data-item" target="_blank">
          <p>{value.nome}</p>
        </a>
      );
    })
  }

  const handleFilter = (e) => {
    const palavraBuscadas = e.target.value
    const novoFiltro = data.filter((value) => {
      return value.nome.toLowerCase().includes(palavraBuscadas.toLowerCase())
    });
    if (palavraBuscadas === "" || palavraBuscadas === " ") {
      setDataFiltrada([]);
    } else {
      setDataFiltrada(novoFiltro);
    }
  }

  return (
    <div className="search-bar">
      <input className="search-input" type="text" placeholder={placeholder} onChange={handleFilter} />
      <div className="search-icon"></div>
      {dataFiltrada.length === 0 ? null :
        <div className="data-results">
          {mapResults()}
        </div>
      }
    </div>
  )
}

export default SearchBar