import React from 'react';
import "./navbar.scss"
const Navbar = () => {
  const logOut = () => {
    localStorage.removeItem('accessToken');
    console.log(localStorage.getItem('accessToken'))
  }

  return (
    <div className="navigationBar">
      <div className="navButtons">
        {
          localStorage.getItem('accessToken') === null &&
          <React.Fragment>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </React.Fragment>
        }
        <a href="/stocks">Stocks</a>
        <a href="/wallet">Wallet</a>
        {
          localStorage.getItem('accessToken') &&
          <a href="/login" onClick={logOut}>Logout</a>
        }
      </div>
    </div>
  );
};

export default Navbar;
