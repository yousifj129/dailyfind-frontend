import { useParams } from "react-router"
import { Link } from "react-router"
import { deleteShoppingItem, getAllShoppingItems, getRecommendedShoppingItems, getShoppingItem, getUserInformation, setUserInformation } from "../../../lib/api"
import { useEffect, useState } from "react"
import { ThinStar, Rating } from "@smastrom/react-rating"
import "./ViewShoppingItem.css"
import ShoppingItemsListContainer from "../ShoppingItemsList/ShoppingItemsListContainer/ShoppingItemsListContainer"
import { jwtDecode } from "jwt-decode"
import ReviewForm from "../ReviewForm/ReviewForm"
const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fff700ff",
};
const ViewShoppingItem = ({ token }) => {
    const { id } = useParams()
    const [shoppingItem, setShoppingItem] = useState()
    const [moreLikeItems, setMoreLikeItems] = useState([])
    const [amountOfItemsToBuy, setAmountOfItemsToBuy] = useState(1)
    const [rating, setRating] = useState(0)
    function getDecodedToken() {
        if (token) {
            return jwtDecode(token);
        }
        return null;
    }
    const update = async () => {
        const item = await getShoppingItem(id)
        setShoppingItem(item)
        const recommendedItems = await getRecommendedShoppingItems()
        setMoreLikeItems(recommendedItems)
        try {
            if (item.reviews.length > 0) {
                setRating(item.reviews.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.rating,
                    0
                ) / item.reviews.length);
            }
            else {
                setRating(1)
            }
        }
        catch {

        }
    }
    const buyItem = async () => {
        const currentUser = await getUserInformation(getDecodedToken().id)

        for (let i = 0; i < amountOfItemsToBuy; i++) {
            currentUser.ShoppingCart.push(id)
        }

        await setUserInformation(getDecodedToken().id, currentUser)

    }
    useEffect(() => {
        update()
    }, [])
    return <>
        {shoppingItem && moreLikeItems ? <> <div className="container">
            <div className="itemContainer">
                <div className="imagesContainer">
                    <div className="secondaryImageContainer">
                        {shoppingItem.images.map((image, index) => {
                            if (index == 0) return null;
                            if (index > 3) return null
                            return <img key={index} src={image} className="secondaryImage" />
                        })}
                    </div>
                    <img src={shoppingItem.images[0]} alt="main image" className="mainImage" />

                </div>
                <div className="infoContainer">
                    {getDecodedToken(token)?.id == shoppingItem.owner._id ? <Link to={`/update/${shoppingItem._id}`}>Update Item</Link>
                        : null}
                    {getDecodedToken(token)?.id == shoppingItem.owner._id ? <Link onClick={()=>{
                        deleteShoppingItem(shoppingItem)
                    }}>Delete Item</Link>
                        : null}
                    <h1>{shoppingItem.itemName}</h1>
                    <Link to={`/user/${shoppingItem.owner._id}`}><h3>{shoppingItem.owner.username}</h3></Link>
                    <Rating
                        style={{ maxWidth: 90, display: "flex" }}
                        value={rating}
                        readOnly={true}
                        itemStyles={myStyles}
                    >
                    </Rating>
                    <h2>${shoppingItem.price}</h2>
                    <p>{shoppingItem.itemDescription}</p>
                    <hr />
                    <input min={1} max={1000} name="number" type="number" value={amountOfItemsToBuy} onChange={(event) => {
                        setAmountOfItemsToBuy(event.target.value)
                        console.log(rating )
                    }} />
                    <button onClick={buyItem}>Add To Cart</button>
                </div>

            </div>


        </div>
            <div className="reviewsContainer">
                {token ? <ReviewForm token={token} id={id} shoppingItem={shoppingItem}></ReviewForm> : null}
                {/* Zaid was here ;) */}
                {shoppingItem.reviews.map((review) => {
                    return <div key={review._id}>
                        <h3>{review.reviewer.username}</h3>
                        <Rating
                            style={{ maxWidth: 90, display: "flex" }}
                            value={review.rating}
                            readOnly={true}
                            itemStyles={myStyles}
                        >
                            <span style={{ justifySelf: "flex-end", alignSelf: "center" }}>
                                {rating}/5
                            </span>
                        </Rating>
                        <p>{review.message}</p>
                        <hr />
                    </div>
                })}
            </div> </> : null}

        <div>
            <h1>More Like This</h1>
            <ShoppingItemsListContainer shoppingItems={moreLikeItems} />
        </div>


    </>
}



export default ViewShoppingItem