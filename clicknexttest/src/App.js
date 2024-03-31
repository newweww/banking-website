import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Deposit from './component/deposit';
import Withdraw from './component/withdraw';
import Transfer from './component/transfer';
import History from './component/history';
import Home from './component/home';
import Login from './component/login';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path='/history' element={<History />} />
        </Routes>
    </div>
  );
}

export default App;
