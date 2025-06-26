import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import CreateUser from './components/createUser';
import AdminDashboard from './pages/dashboard';
import Login from "./pages/Login"; 
import TrackList from './pages/TrackList';

const App = () => {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  /* update it whenever localStorage changes in this tab */
  useEffect(() => {
    const syncLoginState = () => {
      setIsAdminLoggedIn(!!localStorage.getItem("adminToken"));
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  return (
    
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAdminLoggedIn(true)} />} />
            <Route
              path="/dashboard"
              element={
              isAdminLoggedIn ? <AdminDashboard/> : <Navigate to="/login" />
            }/>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/TrackList" element={<TrackList />} />

        </Routes>

      </Router>
    
  )
}

export default App
