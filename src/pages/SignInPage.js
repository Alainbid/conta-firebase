import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/app.scss";

const SignIn = () => {
  // const [refPassword, setrefPassword] = useState("");
  const [voirPwd, setvoirPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [paswd, setPasswd] = useState("");

  const verifEmail = (value) => {
    const element = document.getElementById("signinEmail");
    if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      errorDisplay("email", "email non-conforme", false);
      element.style.border = "solid 2px red";
    } else {
      errorDisplay("email", "", true);
      element.style.border = "solid 2px green";
      setEmail(value);
      console.log("email = ", email);
    }
  };

  const verifPassword = (value) => {
    const element = document.getElementById("signinPwd");
    if (
      !value.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/
      )
    ) {
      errorDisplay(
        "Password",
        "Password non valide minimum 8 caractères,majuscules, minuscules, chiffres, caractères spéciaux",
        false
      );
      element.style.color = "red";
      element.style.border = "solid 2px black";
      console.log("Password null = ", value);
    } else {
      errorDisplay("Password", " ", true);
      element.style.color = "green";
      element.style.border = "solid 2px green";
      setPasswd(value);
      console.log("Password  = ", paswd);
    }
  };

  const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    if (!valid) {
      container.textContent = message;
      container.classList.add("error");
      console.log("container = ", container);
    } else {
      container.textContent = "";
    }
  };

  const togglevoirPwd = () => {
    setvoirPwd(!voirPwd);
    // console.log("après toggle " + voirPwd);
  };

  const connecter = () => {};

  useEffect(() => {
    const inputs = document.querySelectorAll(
      'input[id="signinEmail"], input[id="signinPwd"'
    );
    console.log(inputs);

    inputs.forEach((saisie) => {
      saisie.addEventListener("enter", (e) => {
        console.log("champ : ", e.target.id);
        switch (e.target.id) {
          case "signinEmail":
            verifEmail(e.target.value);
            break;
          case "signinPwd":
            verifPassword(e.target.value);
            break;
          default:
            break;
        }
      });
    });
  });

  return (
    <>
      <Navbar></Navbar>
      <div className="home-container">
        <h3 className="display-2">Sign-In</h3>

        <div className="form-container">
          <form className="signin-form">
            <div className="mb-3">
              <input
                placeholder="Email"
                name="email"
                required
                type="email"
                className="form-control"
                id="signinEmail"
              ></input>
              <span className="email-container">
                <i className="errorDisplay"></i>
              </span>
            </div>

            <div className="mb-3">
              <input
                placeholder="Password"
                onClick={connecter}
                name="pwd"
                required
                type={voirPwd ? "text" : "Password"}
                className="form-control"
                id="signinPwd"
              />
              <span
                onClick={togglevoirPwd}
               // toggle="#confirm-container"
                className="fa fa-fw fa-eye field-icon"
                type="toggle-Password"
              ></span>
             
                <i className="errorDisplay"></i>
             
            </div>

            <button className="btn btn-primary">Valider</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
