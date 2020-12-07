import "./home.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EventoCard from "../../components/evento-card";
import Firebase from "../../config/firebase";

import NavBar from "../../components/navbar/";

function Home({ match }) {
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);

  const usuarioEmail = useSelector((state) => state.usuarioEmail);

  let listaEventos = [];

  useEffect(() => {
    if (match.params.paramentro) {
      Firebase.firestore()
        .collection("eventos")
        .where("usuario", "==", usuarioEmail)
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
          setEventos(listaEventos);
        });
    } else {
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
          setEventos(listaEventos);
        });
    }
  });
  return (
    <>
      <NavBar />
      <div className="row p-3 ">
        <h2 className="mx-auto pb-5">Eventos Publicados</h2>
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
