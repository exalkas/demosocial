import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ContextProvider from "./components/Context";
import EmailConfirm from "./pages/EmailConfirm";
import ForgotPass from "./pages/ForgotPass";
import ChangePass from "./pages/ChangePass";
import Dashboard from "./pages/Dashboard";
import LoginLayout from "./layouts/LoginLayout";
import UserLayout from "./layouts/UserLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
          <Route path="/changepass/:token" element={<ChangePass />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route element={<UserLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
