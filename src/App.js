import React from 'react';
import './App.css';
import PlacesInfoForm from './PlacesInfoForm';
import UserForm from './UserForm';
import PaymentForm from './PaymentForm';
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
            path="/playover-data/placesform" 
            element={
              <ProtectedRoute>
                <PlacesInfoForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/playover-data/userform" 
            element={
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/playover-data/payment" 
            element={
                <PaymentForm paymentClientToken={"thisisatestoken"} />
            } 
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
