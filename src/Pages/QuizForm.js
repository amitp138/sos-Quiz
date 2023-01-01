import React, { useState } from "react";
import FormCard from "../components/FormCard";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";
import QuesItem from "../components/QuesItem";
import "./QuizForm.css";

const QuizForm = () => {
 
  const [QuizQues, setQuizQues] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [quest, setQuest] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [cans, setCans] = useState("");
  const handleQues = (e) => {
    setQuest(e.target.value);
  };
  const handletitle = (e) => {
    setTitle(e.target.value);
  };
  const handledesc = (e) => {
    setDesc(e.target.value);
  };
  const handlecans = (e) => {
    setCans(e.target.value);
  };
  const handlea = (e) => {
    setA(e.target.value);
  };
  const handleb = (e) => {
    setB(e.target.value);
  };
  const handlec = (e) => {
    setC(e.target.value);
  };
  const handled = (e) => {
    setD(e.target.value);
  };
  const AddQues = () => {
    setQuizQues([
      ...QuizQues,
      {
        id: uuidv4(),
        quest,
        cans,
        a,
        b,
        c,
        d,
      },
    ]);
    setQuest("");
    setA("");
    setB("");
    setC("");
    setD("");
    setCans("");
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate() + ":" + month + ":" + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes();
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        id: uuidv4(),
        time: time,
        date: date,
        title: title,
        desc: desc,
        QuizQues: QuizQues,
      });
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    alert("Quiz added successfully");
    setQuizQues([]);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="cont ">
       (
        <>
          <div>
            <form>
              <div className=" g-3 align-items-center m-1">
                <label htmlFor="title">Title</label>

                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handletitle}
                  className="form-control w-75"
                />
              </div>
              <div className=" g-3 form-group m-1">
                <label htmlFor="info">Description</label>

                <textarea
                  name="info"
                  id="desc"
                  cols="60"
                  rows="3"
                  value={desc}
                  onChange={handledesc}
                  className="form-control w-75 m-1"
                ></textarea>
              </div>
              <FormCard
                AddQues={AddQues}
                quest={quest}
                a={a}
                b={b}
                c={c}
                d={d}
                cans={cans}
                handleQues={handleQues}
                handlea={handlea}
                handleb={handleb}
                handlec={handlec}
                handled={handled}
                handlecans={handlecans}
              />

              <button
                className="btn btn-success ml-3 submit "
                onClick={handlesubmit}
              >
                submit
              </button>
            </form>
          </div>
          <div>
            <QuesItem QuizQues={QuizQues} setQuizQues={setQuizQues} />
          </div>
        </>
      )
    </div>
  );
};

export default QuizForm;
