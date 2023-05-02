import React, {useState} from 'react'
import "../styles/modal.scss";
import PropTypes from 'prop-types'


const UneModale = ({open , onClose}) => {

  UneModale.PropTypes = { open : PropTypes.bool, onClose : PropTypes.bool} ;
  if(!open) return(null);
  const [leTexte, setText] = useState("");

  const changement = (e) => {
    setText(e.target.value);
    console.log("   texte  ", leTexte);
  };

 
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-tittle"> Modifier la liste </h4>
        </div>

        <div className="modal-body">
          Sélection
          <input
            type="text"
            className="input-text"
            id="in-text"
              // defaultValue={props.leQuel}
            onInput={changement}
          />
        </div>
        <div className="modal-footer">
          <button className="button-annuler" onClick={onClose}>
            Annuler
          </button>

          
          <button
            type="submit"
            className="button-valid"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("in-text").value;
              setText("");
              document.getElementById("in-text").value = "";
              // props.onValid(x) ;
            }}
          >
            {leTexte !== "" ? "Valider" : "Modifier"}
          </button>
          <button
            className="button-delete"
            onClick={(event) => {
              event.preventDefault();
              const x = document.getElementById("in-text").value;
              console.log(" delete  = ", x);
              // props.onDelete(x);
            }}
          >
            Supprimer
          </button>
          <button
            className="button-ajouter"
            onClick={(event) => {
              event.preventDefault();
              const x = document.getElementById("in-text").value;
              console.log(" ajouter  = ", x);
              //  props.onNewDonnees(x);
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );


}

UneModale.prop = {
  open: PropTypes.bool,
  onClose : PropTypes.bool
}

export default UneModale
