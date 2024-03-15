import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "../../actions/userAction";

export default function TabletSidebar() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <div className="tablet__sidebar">
      <ul className="tablet__sidebar-menu">
        <li>
          <Link className="tablet__sidebar-profile">
            <img src={userInfo.picture} />
          </Link>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive && window.location.pathname === "/"
                ? "tablet__sidebar-link-active"
                : "tablet__sidebar-link"
            }
          >
            <img src="/left/feed.png" alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <img src="/left/friends.png" alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messenger"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <img src="/left/messenger.png" alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/groups"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <img src="/left/groups.png" alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <img src="/left/marketplace.png" alt="" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watch"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <img src="/left/watch.png" alt="" />
          </NavLink>
        </li>
      </ul>
      <ul className="tablet__sidebar-menu">
        <li>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <i class="fas fa-cog tablet__sidebar-icon"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <i class="fas fa-info-circle tablet__sidebar-icon"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/theme"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <i class="fas fa-moon tablet__sidebar-icon"></i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive ? "tablet__sidebar-link-active" : "tablet__sidebar-link"
            }
          >
            <i class="fas fa-question-circle tablet__sidebar-icon"></i>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={signOutHandler} className="tablet__sidebar-link">
            <i class="fas fa-sign-out-alt tablet__sidebar-icon"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
