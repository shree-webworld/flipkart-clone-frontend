import { useState } from 'react'
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import {Routes, Route} from "react-router-dom";

function App()
{
  return (
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/product/:id" element={<ProductDetail />}/>
            </Routes>
          )
}

export default App
