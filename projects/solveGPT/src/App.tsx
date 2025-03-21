import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./pages/Chat";
import ClassNote from "./pages/ClassNote";
import QuestionUpload from "./pages/QuestionUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}>
          <Route path="class-note" element={<ClassNote />} />
          <Route path="question-upload" element={<QuestionUpload />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
