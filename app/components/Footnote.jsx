import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Footnote = () => {
  const router = useRouter();

  return (
   <motion.div
                  initial={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? 0 : -360 }}
                  animate={{ opacity: router.pathname !== "/bookings" ? 1 : 0, marginRight: router.pathname !== "/bookings" ? 0 : 0 }}
                  exit={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? 0 : -360 }}
                  transition={{ delay: 5.1, duration: 0.5 }}
                  className={`my-4 w-full text-sm font-semibold opacity-60 text-center ${router.pathname !== "/bookings" && router.pathname !== "/bookings/summary" && router.pathname !== "/bookings/thanks" && router.pathname !== "/bookings/thankyou" ? "lg:w-[calc(100vw-360px)]" : ""}`}
                  >
    <div className="w-full">
      Copyright © {/* */}2024{/* */} by Suja Driving School
    </div>
  </motion.div>
  );
};

export default Footnote;
