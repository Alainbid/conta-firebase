import React, { useState, useEffect } from "react";
import "../styles/listedepenses.scss";
import PropTypes from "prop-types";
import { db } from "../pages/FirebaseFirestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ListeDepenses = (props) => {
  const [Depenses, setDepenses] = useState([]);
  const depensesCollectionRef = collection(db, "depenses");
  const liste = ['a','b','c'];
  useEffect(() => {
    getDepenses();
  }, []);

  const getDepenses = async () => {
    const data = await getDocs(query(depensesCollectionRef, orderBy("nature")));
    setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //  console.log(data.docs);
  };

  if (!props.open) return null;
  return (
    <div>
      <div
        className="listdep-container"
        style={{ left: props.posdex + "px", top: props.posdey + "px" }}
      >

        <div className="listdep-table">
          <p></p>
          {Depenses.map((item, index) => {
            return (
              <ul
                className="listdep-ligne"
                key={item.nature}

                onClick={(event) => {
                  // console.log("item.nature",item.nature)
                  event.preventDefault();
                  props.onValider(item.nature);
                  props.onClose();
                }}
              >
                {/* pour mettre un 0 si de 1 à 9 */}
                {index < 9 ? "0" + (index + 1).toString(10) : index + 1}{" "}
                {item.nature}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
ListeDepenses.propTypes = {
  posdex: PropTypes.number,
  posdey: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValider:PropTypes.func,
  
};

export default ListeDepenses;
