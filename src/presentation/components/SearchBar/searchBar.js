/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './searchBar.css'

function SearchBar({placeholder, data}) {
  return (
    <div className="search-bar">
       <input className="search-input" type="text" placeholder={placeholder} />
       <div className="search-icon"></div>
      <div className="data-results">
        {data.map((value, key) => {
          return (
          <a className="data-item" target="_blank">
            <p>{value.nome}</p>
          </a>
          );
        })};
      </div>
    </div>
  )
}

export default SearchBar