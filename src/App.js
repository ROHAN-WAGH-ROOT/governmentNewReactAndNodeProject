import publicRoutes from "./routes";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BasicLayout from "./layout/BasicLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ListAuthorities from "./pages/ListAuthorities";
import AddServices from "./pages/AddServices";
import ListServices from "./pages/ListServices";
import Publicroute from "./routes/PublicRoute";
import Privateroute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "./pages/Error";
// import { Signup } from "../../../suvit/suvit-frontend/front/src/containers/Auth/Signup";

function App() {
  const user = useSelector(state => state.auth);
  return (
    <BrowserRouter>
      <Publicroute />
      <Privateroute />
    </BrowserRouter >
  );
}

export default App;
