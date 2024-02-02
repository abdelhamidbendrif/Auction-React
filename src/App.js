import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import MyProducts from './MyProducts';
import Home from './Home';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auction-react' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/MyProducts' element={<MyProducts />} />
          <Route path='/AddProduct' element={ <AddProduct/> } />
          <Route path='/UpdateProduct' element={ <UpdateProduct/> } />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
