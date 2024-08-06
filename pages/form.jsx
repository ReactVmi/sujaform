"use client"

import Link from "next/link";
import { useContexData } from "@/app/context/MyContext"; // Adjust the path accordingly
import { useRouter } from "next/router";
import Head from 'next/head';
import ThreeBoxes from '@/app/components/3boxes';
import Joi from "joi";

import { createContext, useState, useEffect } from "react";
import Stepper from "@/app/components/Stepper";
import Step from "@/app/components/Step";
export const FormContext = createContext();


// const schema = Joi.object({
//   postal_code: Joi.string().required().regex(/^\d{5}$/).messages({
//     "string.base": "Postal code must be a string",
//     "string.empty": "Postal code is required",
//     "string.pattern.base": "Postal code must be a 5-digit number",
//   }),
// });

const Form = () => {
  let active;
  // if (typeof window !== 'undefined') {
  //   active = localStorage.getItem('activeStepIndex')
  // }

  const [activeStepIndex, setActiveStepIndex] = useState(active || 0);
  const [formData, setFormData] = useState({});


  

  // useEffect(() => {
  //   let data = localStorage.getItem('activeStepIndex')
  //   if(activeStepIndex > data) localStorage.setItem('activeStepIndex', data)

  // }, []);
  
  

  // const [newPostalCode, setNewPostalCode] = useState("");
  // const [postalCodeError, setPostalCodeError] = useState(""); // State for validation error message
  // const { updatePostalCode } = useContexData(); // Use the context hook

  // const router = useRouter();

  // const handlePostalCodeChange = (e) => {
  //   const postalCode = e.target.value;
  //   setNewPostalCode(postalCode);
  //   setPostalCodeError(""); // Clear the validation error message on change
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const { error } = schema.validate({ postal_code: newPostalCode });

  //   if (error) {
  //     // Set the validation error message
  //     setPostalCodeError(error.details[0].message);
  //     return;
  //   }

  //   // Update postal code in the context
  //   console.log("Set Postal Code:", newPostalCode);
  //   updatePostalCode(newPostalCode);
  //   router.push("/course");
  //};

  return (
    <>
      <Head>
        <title>Form - Suja Driving School Booking</title>
        <meta name='description' content='Form - Suja Driving School Booking' />
      </Head>

      {/* <form onSubmit={handleSubmit}>
        <div className="space-y-12 mx-auto max-w-5xl p-10 pb-0">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold lg:text-3xl leading-7 text-gray-900 text-center">
              Lets pass you fast. Where would you like your lessons to start?
            </h2>
            <div className="mt-10 grid">
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    required="required"
                    type="text"
                    name="postal_code"
                    placeholder="Postal"
                    id="postal_code"
                    className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ... sm:text-sm sm:leading-6"
                    value={newPostalCode} // Bind the value to the state variable
                    onChange={handlePostalCodeChange} // Update the state on change
                  />
                </div>
                {postalCodeError && ( <p className="text-red-500 text-sm mt-1">{postalCodeError}</p>)}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end  gap-x-6  max-w-5xl pb-10">
            <button
              type="button"
              className="text-sm font-semibold px-4 py-4 leading-6 text-gray-900"
            > Back to website
            </button>
            <div
              onClick={handleSubmit}
              className="bg-red-700 hover:bg-red-600 hover:text-white rounded-md  px-12 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600"
            >
              Continue to Course{" "}
              <span className="" aria-hidden="true">
                {" "}
                &rarr;{" "}
              </span>
            </div>
          </div>
          <ThreeBoxes/>
        </div>
      </form> */}
      
    <FormContext.Provider value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }} >
      <div className="w-screen h-screen flex flex-col items-center justify-start">
        <Stepper />
        <Step />
      </div>
    </FormContext.Provider>
    </>
  );
};

export default Form;