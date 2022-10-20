import React from 'react';
import './App.css';
import PlacesInfoForm from './PlacesInfoForm';
import Login from './Login';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/playover-data" element={<Login />}></Route>
          <Route 
            path="/playover-data/submit" 
            element={
              <ProtectedRoute>
                <PlacesInfoForm />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
