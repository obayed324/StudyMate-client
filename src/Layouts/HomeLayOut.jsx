import React from 'react';
import { Outlet } from "react-router";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomeLayOut = () => {
    return (

    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <header className="shadow-sm">
        <div className="w-11/12 mx-auto py-3">
          <NavBar/>
        </div>
      </header>

      {/* Main content */}
      <main className="grow w-11/12 mx-auto py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayOut;