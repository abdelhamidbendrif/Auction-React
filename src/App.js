import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import MyProducts from './MyProducts';
import Home from './Home';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Search from './Search';
import SearchResults from './SearchResults';
import ProductCard from './ProductCard';
import './App.css';
import AvatarUpload from './AvatarUpload';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/ProductCard/:pid" element={<ProductCard />} />
          <Route path='/' element={<Home />} />
          <Route path='/auction-react' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/MyProducts' element={<MyProducts/>} />
          <Route path='/Search' element={<Search/>} />
          <Route path='/AddProduct' element={ <AddProduct/> } />
          <Route path='/UpdateProduct/:pid' element={ <UpdateProduct/> } />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/avatarUpload' element={<AvatarUpload />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
