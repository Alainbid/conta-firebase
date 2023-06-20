import React from 'react';
 import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import Pointage from "./pages/Pointage";
import NotFound from "./pages/NotFoundPage";
import Depenses from "./pages/Depenses";
import Benefs from "./pages/Beneficiaires";
import Saisie  from "./pages/Saisie";
// import Majour from './pages/majour';
//  import Test from './pages/Test';
 import Recherche from "./pages/Recherche"
 import ListeDepenses from './components/ListeDepenses';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Saisie />}></Route>
        <Route path="/SignInPage" element={<SignIn />}></Route>
        <Route path="/Pointage" element={<Pointage />}></Route>
        <Route path="/Depenses" element={<Depenses />}></Route>
        <Route path="/Beneficiaires" element={<Benefs />}></Route>
        <Route path="/Saisie" element={<Saisie />}></Route>
        <Route path="/ListeDepenses" element={<ListeDepenses />}></Route>
        <Route path="/Rechercher" element={<Recherche />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;
