import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landingpage from '../src/components/landingpage';
 import Login from '../src/components/login';
import React from 'react';
import SellerDashboard from '../src/components/seller';
// this is changes app.js
import Buyers from './components/buyer'
import './App.css';
import AdminDashboard from './components/admin';
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />  
      <Route path='/seller' element={<SellerDashboard />} />
     
      <Route path="/buyer" element={<Buyers />} />    
      <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router> 
   
  );
}

export default App;
