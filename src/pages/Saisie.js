import React, { useState, useEffect } from "react";
import Navbarre from "../components/Navbar";
import Calendar from "../components/Calendar.tsx";
import ListeDepenses from "../components/ListeDepenses";
import "../styles/app.scss";
import "../styles/saisie.scss";
import { db } from "./FirebaseFirestore";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";

function Saisie() {
  const journalCollectionRef = collection(db, "cfbjournal");
  const { register, handleSubmit } = useForm();
  const [banque, setBanque] = useState("BOURSO");
  const [menage, setMenage] = useState(true);
  const [mode, setMode] = useState("Visa");
  const [temps, setTemps] = useState(0);
  const [somme, setSomme] = useState("");
  const [navHidden, setNavHidden] = useState(true);
  const [listDepPosition, setListDepPosition] = useState([0, 0]);
  const [showListdep, setShowListdep] = useState(false);
  const [natureDepense, setNatureDepense] = useState("");

  useEffect(() => {
    choixDepense();
  }, [natureDepense]);

  const onSubmit = (data) => {
    if (somme != "") {
      data.new = false;
      data.numero = "";
      data.somme = somme;
      data.mode = mode;
      data.banque = banque;
      data.menage = menage;
      data.temps = temps;
      data.pointe = false;
      data.date = temps;
      data.nature = natureDepense;
      addDoc(journalCollectionRef, data);
    }
    annuler();
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

  const modifSomme = (e) => {
    setSomme(parseFloat(e.target.value));
  };

  const getData = (year, month, day) => {
    let datechoisie = new Date(year, month, day).getTime();
    let hoy = new Date().getTime();
    let tx = new Date().toDateString();
    let hoyoh = new Date(tx).getTime();
    let datechoisieHeure = datechoisie + (hoy - hoyoh);
    //console.log("date saisie", datechoisieHeure);
    setTemps(datechoisieHeure);
    document.getElementById("saisie-container").style.display = "revert";
    setNavHidden(false);
  };

  const annuler = () => {
    setSomme("");
    document.getElementById("somme").value = "";
    document.getElementById("nature").value = "";
    document.getElementById("benef").value = "";
    document.getElementById("note").value = "";
    setBanque("BOURSO");
    setMode("Visa");
    setMenage(true);
    setNavHidden(true);
    document.getElementById("saisie-container").style.display = "none";
    document.getElementById("calencar").style.display = "flex";
  };

  const choixDepense = () => {
    // console.log("nature",natureDepense);
    document.getElementById("nature").value = natureDepense;
    document.getElementById("nature").innerHTML = natureDepense;
  };

  return (
    <div id="app">
      {navHidden ? <Navbarre></Navbarre> : null}

      <h1 id="h1-saisie">Saisie d&apos;écritures</h1>
      <Calendar
        quelMotif={"Nouvelle écriture du :"}
        sendData={getData}
        finMotif={" Validez "}
      ></Calendar>
      <ListeDepenses
        open={showListdep}
        onValider={(x) => {
          setNatureDepense(x);
          // console.log("x",x);
          // document.getElementById("nature").innerHTML = natureDepense;
        }}
        onClose={() => {
          setShowListdep(false);
        }}
        posdex={listDepPosition[0]}
        posdey={listDepPosition[1]}
      ></ListeDepenses>
      <div id="saisie-container">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fdset-saisie" {...register("banque")}>
            <div className="banque-container">
              <label className="saisie-radio">
                <input
                  value="BOURSO"
                  type="radio"
                  checked={banque === "BOURSO"}
                  onChange={modifBanque}
                ></input>
                BOURSO
              </label>
              <label className="saisie-radio">
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

          <fieldset className="fdset-saisie" {...register("mode")}>
            <div className="mode-container">
              <label className="saisie-radio">
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

              <label className="saisie-radio">
                <input
                  value="Chq"
                  type="radio"
                  name="mode"
                  id="cheque"
                  checked={mode === "Chq"}
                  onChange={handleChange}
                ></input>
                Chèque
              </label>

              <label className="saisie-radio">
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

              <label className="saisie-radio">
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
            <label className="label-saisie">
              Montant
              <input
                className="input-saisie"
                {...register("somme")}
                onChange={modifSomme}
                type="text"
                id="somme"
              ></input>
            </label>

            <label className="label-saisie">
              Dépense
              <input
               autoComplete="off"
                className="input-saisie"
                type="text"
                id="nature"
                onClick={(event) => {
                  event.preventDefault();

                  // console.log(" x ", event.clientX, "   y = ", event.clientY);
                  setListDepPosition([event.clientX, event.clientY]);
                  setShowListdep(true);
                  
                }}
              ></input>
            </label>

            <label className="label-saisie">
              Fournisseur
              <input
              autoComplete="off"
                className="input-saisie"
                {...register("benef")}
                type="text"
                id="benef"
                // required={true}
              ></input>
            </label>

            <label className="label-saisie">
              Note
              <input
                className="input-saisie"
                {...register("note")}
                type="text"
                id="note"
                placeholder="..."
              ></input>
            </label>
          </div>

          <div className="budget-container">
            <label className="saisie-radio">
              Budget
              <input
                {...register("menage")}
                value={"M"}
                type="checkbox"
                id="budget"
                checked={menage === true}
                onChange={modifMenage}
              ></input>
            </label>
          </div>
          <p className="date-saisie">
            le{" : "} {new Date(temps).toLocaleDateString()}{" "}
          </p>
          <span className="btn-fin">
            {" "}
            <button type="submit" className="btn btn-success">
              Valider
            </button>
            <button onClick={annuler} className="btn btn-warning">
              Annuler
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
export default Saisie;
