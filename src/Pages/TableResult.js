import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
const TableResult = ({ admin }) => {
  const { id } = useParams();
  const usersCollectionRef = collection(db, "result");
  const [ResultList, setResultList] = useState([]);
  useEffect(() => {
    async function run() {
      const data = await getDocs(usersCollectionRef);
      setResultList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    run();
  }, []);

  return (
    <table className="table m-3">
      {admin ? (
        <>
          <thead>
            <tr>
              <th scope="col">time</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {ResultList.map((resultlist, index) => {
              if (resultlist.quesid === id) {
                return (
                  <tr key={index}>
                    <th scope="row">{resultlist.avvgtime}s</th>
                    <td>{resultlist.name}</td>
                    <td>{resultlist.email}</td>
                    <td>{resultlist.score}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </>
      ) : (
        <div></div>
      )}
    </table>
  );
};

export default TableResult;
