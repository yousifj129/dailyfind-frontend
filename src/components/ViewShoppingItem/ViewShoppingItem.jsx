import { useParams } from "react-router"
import { getAllShoppingItems, getRecommendedShoppingItems, getShoppingItem } from "../../../lib/api"
import { useEffect, useState } from "react"
import { ThinStar, Rating } from "@smastrom/react-rating"
import "./ViewShoppingItem.css"
import ShoppingItemsListContainer from "../ShoppingItemsList/ShoppingItemsListContainer/ShoppingItemsListContainer"
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
    let rating = 0
    const update = async () => {
        const item = await getShoppingItem(id)
        const recommendedItems = await getRecommendedShoppingItems()
        setShoppingItem(item)
        setMoreLikeItems(recommendedItems)
        try {            
            if (shoppingItem?.reviews?.length > 0) {
                rating = shoppingItem.reviews.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.rating,
                    0
                ) / shoppingItem.reviews.length;
            }
            else {
                rating = 1
            }
        }
        catch {

        }


    }
    const buyItem = () => {

    }
    useEffect(() => {
        update()
    }, [])
    return <>
        {shoppingItem && moreLikeItems? <div className="container">
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
                    <h1>{shoppingItem.itemName}</h1>
                    <h3>{shoppingItem.owner.username}</h3>
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
                    <input name="number" type="number" value={amountOfItemsToBuy} onChange={(event) => {
                        setAmountOfItemsToBuy(event.target.value)
                    }} />
                    <button onClick={buyItem}>Add To Cart</button>
                </div>

            </div>
            <div className="reviewsContainer">
                {shoppingItem.reviews.map((review) => {
                    <div key={review._id}>
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
                    </div>
                })}
            </div>
            
        </div> : null}
        <div>
            <h1>More Like This</h1>
                <ShoppingItemsListContainer shoppingItems={moreLikeItems}/>
            </div>

        
    </>
}



export default ViewShoppingItem