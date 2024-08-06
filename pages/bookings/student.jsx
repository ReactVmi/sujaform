import { useEffect } from "react";
import * as Yup from "yup";
import { object, string, ref } from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/app/components/sidebar/sidebar"), {
  ssr: false
});
import Footnote from "@/app/components/Footnote";
import Formnav from "@/app/components/Formnav";
import OldUserLoader from "@/pages/bookings/OldUserLoader";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputMask } from "primereact/inputmask";
import Head from "next/head";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { FaClock } from 'react-icons/fa';
import Link from "next/link";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};
const isValidPhoneNumber = (phoneNumber) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "GB");
  return parsedPhoneNumber ? parsedPhoneNumber.isValid() : false;
};

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required("Phone number is required")
    .test("phone-number", "Invalid UK phone number", (value) =>
      isValidPhoneNumber(value)
    ),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
    terms2: Yup.boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
  title: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  surname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirm_password: Yup.string()
    .required("Please re-type your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  addressLineOne: Yup.string().required("Address is required"),
  // county: Yup.string().required("county is required"),
  mondayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  mondayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  tuesdayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  tuesdayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  wednesdayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  wednesdayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  thursdayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  thursdayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  fridayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  fridayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  saturdayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  saturdayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  sundayStartTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  sundayEndTime: Yup.string().test(
    "valid-time",
    "select time 08:00 and 20:00.",
    (value) => !value || (value >= "08:00" && value <= "20:00")
  ),
  postal_code: Yup.string().required("Postal code is required"),
  // Add a boolean field for single day selection for each day
  monday: Yup.boolean(),
  tuesday: Yup.boolean(),
  wednesday: Yup.boolean(),
  thursday: Yup.boolean(),
  friday: Yup.boolean(),
  saturday: Yup.boolean(),
  sunday: Yup.boolean()
});

