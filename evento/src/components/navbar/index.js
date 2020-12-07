import "./navbar.css";

import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
      <i class="far fa-smile-wink text-white fa-2x"></i>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {useSelector((state) => state.usuarioLogado) > 0 ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link  ml-2" to="/evento-cadastro">
                    Publicar Evento <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/eventos/meus">
                    Meus Eventos <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => dispatch({ type: "LOG_OUT" })}
                  >
                    Sair <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/novo-usuario">
                    Cadastrar <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
