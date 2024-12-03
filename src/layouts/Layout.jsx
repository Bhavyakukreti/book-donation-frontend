import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet to render child routes

const Layout = () => {
  return (
    <div className="layout">
     
      <main>
        <Outlet /> {/* Renders child routes like HomePage or AboutPage */}
      </main>
    </div>
  );
};

export default Layout;
