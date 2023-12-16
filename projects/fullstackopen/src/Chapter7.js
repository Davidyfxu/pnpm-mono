import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Notes from "./components/Notes";
import Users from "./components/Users";
import Home from "./components/Home";
const Chapter7 = () => {
  return (
    <Container>
      <Router>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to={"/"}>home</Link>
          <Link to={"/notes"}>notes</Link>
          <Link to={"/users"}>users</Link>
        </div>
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <div>
          <i>Note app, Department of Computer Science 2022</i>
        </div>
      </Router>
    </Container>
  );
};

import { Container } from "@mui/material";

export default Chapter7;
