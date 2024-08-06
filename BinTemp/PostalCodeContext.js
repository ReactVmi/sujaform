// import React, { createContext, useContext, useState } from "react";

// // Create a context for managing postal code
// const PostalCodeContext = createContext();

// // Create a PostalCodeProvider component to wrap your app
// export const PostalCodeProvider = ({ children }) => 
// {
//   const [postalCode, setPostalCode] = useState('');

//   const updatePostalCode = (newPostalCode) => {
//     setPostalCode(newPostalCode);
//   };

 
//   return (
//     <PostalCodeContext.Provider value={{ postalCode, updatePostalCode,Names }}>
//       {children}
//     </PostalCodeContext.Provider>
//   );
// };

// // Custom hook to access the postal code and update function
// export const usePostalCode = () => {
//   const context = useContext(PostalCodeContext);

//   console.log("COnentext Postal Code:", context.postalCode);
//   if (!context) {
//     throw new Error("usePostalCode must be used within a PostalCodeProvider");
//   }
//   return context;
// };
