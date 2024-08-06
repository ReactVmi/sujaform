import React, { useState, useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import Cookies from "js-cookie";

const OldUserLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestMessageVisible, setIsGuestMessageVisible] = useState(false);

  useEffect(() => {
    // Check if the key exists in local storage
    const isLocalStorageEmpty = !localStorage.hasOwnProperty("formData");

    // Check if the key exists in session storage
    const isSessionStorageEmpty = !sessionStorage.hasOwnProperty("formData");

    // Check if the key exists in cookies
    const isCookieEmpty = Cookies.get("formData") === undefined;

    if (!isLocalStorageEmpty || !isSessionStorageEmpty || !isCookieEmpty) {
      // Simulate loading for an old user
      // setTimeout(() => {
        // setIsLoading(false);
      // }, 3000);
    } else {
      // No data found, set loading to false and show guest message
      setIsGuestMessageVisible(true);
      // setTimeout(() => {
        // setIsLoading(false);
        // No need to hide guest message here, it will be handled in the rendering logic
      // }, 3000);
    }
  }, []);

  if (isLoading) {
    const loadingMessage = (
      <div className="flex items-center justify-center h-100 fixed w-full bg-gray-50 z-50 text-center top-0 bottom-0 right-0 left-0">
        <div className="p-4 text-center justify-items-center">
        <BiLoaderAlt className="ml-2 animate-spin text-5xl mb-5" style={{ margin: '0 auto' }} />
          <p className="mt-2">
            {isGuestMessageVisible
              ? "Welcome! Preparing for your journey. Just a few more seconds..."
              : "Getting you behind the wheel. Just a few more seconds..."}
          </p>
        </div>
      </div>
    );
    return loadingMessage;
  }

  // No need for a separate guest message component, as it is included in the loading message
  return null;
};

export default OldUserLoader;
