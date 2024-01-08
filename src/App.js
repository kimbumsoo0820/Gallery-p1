import logo from "./logo.svg";
import "./App.css";
import Home from "./page/Home.jsx";
import Gallery from "./page/gallery/galleryList.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/gallery" exact element={<Gallery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
