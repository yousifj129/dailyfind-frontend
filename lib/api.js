import axios from "axios";
const url = import.meta.env.VITE_BACK_END_SERVER_URL

const createShoppingItem = async (shoppingItem) => {
  const token = localStorage.getItem('token')
  if (!token) return
  const headers = {
    "Authorization": `Bearer ${token}`
  }
  const response = await axios.post(`${url}/shoppingItems`,
    shoppingItem, { headers: headers }
  )
  console.log(response)
}

const getAllShoppingItems = async () => {
  const shoppingItems = await (await axios.get(`${url}/shoppingItems`)).data
  console.log(shoppingItems)
  return shoppingItems
}


export {
  getAllShoppingItems,
  createShoppingItem
}