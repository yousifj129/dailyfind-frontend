import { useEffect, useState } from 'react'
import './App.css'
import { getAllShoppingItems } from '../lib/api'
import ShoppingItemsList from './components/ShoppingItemsList/ShoppingItemsList'

function App() {
  const [shoppingItems, setShoppingItems] = useState([])
  const update = async () => {
    const items = await getAllShoppingItems()
    setShoppingItems(items)
  }
  useEffect(() => {
    update()
  }, [])
  return (
    <>
      <ShoppingItemsList shoppingItems={shoppingItems} />
    </>
  )
}

export default App
