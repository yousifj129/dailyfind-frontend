import { useState } from 'react'
import './App.css'
import { getAllShoppingItems } from '../lib/api'
import ShoppingItemsList from './components/ShoppingItemsList/ShoppingItemsList'
import ShoppingItemNewForm from './components/ShoppingItemNewForm/ShoppingItemNewForm'

function App() {
  const [shoppingItems, setShoppingItems] = useState(getAllShoppingItems())
  return (
    <>
      <ShoppingItemNewForm/>
    </>
  )
}

export default App
 