import "./home.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EventoCard from "../../components/evento-card";
import Firebase from "../../config/firebase";

import NavBar from "../../components/navbar/";

function Home() {
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);

  let listaEventos = [];

  useEffect(() => {
    Firebase.firestore()
      .collection("eventos")
      .get()
      .then(async (response) => {
        await response.docs.forEach((doc) => {
          if (doc.data().titulo.indexOf(pesquisa) >= 0) {
            listaEventos.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
        console.log(listaEventos);
        setEventos(listaEventos);
      });
  });
  return (
    <>
      <NavBar />
      <div className="row p-5">
        <input
          className="form-control text-center"
          type="text"
          placeholder="Pesquisar Eventos pelo Título..."
          onChange={(e) => {
            setPesquisa(e.target.value);
          }}
        />
      </div>
      <div className="row p-3">
        {eventos.map((item) => (
          <EventoCard
            key={item.id}
            id={item.id}
            img={item.foto}
            titulo={item.titulo}
            detalhes={item.detalhes}
            visualizacoes={item.visualizacoes}
          />
        ))}
      </div>
    </>
  );
}
export default Home;
