import { useEffect, useState } from 'react';
//import Link from "next/link";
import Logo from "@/public/assets/logo1.png";
// import drivingSchoolIcon from "@/public/assets/driving-school-icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {auto, manual} from '@/database/models/drivingCoursesData';
// import Cookies from "js-cookie";
// let formdata = Cookies.get('formData');
// const localdata = formdata ? JSON.parse(formdata) : { };


export default function Formnav({data}) {

const router = useRouter();
// const [isClient, setIsClient] = useState(data)

  // useEffect(() => {
  //   setIsClient(isClient)
  // }, []);

  // console.log(data)

  // const handleGoBack = () => {
  //   if (router.pathname === "/bookings") {
  //     // If the current route is "/bookings," navigate to your website URL
  //     window.location.href = 'https://sujadrivingschool.co.uk/';
  //   } else {
  //     // Use the router's back() method to navigate back to the previous page
  //     router.back();
  //   }
  // };
  //const renderDrType = data?.step2?.dr_type || 'Loading...';

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  let drType;
  // const drType = data.step2.dr_type;
  // const courseType = data.step2.dr_course_type;
  let course_name;
  let coursePriceObj;
  let hours_value;
  let variant;
  let full;
  let deposit;
  let total;
  // let subTotal;
  let fast_track_theory;
  let fast_track_practical;
  let pass_protect;
  let bg_color;

  // console.log(data)
  if(data && data.step2 && data.step2.dr_course_price != undefined){
    drType = capitalize(data.step2.dr_type);
    //course_name = data.step2.dr_course_type;
    coursePriceObj = data.step2.dr_course_price[Object.keys(data.step2.dr_course_price)[0]];
    hours_value = coursePriceObj.value;
    variant = coursePriceObj.variant;
    full = parseInt(coursePriceObj.full);
    deposit = parseInt(coursePriceObj.deposit);
    if(data.step2.dr_type == 'automatic'){
      course_name = auto[data.step2.dr_course_type]['name'];
      bg_color = auto[data.step2.dr_course_type]['bg_color'];
    }
    else{
      course_name = manual[data.step2.dr_course_type]['name'];
      bg_color = manual[data.step2.dr_course_type]['bg_color'];
    }
  }

 
  fast_track_theory = (data && data.step3 && data.step3.fast_track_theory != '' && !isNaN(data.step3.fast_track_theory)) ? parseInt(data.step3.fast_track_theory) : 0
  fast_track_practical = (data && data.step3 && data.step3.fast_track_practical != '' && !isNaN(data.step3.fast_track_practical)) ? parseInt(data.step3.fast_track_practical) : 0
  // pass_protect = (data && data.step6 && data.step6.pass_protect != '') ? parseInt(data.step6.pass_protect) : 0
 // subTotal = ((deposit) ? deposit : full)
  
  total = full;

  return (

    <motion.div
      initial={{ opacity: 0.8, marginRight: -360 }}
      animate={{ opacity: 1, marginRight: 0 }}
      exit={{ opacity: 1, marginRight: -360 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="fixed md:pt-8 pt-3 top-20 right-0 z-10 w-[350px] sidbarcustom bg-[#0c1936] text-white md:overflow-y-auto md:p-6 p-4 md:h-full"
    >

    {data && data.step2 && data.step2.dr_course_price ? (
        
        <div className="flex flex-col w-full md:h-full">
        <div className="text-center rounded-full self-center">
          <Image alt="Suja Logo" width={110} height={69} src={Logo} className="w-auto h-auto filter brightness-200 invert-0" />
        </div>
        <div className="text-left md:mt-10 mt-0">
          <h1 className="text-xl leading-snug font-semibold">Cart Summary</h1>  
        </div>
        <div className="md:mt-8 mt-0">                 
          <div className={`w-max py-1 px-3 font-semibold  text-xs rounded-full course-title text-gray-900 ${bg_color}`}>{course_name}</div>                    
          <div className="mt-2 w-full font-semibold flex pkg-item  items-center">
            <span className="flex items-center leading-4 w-full">{ hours_value +' '+ variant +' - '+ drType}</span>
            <div className="text-right">
              <span className="text-white text-opacity-60 ml-4">£{ full }</span>
            </div>
          </div>
        </div>
        {/* { (data && data.step3 && data.step3.fast_track_theory || data && data.step3 && data.step3.fast_track_practical)  ? (
          <div>
          <div className="mt-5 theory-test">
          <h4 className="text-white text-opacity-50 font-bold uppercase text-[13px] tracking-wide">
            Tests
          </h4>
          {data && data.step3 && data.step3.fast_track_theory ? (
            <div className="mt-2 w-full font-semibold flex">
            <span className="w-full">Theory Test</span>
            <div className="text-right">
              <span className="text-white text-opacity-60 ml-4">£{data.step3.fast_track_theory}</span>
            </div>
            </div>
          ) : ''}
          {data && data.step3 && data.step3.fast_track_practical ? (
            <div className="mt-2 w-full font-semibold flex">
            <span className="w-full">Practical Test</span>
            <div className="text-right">
              <span className="text-white text-opacity-60 ml-4">£{data.step3.fast_track_practical}</span>
            </div>
            </div>
          ) : ''}
          </div>
          </div>
        ) : ''} */}

        {(data && data.step6 && data.step6.pass_protect) ? (
        <div className="mt-5">
        <h4 className="text-white text-opacity-50 font-bold uppercase text-[13px] tracking-wide">
          Add-ons
        </h4>
        <div className="mt-2 w-full font-semibold flex">
        <span className="w-full">Pass Protect</span>
        <div className="text-right">
          <span className="text-white text-opacity-60 ml-4">£{data.step6.pass_protect}</span>
        </div>
        </div>
        </div>
        ) : '' }

        <hr className="md:mt-10 mt-5" />
          <div className="md:pt-4 pt-0 flex justify-between items-center text-white">
          <h4 className="font-bold uppercase text-[13px] tracking-wide">
            Total
          </h4>
          <div>
            <span className="font-semibold">£{total}</span>
          </div>
          </div>


      </div>

      
      ) : (
        
        // empty card html
        <div className="h-full w-full md:p-4  flex items-center justify-center md:flex-col flex-row text-center md:gap-0 gap-8">
        <div className="flex items-center gap-6 justify-center md:flex-col flex-row text-center">
          <div className="rounded-full bg-white bg-opacity-10 md:p-8 p-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              width={40}
              height={40}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <p className="font-semibold text-sm leading-4	md:mt-4 mt-0">Your cart is empty</p>
          <p className="text-sm text-white text-opacity-70 md:mt-4 mt-0">
            Start by selecting your course to see it in your cart.
          </p>
        </div>
      </div>
      


      )
      
    }







    </motion.div>
  );
}
