import React, { useState } from "react";
import QuizForm from "./Pages/QuizForm";
import QuizShow from "./Pages/QuizShow";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import QuizUser from "./Pages/QuizUser";
import Login from "./Pages/Login";
import TableResult from "./Pages/TableResult";
import Scores from "./Pages/Scores";
import Result from "./components/Result";
import Admin from "./Pages/Admin";

const App = () => {
  const [quesId, setQuizId] = useState();
  const [details, setDetails] = useState([]);
 
  const [user, setUser] = useState({});
  return (
    <Router>
      <Navigation user={user}/>
      <Routes>
        <Route exact path="/" element={<QuizShow setQuizId={setQuizId} />} />
        <Route exact path="/form" element={<QuizForm />} />
        <Route
          exact
          path="/login"
          element={
            <Login quesId={quesId} setDetails={setDetails} details={details} />
          }
        />
        <Route
          exact
          path="/quiz/:id"
          element={<QuizUser details={details} />}
        />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/score" element={<Scores  />} />
        <Route exact path="/score/:id" element={<TableResult  />} />
        <Route exact path="/admin" element={<Admin user={user} setUser={setUser}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
