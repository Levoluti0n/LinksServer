import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider></AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
