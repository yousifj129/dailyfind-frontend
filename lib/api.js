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
}
const updateShoppingItem = async (shoppingItem) => {
  
    
    const token = localStorage.getItem('token')
    if (!token) return;
    const headers = {
      "Authorization": `Bearer ${token}`
    }
    
    const response = await axios.put(`${url}/shoppingItems/${shoppingItem._id}`,
      shoppingItem, { headers: headers }
    )
}
const deleteShoppingItem = async (shoppingItem) => {
  
    
    const token = localStorage.getItem('token')
    if (!token) return;
    const headers = {
      "Authorization": `Bearer ${token}`
    }
    
    const response = await axios.delete(`${url}/shoppingItems/${shoppingItem._id}`,
      shoppingItem, { headers: headers }
    )
}
const getAllShoppingItems = async () => {
  const shoppingItems = await (await axios.get(`${url}/shoppingItems`)).data
  return shoppingItems
}

const getRecommendedShoppingItems = async (itemName, itemDescription) => {
  const shoppingItems = await (await axios.get(`${url}/shoppingItems`)).data
  const chosenShoppingItems = shoppingItems.filter((shoppingItem)=>{

    if(shoppingItem.itemName.includes(itemName)){
      return true
    }
    else if(shoppingItem.itemDescription.includes(itemDescription))
    {
      return true
    }
  })
    while(chosenShoppingItems.length <6){
      const randomIndex = Math.floor(Math.random()*(shoppingItems.length))
      chosenShoppingItems.push(shoppingItems[randomIndex])
    }
  
  return chosenShoppingItems
}

const getShoppingItem = async (id) => {

  const response =await (await axios.get(`${url}/shoppingItems/${id}`)).data
  return response
}

const getUserInformation = async(id) =>{
  const response =await (await axios.get(`${url}/auth/user/${id}`)).data
  return response
}
const setUserInformation = async(id, body)=>{
  const response =await (await axios.post(`${url}/auth/user/${id}`, body)).data
  return response
}
export {
  getAllShoppingItems,
  createShoppingItem,
  getShoppingItem,
  getRecommendedShoppingItems,
  updateShoppingItem,
  deleteShoppingItem,
  getUserInformation,
  setUserInformation
}