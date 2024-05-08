import Login from "./AUTH/Login";
import Reg from "./AUTH/Reg";
import DisTodo from "./Home/DisTodo";
import Addnew from "./Home/Addnew";
import { authContext } from './App';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';  
import { useContext } from "react";

export function Main() {
  
  const { isLoggedIn } = useContext(authContext);
    return (
      <>
      
      <Router>
      <Routes>
       
        <Route path="/" element={isLoggedIn ?<DisTodo />: <Navigate to={'/login'} />} />
        <Route path="/add" element={<Addnew />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </Router>

      </>
    );
  }