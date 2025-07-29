import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRGenerator from './productionQRGenerate'
import HistoryPage from './QRHistory'

function App() {

  return (
    <>
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
