import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/main.scss";

export default function LeftSidebarLink({ icon, text, path }) {
  return (
    <NavLink to={path} className="left_sidebar_link">
      <span
        className="material-icons-outlined left_sidebar_link_icon"
      >
        {icon}
      </span>
      <span className="left_sidebar_link_text">{text}</span>
    </NavLink>
  );
}
