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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/producto' element={<PagesProduct />}/>
          <Route path='/perfil-tienda' element={<ProfileStore />}/>
          <Route path='/' element={<Main />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
