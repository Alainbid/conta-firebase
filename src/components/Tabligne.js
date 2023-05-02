import React from 'react';

const Tabligne = (doc,index) => {

  const priceFormater = (prix) => {
    if (Math.round(prix).toString().length < 4) {
      return new Intl.NumberFormat("us-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      }).format(prix);
    } else {
      return prix;
    }
  };




return (
  <div>
      <p>{doc.banque}</p>
      <p>{doc.date}.toLocaleDate()</p>
      <p>{doc.menage}</p>
     <p>{priceFormater(doc.somme).toLocaleString("de-DE")} €</p>
     <p>{doc.benef} </p>
     <p>{doc.nature} </p>
     <p>{doc.mode} </p>
     <p>{doc.note} </p>
     <p>{doc.pointe} </p>
    
  </div>
);
};

export default Tabligne;