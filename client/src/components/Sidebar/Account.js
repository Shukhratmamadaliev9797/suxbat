import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "../../actions/userAction";

export default function Account() {
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <div>
      {" "}
      <div className="newsFeed">
        <div className="newsFeed__container">
          <div className="newsFeed__title">Setting</div>
          <div className="newsFeed__link">
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                isActive ? "newsFeed__link-active" : "newsFeed__link-link"
              }
            >
              <div className="newsFeed__link-img">
                <i className="settings_filled_icon"></i>
              </div>

              <span>Setting</span>
            </NavLink>
          </div>
          <div className="newsFeed__link">
            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive ? "newsFeed__link-active" : "newsFeed__link-link"
              }
            >
              <div className="newsFeed__link-img">
                <i className="report_filled_icon"></i>
              </div>

              <span>Report</span>
            </NavLink>
          </div>
          <div className="newsFeed__link">
            <NavLink
              to="/display"
              className={({ isActive }) =>
                isActive ? "newsFeed__link-active" : "newsFeed__link-link"
              }
            >
              <div className="newsFeed__link-img">
                <i className="dark_filled_icon"></i>
              </div>

              <span>Display</span>
            </NavLink>
          </div>
          <div className="newsFeed__link">
            <NavLink
              to="/help"
              className={({ isActive }) =>
                isActive ? "newsFeed__link-active" : "newsFeed__link-link"
              }
            >
              <div className="newsFeed__link-img">
                <i className="help_filled_icon"></i>
              </div>

              <span>Help</span>
            </NavLink>
          </div>

          <div className="newsFeed__link">
            <Link
              to="/signOut"
              className={"newsFeed__link-link"}
              onClick={signOutHandler}
            >
              <div className="newsFeed__link-img">
                <i className="logout_filled_icon"></i>
              </div>

              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
