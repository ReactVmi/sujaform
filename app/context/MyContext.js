import React, { createContext, useContext, useState } from "react";

// Create a context for managing postal code
const MyContext = createContext();

// Create a ContexProvider component to wrap your app
export const ContexProvider = ({ children }) => 
{
  const [postalCode, setPostalCode] = useState("");
  const [Name, setName] = useState("");

  const updatePostalCode = (newPostalCode) => {
    setPostalCode(newPostalCode);
  };

  return (
    <MyContext.Provider
      value={{ postalCode, updatePostalCode, Name, setName,setPostalCode}}
    >
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the postal code and update function
export const useContexData = () => {
  const context = useContext(MyContext);

  console.log("Context Postal Code:", context.postalCode);

  if (!context) 
  {
    throw new Error("useContexData must be used within a ContexProvider");
  }
  return context;
};
