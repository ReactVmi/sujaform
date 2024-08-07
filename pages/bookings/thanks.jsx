import { React, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Formnav from "@/app/components/Formnav";
import Footnote from "@/app/components/Footnote";
import { FaCheckCircle } from "react-icons/fa";
import Head from "next/head";

const thankyou = () => {
  let formdata;
  const router = useRouter();
  useEffect(() => {
    // if (typeof localStorage !== 'undefined') {
    formdata = JSON.parse(localStorage.getItem("formData"));

    if (formdata == null || formdata == undefined || formdata == "") {
      router.replace("/bookings");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Thank You</title>
      </Head>
      <Formnav />
      <div className="mt-[0px] flex justify-center items-top md:px-7 px-5 py-8">
        <div className="w-full lg:max-w-[750px] md:pb-24 md:5">
          <div className="md:mt-[10px] mt-0 items-center md:pt-20 pt-7 md:pb-24 pb-5">
            <div className="w-full lg:max-w-[750px] items-center text-center">
              <div className="flex justify-center mb-8">
                <FaCheckCircle className="text-green-400 text-9xl" />
              </div>
              <h1 className="text-black font-bold lg:text-5xl text-3xl text-center">
                Booking Requests Submitted
              </h1>
              <p className="text-center lg:my-10 md:pb-0 pb-3 my-4 md:text-xl text-lg text-dark font-medium">
                Thank you for booking with us.
                We will contact you shortly to confirm the details. If you have
                any urgent inquiries, please feel free to call us now. You can
                also view your order history by clicking the "Go to Dashboard"
                button below.
              </p>
              <a
                href="/customer"
                className="red-btn tracking-wide uppercase lg:p-4 p-3 font-bold lg:px-8 px-5 rounded-full
                 bg-red-700 hover:bg-red-600 hover:text-white md:text-2xl text-xl text-center text-white inline-flex items-center btnanimate mr-2"
              >
                Go to Dashboard
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 ml-4 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footnote />
    </div>
  );
};

export default thankyou;
