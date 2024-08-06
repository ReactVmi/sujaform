'use client'
import { React, useState, useEffect } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
//import Cookies from "js-cookie";
import { useRouter} from "next/router";
import Footnote from '@/app/components/Footnote';
import Formnav from '@/app/components/Formnav';
import OldUserLoader from "@/pages/bookings/OldUserLoader";
import Head from 'next/head';
//import Sidebar from '@/app/components/sidebar/sidebar';


const ThankYou = ({ info }) => {

  const router = useRouter();
  const [changedData, setChangedData] = useState();
  const [isLoader, setLoader] = useState(false);

  let formdata;
  if (typeof localStorage !== 'undefined') {
    formdata = JSON.parse(localStorage.getItem("formData"));
  }
  else {
    formdata = '';
  }

  useEffect(() => {
    //console.log(info)
    if (info == null) {
      router.replace('/bookings');
    }
    setChangedData(formdata)
  }, [info])

  // const [info, setInfo] = useState();




function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}



let drType;
let course_name;
let coursePriceObj;
let hours_value;
let variant;
let full;
let deposit;
let total;
// let fast_track_theory;
// let fast_track_practical;
let pass_protect;

if(changedData && changedData.step2 && changedData.step2.dr_course_price != undefined){
  drType = capitalize(changedData.step2.dr_type);
  course_name = changedData.step2.dr_course_type;
  coursePriceObj = changedData.step2.dr_course_price[Object.keys(changedData.step2.dr_course_price)[0]];
  hours_value = coursePriceObj.value;
  variant = coursePriceObj.variant;
  full = parseInt(coursePriceObj.full);
  deposit = parseInt(coursePriceObj.deposit);
}


// fast_track_theory = (changedData && changedData.step3 && changedData.step3.fast_track_theory != '') ? parseInt(changedData.step3.fast_track_theory) : 0
// fast_track_practical = (changedData && changedData.step3 && changedData.step3.fast_track_practical != '') ? parseInt(changedData.step3.fast_track_practical) : 0

// pass_protect = (changedData && changedData.step6 && changedData.step6.pass_protect != '') ? parseInt(changedData.step6.pass_protect) : 0
// subTotal = ((deposit) ? deposit : full)

// total = full + fast_track_theory + fast_track_practical;
total = full;

const paymentButtonClick = () => 
{
  router.push('/bookings/payment');
};

function enableLoader(){
  setLoader(true);
}

