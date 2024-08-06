import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Sidebar from "@/app/components/sidebar/sidebar";
// import { Formik, Field, Form, ErrorMessage } from "formik";
import {autoLogin} from "@/app/service/mailService"
import Footnote from "@/app/components/Footnote";
import Formnav from "@/app/components/Formnav";
import Amex from "@/public/assets/amex.f54f9bb1.svg";
import Mastercard from "@/public/assets/mastercard.a1764ac8.svg";
import Visa from "@/public/assets/visa.7c2bf868.svg";
import Apple from "@/public/assets/apple_pay.svg";
import Googlepay from "@/public/assets/google_pay.svg";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from 'js-cookie';
import dynamic from "next/dynamic";
import axios from "axios";
import OldUserLoader from "@/pages/bookings/OldUserLoader";
import Head from "next/head";
const Sidebar = dynamic(() => import('@/app/components/sidebar/sidebar'), { ssr: false })
const PaymentForm = dynamic(() => import("@/app/components/PaymentForm"), {ssr: false});
const stripePromise = loadStripe("pk_test_51BYFp0JBAYr3SMoYxRwJkPOjM091MERYVeeaKGHriY9ZfHWHb6PfOpbtMV0E6xgfUhcDz3Wibgiezwd1SQSWwJuc00OoJDJuM5")
const Payment = ({ info }) => {
  const router = useRouter();
  const [changedData, setChangedData] = useState();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoader, setLoader] = useState(false);

  let formdata;
    if (typeof localStorage !== 'undefined') {
      formdata = JSON.parse(localStorage.getItem("formData"));
    }
    else {
      formdata = '';
    }
  
  useEffect(() => {
    if (info == null) {
      router.replace('/bookings');
    }
      setChangedData(formdata);
    },
    [info]
  );

  // useEffect(() => {
  //     handleRadioChange(isChecked);
  //     setChangedData();
  //   },
  //   []
  // );
  
  let drType;
  let course_name;
  let coursePriceObj;
  let hours_value;
  let variant;
  let full;
  let deposit;
  let total;
  let fast_track_theory;
  let fast_track_practical;
  let pass_protect;
  let remaining;
  let addon;

  if (
    changedData &&
    changedData.step2 &&
    changedData.step2.dr_course_price != undefined
  ) {
    drType = capitalize(changedData.step2.dr_type);
    course_name = changedData.step2.dr_course_type;
    coursePriceObj =
      changedData.step2.dr_course_price[
        Object.keys(changedData.step2.dr_course_price)[0]
      ];
    hours_value = coursePriceObj.value;
    variant = coursePriceObj.variant;
    full = parseInt(coursePriceObj.full);
    deposit = parseInt(coursePriceObj.deposit);
  }

  fast_track_theory =
    changedData &&
    changedData.step3 &&
    changedData.step3.fast_track_theory != ""
      ? parseInt(changedData.step3.fast_track_theory)
      : 0;
  fast_track_practical =
    changedData &&
    changedData.step3 &&
    changedData.step3.fast_track_practical != ""
      ? parseInt(changedData.step3.fast_track_practical)
      : 0;
  pass_protect =
    changedData && changedData.step6 && changedData.step6.pass_protect != ""
      ? parseInt(changedData.step6.pass_protect)
      : 0;
  // subTotal = ((deposit) ? deposit : full)

  total = full;
  deposit = deposit;
  remaining = full - deposit;

  // addon = fast_track_theory + fast_track_practical;

  // let checkFull = document.getElementbyId('full');

  // const handleRadioChange = (e) => {
  //   setIsChecked(!isChecked);
  //   //setChangedData();
  //   //console.log(changedData);
  // };


  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handlePaymentSuccess = async (paymentMethod) => {
    
    const login = {
      email: changedData.step4.email,
      password: changedData.step4.password
    }
    const userData = {
      fname: changedData.step4.firstName,
      lname: changedData.step4.surname,
      postalcode: changedData.step1.postal_code,
      email: changedData.step4.email,
      password: changedData.step4.password,
      phone: changedData.step4.phone_number
    };
      try {
        
        // console.log(userData)
        const find = await axios.get(`/api/user/find/?email=${userData.email}`);
        // console.log(find.data)
        let user
        if(find.data.success)
        {
          user = find.data.user
        }
        else
        {
          const userresponse = await axios.post("/api/user/post", userData);
          user = await userresponse.data
        }
        const leadData = await {
          user: user._id,
          step1: changedData.step1,
          step2: changedData.step2,
          step3: changedData.step3,
          step4: changedData.step4,
          step5: changedData.step5,
          step6: changedData.step6,
          stripe: paymentMethod
        }
        const leadresponse = await axios.post("/api/leads/post", leadData);
        const lead = await leadresponse.data
        // console.log('leadData', lead);
        await axios.post("/api/api_mailer", { formdata: lead });
        const token = autoLogin(user)
        if(token)
        {
          Cookies.set("token", token);
        }
      } catch (error) {
        console.error(error);
        console.log("Error");
      }
    router.push("/bookings/thankyou");
  };
 

  const setStepSeven = e => {
    let amount;
    if (e.target.value == "Full") {
      amount = total;
    } else {
      amount = deposit;
    }
    const step6 = { step6: { payment: e.target.value, amount: amount } };
    const formDatas = {
      ...changedData,
      ...step6
    };

    localStorage.setItem("formData", JSON.stringify(formDatas));
    setChangedData(formDatas);
    setSelectedPayment(e.target.value);
    // console.log(changedData)
  };



  return (
    <div>
    <Head>
        <title>Payment options</title>
      </Head>
      <Formnav />
      {/* {typeof formdata ? <OldUserLoader /> : null} */}
      <div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top md:px-7 px-5 py-8">
        <div className="w-full lg:max-w-[750px] md:pb-24 pb-5 flex flex-wrap justify-center">
          <h2 className="w-full md:text-2xl text-xl font-bold md:mb-10 mb-16 text-center">
            Secure Payment Options for Your Driving Course
          </h2>
          <div className="md:w-1/2 w-full md:pe-3 pe-0">
            <input
              type="radio"
              name="payment"
              className="sr-only payment"
              id="deposit"
              value="Deposit"
              onChange={e => {
                setStepSeven(e);
              }}
            />
            <label
              htmlFor="deposit"
              className="w-full flex items-center text-left py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer
                    outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-indigo-400  
                    transition-all mb-5"
            >
              <div className="">
                <span className="w-full font-bold">
                  Pay Deposit - £{deposit} {addon? '+ £'+ addon : ''}
                  {/* {addon? <span class="font-medium text-[15px]"> (addon)</span> : ''} */}
                </span>
                <div className="text-secondary text-opacity-[0.65] text-sm false">
                  <p className="text-secondary leading-snug text-opacity-70 font-medium 
                                text-[15px] mt-2">
                    Securely pay a deposit by credit or debit card, covering the cost of all selected tests. The remaining £{remaining} is not due until we have arranged your course.
                  </p>
                </div>
              </div>
            </label>
          </div>

          <div className="md:w-1/2 w-full md:ps-3 ps-0">
            <input
              type="radio"
              name="payment"
              className="sr-only payment"
              id="full"
              value="Full"
              onChange={e => {
                setStepSeven(e);
              }}              
            />
            <label
              htmlFor="full"
              className="w-full flex items-center text-left py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer
                    outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-indigo-400  
                    transition-all mb-5"
            >
              <div className="">
                <span className="w-full font-bold">
                  Pay Full - £{full} {addon? '+ £'+ addon : ''}
                  {/* {addon? <span class="font-medium text-[15px]"> (addon)</span> : ''} */}
                </span>
               
                <div className="text-secondary text-opacity-[0.65] text-sm false">
                  <p className="text-secondary leading-snug text-opacity-70 font-medium 
                                text-[15px] mt-2">
                    Concentrate on the driving and forget about the finance side
                    of things by paying the full course balance securely by
                    credit or debit card today.
                  </p>
                </div>
              </div>
            </label>
          </div>

          {selectedPayment === "Deposit" || selectedPayment === "Full" ? (
            
          <div className="mt-[10px] items-top py-8 w-full">
            <div className="w-full lg:max-w-[750px]">
              <div className="w-full mb-5 md:pr-4 pr-0">
                <h1 className="text-[24px] font-semibold">Payment Details</h1>
                <p className="mb-4 font-regular text-stone-500   text-[16px] mt-2">
                  Secure your course today! We accept all major credit and debit
                  cards, including American Express.
                </p>
                <div className="flex items-center mb-4 justify-between space-x-2">
                  <div className="flex space-x-2 items-center">
                    <div className="w-12 transition-all duration-300 opacity-100">
                      <Image
                        alt="AMEX Brand Logo"
                        loading="lazy"
                        width="100"
                        height="100"
                        decoding="async"
                        data-nimg="1"
                        src={Amex}
                      />
                    </div>
                    <div className="w-12 transition-all duration-300 opacity-100">
                      <Image
                        alt="Master Card Logo"
                        loading="lazy"
                        width="100"
                        height="100"
                        decoding="async"
                        data-nimg="1"
                        src={Mastercard}
                      />
                    </div>
                    <div className="w-12 transition-all duration-300 opacity-100">
                      <Image
                        alt="Visa Brand Logo"
                        loading="lazy"
                        width="100"
                        height="100"
                        decoding="async"
                        data-nimg="1"
                        src={Visa}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <div className="w-12">
                      <Image
                        alt="Apple Pay"
                        loading="lazy"
                        width="100"
                        height="100"
                        decoding="async"
                        data-nimg="1"
                        src={Apple}
                      />
                    </div>
                    <div className="w-12">
                      <Image
                        alt="Apple Pay"
                        loading="lazy"
                        width="100"
                        height="100"
                        decoding="async"
                        data-nimg="1"
                        src={Googlepay}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {/* <button className="w-full text-secondary bg-[#17B745]
hover:bg-[#17B745] focus:bg-[#17B745] flex border relative items-center justify-center px-4 false opacity-100 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all">
<span className="flex items-center">Pay £840</span>
</button> */}
                </div>
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    onSuccess={handlePaymentSuccess}
                    data={changedData}
                    isLoader={isLoader}
                    setLoader={setLoader}
                  />
                </Elements>
              </div>
            </div>
          </div>

          ) : null
          }

          {/* <div className="block items-center justify-content-center">
<button type="submit" className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600">
<span className="flex items-center justify-center">
Pay £840
<span className="ml-4">
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M5 12h13M12 5l7 7-7 7"></path>
</svg>
</span>
</span>
</button>
</div> */}
        </div>
        <Sidebar data={changedData} />
      </div>
      <Footnote />
      {console.log("ISloader",isLoader)}
      {isLoader && <OldUserLoader />}
    </div>
  );
};

let formdata;
if (typeof localStorage !== "undefined") {
  formdata = JSON.parse(localStorage.getItem("formData"));
} else {
  formdata = "";
}

const PaymentPage = () => {
  return <Payment info={formdata} />;
};

export default PaymentPage;