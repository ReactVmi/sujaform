/* eslint-disable */

import { HiX } from "react-icons/hi";
import Link from "next/link";
import Logo from "@/public/assets/logo-black.png";
import SidebarCard from "@/app/components/sidebar/componentsrtl/SidebarCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cookies from "js-cookie";
import decodeToken from "jwt-decode";
import { FaUser, FaUsers } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";


const Sidebar = ({ open, onClose }) => {
  let cookie = Cookies.get("token");
  let userData;
  let userRole = null;
  if (cookie) {
    userData = decodeToken(cookie);
    userRole = userData.role;
  }

  const router = useRouter();

  useEffect(
    () => {
      // console.log(router.pathname);
    },
    [router]
  );

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open
        ? "translate-x-0"
        : "-translate-x-96"}`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[0px] flex items-center`}>
        <div className="mt-2 mb-2 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-red-700 dark:text-white ">
          <Image src={Logo} alt="Logo" className="w-auto h-16" />
          {/* Suja  <span className="text-navy-700 font-medium">Driving</span> */}
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
      {/* ADMIN SIDEBAR */}
      {userRole === "admin" &&
        <ul className="mb-auto pt-1">
          {/* <Link routes={routes} /> */}
          <Link href="/admin">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className={`my-[3px] flex cursor-pointer items-center px-8`}>
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/admin"
                    ? "text-red-700 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/admin`
                    ? "text-navy-700"
                    : "text-gray-800"}`}
                >
                  Dashboard
                </p>
              </li>
              {router.pathname === "/admin" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-700 end-0 dark:bg-brand-400" />}
            </div>
          </Link>
          <Link href="/admin/orders">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/admin/orders"
                    ? "text-red-700 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/admin/orders`
                    ? "text-navy-800"
                    : "text-gray-800"}`}
                >
                  Orders
                </p>
              </li>
              {router.pathname === "/admin/orders" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-700 end-0 dark:bg-brand-400" />}
            </div>
          </Link>
          <Link href="/admin/bookingrequest">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/admin/bookingrequest"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <TbBrandBooking className="text-2xl"/>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/admin/bookingrequest`
                    ? "text-navy-700"
                    : "text-gray-800"}`}
                >
                  Booking Requests 
                </p>
              </li>
              {router.pathname === "/admin/bookingrequest" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-700 end-0 dark:bg-brand-400" />}
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/admin/users"
                    ? "text-red-700 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  {/* <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg> */}
                  <FaUsers  className="h-6 w-6"/>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/admin/users`
                    ? "text-navy-700"
                    : "text-gray-800"}`}
                >
                  Users
                </p>
              </li>
              {router.pathname === "/admin/users" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-700 end-0 dark:bg-red-400" />}
            </div>
          </Link>
          <Link href="/admin/profile">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/admin/profile"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  {/* <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg> */}
                  <AiOutlineUser className="h-6 w-6"></AiOutlineUser>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/admin/profile`
                    ? "text-navy-700"
                    : "text-gray-800"}`}
                >
                  Profile
                </p>
              </li>
              {router.pathname === "/admin/profile" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-700 end-0 dark:bg-brand-400" />}
            </div>
          </Link>
          {/* <Link href="/admin/recycleBin">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/admin/recycleBin"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <FaRegTrashAlt  className="h-5 w-6"></FaRegTrashAlt>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/admin/recycleBin`
                    ? "text-navy-700"
                    : "text-gray-800"}`}
                >
                  Trash
                </p>
              </li>
              {router.pathname === "/admin/recycleBin" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-700 end-0 dark:bg-brand-400" />}
            </div>
          </Link> */}
         
        </ul>}
      {userRole === "customer" &&
        <ul className="mb-auto pt-1">
          {/* <Link routes={routes} /> */}
          <Link href="/admin">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className={`my-[3px] flex cursor-pointer items-center px-8`}>
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/customer"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/customer`
                    ? "text-navy-700"
                    : "text-gray-700"}`}
                >
                  Dashboard
                </p>
              </li>
              {router.pathname === "/customer" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-500 end-0 dark:bg-red-500" />}
            </div>
          </Link>
          <Link href="/customer/orders">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/customer/orders"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </span>
                <p
                  className={`leading-1 flex ms-4 font-bold dark:text-white ${router.pathname ===
                  `/customer/orders`
                    ? "text-navy-700"
                    : "text-gray-700"}`}
                >
                  Order History
                </p>
              </li>
              {router.pathname === "/customer/orders" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-500 end-0 dark:bg-red-400" />}
            </div>
          </Link>

          <Link href="/customer/profile">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`font-bold dark:text-white ${router.pathname ===
                  "/customer/profile"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
               <FaUser />
                </span>
                <p
                  className={`leading-1 flex ms-6 font-bold dark:text-white ${router.pathname ===
                  `/customer/profile`
                    ? "text-navy-700"
                    : "text-gray-700"}`}
                >
                  Profile
                </p>
              </li>
              {router.pathname === "/customer/profile" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-red-500 end-0 dark:bg-red-400" />}
            </div>
          </Link>
        </ul>}
      {/* CUSTOMER SIDEBAR */}

      {/* Free Horizon Card HIDE FOR CUSTOMER AND ADMIN*/}
      {/* <div className="flex justify-center">
        <SidebarCard />
      </div> */}

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
