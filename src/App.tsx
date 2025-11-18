import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";
import UserDetail from "./component/UserDetail";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
