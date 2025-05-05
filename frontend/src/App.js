import React from 'react'
import { useRoutes } from "react-router-dom";
import SideBar from './Components/SideBar/SideBar';
import Header from "./Components/Header/Header";
import routes from "./routes";

import './App.css'

export default function App() {

  const router = useRoutes(routes)
  return (
    <>
      <SideBar />
      <div className="main">
      <Header />
        {/* Router */}
        {router}
      </div>
    </>
  )
}
