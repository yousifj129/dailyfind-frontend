import { useEffect, useState } from "react";
import "./App.css";
import { getAllShoppingItems } from "../lib/api";
import ShoppingItemsList from "./components/ShoppingItemsList/ShoppingItemsList";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const update = async () => {
    const items = await getAllShoppingItems();
    setShoppingItems(items);
  };
  useEffect(() => {
    update();
  }, []);
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<ShoppingItemsList shoppingItems={shoppingItems} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
