import React, { useEffect, useState } from "react";
import "../styles/pointage.scss";
import "../styles/togglebtn.scss";
import Navbarre from "../components/Navbar";
import { db } from "./FirebaseFirestore";
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
} from "firebase/firestore";

const journalCollectionRef = collection(db, "cfbjournal");
//console.log("journalCollectionRef.", journalCollectionRef.type);

const Pointage = () => {
  const [laListe, setLaListe] = useState([{}]);
  const [isActive] = useState(null|0);
  // const [checked, setChecked] = useState(false);

  useEffect(() => {
    getJournal();
  }, []);

  const getJournal = async () => {
    try {
      const data = await getDocs(
        query(
          journalCollectionRef,
          where ("banque", "==", "BOURSO") ,
          where ("pointe", "==", false) ,
          orderBy("date", "desc"),
          limit(50)
        )
      );
      setLaListe(data.docs.map((ledoc) => ({ ...ledoc.data(), id: ledoc.id })));
    } catch (error) {
      console.log(alert(error));
    }
  };

 const  updatePointage = async (id) => {
  //const docRef = doc(db, "cfbjournal", "01SVI8Q2zjnO4eCfU4C6");
 
const docRef = doc(db, "cfbjournal", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  //majour du champ pointe sur true
  await updateDoc(docRef,{pointe:true});
 console.log("laliste",laListe[2].pointe);
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  getJournal();
};


  return (
    <div>
      <Navbarre />
      <p className="h2-pointage">pointage d&apos;écritures </p>
     
      {/* <ButtonGroup className="mb-2">
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="secondary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
          
        >
          Boursorama
        </ToggleButton>
        <ToggleButton
          id="toggle-check2"
          type="checkbox"
          variant="secondary"
          checked={!checked}
          value="2"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          BBVA
        </ToggleButton>
      </ButtonGroup> */}
      
     
      <div>
        <table className="tb-pointage">
          <thead className="th-pointage">
            <tr className="thr-pointage"   >
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
          <tbody id="ligne" >
            {laListe.map((undoc, index) => {
              return (
                
                <tr className="tr-ligne" key={undoc.id} 
                style={
                  (isActive === index)
                    ? { background: 'yellow' }
                    : { background: 'green' }
                }
               
                onClick={() => updatePointage(undoc.id)
                
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
                  <td style={{ width: 7 + "em" ,  color:  undoc.somme < 0 ? "red" : "green"}}>{undoc.somme}</td>
                  <td style={{ width: 2.5 + "em" }}>{undoc.pointe}</td>
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

export default Pointage;
