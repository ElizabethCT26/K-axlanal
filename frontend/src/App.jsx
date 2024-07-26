import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import './App.css'
import Header from './components/Header'
import PagesProduct from './pages/PagesProduct'
import Main from './pages/Main'
import ProfileStore from './pages/ProfileStore'
import MyStore from './pages/MyStore'
import Product from './pages/Product'
import CreateProduct from './pages/CreateProduct'
import CreateStore from './pages/CreateStore'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Products from './pages/Products'
import { GeneralContextProvider } from './contexts/GeneralContext'
import StoreCrud from './pages/StoreCrud'
import CategoriesCrud from './pages/CategoriesCrud'
import UsersCrud from './pages/UsersCrud'
import ProductCrud from './pages/ProductCrud'
import Dashboard from './pages/Dashboard'
import EditProfile from './pages/EditProfile'
import Stores from './pages/Stores'
import Profile from './pages/Profile'
import Nosotros from './pages/Nosotros'
import RecoverPassword from './pages/RecoverPassword'



function App() {

  return (
    <GeneralContextProvider>
      
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/producto/:id' element={<PagesProduct />}/>
          <Route path='/producto/:id/edit' element={<CreateProduct   />}/>
          <Route path='/perfil-tienda' element={<ProfileStore />}/>
          <Route path='/' element={<Main />}/>
          <Route path='/tienda/:id' element={<MyStore/>}/>
          <Route path='/tienda/:id/edit' element={<CreateStore/>}/>
          <Route path='/pagina-producto' element={<Product/>}/>
          <Route path='/crear-producto' element={<CreateProduct/>}/>
          <Route path='/crear-tienda' element={<CreateStore/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/categorias' element={<Categories/>}/>
          <Route path='/registro' element={<Register/>}/>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/productos/:name' element={<Products/>}/>
          <Route path='/productos/:categories/:name' element={<Products/>}/>
          <Route path='/tiendas' element={<Stores/>}/>
          <Route path='/tiendas/:name' element={<Stores/>}/>
          <Route path='/tiendas/:areas/:id' element={<Stores/>}/>
          <Route path='/crud-tienda' element={<StoreCrud/>}/>
          <Route path='/crud-categorias' element={<CategoriesCrud/>}/>
          <Route path='/crud-usuarios' element={<UsersCrud/>}/>
          <Route path='/crud-productos' element={<ProductCrud/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/editar-perfil' element={<EditProfile/>}/>
          <Route path='/perfil' element={<Profile/>}/>
          <Route path='/nosotros' element={<Nosotros/>}/>
          <Route path='/restablecer-contraseña' element={<RecoverPassword/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </GeneralContextProvider>
  )
}

export default App
