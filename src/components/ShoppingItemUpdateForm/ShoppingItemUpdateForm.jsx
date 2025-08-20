import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createShoppingItem, updateShoppingItem } from "../../../lib/api";
import { useParams } from "react-router"
import { getShoppingItem } from "../../../lib/api";
import "../Form.css"

const url = import.meta.env.VITE_BACK_END_SERVER_URL

const ShoppingItemUpdateForm = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    quantity: 0,
    price: 0,
    itemSpecification: 0,
    images: [],
    shippingType: "",
  });
  const update = async () => {
    const item = await getShoppingItem(id)
    setFormData(item)
  }
  useEffect(() => {
    update()
  }, [])


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateShoppingItem(formData)
    navigate("/")
  };
  return (
    <>
      {token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="itemName">itemName: </label>
          <input
            onChange={handleChange}
            value={formData.itemName}
            type="text"
            name="itemName"
            id="itemName"
            required
          />
          <label htmlFor="itemDescription">itemDescription: </label>
          <textarea
            onChange={handleChange}
            name="itemDescription"
            id="itemDescription"
            defaultValue={formData.itemDescription}
          ></textarea>
          <label htmlFor="itemCategory">itemCategory: </label>
          <input
            onChange={handleChange}
            value={formData.itemCategory}
            type="text"
            name="itemCategory"
            id="itemCategory"
          />
          <label htmlFor="quantity">quantity: </label>
          <input
            onChange={handleChange}
            value={formData.quantity}
            type="number"
            name="quantity"
            id="quantity"
          />
          <label htmlFor="price">price: </label>
          <input
            onChange={handleChange}
            value={formData.price}
            type="number"
            name="price"
            id="price"
            required
          />
          <label htmlFor="itemSpecification">itemSpecification: </label>
          <textarea
            onChange={handleChange}
            name="itemSpecification"
            id="itemSpecification"
            defaultValue={formData.itemSpecification}
          ></textarea>
          <label htmlFor="shippingType">shippingType: </label>
          <select onChange={handleChange}
            value={formData.shippingType}
            type="text"
            name="shippingType"
            id="shippingType">
            <option value="free-international">free international shipping</option>
            <option value="paid-international">paid international shipping</option>
            <option value="postmail">postmail shipping</option>
            <option value="pickup">pick up in an agreed place</option>
          </select>
          <input type="submit" value="submit" />
        </form>
      ) : (
        <p>Please log in to add a new shopping item.</p>
      )}
    </>
  );
};

export default ShoppingItemUpdateForm;
