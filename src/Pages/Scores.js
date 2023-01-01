import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
const Scores = () => {
  const usersCollectionRef = collection(db, "questions");
  const [quizarry, setQuizarry] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setQuizarry(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <form>
   
       { quizarry.map((quizItem, index) => {
          return (
            <div
              key={index}
              className="row m-3"
              style={{ border: "1px solid black ", borderRadius: "10px" }}
            >
              <div className="leftcard col">
                <h1 className="title">{quizItem.title}</h1>
                <p className="text">{quizItem.desc}</p>
              </div>
              <div className="rightcard col m-3 ">
                <div className="row">
                  <h5 className="col">{quizItem.date}</h5>
                  <h5 className="col">{quizItem.time}</h5>

                  <Link
                    to={`/score/${quizItem.id}`}
                    className="text-light btn btn-info col"
                  >
                    scores
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </form>
  );
};

export default Scores;
