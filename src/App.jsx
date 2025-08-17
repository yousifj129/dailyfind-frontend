import { useState } from 'react'
import './App.css'
import { getAllShoppingItems } from '../lib/api'
import ShoppingItemsList from './components/ShoppingItemsList/ShoppingItemsList'

function App() {
  const [shoppingItems, setShoppingItems] = useState(getAllShoppingItems())
  return (
    <>
      <ShoppingItemsList shoppingItems={shoppingItems}/>
    </>
  )
}

export default App
 