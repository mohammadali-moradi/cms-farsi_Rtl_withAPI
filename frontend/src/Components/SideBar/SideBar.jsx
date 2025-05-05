import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineComment,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-link">
        <NavLink to="/">
            <AiOutlineHome className="icon" />
            صفحه اصلی
        </NavLink>
        <NavLink to="/products">
            <AiOutlineShoppingCart className="icon" />
            محصولات
        </NavLink>
        <NavLink to="/comments">
            <AiOutlineComment className="icon" />
            کامنت ها
        </NavLink>
        <NavLink to="/users">
            <AiOutlineUser className="icon" />
            کاربران
        </NavLink>
        <NavLink to="/orders">
            <BsBagCheck className="icon" />
            سفارشات
        </NavLink>
        <NavLink to="/discounts">
            <CiDiscount1 className="icon" />
            تخفیف ها
        </NavLink>
      </ul>
    </div>
  );
}

export default SideBar;
