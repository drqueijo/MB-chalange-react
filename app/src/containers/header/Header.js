import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
  let logged = false;
  
  if (localStorage.getItem('user-info')) {
      logged = true;
  }
  function logout () {
    localStorage.removeItem('user-info')
    window.location.reload();
  }

  return (
    <div className="header">
      <div className="header__container">
        <Link className="header__container--logo" to="/">
          <h2>Awsome Event</h2>
        </Link>        
        <div className="header__container--links">
          <Link className="header__container--link" to="/">Home</Link>
          <Link className="header__container--link" to="/search">Search</Link>
        </div>
        {logged === true ? (
          <div className="header__container--button">
            <button className="ui secondary button" onClick={logout}>
              <i className="sign out alternate icon"></i>
               Logout
            </button>
          </div>
        ):(
          <Link className="header__container--button" to="/login">
            <button className="ui button">
              <i className="sign in alternate icon"></i>
               Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
