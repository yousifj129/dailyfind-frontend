
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createShoppingItem, updateShoppingItem } from "../../../lib/api";
import { useParams } from "react-router"
import { getShoppingItem } from "../../../lib/api";
import "../Form.css"
import { jwtDecode } from "jwt-decode";
import { Rating, ThinStar } from "@smastrom/react-rating";

const url = import.meta.env.VITE_BACK_END_SERVER_URL
const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fff700ff",
};
const ReviewForm = ({ token, id , shoppingItem}) => {
    const [formData, setFormData] = useState({
        reviewer: jwtDecode(token).id,
        rating: 5,
        message: ""
    });
    const update = async () => {

    }
    useEffect(() => {
        update()
    }, [])


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (event) => {
        const newShoppingItem = {...shoppingItem}
        newShoppingItem.reviews.push(formData)
        updateShoppingItem(newShoppingItem)
    };
    return (
        <>
            {token ? (
                <form onSubmit={handleSubmit}>
                    <Rating
                        style={{ maxWidth: 90, display: "flex" }}
                        value={formData.rating}
                        itemStyles={myStyles}
                        name="rating"
                        onChange={(rate)=>{
                            setFormData({...formData, rating: rate})
                        }}
                    >
                    </Rating>          
                    <label htmlFor="message">review: </label>
                    <input
                        onChange={handleChange}
                        value={formData.itemName}
                        type="text"
                        name="message"
                        id="message"
                        required
                    />
                    <input type="submit" value="submit" />
                </form>
            ) : (
                <p>Please log in to add a new shopping item.</p>
            )}
        </>
    );
};

export default ReviewForm;
