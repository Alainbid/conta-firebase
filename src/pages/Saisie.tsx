import React, { useState } from "react";
import "../styles/saisie.scss";
import Navbarre from "../components/Navbar";
import { db } from "./FirebaseFirestore";
import { useForm } from "react-hook-form";

import { addDoc, Timestamp, collection } from "firebase/firestore";



const Saisie = () => {
  const journalCollectionRef = collection(db, "adebug");
  const { register, handleSubmit } = useForm();
  const [banque, setBanque] = useState("BOURSO");
  const [menage, setMenage] = useState(true);
  const [mode, setMode] = useState("Visa");

  const onSubmit = (data: any) => {
    // data.menage === "M" ? (data.menage = true) : (data.menage = false);
    data.mode = mode;
    data.banque = banque;
    data.menage = menage;
    console.log("data", data);
    addDoc(journalCollectionRef, data);
  };

  const handleChange = (e: any) => {
    setMode(e.target.value);
  };
  const modifBanque = (e: any) => {
    setBanque(e.target.value);
  };
  const modifMenage = (e: any) => {
    e.target.checked ? setMenage(true) : setMenage(false);
  };

  return (
    <div>
      <Navbarre></Navbarre>
      <h1>Saisie d&apos;écritures</h1>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="banque-container">
          <fieldset>
            <div className="banque-container">
              <label>
                <input
                  {...register("banque")}
                  value="BOURSO"
                  type="radio"
                  checked={banque === "BOURSO"}
                  // defaultChecked={true}
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
        </div>

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

        <div className="budget-container">
          <input
            {...register("menage")}
            value={"M"}
            type="checkbox"
            id="budget"
            checked = {menage === true}
            onChange={modifMenage}
          ></input>
          <label htmlFor="budget">Budget</label>
        </div>
        
        <input
          {...register("somme")}
          defaultValue={10.11}
          type="number"
          id="somme"
          placeholder="Montant"
        ></input>
        <input
          {...register("depense")}
          defaultValue={"alimentation"}
          type="text"
          id="depense"
          placeholder="Dépenses"
        ></input>
        <input
          {...register("benef")}
          defaultValue={"Amamzon"}
          type="text"
          id="benef"
          placeholder="Fournisseur"
        ></input>
        <input
          {...register("note")}
          defaultValue={"lanote"}
          type="text"
          id="note"
          placeholder="Note"
        ></input>
        <input {...register("pointe")} defaultValue={"false"}></input>
        <input
          {...register("temps")}
          defaultValue={Timestamp.fromDate(new Date()).seconds}
        ></input>
        <button type="submit" className="btn btn-primary">
          Valider
        </button>
      </form>
    </div>
  );
};

export default Saisie;
