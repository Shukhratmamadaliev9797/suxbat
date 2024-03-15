import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MobileHeader from "../Mobile/Components/MobileHeader";
import { useMediaQuery } from "react-responsive";
import TabletSidebar from "../Tablet/Components/TabletSidebar";
import MobileSidebar from "../Mobile/Components/MobileSidebar";
export default function PublicLayout({ notificationCount }) {
  const mobile = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const tablet = useMediaQuery({
    query: "(max-width: 1200px)",
  });
  return (
    <div>
      {mobile ? (
        <MobileHeader notificationCount={notificationCount} />
      ) : (
        <Header notificationCount={notificationCount} />
      )}

      <div className="publicLayout">
        {mobile ? (
          ""
        ) : (
          <div className="publicLayout__sidebar">
            {tablet ? (
              <TabletSidebar />
            ) : (
              <Sidebar notificationCount={notificationCount} />
            )}
          </div>
        )}

        <div className="publicLayout__body">
          <Outlet />
        </div>
      </div>
      {mobile && <MobileSidebar />}
    </div>
  );
}
