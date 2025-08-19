import { useParams } from "react-router"
import { getShoppingItem } from "../../../lib/api"
import { useEffect, useState } from "react"
import { ThinStar, Rating } from "@smastrom/react-rating"
import "./ViewShoppingItem.css"
const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fff700ff",
};
const ViewShoppingItem = ({ token }) => {
    const { id } = useParams()
    const [shoppingItem, setShoppingItem] = useState()
    const [amountOfItemsToBuy, setAmountOfItemsToBuy] = useState(1)
    let rating = 0
    const update = async () => {
        const item = await getShoppingItem(id)
        console.log(item)
        setShoppingItem(item)

        if (shoppingItem.reviews) {
            rating = shoppingItem.reviews.reduce(
                (accumulator, currentValue) => accumulator + currentValue.rating,
                0
            ) / shoppingItem.reviews.length;
        }

    }
    const buyItem = () => {

    }
    useEffect(() => {
        update()
    }, [])
    return <>
        {shoppingItem ? <>
            <div className="itemContainer">
                <div className="imagesContainer">
                    <img src={shoppingItem.images[0]} alt="main image" className="mainImage" />
                    {shoppingItem.images.map((image, index) => {
                        if (index == 0) return null;
                        return <img key={index} src={image} className="secondaryImage" />
                    })}
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
                        <span style={{ justifySelf: "flex-end", alignSelf: "center" }}>
                            {rating}/5
                        </span>
                    </Rating>
                    <h2>${shoppingItem.price}</h2>
                    <p>{shoppingItem.itemDescription}</p>
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
        </> : null}

    </>
}



export default ViewShoppingItem