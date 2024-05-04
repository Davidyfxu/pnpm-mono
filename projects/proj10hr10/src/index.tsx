import * as React from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { Layout } from "@douyinfe/semi-ui";

import CountdownTime from "./CountdownTime";
import Quiz from "./Quiz";
import Recipe from "./Recipe";
import Drawing from "./Drawing";
import Weather from "./Weather";
import ToDo from "./ToDo";
import PswGen from "./PswGen";
import Notes from "./Notes";
import GithubProfiles from "./GithubProfiles";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}>
          <Route path="CountdownTime" element={<CountdownTime />} />
          <Route path="Quiz" element={<Quiz />} />
          <Route path="Recipe" element={<Recipe />} />
          <Route path="Notes" element={<Notes />} />
          <Route path="ToDo" element={<ToDo />} />
          <Route path="GitHubProfiles" element={<GithubProfiles />} />
          <Route path="Drawing" element={<Drawing />} />
          <Route path="PswGen" element={<PswGen />} />
          <Route path="Weather" element={<Weather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
