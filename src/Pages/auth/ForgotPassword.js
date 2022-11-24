import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Template/AuthLayout";

export default function ForgotPassword() {
  const navigation = useNavigate();
  const [formDetails, setFormDetails] = useState({});
  const [formStep, setFormStep] = useState(1);
  const [error, setError] = useState(null);
  const handleInput = (e) => {
    if (e) {
      let formDetailsCopy = Object.assign({}, formDetails);
      formDetailsCopy[e.target.id] = e.target.value;
      setFormDetails(formDetailsCopy);
    }
  };

  const handleAccountExists = (e) => {
    if (e && formDetails["email"]) {
      // FIRE API AND CHNAGE PASSWORD
      axios
        .post("http://localhost:5000/signin/checkUser", {
          email: formDetails["email"],
        })
        .then((response) => {
          const data = response?.data;
          if (data && data.success) {
            setFormStep(2);
          }
          if (!data.success) {
            setError(data?.message);
          }
        })
        .catch((e) => console.log(e));
    } else {
      // PASSWORDS DONT MATCH
      alert("Email is empty");
    }
  };

  const handlePasswordChange = (e) => {
    if (formDetails["password"]?.length < 1) {
      setError("Password is not valid");
      return;
    }
    if (
      e &&
      formDetails["password"] &&
      formDetails["password"] === formDetails["confirmPassword"] &&
      formDetails["password"]?.length > 0
    ) {
      // FIRE API AND CHNAGE PASSWORD
      axios
        .post("http://localhost:5000/signin/forgotpassword", {
          email: formDetails["email"],
          password: formDetails["password"],
        })
        .then((response) => {
          let data = response?.data;
          console.log(response, data);
          if (data && response.status === 201 && data.success) {
            navigation("/");
          } else {
            setError(data?.message);
          }
        })
        .catch((e) => console.log(e));
    } else {
      // PASSWORDS DONT MATCH
      alert("Passwords doesnt match");
    }
  };

  const renderAlert = (type, message = "") => {
    console.log(type, message);
    switch (type) {
      case "error":
        return (
          <div class="alert alert-danger" role="alert">
            {message}
          </div>
        );
        break;
      default:
        return (
          <div class="alert alert-success" role="alert">
            {message}
          </div>
        );
        break;
    }
  };

  return (
    <AuthLayout>
      {error && renderAlert("error", error)}
      <div className="card p-4" style={{ width: "18rem" }}>
        {formStep === 1 && (
          <>
            <div className="mb-3">
              <label for="email" className="form-label">
                Registered Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formDetails["email"] || ""}
                placeholder="test@test.domain"
                onChange={handleInput}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAccountExists}
            >
              Find my account
            </button>
          </>
        )}
        {formStep === 2 && (
          <>
            <div className="mb-3">
              <label for="email" className="form-label">
                New Password
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
              <label for="password" className="form-label">
                Confirm Password
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
              onClick={handlePasswordChange}
            >
              Change password
            </button>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