return (

<div>
<Head>
        <title>Summary</title>
      </Head>
<Formnav />
<div className="mt-[0px] flex justify-center items-top md:px-7 px-5 md:py-8 py-5">
<div className='w-full lg:max-w-[750px] md:pb-24 pb-0'>
<div className="mt-[10px] items-center py-5">
    <div className="w-full lg:max-w-[750px] text-center">


<div className="w-full lg:max-w-[750px]">
  <div
    style={{
      position: "fixed",
      zIndex: 9999,
      top: 16,
      left: 16,
      right: 16,
      bottom: 16,
      pointerEvents: "none"
    }}
  ></div>
  <div className="w-full">
    
  {changedData && changedData.step2 && changedData.step2.dr_course_price ? (
    <div>
      <div className="w-full mb-5 pr-4">
        <h1 className="mb-5 text-[24px] text-start font-bold">
          Order Summary
        </h1>
      </div>
      <div style={{ opacity: 1 }}>
        <div>
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3.5L2 9L12 13.5L22 9L12 3.5Z" fill="#33A000" />
                  <path
                    d="M4 16.5L4.5 10.5L12 13.5L19.5 10L20 16.5L12 21L4 16.5Z"
                    fill="#2BCD5A"
                  />
                  <path
                    d="M4.26007 10.147C3.98502 12.2526 3.82112 14.3712 3.76907 16.494C6.64786 17.6966 9.40423 19.1734 12.0001 20.904C14.5962 19.1733 17.3529 17.6965 20.2321 16.494C20.18 14.3712 20.0161 12.2526 19.7411 10.147M4.25907 10.147C3.38069 9.85171 2.49436 9.58061 1.60107 9.33401C4.86447 7.04592 8.34806 5.08923 12.0001 3.49301C15.6521 5.08889 19.1356 7.04525 22.3991 9.33301C21.5031 9.58101 20.6161 9.85301 19.7411 10.147M4.25907 10.147C6.92773 11.0441 9.51701 12.162 12.0001 13.489C14.4828 12.1621 17.0718 11.0442 19.7401 10.147M6.75007 15V11.325C8.44681 10.2703 10.1994 9.30828 12.0001 8.44301M4.99307 19.993C5.55105 19.4364 5.99351 18.775 6.29504 18.0469C6.59656 17.3187 6.75121 16.5381 6.75007 15.75V14.25M6.75007 15C6.94899 15 7.13975 14.921 7.2804 14.7803C7.42106 14.6397 7.50007 14.4489 7.50007 14.25C7.50007 14.0511 7.42106 13.8603 7.2804 13.7197C7.13975 13.579 6.94899 13.5 6.75007 13.5C6.55116 13.5 6.3604 13.579 6.21974 13.7197C6.07909 13.8603 6.00007 14.0511 6.00007 14.25C6.00007 14.4489 6.07909 14.6397 6.21974 14.7803C6.3604 14.921 6.55116 15 6.75007 15Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="pl-4 font-bold text-[15px]">
                <div>{ hours_value +' '+ variant +' - '+ drType}</div>
                <div className="text-[13px] tracking-wide text-dust text-opacity-60 font-medium text-start">
                  {drType}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-semibold text-gray-800 text-xl">
              £{ full }
              </div>
            </div>
          </div>

          { (changedData && changedData.step3 && changedData.step3.fast_track_theory || changedData && changedData.step3 && changedData.step3.fast_track_practical)  ? (
            <div>
              

          { changedData && changedData.step3 && changedData.step3.fast_track_practical ? (
            
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.68799C3 7.82399 3.933 7.28299 4.683 7.71099L11.791 11.773C11.9631 11.8714 12.1061 12.0136 12.2055 12.1851C12.305 12.3565 12.3574 12.5513 12.3574 12.7495C12.3574 12.9477 12.305 13.1424 12.2055 13.3139C12.1061 13.4854 11.9631 13.6276 11.791 13.726L4.683 17.788C4.51182 17.8858 4.31796 17.9368 4.12082 17.9361C3.92369 17.9354 3.73021 17.8829 3.55976 17.7838C3.38932 17.6848 3.24789 17.5427 3.14965 17.3718C3.05141 17.2008 2.9998 17.0071 3 16.81V8.68799Z"
                    fill="#FF8A00"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.433 7.71099C13.683 7.28299 12.75 7.82399 12.75 8.68799V16.811C12.75 17.008 12.8017 17.2016 12.9 17.3724C12.9983 17.5432 13.1398 17.6851 13.3102 17.7841C13.4806 17.883 13.674 17.9354 13.8711 17.9361C14.0681 17.9368 14.2619 17.8857 14.433 17.788L21.541 13.726C21.7131 13.6276 21.8561 13.4854 21.9555 13.3139C22.055 13.1424 22.1074 12.9477 22.1074 12.7495C22.1074 12.5513 22.055 12.3565 21.9555 12.1851C21.8561 12.0136 21.7131 11.8714 21.541 11.773L14.433 7.71099Z"
                    fill="#FFB626"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="pl-4 font-bold text-[15px]">
                <div>Practical Test</div>
                <div className="text-[13px] tracking-wide text-dust text-opacity-60 font-medium text-start">
                  Fast-Track
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-semibold text-gray-800 text-lg">
                {/* £{changedData.step3.fast_track_practical} */}
              </div>
            </div>
          </div>
         

          ) : '' }

          {changedData && changedData.step3 && changedData.step3.fast_track_theory ? (

          

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.68799C3 7.82399 3.933 7.28299 4.683 7.71099L11.791 11.773C11.9631 11.8714 12.1061 12.0136 12.2055 12.1851C12.305 12.3565 12.3574 12.5513 12.3574 12.7495C12.3574 12.9477 12.305 13.1424 12.2055 13.3139C12.1061 13.4854 11.9631 13.6276 11.791 13.726L4.683 17.788C4.51182 17.8858 4.31796 17.9368 4.12082 17.9361C3.92369 17.9354 3.73021 17.8829 3.55976 17.7838C3.38932 17.6848 3.24789 17.5427 3.14965 17.3718C3.05141 17.2008 2.9998 17.0071 3 16.81V8.68799Z"
                    fill="#FF8A00"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.433 7.71099C13.683 7.28299 12.75 7.82399 12.75 8.68799V16.811C12.75 17.008 12.8017 17.2016 12.9 17.3724C12.9983 17.5432 13.1398 17.6851 13.3102 17.7841C13.4806 17.883 13.674 17.9354 13.8711 17.9361C14.0681 17.9368 14.2619 17.8857 14.433 17.788L21.541 13.726C21.7131 13.6276 21.8561 13.4854 21.9555 13.3139C22.055 13.1424 22.1074 12.9477 22.1074 12.7495C22.1074 12.5513 22.055 12.3565 21.9555 12.1851C21.8561 12.0136 21.7131 11.8714 21.541 11.773L14.433 7.71099Z"
                    fill="#FFB626"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="pl-4 font-bold text-[15px]">
                <div>Theory Test</div>
                <div className="text-[13px] tracking-wide text-dust text-opacity-60 font-medium text-start">
                  Fast-Track
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-semibold text-gray-800 text-lg">
              {/* £{changedData.step3.fast_track_theory} */}
              </div>
            </div>
          </div>

          
          ) : '' }


            {/* {changedData && changedData.step6 && changedData.step6.pass_protect ? (

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8.68799C3 7.82399 3.933 7.28299 4.683 7.71099L11.791 11.773C11.9631 11.8714 12.1061 12.0136 12.2055 12.1851C12.305 12.3565 12.3574 12.5513 12.3574 12.7495C12.3574 12.9477 12.305 13.1424 12.2055 13.3139C12.1061 13.4854 11.9631 13.6276 11.791 13.726L4.683 17.788C4.51182 17.8858 4.31796 17.9368 4.12082 17.9361C3.92369 17.9354 3.73021 17.8829 3.55976 17.7838C3.38932 17.6848 3.24789 17.5427 3.14965 17.3718C3.05141 17.2008 2.9998 17.0071 3 16.81V8.68799Z"
                      fill="#FF8A00"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.433 7.71099C13.683 7.28299 12.75 7.82399 12.75 8.68799V16.811C12.75 17.008 12.8017 17.2016 12.9 17.3724C12.9983 17.5432 13.1398 17.6851 13.3102 17.7841C13.4806 17.883 13.674 17.9354 13.8711 17.9361C14.0681 17.9368 14.2619 17.8857 14.433 17.788L21.541 13.726C21.7131 13.6276 21.8561 13.4854 21.9555 13.3139C22.055 13.1424 22.1074 12.9477 22.1074 12.7495C22.1074 12.5513 22.055 12.3565 21.9555 12.1851C21.8561 12.0136 21.7131 11.8714 21.541 11.773L14.433 7.71099Z"
                      fill="#FFB626"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="pl-4 font-bold text-[15px]">
                  <div>Pass Protect</div>
                  <div className="text-[13px] tracking-wide text-dust text-opacity-60 font-medium text-start">
                    Add-ons
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold text-gray-800 text-lg">
                £{changedData.step6.pass_protect}
                </div>
              </div>
            </div>


            ) : '' } */}

          </div>

          

          ) : '' }


        </div>
        <div className="w-full flex justify-between items-center mt-5">
          <div className="font-semibold text-[15px]">Total</div>
          <div className="font-semibold text-secondary">£{total}</div>
        </div>
        {/* <div className="w-full flex justify-between items-center mt-5">
          <div className="font-semibold text-[15px]">Due Today</div>
          <div className="font-semibold text-secondary">£250</div>
        </div> */}
       

<button onClick={() => { paymentButtonClick(); enableLoader(); }} className="my-8 bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600">
<span className="flex items-center justify-center">
Continue to Payment Method
<span className="ml-4">
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M5 12h13M12 5l7 7-7 7"></path>
</svg>
</span>
</span>
</button>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="w-full p-6 border rounded-md">
            <div className="flex flex-col">
              <div className="flex items-center  mb-4 space-x-4">
                <div className="p-3 bg-gray-100 rounded-xl w-max">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width={19}
                    height={19}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold leading-normal">100% Money-Back Guarantee</div>
              </div>
              <p className="text-start  text-400 font-regular text-[15px] ">
                It's rarer than a Robin Reliant but, if we can't pass you fast
                enough, you can get a full refund thanks to our money-back
                guarantee.
              </p>
            </div>
          </div>
          <div className="w-full p-6 border rounded-md">
            <div className="flex flex-col">
              <div className="flex items-center  mb-4 space-x-4">
                <div className="p-3 bg-gray-100 rounded-xl w-max">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width={19}
                    height={19}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold leading-normal">Flexible Payment Options</div>
              </div>
              <p className="text-start text-400 font-regular text-[15px] ">
                Unlike most intensive driving courses, we're flexible about
                passing fast. You can pay in full today, reserve your spot with
                a deposit of just £250. Or PaySlow with monthly instalments from
                Payl8r or Klarna.
              </p>
            </div>
          </div>
          <div className="w-full p-6 border rounded-md">
            <div className="flex flex-col">
              <div className="flex items-center  mb-4 space-x-4">
                <div className="p-3 bg-gray-100 rounded-xl w-max">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width={19}
                    height={19}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div className="text-lg text-start leading-normal font-semibold">
                  Not your average driving course
                </div>
              </div>
              <p className="text-start text-400 font-regular text-[15px] ">
                PassMeFast customers boost their odds of passing with video
                lessons from Virtual Driving Instructor, and can make savings on
                100+ of your fave brands with PassPerks!
              </p>
            </div>
          </div>
          <div className="w-full p-6 border rounded-md">
            <div className="flex flex-col">
              <div className="flex items-center  mb-4 space-x-4">
                <div className="p-3 bg-gray-100 rounded-xl w-max">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width={19}
                    height={19}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div className="text-lg text-start leading-normal font-semibold">Learn from the Best</div>
              </div>
              <p className="text-start text-400 font-regular text-[15px]">
                You'll be connected with one of 5,000 DVSA-approved and
                CRB-checked driving instructors who'll know your local test
                centre like the back of their hand and give you all the skills
                needed to pass.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  ) : '' }

    {/* <div className="fixed bottom-3 right-3 rounded-full bg-slate-200 p-2 text-slate-700 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="w-5 h-5"
      >
        <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
      </svg>
    </div> */}
  </div>
</div>

</div>
</div>
</div>
</div>
    <Footnote />
    {isLoader && <OldUserLoader />}
</div>
);
}


let formdata;
if (typeof localStorage !== 'undefined') {
  formdata = JSON.parse(localStorage.getItem("formData"));
}
else {
  formdata = {};
}

const YourPage = () => {
  return <ThankYou  info={(formdata.step2?.dr_course_type == "speedster" || formdata.step2?.dr_course_type == "guaranteed_pass") ? formdata : {}} />;
};

export default YourPage;