import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo2.png";
const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-colorSecondary px-5 py-10">
        <h2 className="text-xl text-center text-white">
          <div>
            <img src={Logo} alt="" />
          </div>
          <nav className="mt-10 text-left uppercase font-openSans">
            <Link
              to="/clients"
              className={`${
                currentPath === "/clients" ? "text-white" : "text-slate-600"
              } text-white block mt-2 hover:text-blue-300`}
            >
              Clientes
            </Link>
            <Link
              to="/clients/new"
              className={`${
                currentPath === "/clients/new" ? "text-white" : "text-slate-600"
              } text-white text-lg block mt-2 hover:text-blue-300`}
            >
              Nuevo Cliente
            </Link>
          </nav>
        </h2>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
