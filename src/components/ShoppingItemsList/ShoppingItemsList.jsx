import "./ShoppingItemsList.css"

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
                            <h2>{shoppingItem.itemName}</h2>
                            <p>{rating}</p>
                            <p>{shoppingItem.price}$</p>
                        </div>)
                })}
            </div>
        </>
    )
}


export default ShoppingItemsList