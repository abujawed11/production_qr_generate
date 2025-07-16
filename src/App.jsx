import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomerOrderForm from './CustomerOrderForm'
import QRGeneratorPage from './productionQRGenerate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <CustomerOrderForm /> */}
      <QRGeneratorPage/>
    </>
  )
}

export default App
