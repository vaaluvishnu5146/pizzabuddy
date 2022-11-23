import axios from "axios";
import React, { useState } from "react";
import AuthLayout from "../../Template/AuthLayout";
import { validateEmail } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formDetails, setFormDetails] = useState({});
  const navigation = useNavigate();
  const handleInput = (e) => {
    if (e) {
      let formDetailsCopy = Object.assign({}, formDetails);
      formDetailsCopy[e.target.id] = e.target.value;
      setFormDetails(formDetailsCopy);
    }
  };

  const handleCreateAccount = (e) => {
    let formDetailsCopy = Object.assign({}, formDetails);
    if (!validateEmail(formDetailsCopy?.email || "")) {
      alert("Email is not valid");
    } else if (
      !formDetailsCopy?.password ||
      !formDetailsCopy?.confirmPassword ||
      String(formDetailsCopy?.password).trim().toLocaleLowerCase() !==
        String(formDetailsCopy?.confirmPassword).trim().toLocaleLowerCase()
    ) {
      console.log(formDetails.password, formDetails.confirmPassword);
      alert("Passwords doesnt match");
    } else {
      axios
        .post("http://localhost:5000/signup", formDetailsCopy)
        .then((response) => {
          if (response && response.status === 200) {
            navigation("/");
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <AuthLayout>
      <div className="card p-4" style={{ width: "18rem" }}>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formDetails["email"] || ""}
            placeholder="name@example.com"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formDetails["password"] || ""}
            placeholder="***********"
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label for="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={formDetails["confirmPassword"] || ""}
            placeholder="***********"
            onChange={handleInput}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
      </div>
    </AuthLayout>
  );
}
