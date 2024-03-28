import React, { useRef, useState, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../svg/search";
import Notification from "../../svg/notifications";
import Messenger from "../../svg/messenger";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../helper/useClickOutside";
import {
  addSearchHistoryUser,
  getSearchHistoryUser,
  removeSearchHistoryUser,
  searchUser,
} from "../../actions/userAction";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Popover, Input, Badge, Avatar } from "antd";

export default function MobileHeader() {
  const [searchHistory, setSearchHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { Search } = Input;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userSearch = useSelector((state) => state.userSearch);
  const { loading, error, results } = userSearch;

  const userGetSearchHistory = useSelector(
    (state) => state.userGetSearchHistory
  );
  const {
    loading: loadingHistory,
    error: errorHistory,
    histories,
  } = userGetSearchHistory;

  const searchHistoryRef = useRef(null);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  useClickOutside(searchHistoryRef || menuRef, () => {
    setSearchHistory(false);
  });

  useEffect(() => {
    dispatch(getSearchHistoryUser());
  }, [dispatch]);

  const searchHandler = () => {
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      setTimeout(() => {
        dispatch(searchUser(searchTerm));
      }, 2000);
    }
  };

  const addSearchHistory = (userId) => {
    dispatch(addSearchHistoryUser(userId));
  };

  const removeHandler = (userId) => {
    dispatch(removeSearchHistoryUser(userId));
    dispatch(getSearchHistoryUser());
  };
  return (
    <div className="mobileHeader">
      <Link to="/" className="header__logo">
        <div className="header__logo-icon">
          <img src="/images/logo1.png" alt="" />
        </div>
      </Link>
      <div className="header__profile">
        <Popover
          placement="bottom"
          content={
            <div className="mobileHeader__menu-search">
              <Search
                placeholder="input search text"
                size="large"
                onClick={() => setSearchHistory(true)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={searchHandler}
                enterButton
                allowClear
              />
              <div
                className={`mobileHeader__menu-searchHistory 
                }`}
              >
                {!searchTerm ? (
                  <>
                    <div className="header__menu-searchHistory-title">
                      <span>Recent searches</span>
                      <Link to="">Edit</Link>
                    </div>
                    {loadingHistory ? (
                      "Loading..."
                    ) : errorHistory ? (
                      errorHistory
                    ) : (
                      <ul className="header__menu-searchHistory-results">
                        {histories
                          .sort((a, b) => {
                            return (
                              new Date(b.createdAt) - new Date(a.createdAt)
                            );
                          })
                          .map((result) => {
                            return (
                              <li className="header__menu-searchHistory-results-result">
                                <Link
                                  onClick={() =>
                                    addSearchHistory(result.user._id)
                                  }
                                  to={`/profile/${result.user.username}`}
                                >
                                  <img src={result.user.picture} alt="" />
                                  <span>
                                    {result.user.first_name}{" "}
                                    {result.user.last_name}
                                  </span>
                                </Link>
                                <span
                                  onClick={() => removeHandler(result.user._id)}
                                >
                                  <i class="fas fa-times"></i>
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </>
                ) : (
                  ""
                )}
                {loading ? (
                  "Searching..."
                ) : error ? (
                  error
                ) : (
                  <ul className="header__menu-searchHistory-results">
                    {results?.map((result, i) => {
                      return (
                        <li
                          onClick={() => addSearchHistory(result._id)}
                          className="header__menu-searchHistory-results-result"
                          key={i}
                        >
                          <Link to={`/profile/${result.username}`}>
                            <img src={result.picture} alt="" />
                            <span>
                              {result.first_name} {result.last_name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          }
        >
          <div className="header__profile-item">
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
            />
          </div>
        </Popover>
        <div className="header__profile">
          <div className="header__profile-item">
            <Avatar shape="square" size="large">
              <i className="fas fa-bell  header__profile-item-icon"></i>
            </Avatar>
          </div>
          <div className="header__profile-item">
            <Badge>
              <Avatar shape="square" size="large">
                <i className="fab fa-facebook-messenger header__profile-item-icon"></i>
              </Avatar>
            </Badge>
          </div>
          {!userInfo ? (
            <div className="header__profile-login">
              <Link>Login</Link>
            </div>
          ) : (
            <div className="header__profile-item">
              <Link to="/profile" className="header__profile-linkProfile">
                <Avatar shape="square" size="large" src={userInfo?.picture} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="header">
      <Link to="/" className="header__logo">
        <div className="header__logo-icon">
          <img src="/images/logo1.png" alt="" />
        </div>
      </Link>
      <div className="header__menu">
        <div className="header__menu-search">
          <Search
            placeholder="input search text"
            size="large"
            onClick={() => setSearchHistory(true)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            enterButton
            allowClear
          />
          <div
            className={`header__menu-searchHistory ${
              searchHistory ? "active" : "inactive"
            }`}
            ref={searchHistoryRef}
          >
            {!searchTerm ? (
              <>
                <div className="header__menu-searchHistory-title">
                  <span>Recent searches</span>
                  <Link to="">Edit</Link>
                </div>
                {loadingHistory ? (
                  "Loading..."
                ) : errorHistory ? (
                  errorHistory
                ) : (
                  <ul className="header__menu-searchHistory-results">
                    {histories
                      .sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      .map((result) => {
                        return (
                          <li className="header__menu-searchHistory-results-result">
                            <Link
                              onClick={() => addSearchHistory(result.user._id)}
                              to={`/profile/${result.user.username}`}
                            >
                              <img src={result.user.picture} alt="" />
                              <span>
                                {result.user.first_name} {result.user.last_name}
                              </span>
                            </Link>
                            <span
                              onClick={() => removeHandler(result.user._id)}
                            >
                              <i class="fas fa-times"></i>
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </>
            ) : (
              ""
            )}
            {loading ? (
              "Searching..."
            ) : error ? (
              error
            ) : (
              <ul className="header__menu-searchHistory-results">
                {results?.map((result, i) => {
                  return (
                    <li
                      onClick={() => addSearchHistory(result._id)}
                      className="header__menu-searchHistory-results-result"
                      key={i}
                    >
                      <Link to={`/profile/${result.username}`}>
                        <img src={result.picture} alt="" />
                        <span>
                          {result.first_name} {result.last_name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="header__profile">
        <div className="header__profile-item">
          <button className="header__profile-link" to="">
            <Notification />
          </button>
        </div>
        <div className="header__profile-item">
          <button className="header__profile-link" to="">
            <Messenger />
          </button>
        </div>
        {!userInfo ? (
          <div className="header__profile-login">
            <Link>Login</Link>
          </div>
        ) : (
          <div className="header__profile-item">
            <Link to="/profile" className="header__profile-linkProfile">
              <img src={userInfo?.picture} alt={userInfo?.first_name} />
            </Link>
          </div>
        )}
      </div>
    </div> */
}
