import "./ShoppingItemsList.css";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router";
import { getAllShoppingItems } from "../../../lib/api";
import { useState, useEffect } from "react";
const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const ShoppingItemsList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const update = async () => {
    const items = await getAllShoppingItems();
    setShoppingItems(items);
  };
  useEffect(() => {
    update();
  }, []);
  return (
    <>
      <div className="shoppingListContainer">
        {shoppingItems.map((shoppingItem, index) => {
          const rating =
            shoppingItem.reviews.reduce(
              (accumulator, currentValue) => accumulator + currentValue.rating,
              0
            ) / shoppingItem.reviews.length;

          return (
            // <Link to={`/shoppingitems/${shoppingItem._id}`} >

            <Link className="shoppingItem" key={index} to={`/${shoppingItem._id}`}>
              <img
                src={shoppingItem.images[0]}
                alt={`${shoppingItem.itemName} image`}
                className="itemImage"
              />
              <h3>{shoppingItem.itemName}</h3>
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
                <strong>{shoppingItem.price}$</strong>{" "}
              </p>
            </Link>
            // </Link>
          );
        })}
      </div>
    </>
  );
};

export default ShoppingItemsList;
