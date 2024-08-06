import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Cookies from "js-cookie";


// const stripePromise = loadStripe("pk_test_51BYFp0JBAYr3SMoYxRwJkPOjM091MERYVeeaKGHriY9ZfHWHb6PfOpbtMV0E6xgfUhcDz3Wibgiezwd1SQSWwJuc00OoJDJuM5");

const PaymentForm = ({ onSuccess, data, isLoader, setLoader }) => {


  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [productName, setProductName] = useState("Product Name");
  const [productPrice, setProductPrice] = useState();
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(
    () => {
      let drType;
      let course_name;
      let coursePriceObj;
      let hours_value;
      let variant;
      let payment;

      if (data && data.step2 && data.step2.dr_course_price != undefined) {
        drType = capitalize(data.step2.dr_type);
        course_name = data.step2.dr_course_type;
        coursePriceObj =
          data.step2.dr_course_price[
            Object.keys(data.step2.dr_course_price)[0]
          ];
        hours_value = coursePriceObj.value;
        variant = coursePriceObj.variant;
      }
      if (data && data.step6 && data.step6.payment != undefined) {
        payment = data.step6.payment;
      }
      setProductPrice(
        data && data.step6 && data.step6.amount ? data.step6.amount : 0
      );
      setProductName(
        hours_value + " " + variant + " - " + drType + " - " + payment
      );
    },
    [data]
  );
  //console.log('payment page', data)

  const cardElementOptions = {
    style: {
      base: {
        color: "#303238",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#ccc"
        }
      },
      invalid: {
        color: "#e5424d"
      }
    },
    classes: {
      base:
        "w-full rounded-md px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none font-semibold text-base",
      complete:
        "w-full rounded-md px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none font-semibold text-base",
      empty:
        "w-full rounded-md px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none font-semibold text-base",
      focus:
        "w-full rounded-md px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none font-semibold text-base",
      invalid:
        "w-full rounded-md px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none font-semibold text-base"
    }
  };

  const formDataFromLocalStorage = localStorage.getItem("formData");
  const parseFormData = JSON.parse(formDataFromLocalStorage);
  const parseFromDataFullname =
    parseFormData.step4.firstName + " " + parseFormData.step4.surname;
  const parseFromDataEmail = parseFormData.step4.email;
  const parseFromDataPhone = parseFormData.step4.phone_number;
  const parseAddressLineOne = `${parseFormData.step4.addressLineOne}`;
  const parseFromDataCity = parseFormData.step4.city;
  console.log("Parse Data: ", parseFormData.step4.city);



  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city: parseFromDataCity,
            country: "GB",
            line1: parseAddressLineOne
          },
          email: parseFromDataEmail,
          name: parseFromDataFullname,
          phone: parseFromDataPhone,
          
        },
        metadata: {
          product: JSON.stringify({
            name: productName,
            price: productPrice,
            description: "Hello world" 
          })
        }
      });
      if (error) {
        setPaymentError(error.message);
      } else {
        setLoader(true);
        // Charge the payment using the paymentMethod.id
        const response = await axios.post("/api/payment", {
          paymentMethodId: paymentMethod.id,
          amount: productPrice * 100,
        });

        console.log("Front End Response",response);
        if (response.data.status == "succeeded") {
          const paymentConfirmation = await response.data;
          console.log("Payment Confirmation:", paymentConfirmation);
          onSuccess(paymentConfirmation);
          // Handle the payment confirmation as needed
        } else {
          throw new Error("Payment failed. Please try again.");
        }
      }
    } catch (error) {
      setPaymentError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-2 font-medium text-[15px] mt-2">Card Number</p>
      <div className="w-full rounded-md text-dust bg-white outline-none font-semibold text-base">
        <div className="">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>

      <div className="flex mt-2 mb-5">
        <div className="w-1/2">
          <p className="mb-2 font-medium text-[15px] mt-2">Expiry Date</p>
          <div className="w-full rounded-md text-dust bg-white outline-none font-semibold text-base">
            <div className="">
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-6">
          <p className="mb-2 text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
            CVC
          </p>
          <div className="w-full rounded-md text-dust bg-white outline-none font-semibold text-base">
            <div className="">
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="block items-center justify-content-center mt-5">
        {paymentError &&
          <p className="mb-4" style={{ color: "red" }}>
            {paymentError}
          </p>}
        <button
          type="submit"
          disabled={!stripe}
          className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600"
        >
          <span className="flex items-center justify-center">
            Pay £{productPrice}
            <span className="ml-4">
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
          </span>
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
