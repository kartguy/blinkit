import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { UploadImg } from './pages/ImageUpload';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';

function App() {
  return (
  <div>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/upload' element={<UploadImg />} />
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
