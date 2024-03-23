import { Routes, Route } from "react-router-dom";
import "./styles/style.scss";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublicLayout from "./pages/PublicLayout";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
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

function App() {
  const [notificationCount, setNotificationCount] = useState(() => {
    return JSON.parse(localStorage.getItem("notificationCount")) || 0;
  });

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
            <Route path="/marketplace" element={<Marketplace />} />
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
          </Route>

          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/profile/:username" element={<ProfileLayout />} />
          <Route path="/groups/:id" element={<GroupLayout />} />
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
