import React from "react";
import { BrowserRouter } from "react-router-dom";
import HomeRouter from "./Routes/HomePage";


function App() {
  return (
    <div>
      <BrowserRouter>
      <HomeRouter/>
      </BrowserRouter>

    </div>
  );
}

export default App;


