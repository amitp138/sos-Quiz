import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserQues from "../components/UserQues";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
const QuizUser = ({ details }) => {
  const { id } = useParams();
  const [QuesList, setQuesList] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function run() {
      const data = await getDocs(collection(db, "questions")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const Currentques = newData.filter((que) => {
            return que.id === id;
          });
          if (Currentques) {
            setQuesList(Currentques);
          }
        }
      );
    }

    run();
  }, []);

  return (
    <div className="item">
      {QuesList &&
        QuesList.map((itemList) => {
          const { title, desc, QuizQues } = itemList;
          return (
            <UserQues
              title={title}
              desc={desc}
              QuizQues={QuizQues}
              key={itemList.id}
              count={count}
              setCount={setCount}
              details={details}
              quesid={itemList.id}
            />
          );
        })}
    </div>
  );
};

export default QuizUser;
