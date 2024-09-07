import * as React from "react";
import { NavLink } from "react-router-dom";
import { resolveRoute } from "@/src/helpers/routes";
import "@/src/styles/dashboard/app-navbar.css";

function NavBar() {
  return (
    <nav className="relay-wp-nav-bar frt-flex xl:frt-justify-start lg:frt-justify-start lg:frt-gap-5 md:frt-gap-5 ">
        <NavLink
            className="frt-items-stretch frt-flex frt-rounded-lg lg:!frt-h-11.5 relay-wp-nav-link xl:frt-px-4 xl:frt-py-3 lg:frt-px-3 lg:frt-py-3 md:frt-px-1 md:frt-py-2 md:frt-h-10 frt-px-1 frt-py-2 frt-h-10 "
            to="/email-settings"
        >
            <i className="rwp rwp-manage  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
            <span className="frt-ml-2 xl:frt-text-4 lg:frt-text-3.5 frt-text-xs frt-flex frt-items-center">Emails</span>
        </NavLink>
        <NavLink
            className="frt-items-stretch frt-flex frt-rounded-lg lg:!frt-h-11.5 relay-wp-nav-link xl:frt-px-4 xl:frt-py-3 lg:frt-px-3 lg:frt-py-3 md:frt-px-1 md:frt-py-2 md:frt-h-10 frt-px-1 frt-py-2 frt-h-10 "
            to="/widgets"
        >
            <i className="rwp rwp-manage  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
            <span className="frt-ml-2 xl:frt-text-4 lg:frt-text-3.5 frt-text-xs frt-flex frt-items-center">Widgets</span>
        </NavLink>

        <NavLink
            className="frt-items-stretch frt-flex frt-rounded-lg lg:!frt-h-11.5 relay-wp-nav-link xl:frt-px-4 xl:frt-py-3 lg:frt-px-3 lg:frt-py-3 md:frt-px-1 md:frt-py-2 md:frt-h-10 frt-px-1 frt-py-2 frt-h-10 "
            to="/settings"
        >
            <i className="rwp rwp-manage  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
            <span className="frt-ml-2 xl:frt-text-4 lg:frt-text-3.5 frt-text-xs frt-flex frt-items-center">Settings</span>
        </NavLink>

      <NavLink
        className=" frt-items-stretch frt-flex frt-rounded-lg lg:!frt-h-11.5 relay-wp-nav-link  xl:frt-px-4 xl:frt-py-3 lg:frt-px-3 lg:frt-py-3 md:frt-px-1 md:frt-py-2 md:frt-h-10 frt-px-1 frt-py-2 frt-h-10 "
        to="/orders"
      >
        <i className="rwp rwp-dashboard  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
        <span className="frt-ml-2 xl:frt-text-4 lg:frt-text-3.5 frt-text-xs frt-flex frt-items-center">
          Orders
        </span>
      </NavLink>

      <NavLink
        className="frt-items-stretch frt-flex frt-rounded-lg lg:!frt-h-11.5 relay-wp-nav-link xl:frt-px-4 xl:frt-py-3 lg:frt-px-3 lg:frt-py-3 md:frt-px-1 md:frt-py-2 md:frt-h-10 frt-px-1 frt-py-2 frt-h-10 "
        to="/manage"
      >
        <i className="rwp rwp-manage  lg:frt-text-xl  md:frt-text-4.5 frt-text-4.5"></i>
        <span className="frt-ml-2 xl:frt-text-4 lg:frt-text-3.5 frt-text-xs frt-flex frt-items-center">
          Reviews
        </span>
      </NavLink>
    </nav>
  );
}

export default NavBar;
