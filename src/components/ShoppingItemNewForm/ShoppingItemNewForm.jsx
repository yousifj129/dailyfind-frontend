import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { createShoppingItem } from "../../../lib/api"



const ShoppingItemNewForm = ({ shoppingItems }) => {
    const [formData, setFormData] = useState({
        itemName:"",
        itemDescription:"",
        itemCategory:"",
        quantity:0,
        price:0,
        itemSpecification:0,
        images:[],
        shippingType:""
    })

    const handleChange = (event)=>{
        console.log(event.target)
        setFormData({...formData, [event.target.name]:event.target.value})
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        createShoppingItem(formData)

    }
    return (
        <>
           <form onSubmit={handleSubmit}>
                <label htmlFor="itemName">itemName: </label>
                <input onChange={handleChange} value={formData.itemName} type="text" name="itemName" id="itemName" />
                <label htmlFor="itemDescription">itemDescription: </label>
                <input onChange={handleChange} value={formData.itemDescription} type="text" name="itemDescription" id="itemDescription" />
                <label htmlFor="itemCategory">itemCategory: </label>
                <input onChange={handleChange} value={formData.itemCategory} type="text" name="itemCategory" id="itemCategory" />
                <label htmlFor="quantity">quantity: </label>
                <input onChange={handleChange} value={formData.quantity} type="text" name="quantity" id="quantity" />
                <label htmlFor="price">price: </label>
                <input onChange={handleChange} value={formData.price} type="text" name="price" id="price" />
                <label htmlFor="itemSpecification">itemSpecification: </label>
                <input onChange={handleChange} value={formData.itemSpecification} type="text" name="itemSpecification" id="itemSpecification" />
                <label htmlFor="shippingType">shippingType: </label>
                <input onChange={handleChange} value={formData.shippingType} type="text" name="shippingType" id="shippingType" />
                <label htmlFor="images">images: </label>
                <input type="file" name="images" id="images" />
                <input type="submit" value="submit" />
            </form> 
        </>
    )
}


export default ShoppingItemNewForm