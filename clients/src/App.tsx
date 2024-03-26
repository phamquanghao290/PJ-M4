import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './page/Home'
import Product from './page/Product'
import Cart from './page/Cart'
import Bill from './page/Bill'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './start/Register'
import Login from './start/Login'
import Admin from './admin/Admin'
import AdminUser from './admin/AdminUser'
import AdminOrder from './admin/AdminOrder'
import AdminProduct from './admin/AdminProduct'
import AdminCategory from './admin/AdminCategory'


type Props = {}

const App = (props: Props) => {
  return (
    <Routes>
      <Route path='/' element={<><Header /><Outlet /><Footer /></>}>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Bill />} />
      </Route>

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/admin' element={<div style={{display:'flex'}}><Admin /><div style={{width:'100%'}}><Outlet /></div></div>}>
        <Route path='/admin' element={<AdminUser />} />
        <Route path='adminOrder' element={<AdminOrder />} />
        <Route path='adminProduct' element={<AdminProduct />} />
        <Route path='adminCategory' element={<AdminCategory />} />
      </Route>
    </Routes>
  )
}

export default App
