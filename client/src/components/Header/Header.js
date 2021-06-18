import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="NavClass">
          <li>
            <NavLink exact to="/">
              Place Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/updatePredicted">Change Predicted </NavLink>
          </li>
          <li>
            <NavLink to="/kitchen"> Kitchen </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
