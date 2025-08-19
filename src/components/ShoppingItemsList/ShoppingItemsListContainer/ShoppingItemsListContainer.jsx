import { Link } from "react-router";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "../ShoppingItemsList.css";
import { useNavigate } from "react-router";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
};
const ShoppingItemsListContainer = ({ shoppingItems }) => {
    if(!shoppingItems.length){
        return null
    }
    return <div className="shoppingListContainer">
        {shoppingItems.map((shoppingItem, index) => {
            let rating = 0
            
            if (shoppingItem?.reviews?.length > 0) {
                rating = shoppingItem.reviews.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.rating,
                    0
                ) / shoppingItem.reviews.length;
            }
            else {
                rating = 1
            }


            return (
                // <Link to={`/shoppingitems/${shoppingItem._id}`} >

                <Link className="shoppingItem" key={index} to={`/${shoppingItem?._id}`} onClick={()=>{useNavigate(shoppingItem?._id)}}>
                    <img
                        src={shoppingItem?.images[0]}
                        alt={`${shoppingItem?.itemName} image`}
                        className="itemImage"
                    />
                    <h3>{shoppingItem?.itemName}</h3>
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

                    <p>
                        <strong>{shoppingItem?.price}$</strong>{" "}
                    </p>
                </Link>
                // </Link>
            );
        })}
    </div>
}

export default ShoppingItemsListContainer