const student = () => {

  const [toogle, setToogle] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  });
  const [value, setValue] = useState();
  const [info, setInfo] = useState();
  const [isLoader, setLoader] = useState();
  const [valid, setValid] = useState();
  const [clientSide, setClientSide] = useState(false)
  let formdata;

  if (typeof localStorage !== "undefined") {
    formdata = JSON.parse(localStorage.getItem("formData"));
  } else {
    formdata = "";
  }
  useEffect(() => {
    if (formdata == null) {
      router.replace("/bookings");
    }
    setInfo(formdata);
    const initialToggle = {
      Monday:
        formdata?.step4?.mondayStartTime && formdata?.step4?.mondayEndTime,
      Tuesday:
        formdata?.step4?.tuesdayStartTime && formdata?.step4?.tuesdayEndTime,
      Wednesday:
        formdata?.step4?.wednesdayStartTime &&
        formdata?.step4?.wednesdayEndTime,
      Thursday:
        formdata?.step4?.thursdayStartTime && formdata?.step4?.thursdayEndTime,
      Friday:
        formdata?.step4?.fridayStartTime && formdata?.step4?.fridayEndTime,
      Saturday:
        formdata?.step4?.saturdayStartTime && formdata?.step4?.saturdayEndTime,
      Sunday: 
      formdata?.step4?.sundayStartTime && formdata?.step4?.sundayEndTime 
    };
    setToogle(initialToggle);
    setClientSide(true)
  }, []);


  

  const router = useRouter();
  const [changedData, setChangedData] = useState(formdata);
  const [firstStepPostalCode, setFirstStepPostalCode] = useState();
  const step4 = formdata.step4 ? formdata.step4 : {};
  // console.log("formdata.step1.postal_code",formdata);

  useEffect(()=>{
    step4.postal_code=formdata.step1.postal_code;
    setFirstStepPostalCode(step4.postal_code=formdata.step1.postal_code);
    // console.log("inside useeefect",firstStepPostalCode);
  },[])

  


  const checkAndSetLoader = (valid) => {
    const hasRequiredKeys =
      valid &&
      valid?.title &&
      valid?.surname &&
      valid?.firstName &&
      valid?.email &&
      valid?.password &&
      valid?.confirm_password &&
      valid?.phone_number &&
      valid?.addressLineOne &&
      valid?.terms == true;
    const loader = hasRequiredKeys ? true : false;
    return loader;
  };

  const enableLoader = ({ formikProps }) => {
    if (formikProps?.isValid) {
      setLoader(true);
    } else {
      // Handle invalid form case here
      //   console.log("Form is invalid, cannot proceed.");
    }
  };
  const [apiAddress, setApiAddress] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchAddressSuggestions = async (postal_code) => {
    try {
      const response = await axios.get(
        `https://api.getaddress.io/autocomplete/${postal_code}?api-key=_UFb05P76EyMidU1VHIQ_A42976`
        // `https://api.getAddress.io/get/{id}?api-key=_UFb05P76EyMidU1VHIQ_A42976`
      );
      setApiAddress(response.data.suggestions.slice(0, 10));

      setShowSuggestions(true);
      
    } catch (e) {
      console.log(e);
    }
  };
  const fetchDetailedAddress = async (id, setFieldValue) => {
    try {
      console.log(`Fetching details for ID: ${id}`); // Log the ID
      const response = await axios.get(
        `https://api.getAddress.io/get/${id}?api-key=_UFb05P76EyMidU1VHIQ_A42976`
      );
      const detailedAddress = response.data;

      // Log the detailed address response
      console.log("Detailed Address Response:", detailedAddress);
      setFieldValue("postal_code", detailedAddress.postcode);
      setFieldValue("addressLineOne", detailedAddress.line_1);
      setFieldValue("addressLineTwo",detailedAddress.line_2)
      setFieldValue("county", detailedAddress.county);
      setFieldValue("city", detailedAddress.town_or_city);
    } catch (e) {
      console.error("Error fetching detailed address:", e);
    }
  };

  const handlepostal_codeChange = async (e) => {
    const postal_code = e.target.value;
    setFieldValue("postal_code", postal_code);

    // Check if postal code matches step one postal code
    if (postal_code === formdata?.step1?.postal_code) {
      await fetchAddressSuggestions(postal_code);
    } else {
      setApiAddress([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Personal Details</title>
      </Head>
      <Formik
        initialValues={
          step4
            ? step4
            : {
                title: "",
                firstName: "",
                surname: "",
                email: "",
                password: "",
                confirm_password: "",
                phone_number: "",
                addressLineOne: "",
                addressLineTwo: "",
                county: "",
                city: "",
                postal_code: "",
                terms: false,
                terms2:false,
                mondayStartTime: "",
                mondayEndTime: "",
                tuesdayStartTime: "",
                tuesdayEndTime: "",
                wednesdayStartTime: "",
                wednesdayEndTime: "",
                thursdayStartTime: "",
                thursdayEndTime: "",
                fridayStartTime: "",
                fridayEndTime: "",
                saturdayStartTime: "",
                saturdayEndTime: "",
                sundayStartTime: "",
                sundayEndTime: ""
              }
        }
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log("inside",values)
          const formDatas = {
            ...formdata,
            ...{ step4: values }
          };
          formDatas.step1.postal_code = formDatas.step4.postal_code;
          localStorage.setItem("formData", JSON.stringify(formDatas));
          router.push("/bookings/availability");
        }}
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => (
          <Form>
            { useEffect(() => {
            setValid(values);
            {/* console.log('Current values',values) */}
          }, [values])}
            <Formnav />

            <div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top md:px-7 px-5 md:py-8 py-5">
              <div className="w-full lg:max-w-[750px] md:pb-24 pb-5">
                <div className="mt-[10px] items-top md:py-5 py-3">
                  <div className="w-full lg:max-w-[750px]">
                    <div className="w-full mb-5 pr-4">
                      <h1 className="md:text-[26px] text-[24px] text-neutral-950 font-bold">
                        Let's get to know each other
                      </h1>
                      <p className="text-current font-regular text-[17px] mt-2">
                        We've helped over 50,000 people get on the road - fast.
                        We could get you passed in as little as 4 months!
                      </p>
                    </div>
                    <div className=" w-full">
                      <label className='uppercase text-xs tracking-wide font-bold text-opacity-70 text-dust "text-opacity-70" '>
                        Title
                      </label>
                      <div className="mt-2">
                        <div className="grid grid-cols-4 gap-3">
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_1"
                              value="Mr"
                            />
                            <label
                              htmlFor="title_1"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Mr.</span>
                            </label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_2"
                              value="Mrs"
                            />
                            <label
                              htmlFor="title_2"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Mrs</span>
                            </label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_3"
                              value="Miss"
                            />
                            <label
                              htmlFor="title_3"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Miss</span>
                            </label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_4"
                              value="Mx"
                            />
                            <label
                              htmlFor="title_4"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Mx</span>
                            </label>
                          </div>
                        </div>
                        <ErrorMessage
                          name="title"
                          component="p"
                          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-sm  tracking-wide font-medium text-gray-800"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="text"
                            name="firstName"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset  transition-all "
                            id="firstName"
                            autoComplete="given-name"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-sm tracking-wide font-medium text-gray-800"
                        htmlFor="surname"
                      >
                        Last Name
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="text"
                            name="surname"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust 
                                        placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-1 transition-all "
                            id="surname"
                          />
                          <ErrorMessage
                            name="surname"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="email"
                            name="email"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 
                                        px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
                                        transition-all "
                            id="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="phone_number"
                      >
                        Contact number
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          {/* <Field type="text" name="phone_number" className="w-full rounded-md font-semibold text-base 
                    placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none 
                    focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all " id="phone_number"  /> */}
                          <InputMask
                            name="phone_number"
                            className="w-full rounded-md font-semibold text-base 
                    placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none 
                    focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all "
                            id="phone_number"
                            value={values.phone_number}
                            mask="+99 99 9999 9999"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="phone_number"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="password"
                            name="password"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 
                        px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
                        transition-all "
                            id="p"
                          />
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="confirm_password"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="password"
                            name="confirm_password"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 
            px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
            transition-all "
                            id="p"
                          />
                          <ErrorMessage
                            name="confirm_password"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* FULL ADDRESS WITH POSTAL CODE */}
                    <div className="mt-5 w-full flex justify-start gap-5">
                      {/* POSTAL CODE */}
                      <div className="w-full">
                        <label
                          className="uppercase text-sm tracking-wide font-medium text-gray-800"
                          htmlFor="postal_code"
                        >
                          Postal Code
                        </label>
                        <div className="mt-1">
                          <div className="relative w-full">
                            <Field
                              type="text"
                              name="postal_code"
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                              id="postal_code"
                              autoComplete="given-name"
                              onBlur={handleBlur}
                              value={values.postal_code}
                              onChange={async (e) => {
                                handleChange(e);
                                
                                await fetchAddressSuggestions(e.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="postal_code"
                              component="p"
                              className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                            />
                            {showSuggestions && (
                              <div className="absolute z-10 bg-white border border-gray-300 mt-2 w-full rounded-md shadow-lg">
                                {apiAddress.map((suggestion) => (
                                  <div
                                    key={suggestion.id}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={async () => {
                                      await fetchDetailedAddress(
                                        suggestion.id,
                                        setFieldValue
                                      );
                                      setShowSuggestions(false);
                                    }}
                                  >
                                    {suggestion.address}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* FULL ADDRESS FIELD WITH LINE ONE AND LINE TWO */}
                    <div className="mt-5 w-full flex justify-start gap-5">
                       <div className="w-1/2">
                        <label
                          className="uppercase text-sm tracking-wide font-medium text-gray-800"
                          htmlFor="addressLineOne"
                        >
                          Address line One
                        </label>
                        <div className="mt-1">
                          <div className="relative w-full">
                            <Field
                              type="text"
                              name="addressLineOne"
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                              id="addressLineOne"
                              autoComplete="given-name"
                              value={values.addressLineOne}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="addressLineOne"
                              component="p"
                              className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-1/2">
                        <label
                          className="uppercase text-sm tracking-wide font-medium text-gray-800"
                          htmlFor="addressLineTwo"
                        >
                          Address Line Two
                        </label>
                        <div className="mt-1">
                          <div className="relative w-full">
                            <Field
                              type="text"
                              name="addressLineTwo"
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                              id="addressLineTwo"
                              autoComplete="given-name"
                              value={values.addressLineTwo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FULL ADDRESS COMING API COUNTY AND CITY */}
                    <div className="mt-5 w-full flex justify-start gap-5">
                      {/* COUNTY FIELD */}
                      {clientSide && values.county && values.county.length > 0 && (
                      <div className="w-full">
                        <label
                          className="uppercase text-sm tracking-wide font-medium text-gray-800"
                          htmlFor="county"
                        >
                          County
                        </label>
                        <div className="mt-1">
                          <div className="relative w-full">
                            <Field
                              id="county"
                              name="county"
                              type="text"
                              value={values.county}
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                            />
                            <ErrorMessage
                              name="county"
                              component="p"
                              className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                      {/* CITY FIELD */}
                      <div className="w-full">
                        <label
                          className="uppercase text-sm tracking-wide font-medium text-gray-800"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <div className="mt-1">
                          <div className="relative w-full">
                            <Field
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                              id="city"
                              name="city"
                              type="text"
                              value={values.city}
                            />
                            <ErrorMessage
                              name="city"
                              component="p"
                              className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar */}
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="calendar"
                      >
                        Select Availability (Monday to Sunday)
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday"
                          ].map((day, index) => (
                            <div
                              className="flex items-center align-middle py-2 md:h-[60px] lg:md:h-[60px] xl:md:h-[60px] xl-max:md:h-[60px] md:flex-row lg:flex-row flex-row md:text-start lg:text-start xl:text-start text-center mb-5"
                              key={index}
                            >
                              <div className="md:first:w-[130px] lg:first:w-[130px] xl:first:w-[74px]">
                                <h3 className="uppercase text-sm tracking-wide font-medium text-gray-800">
                                  {day}
                                </h3>
                              </div>
                              <div className="mt-0 pt-0 md:w-[100px] lg:w-[100px] xl:w-[100px] text-center">
                                <Switch
                                  className="border-red-500"
                                  checked={toogle[day]}
                                  color="secondary"
                                  value={toogle[day]}
                                  onClick={() => {
                                    const newToggle = {
                                      ...toogle,
                                      [day]: !toogle[day]
                                    };
                                    setToogle(newToggle);
                                    if (!newToggle[day]) {
                                      setFieldValue(
                                        `${day.toLowerCase()}StartTime`,
                                        ""
                                      );
                                      setFieldValue(
                                        `${day.toLowerCase()}EndTime`,
                                        ""
                                      );
                                    }
                                    console.log("Toggle", newToggle);
                                  }}
                                />
                              </div>

                              {toogle[day] && (
                                <div className="overflow-hidden flex md:w-[calc(100%-230px)] lg:w-[calc(100%-230px)] xl:w-[calc(100%-230px)] md:gap-0 lg:gap-0 xl:gap-0 gap-2 relative py-4">
                                  <div className="flex flex-col w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 relative pb-2 items-center">
                                    <Field
                                      type="time"
                                      min="08:00"
                                      max="20:00"
                                      id={`${day.toLowerCase()}StartTime`}
                                      name={`${day.toLowerCase()}StartTime`}
                                      value={
                                        values[`${day.toLowerCase()}StartTime`]
                                      }
                                      className="md:py-3 lg:py-3 xl:py-3 rounded-2xl text-sm py-2 my-4 relative md:ps-8 md:pe-12 lg:ps-8 lg:pe-12 px-2"
                                      onChange={handleChange}
                                    />
                                    <FaClock className="absolute right-[30px] top-[39px] transform -translate-y-1/2 text-[#D31E32] md:block lg:block xl:block hidden" />
                                    <ErrorMessage
                                      name={`${day.toLowerCase()}StartTime`}
                                      component="p"
                                      className="text-red-500 text-[12px] absolute bottom-0"
                                    />
                                  </div>
                                  <div className="flex flex-col w-10 text-sm text-center justify-center">
                                    To
                                  </div>
                                  <div className="flex flex-col w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 relative pb-2 items-center">
                                    <Field
                                      type="time"
                                      min="08:00"
                                      max="20:00"
                                      id={`${day.toLowerCase()}EndTime`}
                                      name={`${day.toLowerCase()}EndTime`}
                                      value={
                                        values[`${day.toLowerCase()}EndTime`]
                                      }
                                      className="md:py-3 lg:py-3 xl:py-3 rounded-2xl text-sm py-2 my-4 relative md:ps-8 md:pe-12 lg:ps-8 lg:pe-12 px-2"
                                      onChange={handleChange}
                                    />
                                    <FaClock className="absolute right-[30px] top-[39px] transform -translate-y-1/2 text-[#D31E32] md:block lg:block xl:block hidden" />
                                    <ErrorMessage
                                      name={`${day.toLowerCase()}EndTime`}
                                      component="p"
                                      className="text-red-500 text-[12px] absolute bottom-0"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          <ErrorMessage
                            name="calendar"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Checkone */}
                    <div className="mt-5 w-full">
                      <div>
                        <Field
                          type="checkbox"
                          className="sr-only"
                          name="terms"
                          id="terms"
                          onChange={() => setFieldValue("terms", !values.terms)}
                        />

                        <label
                          htmlFor="terms"
                          className=" flex items-center cursor-pointer group"
                        >
                          <div className="rounded-full transition-all flex w-10 h-10 items-center justify-center mr-4 border-2 border-primaryOutline bg-primary">
                            <span className={`${values.terms ? "" : "hidden"}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          </div>
                          <div className="font-semibold w-[calc(100%-40px)] text-[15px]">
                            Are you happy for us to contact you with more info
                            about learning to drive?
                          </div>
                        </label>
                        <ErrorMessage
                          name="terms"
                          component="p"
                          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                        />
                      </div>
                    </div>
                    {/* Checktwo */}
                    <div className="mt-5 w-full">
                      <div>
                        <Field
                          type="checkbox"
                          className="sr-only"
                          name="terms2"
                          id="terms2"
                          onChange={() => setFieldValue("terms2", !values.terms2)}
                        />

                        <label
                          htmlFor="terms2"
                          className=" flex items-center  group"
                        >
                          <div className="rounded-full transition-all flex w-10 h-10 items-center justify-center mr-4 border-2 border-primaryOutline bg-primary">
                            <span className={`${values.terms2 ? "" : "hidden"}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          </div>
                          <div className="font-semibold w-[calc(100%-40px)] text-[15px]">
                          I accept 
                           <Link href={'https://wordpress-664586-3395085.cloudwaysapps.com/terms-and-conditions/'} target="blank" className="cursor-pointer text-blue-600 px-2">
                           Terms & Conditions
                           </Link>
                            
                            and 
                            
                            <Link href={'https://sujadrivingschool.co.uk/wp-content/uploads/2024/05/Privacy-Policy.pdf'} target="blank" className="cursor-pointer text-blue-600 px-2">
                            Privacy Policy
                           </Link>
                            
                          </div>
                        </label>
                        <ErrorMessage
                          name="terms2"
                          component="p"
                          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Continue Button */}
                <div className="block items-center justify-content-center">
                  <button
                    type="submit"
                    onClick={enableLoader}
                    className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600"
                  >
                    <span className="flex items-center justify-center">
                      Continue
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
                          <path d="M5 12h13M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </span>
                  </button>
                  <p className="block w-full italic">
                    Personal data is processed in compliance with UK GDPR and
                    only for the purposes outlined in our Privacy Notice. No
                    personal data is ever sold to third parties.
                  </p>
                </div>
              </div>
              <Sidebar
              data={
               (changedData.step2?.dr_course_type == "speedster" || changedData.step2?.dr_course_type == "guaranteed_pass")
                  ? changedData
                  : {}
              }
            />
            </div>
          </Form>
        )}
      </Formik>
      <Footnote />
      {isLoader && <OldUserLoader />}
    </div>
  );
};
export default student;
