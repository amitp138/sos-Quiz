import React, { useState } from "react";
import "./Admin.css";
import { auth } from "../firebase-config";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const Admin = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, adminEmail, password);

      if (user) {
        alert("user authenticated");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  const handleAdminEmail = (e) => {
    setAdminEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className=" border Login ">
      <form className="m-5">
        <p>Signed In by: {user?.email}</p>
        <Button
          onClick={logout}
          className="text-light btn btn-info"
          style={{ marginLeft: "16vw" }}
        >
          LogOut
        </Button>
        <div className="form-group m-3">
          <label htmlFor="Name">AdminEmail</label>
          <input
            type="email"
            className="form-control  m-2 logininp"
            id="Name"
            placeholder="Enter AdminEmail"
            value={adminEmail}
            onChange={handleAdminEmail}
          />
        </div>
        <div className="form-group m-3">
          <label htmlFor="exampleInputEmail1">Password</label>
          <input
            type="password"
            className="form-control m-2 logininp"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <Button
          onClick={login}
          className="text-light btn btn-info"
          style={{ marginLeft: "16vw" }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Admin;
