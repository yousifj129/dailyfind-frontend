import { Link, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { ThinStar,Rating } from "@smastrom/react-rating"
import ShoppingItemsListContainer from "../ShoppingItemsList/ShoppingItemsListContainer/ShoppingItemsListContainer"
import { jwtDecode } from "jwt-decode"
import { getUserInformation , getAllShoppingItems, setUserInformation } from "../../../lib/api"

const ProfileView = ({ token }) => {
    const {id} = useParams()
    const viewerId = jwtDecode(token).id
    const [user, setUser] = useState()
    const [balance, setBalance] = useState(0)
    const [item, setItem] = useState([])
    const navigate = useNavigate()
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
        <input type="number" name="balance" id="balance" defaultValue={user.balance} onKeyDown={(e)=>{
            if(e.key == 'Enter')
            {
                setUserInformation( user._id,{...user, balance: e.target.value})
                //https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
                window.location.reload(true);
            }
        }} />
         <ShoppingItemsListContainer shoppingItems={item}/>

         
        </>
         : null}
    </>
    
}



export default ProfileView



