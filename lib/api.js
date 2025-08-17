import axios from "axios";
const url = import.meta.env.VITE_BACK_END_SERVER_URL

const createShoppingItem = async(shoppingItem) => {
  const response = await axios.post(`${url}/shoppingItems`, shoppingItem)
  console.log(response)
}

const getAllShoppingItems = () => {
  // this mock list is made with ChatGPT as a placeholder until the API runs
  const shoppingItems = [
    {
      owner: {
        username: "ahaha",
        password: "qwjieadok",
        iconUrl: "https://example.com/icons/ahaha.png"
      },
      itemName: "Wireless Headphones",
      itemDescription: "Noise-cancelling over-ear headphones with Bluetooth 5.0",
      itemCategory: "Electronics",
      quantity: 25,
      price: 99.99,
      itemSpecification: "Color: Black, Battery Life: 40h",
      reviews: [
        {
          reviewer: {
            username: "john_doe",
            password: "123456",
            iconUrl: "https://example.com/icons/john.png"
          },
          rating: 5,
          message: "Amazing sound quality and very comfortable!"
        },
        {
          reviewer: {
            username: "sara_smith",
            password: "abcdef",
            iconUrl: "https://example.com/icons/sara.png"
          },
          rating: 4,
          message: "Good overall, but the ear cushions get warm."
        }
      ],
      images: [
        "https://sonyworld.bh/cdn/shop/products/Untitled-11.png?v=1681467807"
      ],
      shippingType: "Standard"
    },
    {
      owner: {
        username: "techguru",
        password: "zxcvbnm",
        iconUrl: "https://example.com/icons/techguru.png"
      },
      itemName: "Gaming Mouse",
      itemDescription: "RGB wired gaming mouse with 16000 DPI",
      itemCategory: "Electronics",
      quantity: 50,
      price: 49.99,
      itemSpecification: "Color: White, Sensor: Optical, Buttons: 7",
      reviews: [
        {
          reviewer: {
            username: "mike_w",
            password: "pass123",
            iconUrl: "https://example.com/icons/mike.png"
          },
          rating: 5,
          message: "Super responsive and great for FPS games."
        }
      ],
      images: [
        "https://images-na.ssl-images-amazon.com/images/I/61Mk3YqYHpL.jpg"
      ],
      shippingType: "Express"
    },
    {
      owner: {
        username: "fashionqueen",
        password: "yuioplkj",
        iconUrl: "https://example.com/icons/fashionqueen.png"
      },
      itemName: "Leather Handbag",
      itemDescription: "Premium leather handbag with adjustable strap",
      itemCategory: "Fashion",
      quantity: 10,
      price: 199.99,
      itemSpecification: "Material: Genuine Leather, Color: Brown",
      reviews: [
        {
          reviewer: {
            username: "anna_b",
            password: "securepass",
            iconUrl: "https://example.com/icons/anna.png"
          },
          rating: 5,
          message: "Elegant design, worth the price!"
        },
        {
          reviewer: {
            username: "linda",
            password: "mypassword",
            iconUrl: "https://example.com/icons/linda.png"
          },
          rating: 4,
          message: "Beautiful, but slightly smaller than expected."
        }
      ],
      images: [
        "https://lallaeman.com/wp-content/uploads/2025/03/A7R01332-copy-brown.jpeg"
      ],
      shippingType: "Standard"
    }
  ];
  return shoppingItems
}


export {
  getAllShoppingItems,
  createShoppingItem
}