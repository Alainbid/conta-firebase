import React from 'react';
 import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignInPage";
import Pointage from "./pages/Pointage";
import NotFound from "./pages/NotFoundPage";
import Depenses from "./pages/Depenses";
import Benefs from "./pages/Beneficiaires";
import Saisie  from "./pages/Saisie.tsx";
// import Calendar from "./pages/Calendar.tsx"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SignInPage" element={<SignIn />}></Route>
        <Route path="/Pointage" element={<Pointage />}></Route>
        <Route path="/Depenses" element={<Depenses />}></Route>
        <Route path="/Beneficiaires" element={<Benefs />}></Route>
        <Route path="/Saisie" element={<Saisie />}></Route>
        {/* <Route path="/Calendar" element={<Calendar />}></Route> */}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};


export default App;
