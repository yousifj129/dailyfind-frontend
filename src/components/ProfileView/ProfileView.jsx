import { Link, useParams } from "react-router"
import { useEffect, useState } from "react"
import { ThinStar,Rating } from "@smastrom/react-rating"
import ShoppingItemsListContainer from "../ShoppingItemsList/ShoppingItemsListContainer/ShoppingItemsListContainer"
import { jwtDecode } from "jwt-decode"
import { getUserInformation , getAllShoppingItems } from "../../../lib/api"

const ProfileView = ({ token }) => {
    const {id} = useParams()
    const viewerId = jwtDecode(token).id
    const [user, setUser] = useState()
    const [item, setItem] = useState([])
    const update = async ()=>{
        const userInfo = await getUserInformation(id)
        const element = await getAllShoppingItems(id)
        console.log(element)
        setUser(userInfo)
        const items = element.filter((elem) => {
            if(elem.owner === userInfo._id){
                return true
        }})
        setItem(items)
    }
    useEffect(()=>{
        update()
    }, [])
    return <>
        {user ? 
        <>
        <h1>{user.username}</h1>
        
         <ShoppingItemsListContainer shoppingItems={item}/>
        </>
         : null}
    </>
    
}



export default ProfileView



