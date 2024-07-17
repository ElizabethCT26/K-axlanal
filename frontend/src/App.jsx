import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Componente from './components/Componente'
import Footer from './components/Footer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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




function App() {
  const [count, setCount] = useState(0)

  return (
    <GeneralContextProvider>
      <BrowserRouter>
        <Routes>
        <Route element={Header}></Route>
          <Route path='/producto/:id' element={<PagesProduct />}/>
          <Route path='/producto/:id/edit' element={<CreateProduct   />}/>
          <Route path='/perfil-tienda' element={<ProfileStore />}/>
          <Route path='/' element={<Main />}/>
          <Route path='/tienda/:id' element={<MyStore/>}/>
          <Route path='/pagina-producto' element={<Product/>}/>
          <Route path='/crear-producto' element={<CreateProduct/>}/>
          <Route path='/crear-tienda' element={<CreateStore/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/categorias' element={<Categories/>}/>
          <Route  element={<Footer/>}/>
          <Route path='/registro' element={<Register/>}/>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/crud-tienda' element={<StoreCrud/>}/>
        </Routes>
      </BrowserRouter>

    </GeneralContextProvider>
  )
}

export default App
