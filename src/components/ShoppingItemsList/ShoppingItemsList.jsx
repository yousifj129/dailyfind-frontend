import "@smastrom/react-rating/style.css";
import { getAllShoppingItems } from "../../../lib/api";
import { useState, useEffect } from "react";
import ShoppingItemsListContainer from "./ShoppingItemsListContainer/ShoppingItemsListContainer";

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
    <div>
      <ShoppingItemsListContainer shoppingItems={shoppingItems}/>
    </div>
  );
};

export default ShoppingItemsList;
