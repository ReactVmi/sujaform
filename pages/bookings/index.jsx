  import React, { useState, useEffect, useRef } from "react";
  import * as Yup from "yup";
  import { Formik, Field, Form, ErrorMessage } from "formik";
  import { useRouter } from "next/router";
  import { BiLoaderAlt } from "react-icons/bi"; // Import the loading icon
  import ThreeBoxes from "@/app/components/3boxes";
  import Footnote from "@/app/components/Footnote";
  import Formnav from "@/app/components/Formnav";
  import OldUserLoader from "@/pages/bookings/OldUserLoader";
  import { auto, manual } from "@/database/models/drivingCoursesData";
  import Head from 'next/head';

  const Index = () => {
    const [isLoader, setLoader] = useState(false);
    const [formValues, setFormValues] = useState({
      postal_code: ""
    });
    

    const formikRef = useRef(); 

    useEffect(() => {
      // Load form data from localStorage on component mount
      const formData = JSON.parse(localStorage.getItem("formData"));
      // console.log("formData:", formData); // Log the formData to see if it's retrieved correctly
      if (formData && formData.step1) {
        setFormValues(formData.step1);
        formikRef.current.setFieldValue("postal_code", formData.step1.postal_code); // Set the value of the input field

      }
    }, []);
  // Log the formValues whenever it changes
    
    

    const router = useRouter();

    const validationSchema = Yup.object().shape({
      postal_code: Yup.string()
        .transform((value) => value.replace(/\s/g, "").toUpperCase())
        .matches(
          /^[A-Z]{1,2}\d[A-Z\d]?(\s)?\d[A-Z]{2}$/,
          "Invalid UK postal code"
        )
        .required("Postal code is required")
    });

    // console.log("Validation Schema",validationSchema);

    const enableLoader = ({formikProps}) => {
      if (formikProps?.isValid) {
        setLoader(true);
      } else {
        // Handle invalid form case here
        // console.log("Form is invalid, cannot proceed.");
      }
    };

    const formatPostalCode = (value) => {
      let formattedValue = value.toUpperCase().replace(/\s/g, "");
      if (formattedValue.length > 4 && formattedValue.length < 6) {
        const firstPart = formattedValue.substring(0, 2);
        const secondPart = formattedValue.substring(2);
        formattedValue = `${firstPart} ${secondPart}`;
      }
      if (formattedValue.length > 5) {
        const firstPart = formattedValue.substring(0, 3);
        const secondPart = formattedValue.substring(3);
        formattedValue = `${firstPart} ${secondPart}`;
      }
      console.log("form",formattedValue.length);
      return formattedValue;
    };


    

    const handleSubmit = async (values, { setSubmitting }) => {
      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Retrieve existing form data from localStorage
      const existingFormData = JSON.parse(localStorage.getItem("formData")) || {};
      
      // Merge new form values with existing form data
      const formData = {
        ...existingFormData,
        step1: values
      };
    
      localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/bookings/course/");
      setSubmitting(false);
    };
    

    return (
      <div>
       <Head>
        <title>Postal Code</title>
      </Head>
        <Formik
          initialValues={{
      postal_code: formValues.postal_code // Set the initial value for postal_code
    }}
    innerRef={formikRef}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <Formnav />

              <div className="md:space-y-12 space-y-12 mx-auto w-full lg:max-w-[48%] px-4 lg:px-0 md:pt-36 pt-10 pb-10 md:py-24 py-10">
                <div>
                  <h2 className="font-semibold text-2xl text-gray-900 text-start">
                   Where would you like your lessons to start?
                  </h2>
                  <div className="mt-7 grid">
                    <div className="sm:col-span-3">
                      <div className="mt-2">
                        <Field
                          type="text"
                          name="postal_code"
                          placeholder="Postal code"
                          id="postal_code"
                          className={`text-lg block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm placeholder:text-gray-400 ${
                            formikProps.errors.postal_code
                              ? "ring-1 ring-inset ring-red-600"
                              : "ring-1 ring-inset ring-gray-300"
                          }`}
                          onChange={(e) => {
                          const { value } = e.target;
                          const formattedValue = formatPostalCode(value);
                          formikProps.setFieldValue(
                            "postal_code",
                            formattedValue
                          );
                        }}
                      
                        />

                        <ErrorMessage
                          name="postal_code"
                          component="p"
                          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-content-center">
                  <button
                    onClick={enableLoader}
                    type="submit"
                    className={`bg-theme-red-color hover:bg-red-900 md:w-full w-96 m-auto block hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600 ${
                      formikProps.isSubmitting
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={formikProps.isSubmitting}
                  >
                    <span className="flex items-center justify-center">
                      {formikProps.isSubmitting ? (
                        <>
                          Loading
                          <BiLoaderAlt className="ml-2 animate-spin mr-2 text-2xl" />
                        </>
                      ) : (
                        <>
                          Continue
                          <span className="ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h13M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <ThreeBoxes />
        <Footnote />
        {isLoader && <OldUserLoader />}
      </div>
    );
  };

  export default Index;
