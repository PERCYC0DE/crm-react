import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-800 px-5 py-10">
        <h2 className="text-2xl font-black text-center text-white">
          CRM Clientes
          <nav className="mt-10">
            <Link
              to="/clients"
              className={`${
                currentPath === "/clients" ? "text-blue-300" : "text-white"
              } text-white text-lg block mt-2 hover:text-blue-300`}
            >
              Clientes
            </Link>
            <Link
              to="/clients/new"
              className={`${
                currentPath === "/clients/new" ? "text-blue-300" : "text-white"
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
