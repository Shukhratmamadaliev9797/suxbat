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

  const root = document.documentElement;
  root.style.setProperty(
    "--background-color",
    userInfo?.setting?.darkMode ? "#292929 " : ""
  );
  root.style.setProperty(
    "--background-color1",
    userInfo?.setting?.darkMode ? "#3d3d3d" : ""
  );
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
            <Route path="/setting" element={<Setting />} />
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
