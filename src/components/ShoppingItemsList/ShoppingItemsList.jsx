import "./ShoppingItemsList.css"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const ShoppingItemsList = ({ shoppingItems }) => {
    return (
        <>
            <div className="shoppingListContainer">
                {shoppingItems.map((shoppingItem, index) => {
                    const rating = shoppingItem.reviews.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.rating,
                        0,
                    ) / shoppingItem.reviews.length

                    return (
                        <div key={index} className="shoppingItem">

                            <img src={shoppingItem.images[0]} alt={`${shoppingItem.itemName} image`} className="itemImage" />
                            <h3>{shoppingItem.itemName}</h3>
                            <p style={{ display: "flex" }}>
                                <Rating style={{ maxWidth: 75 }} value={rating} readOnly={true} />
                                <span style={{ justifySelf: "flex-end", alignSelf: "center" }}>{rating}/5</span>
                            </p>
                            <p>{shoppingItem.price}$</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


export default ShoppingItemsList