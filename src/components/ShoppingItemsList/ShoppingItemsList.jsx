import "./ShoppingItemsList.css"
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link } from "react-router"
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}
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
                        
                        <Link to={`/shoppingitems/${shoppingItem._id}`}>
                       
                        <div key={index} className="shoppingItem">

                            <img src={shoppingItem.images[0]} alt={`${shoppingItem.itemName} image`} className="itemImage" />
                            <h3>{shoppingItem.itemName}</h3>
                            <p style={{ display: "flex" }}>
                                <Rating style={{ maxWidth: 90 }} value={rating} readOnly={true} itemStyles={myStyles} />
                                <span style={{ justifySelf: "flex-end", alignSelf: "center" }}>{rating}/5</span>
                            </p>
                            <p><strong>{shoppingItem.price}$</strong> </p>
                        </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}


export default ShoppingItemsList