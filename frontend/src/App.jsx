import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="add-book" element={<AddBook />} />

        <Route path='/home' element={<Home/>}>
        <Route index path='/home/dashboard' element={<Dashboard />} />
        
        <Route path="/home/about" element={<About />} />
        <Route path="/home/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
