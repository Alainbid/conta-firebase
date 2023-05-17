import React, { useEffect, useState } from "react";
import "../styles/pointage.scss";
import "../styles/togglebtn.scss";
import Navbarre from "../components/Navbar";
import { db } from "./FirebaseFirestore";

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


//console.log("journalCollectionRef.", journalCollectionRef.type);

const Pointage = () => {
  //var journalCollectionRef = collection(db, "cfbjournal");
  const [laListe, setLaListe] = useState([{}]);
  // const [isActive] = useState(null|0);
  const [letotal,setLeTotal] = useState(0.0)
  useEffect(() => {
    getJournal();
   // console.log("laliste",laListe);
  }, []);

  const getJournal = async () => {
    try {
      const data = await getDocs(
        query(
          //journalCollectionRef,
          collection(db, "cfbjournal"),
          where ("banque", "==", "BOURSO") ,
          where ("pointe", "==", false) ,
          orderBy("date", "desc"),
          limit(50)
        )
      );

var total = 0;


//console.log("data",data.docs);
// calcul du total des sommes non pointées
  data.forEach(element => {total +=  element.data().somme;});
       total = parseInt(total*100);
       setLeTotal  (parseFloat( total/100).toLocaleString("de-DE"));

       setLaListe(data.docs.map((ledoc) => ({ ...ledoc.data(), id: ledoc.id })));
    } catch (error) {
      console.log(alert(error));
    }
  };

 const  updatePointage = async (id) => {
const docRef = doc(db, "cfbjournal", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  //majour du champ pointe sur true
  await updateDoc(docRef,{pointe:true});
 console.log("pointé" ,id);
 getJournal();
} else {
  console.log("No such document!");
}
  
};

 const conformer = (vam) => {
  if(vam)  return (vam).toFixed(2);
 }


  return (
    <div>
      <Navbarre />
      <p className="h2-pointage">pointage d&apos;écritures </p>
      <i style={{ textJustify:"center" }}>Pour pointer faire : Double-click sur le &quot;?&quot; de la colonne P</i>
      
     
      <div>
        <table className="tb-pointage">
          <thead className="th-pointage">
            <tr className="thr-pointage"   >
              <th style={{ width: 2 + "em" }}>N°</th>
              <th style={{ width: 6 + "em" }}>Banque</th>
              <th style={{ width: 11 + "em" }}>Date</th>
              <th style={{ width: 3 + "em" , textAlign:"center" }}>M.</th>
              <th style={{ width: 10 + "em", textAlign:"right" }}>Montant</th>
              <th style={{ width: 1 + "em" }}></th>
              <th style={{ width: 3 + "em", textAlign:"center" }}>P.</th>
              <th style={{ width: 1 + "em" }}></th>
              <th style={{ width: 12 + "em" }}>Fournisseurs</th>
              <th style={{ width: 16 + "em" }}>Dépenses</th>
              <th style={{ width: 4 + "em" }}>Mode</th>
              <th style={{ width: 18 + "em" }}>Note</th>
             
            </tr>
          </thead>
          <tbody id="ligne" className="tbdy-pointage" >
            
            {laListe.map((undoc, index) => {

              return (
                
                <tr className="tr-ligne" key={undoc.id} 
                // style={
                //   (isActive === index)
                //     ? { background: 'yellow' }
                //     : { background: 'green' }
                // }
                
                 >
                  <td style={{ width: 2 + "em" }}>{index + 1}</td>
                  <td style={{ width: 6 + "em" }}>{undoc.banque}</td>
                  <td style={{ width: 11 + "em" }}>
                    {new Date(undoc.temps).toLocaleDateString()}
                  </td>
                  <td style={{ width: 2.5 + "em" }}>
                    {undoc.menage === true ? " M" : " "}{" "}
                  </td>
                 
                  <td  
                     style={{ width: 10 + "em" , textAlign:"right" , 
                    color:  undoc.somme < 0 ? "red" : "green"}}>
                   {conformer(undoc.somme)} 
                   </td>
                    <td style={{ width: 1 + "em" }}></td>
                  <td onDoubleClick={(e) => {
                     e.preventDefault();
                    updatePointage(undoc.id);}} 
                    style={{ width: 3 + "em", textAlign:"center" ,
                     background:"#69c88210"  }}>
                     {undoc.pointe === false ? "?" : "P"}</td>
                     <td style={{ width: 1 + "em" }}></td>
                  <td style={{ width: 14 + "em" }}>{undoc.benef} </td>
                  <td style={{ width: 16 + "em" }}>{undoc.nature} </td>
                  <td style={{ width: 4 + "em" }}>{undoc.mode} </td>
                  <td style={{ width: 18 + "em" }}>{undoc.note}</td>
                </tr>
              );
            })}
            <tr>
            <td style={{ width: 2 + "em" }}></td>
                  <td style={{ width: 6 + "em" }}></td>
                  <td style={{ width: 7 + "em", textAlign:"right" , fontSize:"1.5rem"}}>TOTAL</td>
              <td style={{ width: 2.5 + "em" }}> </td>
              <td style={{ width: 12 + "em" , color:"red", textAlign:"right" ,  fontSize:"1.2rem"}}>{letotal}€ </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pointage;
