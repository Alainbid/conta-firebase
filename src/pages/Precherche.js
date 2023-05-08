  import React, {useState, useEffect} from 'react';
import Navbarre from "../components/Navbar";
import { db } from "./FirebaseFirestore";
import "../styles/pointage.scss"

import {
  
  
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  
} from "firebase/firestore";
//import { Button } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';

const journalCollectionRef = collection(db, "adebug");

const Precherche = () => {


   const [laListe,setLaListe] = useState([{}]);
  // const [labanque, setLaBanque] = useState("Bourso");
  // const [menage, setMenage] = useState(true);
  // const [mode, setMode] = useState("Visa");
  // const [isActive] = useState(null|0);
  
    useEffect(() => {
      getJournal();
    }, []);


    const getJournal = async () => {
      try {
        const data = await getDocs(
          query(
            journalCollectionRef,
            where ("banque", "==", "Bourso") ,
            //  where ("pointe", "==", false) ,
            // orderBy("date", "desc"),
            limit(50)
          )
        );
        console.log("data",data.docs);
        setLaListe(data.docs.map((ledoc) => ({ ...ledoc.data(), id: ledoc.id })));
      
      } catch (error) {
        console.log(alert(error));
      }
    };
  return (
    <div>
    <Navbarre></Navbarre>
      
    </div>
  );
};

export default Precherche;