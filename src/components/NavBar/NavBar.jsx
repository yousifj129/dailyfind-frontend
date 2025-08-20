import { Link } from "react-router";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./NavBar.css";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserInformation } from "../../../lib/api";
const NavBar = ({ token, handleLogout }) => {
  
  const [balance, setBalance] = useState(0)
  const [myId, setMyId] = useState()
  const update = async()=>{
    if(myId){
      const user = await getUserInformation(myId)
      setBalance(user.balance)
    }
  }
  useEffect(()=>{
    setMyId(jwtDecode(token).id)
    update()
  }, [myId])
  return (
    <nav className="navbar">
      <ul className="navlist">
        <li>
          <a href="/">Home</a>
        </li>
        {!token ? (
          <>
            <li>
              <a href="/login">login</a>
            </li>
            <li>
              <a href="/signup">signup</a>
            </li>
          </>
        ) : null}
        {token ? (
          <>
            <li>
              <a href="/new">New Item</a>
            </li>
            <li>
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : null}
      </ul>
      
        <div className="shoppingimg">

            <a href="/shoppingcart"><img src="https://static.vecteezy.com/system/resources/previews/004/999/463/non_2x/shopping-cart-icon-illustration-free-vector.jpg"  alt="shopping img" /></a>
            <a href={`/user/${myId}`}><img src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"  alt="shopping img" /></a> 
            <p>balance: ${balance}</p>
 
        </div> 
   </nav>
  );
};

export default NavBar;
