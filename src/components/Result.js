import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
const Result = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const timearr = location.state.avgTime;
  const avg = timearr.reduce(function (accumVariable, curValue) {
    return accumVariable + curValue;
  }, 0);
  const handlesubmit = async () => {
    const time = avg / location.state.QuizQues.length;

    const avvgtime = 60 - time;

    try {
      const docRef = await addDoc(collection(db, "result"), {
        quesid: location.state.quesid,
        avvgtime,
        name: location.state.details[0].Name,
        email: location.state.details[0].Email,
        score: location.state.count,
      });
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    alert("response submitted");
    navigate("/");
  };
  return (
    <div className="container  border">
      <>
        <h1>
          Name:{" "}
          <button className="btn btn-info text-light ">
            {location.state.details[0].Name}
          </button>
        </h1>
        <h1>
          Email:{" "}
          <button className="btn btn-info text-light">
            {" "}
            {location.state.details[0].Email}
          </button>
        </h1>
        <h2>Your Score is {location.state.count}</h2>
        <button onClick={handlesubmit} className="btn btn-success">
          confirm{" "}
        </button>
      </>
    </div>
  );
};

export default Result;
