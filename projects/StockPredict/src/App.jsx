import { BrowserRouter, Route, Routes } from "react-router-dom";

import News from "./pages/News";
import Stocks from "./pages/Stocks";
import Home from "./common/Home";
import Summary from "./pages/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}>
          <Route path={"news"} element={<News />} />
          <Route path={"stocks"} element={<Stocks />} />
          <Route path={"summary"} element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
