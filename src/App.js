import React from "react";
import { BrowserRouter as Router, Route, Routes } from 
"react-router-dom";
import Home from "./pages/Home";
import Transfers from "./pages/Transfers";
import ListTransfers from "./pages/ListTransfers";
import './styles/index.css';
import { TransferProvider } from "./context/TransferContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <TransferProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/listTransfers" element={<ListTransfers />} />
        </Routes>
      </Router>
    </TransferProvider>
  );
};

export default App;