import React, { useEffect } from "react";
//  import { doc, updateDoc} from "firebase/firestore";
import { db } from "./FirebaseFirestore";
import {
  doc,
  updateDoc,
  // getDoc,
  collection,
  getDocs,
  query,
  limit,
  endAt,
  startAt,
  orderBy,
} from "firebase/firestore";

const Majour = () => {
  // const [debut, setDebut] = useState("");
  // const [fin, setFin] = useState("");
  const debut = new Date("2022/12/01").getTime();
  //const [fin] = useState(new Date("2050/12/30").getTime());
  const fin = new Date("2023/06/18").getTime();

  var docRef = "";
  const getJournal = async () => {
    let conditions = [];
    conditions.push(orderBy("temps", "desc"));
    conditions.push(startAt(fin));
    conditions.push(endAt(debut));
    conditions.push(limit(1500));

    //************  QUERY ******************************/

    let lequery = query(collection(db, "cfbjournal"), ...conditions);
    try {
      const data = await getDocs(lequery);
      //console.log("n = ",data.size);

      data.forEach((element) => {
        let d = element.data().date;
        let s = new Date(element.data().temps).toLocaleDateString("FR-fr");
        //console.log("date", s, "date", d, "tps", element.data().temps);

        if (element.data().temps != element.data().date) {
          console.log("date", s, "date", d, "tps", element.data().temps);
          console.log("id", element.id);
          docRef = doc(db, "cfbjournal", element.id);
          console.log("docRef 0", docRef.id);
          actualise(element.data().temps);
        }
      });

      // console.log("data", data.docs);
    } catch (error) {
      console.log("Erreur du query ", alert(error));
    }
  };

  //******************USEEFFECT ***************************/

  useEffect(() => {
    getJournal();
  });

  const actualise = async (tps) => {
    await updateDoc(docRef, { date: tps });
    console.log("tps", tps);
    console.log("docRef  2", docRef.id, "--------------");
    console.log(".");
  };

  return (
    <div>
      <h1>test</h1>
    </div>
  );
};

export default Majour;
