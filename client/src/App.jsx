import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './conponents/Auth/Login';
import FileUpload from './conponents/File/FileUpload';
import FileList from './conponents/File/FieList';
import Register from './conponents/Auth/Register';
import Home from './conponents/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/list" element={<FileList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
