import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createShoppingItem } from "../../../lib/api";
const url = import.meta.env.VITE_BACK_END_SERVER_URL

const ShoppingItemNewForm = ({ token }) => {
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // https://stackoverflow.com/questions/65176026/uploading-image-from-react-frontend-to-express-backend-and-displaying-it-back-in
  const handleFileChange = (event) =>{
    console.log(event.target.files)
    setFormData({...formData, images: event.target.files})
    
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for(var x = 0; x<formData.images.length; x++) {
        data.append('file', formData.images[x])
    }
    const result = await (await axios.post(`${url}/shoppingItems/uploadImage`, data)).data
    console.log(result.imageLinks)
    createShoppingItem({...formData, images:result.imageLinks});
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
          />
          <label htmlFor="itemDescription">itemDescription: </label>
          <textarea
            onChange={handleChange}
            name="itemDescription"
            id="itemDescription"
          >{formData.itemDescription}</textarea>
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
          />
          <label htmlFor="itemSpecification">itemSpecification: </label>
          <textarea
            onChange={handleChange}
            name="itemSpecification"
            id="itemSpecification"
          >{formData.itemSpecification}</textarea>
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
          <label htmlFor="images">images: </label>
          <input type="file" name="images" id="images" onChange={handleFileChange} multiple />
          <input type="submit" value="submit" />
        </form>
      ) : (
        <p>Please log in to add a new shopping item.</p>
      )}
    </>
  );
};

export default ShoppingItemNewForm;
