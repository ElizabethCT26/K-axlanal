import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Header />}/>
        <Route path="/" element={<Footer />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
