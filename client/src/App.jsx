import { useState } from "react";
import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import NoPage from "./pages/NoPage"
import Chat from "./pages/Chat";
import Home from "./pages/Home";





function App() {
  return (
    <>
   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/chat' element={<Chat />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      
    </>
  )
}

export default App