import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <h2 style={{ textAlign: "center" }}>Erreur 404</h2>
        <p style={{ textAlign: "center" }}>Page inconnue</p>
        <NavLink to="/">
          <i className="fas fa-home" style={{ padding: "30px" }}></i>retour à
          l acceuil
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
