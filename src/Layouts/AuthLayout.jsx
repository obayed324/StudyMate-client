import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="shadow-sm">
        <div className="w-11/12 mx-auto py-3">
          <NavBar></NavBar>
        </div>
      </header>

      <main className="grow flex justify-center items-center">
        <Outlet />
      </main>

      <footer>
          <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
