import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CreateProject from "./CreateProject";
import ProjectList from "./ProjectList";
import Dashboard from "./Dashboard";

function App() {
  const [user, setLogin] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setLogin={setLogin} />} />
          <Route path="/CreateProject" element={<CreateProject />} />
          <Route path="/ProjectList" element={<ProjectList />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
