import React, { useEffect, useState, useRef } from "react";
import "../styles/pointage.scss";
// import "../styles/togglebtn.scss";
import Navbarre from "../components/Navbar";
import { db } from "./FirebaseFirestore";
import Calendar0 from "../components/Calendar0";


import {
 // doc,
 // updateDoc,
  //getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  // endAt,
  // startAt,
} from "firebase/firestore";

//console.log("journalCollectionRef.", journalCollectionRef.type);

const Recherche = () => {
  // const rechercheCollectionRef = collection(db, "cfbjournal");
  const [laListe, setLaListe] = useState([{}]);
  const [isActive] = useState(null | 0);
  // const [bourso, setBourso] = useState(false);
  // const [bbva, setBbva] = useState(false);
  const [banque, setBanque] = useState("");
  const [pointe, setPointe] = useState(false);
  const [menage, setMenage] = useState(false);
  const [somme, setSomme] = useState(0);
  const [letotal,setLetotal] = useState(0);
  const [note,setNote] = useState("");
  const [nature,setNature] = useState("");
  const [debut,setDebut] = useState("01/01/2015");

  const checkBou = useRef();
  const checkBva = useRef();
  const checkPointe = useRef();
  const checkMenage = useRef();

  // var dateFin = Date(() => new Date()); //en ordre décroissant !!!
  // // console.log("aujourd'hui", dateFin);
  // var dateDebut = dateFin - 3 * 24 * 60 * 60 * 1000;
  // dateFin = 1683123191242;
  // dateDebut = 1680437610191;



  const getJournal = async () => {
    let conditions = [];
    if (banque !== "all") conditions.push(where("banque", "==", banque));
    
    if (checkPointe.current.checked) {
      conditions.push(where("pointe", "==", pointe));
    }
    if (checkMenage.current.checked) {
      conditions.push(where("menage", "==", menage));
    }
  //  conditions.push(where("date", ">=", dateDebut));
    if (somme != 0) conditions.push(where("somme", "==", parseFloat(somme)));

    if(note != "") conditions.push( where("note" ,"==",note));
    
    if(nature != "") conditions.push( where("nature" ,"==",nature));

    conditions.push(orderBy("date", "desc"));
    // conditions.push(endAt(dateDebut));
    //  conditions.push(startAt(dateFin));
    conditions.push(limit(50));

    //console.log("conditions", conditions);
    let lequery = query(collection(db, "cfbjournal"), ...conditions);
    try {
      var total = 0;
      const data = await getDocs(lequery);
      data.forEach(element => {
       total +=  element.data().somme;
      });
      total = parseInt(total*100);
      setLetotal (parseFloat( total/100));

      setLaListe(data.docs.map((ledoc) => ({ ...ledoc.data(), id: ledoc.id })));
     // console.log("data", data.docs);
    } catch (error) {
      console.log("Erreur du query ",alert(error));
    }
  };

  useEffect(() => {
    getJournal();
  }, []);

  const modifBanque = () => {
    let bso = checkBou.current.checked;
    let bva = checkBva.current.checked;
    if (bso && !bva) {
      setBanque("BOURSO");
     
    } else if (!bso && bva) {
      setBanque("BBVA");
    } else !bso && !bva ? setBanque("X") : setBanque("all");
  };

  const modifMenage = (e) => {
    e.target.checked ? setMenage(true) : setMenage(false);
  };

  const modifPointe = (e) => {
    !e.target.checked ? setPointe(true) : setPointe(false);
  };

  const modifSomme = (e) => {
    //console.log("e", e.target.value);
    e.target.value === 0 ? setSomme(0) : setSomme(e.target.value);
  };

  const modifNote = (e) => {
    e.target.value === "" ? setNote("") : setNote(e.target.value);
  }

  const modifDepense = (e) => {
    e.target.value === "" ? setNature("") : setNature(e.target.value);
  }

  const modifDebut = (debut) => {
     setDebut("02/02/2015");
    console.log("debut",debut);
   
  }

  const modifFin = (e) => {
    console.log(e);
  }

  //lire total de BOURSO
  // const updateTotalBanque = async (total, labanque) => {
    
  //     if(labanque == "BOURSO"){
  //     const docSnap =  doc(db, "budget", "totalBourso");
  //       await updateDoc(docSnap,{totalbourso:total});
  //       console.log("Total bourso  x =",total);
  //     }

  //      else {
  //       const docSnap =  doc(db, "budget", "totalBbva");
  //       await updateDoc(docSnap,{totalbbva:total});
  //       console.log("Total bbva  x =", total);
  //       console.log("document inconnu");
  //     }
   
    
  // };

  //calculer total de BOURSO
  //const calculTotalBanque = async (labanque) => {
    //  var total = 0;
  // const docsRef = collection(db,"cfbjournal");
  // let lequery = query(collection(db, "cfbjournal"),where("banque","==", labanque));

  // const docsSnap =  await getDocs(lequery);
  // docsSnap.forEach((doc) => {
  //  total +=  doc.data().somme;
  // })
  // total = parseInt(total *100);
  // let totalbq = (total/100);
//   let totalbq= 28123.35;
// console.log("total = ", totalbq)

// updateTotalBanque(totalbq,labanque);
//   };

  return (
    <div>
      <Navbarre />
      <Calendar0 ></Calendar0>
      <p className="h2-Recherche">Recherche d&apos;écritures </p>
      <button onClick={getJournal}>lancer la recherche</button>

      <div className="bourso-container">
        <label>
          <input
            id="BOURSO"
            value="BOURSO"
            type="checkbox"
            ref={checkBou}
            //checked={banque === "BOURSO"}
            // defaultChecked={true}
            onChange={modifBanque}
          ></input>
          BOURSO
        </label>
      </div>

      <div className="bbva-container">
        <label>
          <input
            id="BBVA"
            value="BBVA"
            type="checkbox"
            ref={checkBva}
            //checked={banque === "BBVA"}
            onChange={modifBanque}
          ></input>
          BBVA
        </label>
      </div>

      <div className="budget-container">
        <input
          value={"M"}
          type="checkbox"
          ref={checkMenage}
          checked={menage === true}
          onChange={modifMenage}
        ></input>
        <label htmlFor="budget">Budget</label>
      </div>

      <div className="pointe-container">
        <input
          value={"M"}
          type="checkbox"
          ref={checkPointe}
          id="pointe"
          // checked={pointe === false}
          onChange={modifPointe}
        ></input>
        <label htmlFor="pointe">NON-Pointé</label>
      </div>

      <form>
        <div className="somme-container">
          <input
            type="number"
            id="somme"
            onChange={modifSomme}
          ></input>
          <label htmlFor="somme">Montant</label>
        </div>
        
        <div className="note-container">
          <input
            type="text"
            id="note"
            onChange={modifNote}
          ></input>
          <label htmlFor="note">Note</label>
        </div>

        <div className="depens-container">
          <input
            type="text"
            id="depense"
            onChange={modifDepense}
          ></input>
          <label htmlFor="depense">Depense</label>
        </div>

        <div className="debut-container">
          <input
            type="text"
            id="debut"
            // placeholder="01/01/2015"
            value={debut}
            onClick =  { (event) => {
              event.preventDefault();
              modifDebut();
              }}
          ></input>
          
          <input
            type="text"
            id="dfin"
            placeholder="31/12/2050"
            onChange={modifFin}
          ></input>
          
        </div>

      </form>
      {/* 
      <div className="date-container">
        <input
          value={"M"}
          type="checkbox"
          ref={checkPointe}
          // checked={pointe === false}
          onChange={modifPointe}
        ></input>
        <label htmlFor="pointe">NON-Pointé</label>
      </div> */}

      <div>
        <table className="tb-Recherche">
          <thead className="th-Recherche">
          <tr>total {letotal}</tr>
            <tr className="thr-Recherche">
              <th style={{ width: 2 + "em" }}>N°</th>
              <th style={{ width: 6 + "em" }}>Banque</th>
              <th style={{ width: 7 + "em" }}>Date</th>
              <th style={{ width: 2.5 + "em" }}>M.</th>
              <th style={{ width: 7 + "em" }}>Montant</th>
              <th style={{ width: 2.5 + "em" }}>P.</th>
              <th style={{ width: 8 + "em" }}>Fournisseurs</th>
              <th style={{ width: 16 + "em" }}>Dépenses</th>
              <th style={{ width: 4 + "em" }}>Mode</th>
              <th style={{ width: 18 + "em" }}>Note</th>
            </tr>
          </thead>
          <tbody id="ligne">
            {laListe.map((undoc,index) => {
              return (
                <tr
                  className="tr-ligne"
                  key={undoc.id}
                  style={
                    isActive === index
                      ? { background: "yellow" }
                      : { background: "green" }
                  }
                >
                  <td style={{ width: 2 + "em" }}>{index + 1}</td>
                  <td style={{ width: 6 + "em" }}>{undoc.banque}</td>
                  <td style={{ width: 7 + "em" }}>
                    {new Date(undoc.temps).toLocaleDateString()}
                  </td>
                  <td style={{ width: 2.5 + "em" }}>
                    {undoc.menage === true ? " M" : " "}{" "}
                  </td>
                  <td
                    style={{
                      width: 7 + "em",
                      color: undoc.somme < 0 ? "red" : "green",
                    }}
                  >
                    {undoc.somme}
                  </td>
                  <td style={{ width: 2.5 + "em" }}>
                    {undoc.pointe === true ? "P" : "."}
                  </td>
                  <td style={{ width: 8 + "em" }}>{undoc.benef} </td>
                  <td style={{ width: 16 + "em" }}>{undoc.nature} </td>
                  <td style={{ width: 4 + "em" }}>{undoc.mode} </td>
                  <td style={{ width: 18 + "em" }}>{undoc.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recherche;
