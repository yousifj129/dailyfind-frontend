import { useState } from 'react'
import './App.css'
import { getAllShoppingItems } from '../lib/api'
import ShoppingItemsList from './components/ShoppingItemsList/ShoppingItemsList'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar"

function App() {
  const [shoppingItems, setShoppingItems] = useState(getAllShoppingItems())
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<ShoppingItemsList shoppingItems={shoppingItems}/>} />
        <Roue path = "" />


      </Routes>



    </Router>

  )


}

export default App

