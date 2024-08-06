//2nd STEP
import { React, useState } from "react";
import Link from "next/link";
import { useContexData } from "@/app/context/MyContext";
import Head from 'next/head';
import ThreeBoxes from '@/app/components/3boxes';

const courseold = () => {
  const [Toggle, setToggle] = useState(false);
  // const [newPostalCode, setNewPostalCode] = useState("");
  // const { Name, setName } = useContexData(); // Use the context hook

  const hideShow = () => {
    setToggle(!Toggle);
    console.log(Toggle, "Hide And Show");
  };

  // const handleNameChange = (e) => {
  //   const Name = e.target.value;
  //   setName(Name);
  //   console.log(Name, "Name");
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Update postal code in the context
  //   setName(Name);
  // };

  return (
    <>
    <Head>
      <title>Course - Suja Driving School Booking</title>
      <meta name='description' content='I hope this tutorial is helpful for you' />
    </Head>
    <form>
      <div className="space-y-12 mx-auto max-w-5xl p-10 pb-0">
        <hr />
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold lg:text-3xl leading-7 text-gray-900 text-center">
            Course Details
          </h2>
          <div className="mt-10 grid">
            <div className="sm:col-span-3">
              <div className="mt-2">
                <div className=" flex justify-between items-center mb-5 gap-x-5">
                  <h1 className=" text-[21px] leading-snug font-semibold">
                    Pick a gearbox — Manual or Automatic
                  </h1>
                  <div className="cursor-pointer" onClick={hideShow}>
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
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                </div>
                {Toggle && (
                  <div
                    className=" overflow-y-hidden"
                    style={{ height: "auto", opacity: 1 }}
                  >
                    <div className="mb-8 p-5 bg-white w-full rounded-lg border-2 border-secondary">
                      <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] ">
                        Decide whether you want to be in charge of changing gears or not. If you pass in an automatic, you're
                        legally allowed to drive automatic vehicles only, but if
                        you pass in a manual, you can drive either.
                      </p>
                    </div>
                  </div>
                )}

                <div className=" mb-10">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="w-full flex items-center text-left bg-pmfLightGreen ring-2 ring-primary ring-offset-1 bg-pmfGray py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                      <div className=" w-full flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="pr-5 false">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z" stroke="currentColor" strokeWidth="2" ></path> <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z" stroke="currentColor" strokeWidth="2" ></path> <path d="M16.5 16.5V8.5L12 13.18L7.5 8.5V16.5" stroke="currentColor" strokeWidth="2" ></path> </svg>
                          </div>
                          <div className="">
                            <div className=" false">Manual</div>
                          </div>
                        </div>
                      </div>
                    </button>
                    <button className="w-full flex items-center text-left  bg-pmfGray py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                      <div className=" w-full flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="pr-5 false">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z" stroke="currentColor" strokeWidth="2" ></path> <path d="M17.4593 16.7279L12.0003 7.2719L6.5403 16.7279" stroke="currentColor" strokeWidth="2" ></path> <path d="M8.3145 13.4275H15.6855" stroke="currentColor" strokeWidth="2" ></path> </svg>
                          </div>
                          <div className="">
                            <div className=" false">Automatic</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                className="block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={Name} // Bind the value to the state variable
                // onChange={handleNameChange} // Update the state on change
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6  max-w-5xl pb-10">
          <Link
            href="/"
            className="text-sm font-semibold px-4 py-4 leading-6 text-gray-900"
          >
            Back to Postal Code
          </Link>
          <Link
            type="submit"
            href="/course/tests"
            className="bg-red-700 hover:bg-red-600 hover:text-white rounded-md  px-12 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue to Test{" "}
            <span className="" aria-hidden="true">
              {" "}
              &rarr;{" "}
            </span>
          </Link>
        </div>

        <ThreeBoxes/>
      </div>
    </form>
    </>
  );
};

export default courseold;
