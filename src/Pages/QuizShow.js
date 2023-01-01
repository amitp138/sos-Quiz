import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase-config';
import QuizCard from "../components/QuizCard";


const QuizShow = ({ setQuizId }) => {

  const [quizarry, setQuizarry] = useState([]);

 
  useEffect(() => {
    const fetchPost = async () => {
       
      await getDocs(collection(db, "questions"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setQuizarry(newData);                
             
          })
       
        }
      
  
   fetchPost();
  }, []);
    


  return (
    <div className="quizes container">
      {quizarry.map((quizItem) => {
        return (
          <QuizCard
            quizItem={quizItem}
            key={quizItem.id}
            setQuizId={setQuizId}
          />
        );
      })}
    </div>
  );
};

export default QuizShow;
