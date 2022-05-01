import React, { useState } from "react";
import axios from "axios";
import paises from "./paises";
const api = {
  baseURL: `https://api.nationalize.io`,
};

function App() {
  const [query, setQuery] = useState("");
  const list = document.getElementById("location-box");

  const search = (src) => {
    axios.get(`${api.baseURL}?name=${query}`).then((response) => {
      const arr = response.data.country;
      for (var i = 0; i < arr.length; i++) {
        const nome_pais = response.data.country[i].country_id;
        const prob = response.data.country[i].probability;

        for (var x = 0; x < paises.length; x++) {
          if (paises[x].code === nome_pais) {
            displayResults(paises[x].name, prob.toFixed(3));
          }
        }
      }
    });

    function displayResults(name, prob) {
      let li = document.createElement("li");
      li.innerText = name + " - " + prob+" %";
      list.appendChild(li);
    }
  };

  return (
    <>
      <div
        style={{
          textalign: "center",
        }}
        className="search-box"
      >
        <h1>
          Origem do Nome
        </h1>
        <form>
          <input
            type="text"
            id="search-box"
            className="search-bar"
            placeholder="Digite um Nome..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <input
            type="button"
            placeholder="name"
            onClick={search}
            value="Pesquisar"
          />
        </form>

        <ul style={{ listStyleType: "none" }} id="location-box"></ul>
      </div>
    </>
  );
}

export default App;
