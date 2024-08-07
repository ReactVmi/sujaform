import React from "react";
import Dropdown from "@/app/components/dropdown";
import Cookies from "js-cookie";
import Router from "next/router";
import { FiAlignJustify } from "react-icons/fi";
import navbarimage from "@/public/assets/favicon-suja.png";
import { BsArrowBarUp } from "react-icons/bs";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoMdNotificationsOutline, IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import jwt_decode from "jwt-decode";

const Navbar = (props) => {
  const { name, user, onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const pathSegments = Router.pathname.split("/");
  const lastPath = pathSegments[pathSegments.length - 1];
  const cookie = Cookies.get("token");
  let userData;
  let userRole = null;

  if (cookie) {
    userData = jwt_decode(cookie);
    userRole = userData.role;
  }

  const logout = () => {
    Cookies.remove("token");
    setTimeout(() => {
      Router.push("/login");
    }, 1000);
  };

  const formatPath = (path) => {
    // Replace camel case or hyphens with spaces and capitalize the first letter
    return path
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Convert camelCase to spaced words
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Convert PascalCase to spaced words
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
  };

  const renderLastPathText = () => {
    if (lastPath === "recycle-bin") {
      return "Recycle Bin";
    }

    if (lastPath === "bookingrequest") {
      return "Booking Requests";
    }

    if (userRole === "admin") {
      return lastPath === "admin" ? "Dashboard" : formatPath(lastPath);
    }

    if (userRole === "customer") {
      return lastPath === "customer" ? "Dashboard" : formatPath(lastPath);
    }

    return formatPath(lastPath);
  };

  return (
    <nav className="md:sticky relative top-4 z-40 flex flex-row md:flex-wrap flex-wrap-reverse items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          {(user.role === "admin" || user.role === "customer") && (
            <a
              className="pointer-events-none text-sm font-normal text-navy-700 hover:underline"
              href="/"
            >
              Dashboard{" / "}
              <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 capitalize">
                {renderLastPathText()}
              </span>
            </a>
          )}
          <Link
            className="pointer-events-none text-sm font-normal capitalize text-navy-700 hover:underline"
            href="/"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700">
          <Link
            href="/"
            className="font-bold capitalize hover:text-navy-700 pointer-events-none"
          >
            {renderLastPathText()}
          </Link>
        </p>
      </div>
      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center md:justify-around justify-between gap-2 px-2 py-2 md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <Dropdown
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 sm:w-[460px]">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-navy-700">Notification</p>
                <p className="text-sm font-bold text-navy-700">Mark all read</p>
              </div>
              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900">
                    New Update: Horizon UI Dashboard PRO
                  </p>
                  <p className="font-base text-left text-xs text-gray-900">
                    A new update for your downloaded item is available!
                  </p>
                </div>
              </button>
              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900">
                    New Update: Horizon UI Dashboard PRO
                  </p>
                  <p className="font-base text-left text-xs text-gray-900">
                    A new update for your downloaded item is available!
                  </p>
                </div>
              </button>
            </div>
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        />
        <Dropdown
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500">
              <div
                style={{
                  backgroundImage: `url(${navbarimage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover"
                }}
                className="mb-2 aspect-video w-full rounded-lg"
              />
              <a
                target="blank"
                href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-white transition duration-200 hover:bg-brand-600 hover:text-white active:bg-brand-700"
              >
                Buy Horizon UI PRO
              </a>
              <a
                target="blank"
                href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700"
              >
                See Documentation
              </a>
              <a
                target="blank"
                href="https://horizon-ui.com/?ref=live-free-tailwind-react"
                className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700"
              >
                Try Horizon Free
              </a>
            </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src="https://e7.pngegg.com/pngimages/520/472/png-clipart-computer-icons-avatar-man-male-face-head-man-icon-miscellaneous-human-thumbnail.png"
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700">Hey, {name}</p>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200" />
              <div className="flex flex-col p-4">
                <Link
                  href={
                    Router.pathname.startsWith("/admin")
                      ? "/admin/profile"
                      : "/customer/profile"
                  }
                  className="text-sm text-gray-800"
                >
                  Profile
                </Link>
                <Link
                  href={
                    Router.pathname.startsWith("/admin")
                      ? "/admin/orders"
                      : "/customer/orders"
                  }
                  className="mt-3 text-sm text-gray-800"
                >
                  Order
                </Link>
                <a
                  href="#"
                  onClick={logout}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default Navbar;
