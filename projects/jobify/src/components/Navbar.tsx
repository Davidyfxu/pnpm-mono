import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";
const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className={"toggle-btn"} onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
      </div>
      <div>
        <Logo />
        <h3 className="logo-text">dashboard</h3>
      </div>
      <div className="btn-container">
        <button
          type={"button"}
          onClick={() => setShowLogout(!showLogout)}
          className="btn"
        >
          <FaUserCircle />
          {user?.name}
          <FaCaretDown />
        </button>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button type={"button"} onClick={logoutUser} className="dropdown-btn">
            logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
