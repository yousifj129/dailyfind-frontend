import { useEffect, useState } from "react"
import ShoppingItemsListContainer from "../ShoppingItemsList/ShoppingItemsListContainer/ShoppingItemsListContainer"
import { getUserInformation, setUserInformation } from "../../../lib/api"
import { jwtDecode } from "jwt-decode"

const ShoppingCart = ({token}) =>{
    const [shoppingItems, setShoppingItems] = useState([])
    const [message, setMessage] = useState("")
    const update = async () => {
        const shoppingCart = await (await getUserInformation(jwtDecode(token).id)).ShoppingCart
        console.log(shoppingCart)
        setShoppingItems(shoppingCart)
    }
    const buyAll = async () => {
        const user = await getUserInformation(jwtDecode(token).id)
        let amountOfDebt = 0
        for (let i = 0; i < user.ShoppingCart.length; i++) {
            amountOfDebt -= user.ShoppingCart[i].price
        }
        if(Math.abs(amountOfDebt) > user.balance)
        {
            setMessage("Not enough money to buy this")
            return
        }
        user.ShoppingCart = []
        user.balance += amountOfDebt
        await setUserInformation(jwtDecode(token).id, user)
        setShoppingItems([])
        setMessage("You just bought everything :)")
    }
    const removeAll = async () => {
        const user = await getUserInformation(jwtDecode(token).id)
        user.ShoppingCart = []
        await setUserInformation(jwtDecode(token).id, user)
        setShoppingItems([])
        setMessage("You removed all")
    }
    
    useEffect(()=>{
        update()
    }, [])


    return (<>
        {shoppingItems ? <ShoppingItemsListContainer shoppingItems={shoppingItems}/> : null}
        <p>{message}</p>
        <div style={{width:"40%", display:"flex", gap:"10px"}}>
            <button onClick={buyAll}>Buy all</button>
            <button onClick={removeAll}>Remove all items from cart</button>
        </div>
    </>)

}


export default ShoppingCart