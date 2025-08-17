import { useState } from "react";
import "./App.css";
import ShoppingItemsList from "./components/ShoppingItemsList/ShoppingItemsList";
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
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<ShoppingItemsList  />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
