import { Routes, Route } from "react-router-dom";
import "./styles/style.scss";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublicLayout from "./pages/PublicLayout";
import Register from "./pages/Register";
import Activate from "./pages/Activate";
import Reset from "./pages/Reset";
import ProfileLayout from "./pages/ProfileLayout";
import Friends from "./pages/Friends";
import Messenger from "./pages/Messenger";
import { useState } from "react";
import LoginInRoute from "./routes/LoginInRoute";
import NotLoginInRoute from "./routes/NotLoginInRoute";
import Groups from "./pages/Groups";
import GroupLayout from "./pages/GroupLayout";
import MarketplaceLayout from "./pages/MarketplaceLayout";
import Products from "./components/Marketplace/Products";
import CategorizedProducts from "./components/Marketplace/CategorizedProducts";
import SearchedProducts from "./components/Marketplace/SearchedProducts";
import Product from "./pages/Product";
import Setting from "./pages/Setting";
import { useSelector } from "react-redux";

function App() {
  const [notificationCount, setNotificationCount] = useState(() => {
    return JSON.parse(localStorage.getItem("notificationCount")) || 0;
  });
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Update localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const root = document.documentElement;
  root.style.setProperty("--background-color", darkMode ? "#2f2f2f " : "");
  root.style.setProperty("--background-color1", darkMode ? "#3d3d3d" : "");
  root.style.setProperty("--heading-color", darkMode ? "#FFFFFFD9" : "");
  root.style.setProperty("--secondary-color", darkMode ? "#FFFFFFA6" : "");
  root.style.setProperty("--text-color", darkMode ? "#FFFFFFD9" : "");
  root.style.setProperty("--disabled-color", darkMode ? "#FFFFFF40" : "");
  root.style.setProperty("--defaultBorder-color", darkMode ? "#FFFFFF40" : "");
  return (
    <div className="App">
      <Routes>
        <Route element={<LoginInRoute />}>
          <Route
            path="/"
            element={<PublicLayout notificationCount={notificationCount} />}
          >
            <Route index element={<Home />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/friends" element={<Friends />} />
            <Route
              path="/messenger"
              element={
                <Messenger
                  notificationCount={notificationCount}
                  setNotificationCount={setNotificationCount}
                />
              }
            />
            <Route path="/groups" element={<Groups />} />
            <Route path="/marketplace" element={<MarketplaceLayout />}>
              <Route path="/marketplace" element={<Products />} />
              <Route
                path="/marketplace/:category"
                element={<CategorizedProducts />}
              />
              <Route
                path="/marketplace/search/:title"
                element={<SearchedProducts />}
              />
            </Route>
            <Route
              path="/setting"
              element={
                <Setting darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              }
            />
          </Route>

          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/profile/:username" element={<ProfileLayout />} />
          <Route path="/groups/:id" element={<GroupLayout />} />
          <Route
            path="/products/:id"
            element={<Product />}
            notificationCount={notificationCount}
          />
        </Route>
      </Routes>
      <Routes>
        <Route element={<NotLoginInRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
