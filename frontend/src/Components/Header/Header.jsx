import React from "react";
import { FiSun } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

import "./Header.css";

export default function Header() {
  return (
    // container header
    <div className="header">
      {/* header / right side / img and information */}
      <div className="admin-profile">
        <img src="/images/1.jpg" alt="Profile Image" />
        <div className="admin-info">
          <h1>محمدعلی مرادی</h1>
          <h3>برنامه نویس فرانت اند</h3>
        </div>
      </div>

      {/* header / lefy side / search bar and icons , ... */}
      <div className="header-left-section">
        {/* searchBar */}
        <div className="search-box">
          <input type="search" name="search" placeholder="جستو جو کنید..." />
          <button>جستوجو</button>
        </div>

        {/* icons */}
        <button className="header-left-icon">
          <FiSun />
        </button>
        <button className="header-left-icon">
          <IoMdNotificationsOutline />
        </button>
      </div>
    </div>
  );
}
