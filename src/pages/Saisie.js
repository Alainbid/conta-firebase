import React, { useState } from "react";
import Navbarre from "../components/Navbar";
//import "../styles/home.scss";
import Calendar from "../components/Calendar.tsx";
import "../styles/app.scss";
import "../styles/saisie.scss";

import { db } from "./FirebaseFirestore";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";

function Saisie() {
  const journalCollectionRef = collection(db, "adebug");
  const { register, handleSubmit } = useForm();
  const [banque, setBanque] = useState("BOURSO");
  const [menage, setMenage] = useState(true);
  const [mode, setMode] = useState("Visa");
  const [temps, setTemps] = useState(0);
  const [somme,setSomme] = useState(0);
 


  const onSubmit = (data) => {
    data.somme = somme;
    data.mode = mode;
    data.banque = banque;
    data.menage = menage;
    data.temps  = temps;
    data.pointe = false;
    console.log("data", data);
    addDoc(journalCollectionRef, data);
annuler();
    // document.getElementById("saisie-container").style.display = "none";
    // document.getElementById("calencar").style.display = "flex";
  };

  const handleChange = (e) => {
    setMode(e.target.value);
  };
  const modifBanque = (e) => {
    setBanque(e.target.value);
  };

  const modifMenage = (e) => {
    e.target.checked ? setMenage(true) : setMenage(false);
  };

  const modifSomme =(e) => {
    setSomme (parseFloat (e.target.value));
  }

  const getData = (val) => {
  setTemps(val);
    let w = new Date(val).toLocaleDateString("fr-FR");
    console.log("date ", w,val);
    document.getElementById("saisie-container").style.display = "revert";
   
  };

  const annuler = () =>{
    
   document.getElementById("saisie-container").style.display = "none";
   document.getElementById("calencar").style.display = "flex";
  }

  return (
    <div className="app">
      <Navbarre />
      <Calendar
        quelMotif={"Nouvelle écriture du :"}
        sendData={getData}
        finMotif={" Validez "}
       
      ></Calendar>

      
        <h1 id="h1-saisie">Saisie d&apos;écritures</h1>
<div id="saisie-container">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          
            <fieldset {...register("banque")}>
              <div className="banque-container">
                <label>
                  <input
                    
                    value="BOURSO"
                    type="radio"
                    checked={banque === "BOURSO"}
                    onChange={modifBanque}
                  ></input>
                  BOURSO
                </label>
                <label>
                  <input
                    value="BBVA"
                    type="radio"
                    checked={banque === "BBVA"}
                    onChange={modifBanque}
                  ></input>
                  BBVA
                </label>
              </div>
            </fieldset>
         

          <fieldset {...register("mode")}>
            <div className="mode-container">
              <label>
                <input
                  value="Visa"
                  type="radio"
                  name="mode"
                  id="visa"
                  checked={mode === "Visa"}
                  onChange={handleChange}
                ></input>
                Visa
              </label>

              <label>
                <input
                  value="chèque"
                  type="radio"
                  name="mode"
                  id="cheque"
                  checked={mode === "chèque"}
                  onChange={handleChange}
                ></input>
                Chèque
              </label>

              <label>
                <input
                  value="Virnt"
                  type="radio"
                  name="mode"
                  id="virnt"
                  checked={mode === "Virnt"}
                  onChange={handleChange}
                ></input>
                Virement
              </label>

              <label>
                <input
                  value="Cash"
                  type="radio"
                  name="mode"
                  id="cash"
                  checked={mode === "Cash"}
                  onChange={handleChange}
                ></input>
                Cash
              </label>
            </div>

            
          </fieldset>

          <div className="detail-container">

          <label>Montant
          <input
            {...register("somme")}
            onChange={modifSomme}
            type="text"
            id="somme"
          ></input></label>
          
          <label>Dépense<input
            {...register("depense")}
            defaultValue={"alimentation"}
            type="text"
            id="depense"
            placeholder="Dépenses"
          ></input></label>

          <label>Fournisseur<input
            {...register("benef")}
            defaultValue={"Amamzon"}
            type="text"
            id="benef"
            placeholder="Fournisseur"
          ></input></label>

          <label>Note<input
            {...register("note")}
            defaultValue={"lanote"}
            type="text"
            id="note"
            placeholder="Note"
          ></input></label> 
</div>
          
         
          <div className="budget-container">
            <input
              {...register("menage")}
              value={"M"}
              type="checkbox"
              id="budget"
              checked={menage === true}
              onChange={modifMenage}
            ></input>
            <label htmlFor="budget">Budget</label>
          </div>

         <span className="btn-fin"> <button type="submit" className="btn btn-success">
            Valider
          </button>
          <button type="submit" onClick={annuler} className="btn btn-warning">
            Annuler
          </button></span>
        </form>
      </div>
    </div>
  );
}
export default Saisie;
