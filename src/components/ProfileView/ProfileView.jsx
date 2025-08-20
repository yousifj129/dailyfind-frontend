import { Link, useParams } from "react-router"
import { useEffect, useState } from "react"
import { ThinStar,Rating } from "@smastrom/react-rating"
import ShoppingItemsListContainer from "../ShoppingItemsList/ShoppingItemsListContainer/ShoppingItemsListContainer"
import { jwtDecode } from "jwt-decode"
import { getUserInformation } from "../../../lib/api"

const ProfileView = ({ token }) => {
    const {id} = useParams()
    const viewerId = jwtDecode(token).id
    const [user, setUser] = useState()
    const update = async ()=>{
        const userInfo = await getUserInformation(id)
        setUser(userInfo)
    }
    useEffect(()=>{
        update()
    }, [])
    return <>
        {user ? <h1>{user.username}</h1> : null}
    </>
    
}

export default ProfileView



