"use client"
import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
// Test

export default function Formnav() {

  const [test, settest] = useState(true);
  const router = useRouter();

  const handleGoBack = () => {
    if (router.pathname === "/bookings") {
      // If the current route is "/booking," navigate to your website URL
      window.location.href = 'https://sujadrivingschool.co.uk/';
    } else {
      // Use the router's back() method to navigate back to the previous page
      router.back();
    }
  };

  return (
   <div className={`bg-theme-red-color flex items-center text-white text-center w-100 sticky top-0 z-10 ${router.pathname === "/bookings" ? "justify-center" : ""} ${router.pathname !== "/bookings" ? "justify-start" : ""}`}>
      <p className="absolute left-0 ps-3 text-white cursor-pointer z-20" style={{ opacity: 1 }} onClick={handleGoBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={21}
          height={21}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
      </p>
      {/* <Link href="/bookings"> */}
      {/* {router.pathname === "/bookings" && ( */}



      {/* )} */}
 
      <div className={`w-full h-[80px] flex justify-center items-center ${router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/thanks" && router.pathname !== "/bookings/thankyou" ? "lg:w-[calc(100vw-350px)]" : ""}`} style={{ opacity: 1, transform: "none" }}>
  {(router.pathname === "/bookings" || router.pathname === "/bookings/summary" || router.pathname === "/bookings/payment" || router.pathname !== "/bookings/thanks" || router.pathname === "/bookings/thankyou")  && (
    <motion.div
      initial={{ opacity: (router.pathname === "/bookings" || router.pathname === "/bookings/summary" || router.pathname === "/bookings/payment" || router.pathname !== "/bookings/thanks" || router.pathname === "/bookings/thankyou") ? 0 : 1, marginRight: (router.pathname === "/bookings" || router.pathname === "/bookings/summary" || router.pathname !== "/bookings/thanks" || router.pathname === "/bookings/payment" || router.pathname !== "/bookings/thanks" || router.pathname === "/bookings/thankyou") ? -150 : 0 }}
      animate={{ opacity: (router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/payment" && router.pathname !== "/bookings/thanks" && router.pathname !== "/bookings/thankyou") ? 0 : 1, marginRight: (router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/payment" &&  router.pathname !== "/bookings/thanks" &&
      router.pathname !== "/bookings/thankyou") ? 0 : 0 }}
      exit={{ opacity: (router.pathname === "/bookings" || router.pathname === "/bookings/summary" || router.pathname === "/bookings/payment" || router.pathname !== "/bookings/thanks" || router.pathname === "/bookings/thankyou") ? 0 : 1, marginRight: (router.pathname === "/bookings" || router.pathname === "/bookings/summary" || router.pathname === "/bookings/payment" || router.pathname !== "/bookings/thanks" || router.pathname === "/bookings/thankyou") ? -150 : 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      >
      <Image alt="" src={Logo} className="mx-auto p-2 w-100% h-100%" />
    </motion.div>
  )}


  {router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/payment" && router.pathname !== "/bookings/thanks" && router.pathname !== "/bookings/thankyou" && (
  <motion.div
    initial={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? 0 : -360 }}
    animate={{ opacity: (router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/payment") ? 1 : 0, marginRight: (router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/payment") ? 0 : 0 }}
    exit={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? 0 : -360 }}
    transition={{ delay: 0.1, duration: 0.5 }}
    className="h-50 w-full flex md:justify-center items-center"
  >
  
        <div className="flex flex-col py-5 text-white w-full max-w-[260px]">
              <div className="text-center mb-2 font-bold">
              {router.pathname === "/bookings/course" ? "Course Details" : 
              router.pathname === "/bookings/course/tests" ? "Tests" : 
              router.pathname === "/bookings/student" ? "Personal Details" : 
              router.pathname === "/bookings/availability" ? "Availability" :
              router.pathname === "/bookings/addons" ? "Add-ons" :
              router.pathname === "/bookings/summary" ? "Summary" :
              router.pathname === "/bookings/thankyou" ? "Booking Completed" :
              router.pathname === "/bookings/thanks" ? "Booking Completed" :
              "Suja Driving School Booking"}
        </div>
              <div className="flex space-x-[6px]">
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                <motion.div
                  initial=
                  {{  
                    opacity: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/course") ? 0 : 1) : 1,
                    width: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/course") ? "0%" : "100%") : "100%"
                   }}
                  animate={{ opacity: router.pathname.startsWith === "/bookings/course" ? 0 : 1, width: router.pathname.startsWith === "/bookings/course" ? 0 : "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="w-full h-full bg-white "
                  >
                  </motion.div>
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                {router.pathname !== "/bookings/course" && (
                <motion.div
                  initial={{
                    opacity: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/course/tests/") ? 0 : 1) : 1,
                    width: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/course/tests") ? "0%" : "100%") : "100%"
                  }}
                  animate={{ opacity: router.pathname.startsWith === "/bookings/course/tests" ? 0 : 1, width: router.pathname.startsWith === "/bookings/course/tests" ? 0 : "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="w-full h-full bg-white"
                  >
                  </motion.div>
                )}

                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                {router.pathname !== "/bookings/course" && router.pathname !== "/bookings/course/tests" && (
                <motion.div
                  initial={{
                    opacity: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/student") ? 0 : 1) : 1,
                    width: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/student") ? "0%" : "100%") : "100%"
                  }}
                  animate={{ opacity: router.pathname.startsWith === "/bookings/student" ? 0 : 1, width: router.pathname.startsWith === "/bookings/student" ? 0 : "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="w-full h-full bg-white"
                  >
                  </motion.div>
                )}
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                {router.pathname !== "/bookings/course" && router.pathname !== "/bookings/course/tests" && router.pathname !== "/bookings/student" && (
                <motion.div
                  initial={{
                    opacity: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/availability") ? 0 : 1) : 1,
                    width: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/availability") ? "0%" : "100%") : "100%"
                  }}
                  animate={{ opacity: router.pathname.startsWith === "/bookings/availability" ? 0 : 1, width: router.pathname.startsWith === "/bookings/availability" ? 0 : "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="w-full h-full bg-white"
                  >
                  </motion.div>
                )}
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                {router.pathname !== "/bookings/course" && router.pathname !== "/bookings/course/tests" && router.pathname !== "/bookings/student" && router.pathname !== "/bookings/availability" && (
                <motion.div
                  initial={{
                    opacity: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/addons") ? 0 : 1) : 1,
                    width: router.pathname.startsWith("/bookings/") ? (router.pathname.startsWith("/bookings/addons") ? "0%" : "100%") : "100%"
                  }}
                  animate={{ opacity: router.pathname.startsWith === "/bookings/addons" ? 0 : 1, width: router.pathname.startsWith === "/bookings/addons" ? 0 : "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="w-full h-full bg-white"
                  >
                  </motion.div>
                )}
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "0%", opacity: 0 }}
                  />
                </div>
              </div>
        </div>
        </motion.div>
        )}
        
</div>


      {/* </Link> */}
    </div>
  );
}
