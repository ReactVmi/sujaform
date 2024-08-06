//3rd STEP
import { React, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useContexData } from "@/app/context/MyContext"; // Use For Context API Global Setting
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from 'next/head';
import ThreeBoxes from '@/app/components/3boxes';

const tests = () => {
  const { postalCode, updatePostalCode, setName, Name, setPostalCode } =
    useContexData(); // Use the context hook

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      // Use postalCode from context
      console.log("Postal Code:", postalCode);

      // Send email with postalCode
      await axios.post("/api/api_mailer", { postalCode, Name });
      // Send the postal code in the request

      console.log("Email sent successfully");
      toast.success("Email sent successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      try {
        const response = await axios.post("/api/formdata/postdata", {
          postalCode,
          Name,
        });
        // Handle success
        toast.success("Data successfully saved", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error(error);
        // Handle error
        toast.error("Error saving data to the database", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const [Toggle, setToggle] = useState(false);

  const hideShow = () => {
    setToggle(!Toggle);
    console.log(Toggle, "Hide and Show");
  };

  const handlePostalCodeChange = (e) => {
    e.preventDefault();
    const newPostalCode = e.target.value;
    setPostalCode(newPostalCode);
  };

  return (
    <>
    <Head>
      <title>Tests - Suja Driving School Booking</title>
      <meta name='description' content='I hope this tutorial is helpful for you' />
    </Head>
    <form onSubmit={handlePostalCodeChange}>
      <div className="space-y-12 mx-auto max-w-5xl p-10 pb-0">
        <ToastContainer />
        <hr />
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold lg:text-3xl leading-7 text-gray-900 text-center">
            Tests {Name}
          </h2>
          <div className="mt-10 grid">
            <div className="w-full mb-5 pr-4">
              <h1 className=" text-[21px] leading-snug font-semibold">
                Which tests would you like us to fast-track for you?{" "}
              </h1>
              <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
                We'll fast-track your theory and practical tests so you can pass
                up to 2x faster than if you book yourself, and we'll do all the
                admin! Your last lesson will be directly before your practical
                test.
              </p>
              <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
                <strong>
                  All courses include a fast-track practical test, but you can
                  remove it below if you've booked your own.
                </strong>
              </p>
            </div>
            <div className=" mb-10">
              <button className="w-full flex items-center text-left  bg-pmfGray py-4 pl-5 pr-3.5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                <div className=" w-full flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="pr-5 false">
                    <svg width={30} height={30} viewBox="0 0 52 73" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M51 36.5C51 50.307 39.807 61.5 26 61.5C12.193 61.5 1 50.307 1 36.5C1 22.693 12.193 11.5 26 11.5C39.807 11.5 51 22.693 51 36.5Z" stroke="currentColor" strokeWidth={2} /> <path d="M16 71.5H36" stroke="currentColor" strokeWidth={2} /> <path d="M26 26.5V16.5" stroke="currentColor" strokeWidth={2} /> <path d="M31 1.5H21" stroke="currentColor" strokeWidth={2} /> <path d="M26 11.5V1.5" stroke="currentColor" strokeWidth={2} /> <path d="M26 56.5V46.5" stroke="currentColor" strokeWidth={2} /> <path d="M36 36.5H46" stroke="currentColor" strokeWidth={2} /> <path d="M6 36.5H16" stroke="currentColor" strokeWidth={2} /> <path d="M18.9289 29.4289L11.8579 22.3579" stroke="currentColor" strokeWidth={2} /> <path d="M40.1421 50.6421L33.0711 43.5711" stroke="currentColor" strokeWidth={2} /> <path d="M33.0711 29.4289L40.1421 22.3579" stroke="currentColor" strokeWidth={2} /> <path d="M11.8579 50.6421L18.9289 43.5711" stroke="currentColor" strokeWidth={2} /> </svg>
                    </div>
                    <div className="">
                      <div className=" false">
                        <div>
                          <p>Fast-Track Practical</p>
                          <div className="mt-1 bg-secondary text-white bg-opacity-100 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                            ADD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-7 w-auto">
                    <span className="text-xs flex">£110</span>
                  </div>
                </div>
              </button>
              <div
                className=" overflow-y-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="mt-4 p-5 bg-white w-full rounded-lg border-2 border-primary">
                  <p className="font-semibold">Timeline to Pass</p>
                  <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
                    Despite extremely high demand for practical tests and
                    driving instructors in your area, we can still get you
                    passed within 4 months!
                  </p>
                  <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
                    Don't want to pass ASAP? Let us know your preferred
                    practical test date below.{" "}
                  </p>
                  <button className="w-full bg-pmfGray border-gray-300 text-secondary hover:bg-pmfGraySecondary focus:bg-pmfGraySecondary flex border items-center justify-center px-3 py-1.5 mt-5 rounded-md font-semibold text-[12px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all">
                    <span className="flex items-center">
                      Set your preferred date
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6  max-w-5xl pb-10">
          <Link
            href="/course"
            className="text-sm font-semibold px-4 py-4 leading-6 text-gray-900"
          >
            Back to Course
          </Link>
          <Link
            href=""
            onClick={handleSendEmail}
            className="bg-red-700 hover:bg-red-600 hover:text-white rounded-md  px-12 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sumit Form{" "}
            <span className="" aria-hidden="true">
            
            </span>
          </Link>
        </div>

        <ThreeBoxes/>
      </div>
    </form>
    </>
  );
};

export default tests;
