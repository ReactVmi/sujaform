import React, { useState, useEffect } from "react";
import Logo from "@/public/assets/logo-black.png";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { isMobile } from 'react-device-detect';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(!isMobile);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (token) {
        const decodedUser = jwt_decode(token);
        setUser(decodedUser);
      }
      setLoading(false); // Set loading to false when data is fetched
    };
    fetchData();
  }, []);

  useEffect(() => {
    setOpen(!isMobile);
  }, []);

  if (loading) {
    // Render a loading state
    return '';
  }
  const guestHeader = (
    <>
    <header className="bg-red-theme-color">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <Link href="/" className="-m-1.5 p-1.5 justify-center">
            <img className="h-15 w-auto" src={Logo.src} alt="Logo" />
          </Link>
        </div>
      </nav>
    </header>
    {children}
    </>
  );

  // CUSTOMER

  const guestCustomer = (
    <>
      <div className="flex h-full w-full">
      
      <Sidebar user={user} open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[235px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
            name={user.fname}
            user={user}
            onOpenSidenav={() => setOpen(true)}
              // logoText={"Horizon UI Tailwind React"}
              // brandText={currentRoute}
              // secondary={getActiveNavbar(routes)}
              // {...rest}
            />
            <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh]">
              {/* <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes> */}
              {children}
            </div>
            
            <div className="p-3">
              {/* <Footer /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );

  // ADMIN
  const guestAdmin = (
    <>
      <div className="flex h-full w-full">
      
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[235px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar name={user.fname} user={user}
              onOpenSidenav={() => setOpen(true)}
              // logoText={"Horizon UI Tailwind React"}
              // brandText={currentRoute}
              // secondary={getActiveNavbar(routes)}
              // {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              {/* <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes> */}
              {children}
            </div>
            
            <div className="p-3">
              {/* <Footer /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );

  //return guestAdmin;
  
  let userRole = user.role

  switch (userRole) {
    case "customer":
      return guestCustomer;
    case "admin":
      return guestAdmin;
    default:
      return guestHeader;
  }

  //return userRole == "customer" ? guestCustomer : userRole == "admin" ? guestAdmin : guestHeader
}
export default Layout;
