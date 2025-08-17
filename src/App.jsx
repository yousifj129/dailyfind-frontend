import { useState } from "react";
import "./App.css";
import ShoppingItemsList from "./components/ShoppingItemsList/ShoppingItemsList";
import ShoppingItemNewForm from "./components/ShoppingItemNewForm/ShoppingItemNewForm";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { jwtDecode } from "jwt-decode";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUp from "./components/SignupForm/SignupForm";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }
  function getDecodedToken() {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  return (
    <Router>
      <NavBar token={token} handleLogout={handleLogout}/>

      <Routes>
        <Route
          path="/"
          element={<ShoppingItemsList  />}
        />
        <Route
          path="/new"
          element={<ShoppingItemNewForm token={token} />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
