import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomerOrderForm from './CustomerOrderForm'
import QRGeneratorPage from './productionQRGenerate'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRGenerator from './productionQRGenerate'
import HistoryPage from './QRHistory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <CustomerOrderForm /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRGenerator/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
