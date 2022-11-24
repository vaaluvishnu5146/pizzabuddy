import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthLayout from "../../Template/AuthLayout";
import { validateEmail } from "../../utilities/helpers";
import { Link, useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { useAppConfig } from "../../Contexts/AppContext";

export default function Signin() {
  const [formDetails, setFormDetails] = useState({});
  const navigation = useNavigate();
  const { isLoggedIn, setLoggedIn = () => {} } = useAppConfig();
  const handleInput = (e) => {
    if (e) {
      let formDetailsCopy = Object.assign({}, formDetails);
      formDetailsCopy[e.target.id] = e.target.value;
      setFormDetails(formDetailsCopy);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation("/landing");
    }
    return () => {};
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      const jwtToken = JSON.parse(localStorage.get("token"));
      console.log(jwtToken);
    } catch (error) {}
  }, []);

  const handleCreateAccount = (e) => {
    let formDetailsCopy = Object.assign({}, formDetails);
    if (!validateEmail(formDetailsCopy?.email || "")) {
      alert("Email is not valid");
    } else if (!formDetailsCopy?.password) {
      alert("Passwords is empty match");
    } else {
      axios
        .post("http://localhost:5000/signin", formDetailsCopy)
        .then((response) => {
          if (response && response.status === 200) {
            if (response.status === 200 && response.data.Token) {
              const jwtToken = response.data.Token;
              try {
                localStorage.setItem("token", JSON.stringify(jwtToken));
                setLoggedIn(true);
                setTimeout(() => {
                  navigation("/landing");
                }, 2000);
              } catch (error) {
                console.error(error);
              }
            }
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreateAccount}
        >
          Login
        </button>
        <div>
          <p>
            Forgot password?
            <span>
              <Link to="/forgotPassword">Click here</Link>
            </span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
