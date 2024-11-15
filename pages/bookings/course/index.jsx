
import { React, useState, useEffect } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
// import Sidebar from '@/app/components/sidebar/sidebar';
const Sidebar = dynamic(() => import('@/app/components/sidebar/sidebar'), { ssr: false })
import Footnote from '@/app/components/Footnote';
import Formnav from '@/app/components/Formnav';
import { motion } from "framer-motion";
import {auto, manual} from '@/database/models/drivingCoursesData';
// let formdata = Cookies.get('formData');
// const data = formdata ? JSON.parse(formdata) : {  };
import OldUserLoader from "@/pages/bookings/OldUserLoader";
import { Redirect } from 'react-router-dom';
import Head from 'next/head';


const index = () => {
   const router = useRouter();

   let formdata;
   if (typeof localStorage !== 'undefined') {
      formdata = JSON.parse(localStorage.getItem("formData"));
   }
   else{
      formdata = '';
   }
   const validationSchema = Yup.object().shape({
      dr_type: Yup.string().required('Field is required'),
      dr_course_type: Yup.string().required('Field is required'),
      // dr_course_price: Yup.object().shape({
      //    // Define the structure of the object fields
      //    dr_course_type: Yup.string().required('Amount is required'),
      //    dr_type: Yup.string().required('Currency is required'),
      //  }).required('dr_course_price is required'),
   });
   


const [isOpen, setIsOpen] = useState(false)
const [isHintOpen_1, setHintOpen_1] = useState(false)
const [isHintOpen_2, setHintOpen_2] = useState(false)
const [isCourseOpen, setCourseOpen] = useState(false)
const [driving, setDriving] = useState(manual)
const [course, setCourse] = useState(driving.regular)
const [changedData, setChangedData] = useState(formdata);
const [isLoader, setLoader] = useState(false);
const [valid, setValid] = useState();
const [info,setInfo] = useState();

const checkAndSetLoader = (changedData) => {
   const step2 = changedData.step2
   const hasRequiredKeys =
   step2 &&
   step2?.dr_type &&
   step2?.dr_course_type &&
   step2?.dr_course_price;

   const loader = hasRequiredKeys ? true : false; 
   return loader;
 };


useEffect(() => {
   if (formdata == null) {
      router.replace('/bookings');
    }
   setInfo(formdata)
 },[])
const step2 = (formdata) ? formdata.step2 : '';


const variants = {
open: { opacity: 1, height: 'auto', position: 'relative', 'z-index': 1  },
closed: { opacity: 0, height: 0, position: 'relative', 'z-index': -1 },
}

const getDrType = (e) => {

   let targetVal = e
   if(targetVal == 'manual'){
      setDriving(manual)
   }
   else{
      setDriving(auto)
   }
   Array.from(document.getElementsByClassName('dr_course_type')).forEach(checkbox => checkbox.checked = false);
   if(isCourseOpen == true){
      setCourseOpen(isCourseOpen => !isCourseOpen)
   }
 }

function showCoursePricing(event){
   let targetVal = event
   Array.from(document.getElementsByClassName('dr_course_price')).forEach(checkbox => checkbox.checked = false);
   setCourse(driving[targetVal])
   setCourseOpen(isCourseOpen => true)
}

const courseOptions = Object.keys(course.course).map((key) => ({
   id: `dr_dcp_type_${key}`,
   name: 'dr_course_price',
   value: JSON.stringify({ [key]: course.course[key] }),
   variant: course.course[key].variant,
   desc:course.course[key].desc,
   full: course.course[key].full,
   hour: course.course[key].value
 }));


 function enableLoader(){
   setLoader(checkAndSetLoader(changedData));
}



return (
<div>
<Head>
        <title>Course Details</title>
      </Head>
<Formik
initialValues={
   step2
     ? {
         ...step2,
         dr_course_price: JSON.stringify(step2.dr_course_price || {}),
       }
     : { dr_type: '', dr_course_type: '', dr_course_price: {} }
 }
   enableReinitialize={false}
   validationSchema={validationSchema}
   onSubmit={async (values) => {
   await new Promise(r => setTimeout(r, 500));

   const step2 = {
      'step2': {
      ...values,
      dr_course_price: JSON.parse(values.dr_course_price)
      }
    };
    const formDatas = {
      ...formdata,
      ...step2
    };
   // Cookies.set("formData", JSON.stringify(formDatas), { expires: 30 });
   localStorage.setItem("formData", JSON.stringify(formDatas));
   router.push("/bookings/course/tests/");
   }
   
}
   
>
{({ dirty, handleChange, values }) => (

<Form>
{setValid(dirty)}


{values.dr_type.length > 0 && (
   setIsOpen(isOpen => true),
   getDrType(values.dr_type) 
)}
{values.dr_course_type.length > 0 && (
showCoursePricing(values.dr_course_type)
)}

   <Formnav />
   
   <div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top md:px-7 px-0 md:py-8 py-7">
   
   <div className='w-full lg:max-w-[750px] md:pb-24 pb-5'>
   
   <div className="md:mt-[80px] mt-[50] items-top md:px-7 px-5 md:py-7 py-5">
   <div className='my-6'><h1 className=" md:text-[21px] text-[20] leading-snug font-semibold">Select type of course:
</h1></div>
      <div className="w-full lg:max-w-[750px] lg:pb-24 pb-10">
         <div className="grid grid-cols-2 gap-4">
            <div>
               <Field
                  type='radio'
                  className='sr-only dr_type'
                  name="dr_type"
                  id="manual"
                  value="manual"
                  checked={values.dr_type === 'manual'}
                  onChange={(e) => {
                     handleChange(e);
                     // setChangedData((changedData) => {
                     //   return {
                     //     ...changedData,
                     //     'step2':{
                     //       [e.target.name]: e.target.value,
                     //    }
                     //   };
                     // });
                     setChangedData((changedData) => {
                        const { name, value } = e.target;                      
                        return {
                          ...changedData,
                          step2: {
                            ...changedData.step2,
                            [name]: value,
                          },
                        };
                      });
                      
                      
                   }}
               
               />
               <label htmlFor="manual" className="w-full flex items-center text-left  bg-emerald-100	py-4 md:px-5 px-3 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                  <div className=" w-full flex justify-between items-center">
                     <div className="flex items-center">
                        <div className="pr-5 false">
                           <svg
                              width={19}
                              height={19}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 />
                              <path
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 />
                              <path
                                 d="M16.5 16.5V8.5L12 13.18L7.5 8.5V16.5"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 />
                           </svg>
                        </div>
                        <div className="">
                           <div className=" false">Manual</div>
                        </div>
                     </div>
                  </div>
               </label>
            </div>
            <div>
               <Field
                  type='radio'
                  className='sr-only dr_type'
                  name="dr_type"
                  id="automatic"
                  value="automatic"
                  onChange={(e) => {
                     handleChange(e);
                     setChangedData((changedData) => {
                        const { name, value } = e.target;                      
                        return {
                          ...changedData,
                          step2: {
                            ...changedData.step2,
                            [name]: value,
                          },
                        };
                      });
                   }}
               />
               <label htmlFor="automatic" className="w-full flex items-center text-left bg-emerald-100 ring-primary ring-offset-1 bg-pmfGray py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                  <div className=" w-full flex justify-between items-center">
                     <div className="flex items-center">
                        <div className="pr-5 false">
                           <svg
                              width={19}
                              height={19}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 />
                              <path
                                 d="M17.4593 16.7279L12.0003 7.2719L6.5403 16.7279"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 />
                              <path
                                 d="M8.3145 13.4275H15.6855"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 />
                           </svg>
                        </div>
                        <div className="">
                           <div className=" false">Automatic</div>
                        </div>
                     </div>
                  </div>
               </label>
            </div>
            <ErrorMessage
            name="dr_type"
            component="div"
            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
         />
         </div>
         
      </div>

      <motion.section
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}        
        >
      <div className="flex justify-between items-center gap-x-5">
      <h1 className=" md:text-[21px] text-[20] leading-snug font-semibold">How many hours would you like to complete on a weekly basis? </h1>
         <div className="cursor-pointer" onClick={(e) => setHintOpen_1(isHintOpen_1 => !isHintOpen_1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="12" cy="12" r="10"></circle>
               <line x1="12" y1="16" x2="12" y2="12"></line>
               <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
         </div>
      </div>

      <motion.div
      animate={isHintOpen_1 ? "open" : "closed"}
      variants={variants}
      transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
      >
      <div className="pt-7">
      <div className="p-5 bg-white w-full rounded-lg border-2 border-secondary">
        <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] ">
            The DVSA recommends around 45 hours of professional driving lessons and 22 hours of private practice before your practical driving test.
        </p>
      </div>
      </div>
      </motion.div>

      
      <div className="mb-10 mt-7" id="CourseBox">
      {/* Regular Course */}
         <div className='mb-3'>            
            <Field
                  type='radio'
                  className='sr-only dr_course_type'
                  name="dr_course_type"
                  id="dr_rc_type"
                  value="regular"
                  onChange={(e) => {
                     handleChange(e);
                     setChangedData((changedData) => {
                        const { name, value } = e.target;
                        delete changedData.step2.dr_course_price;
                        return {
                          ...changedData,
                          step2: {
                            ...changedData.step2,
                            [name]: value,
                          },
                        };
                      });
                   }}
               />
               <label htmlFor="dr_rc_type" className="w-full flex items-center text-left  bg-emerald-100	py-4 md:px-5 px-3 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                  <div className=" w-full flex justify-between items-center">
                     <div className="flex items-center">
                        <div className="pr-5 false">
                           <svg
                              width={24}
                              height={24}
                              viewBox="0 0 18 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path
                                 d="M0.75 12.5L11.25 1.25L9 9.5H17.25L6.75 20.75L9 12.5H0.75Z"
                                 fill="#ADFF00"
                                 stroke="black"
                                 strokeWidth="1.5"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 />
                           </svg>
                        </div>
                        <div className=" md:text-sm text-[14px]">
                           <div className=" false">2-4 hours per week  </div>
                        </div>
                     </div>
                     <div className="pl-7 w-auto">
                        <div className="bg-lime-300 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                           Regular Course
                        </div>
                     </div>
                  </div>
               </label>
         </div>
           {/* Crash Course */}
         <div className='mb-3'>            
            <Field
                  type='radio'
                  className='sr-only dr_course_type'
                  name="dr_course_type"
                  id="dr_sc_type"
                  value="crash"
                  onChange={(e) => {
                     handleChange(e);
                     setChangedData((changedData) => {
                        const { name, value } = e.target;
                        delete changedData.step2.dr_course_price;
                        return {
                          ...changedData,
                          step2: {
                            ...changedData.step2,
                            [name]: value,
                          },
                        };
                      });
                   }}
               />
               <label htmlFor="dr_sc_type" className="w-full flex items-center text-left  bg-emerald-100	py-4 md:px-5 px-3 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                  <div className=" w-full flex justify-between items-center">
                     <div className="flex items-center">
                        <div className="pr-5 false">
                           <svg
                              width={24}
                              height={24}
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path
                                 d="M17 8.75L17.259 7.715C17.4073 7.12147 17.7142 6.57941 18.1468 6.14681C18.5794 5.71421 19.1215 5.40733 19.715 5.259L20.75 5L19.715 4.741C19.1215 4.59267 18.5794 4.28579 18.1468 3.85319C17.7142 3.42059 17.4073 2.87854 17.259 2.285L17 1.25L16.741 2.285C16.5927 2.87841 16.286 3.42038 15.8536 3.85297C15.4212 4.28556 14.8794 4.59251 14.286 4.741L13.25 5L14.286 5.259C14.8794 5.40749 15.4212 5.71444 15.8536 6.14703C16.286 6.57962 16.5927 7.12159 16.741 7.715L17 8.75Z"
                                 fill="#DCA4FF"
                                 stroke="black"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 />
                              <path
                                 d="M8 17.75L8.813 14.904L8.814 14.903C9.02413 14.1679 9.4181 13.4984 9.95874 12.9577C10.4994 12.4171 11.1689 12.0231 11.904 11.813L14.75 11L11.903 10.186C11.1679 9.97587 10.4984 9.5819 9.95774 9.04126C9.4171 8.50062 9.02313 7.83114 8.813 7.096L8 4.25L7.186 7.097C6.97587 7.83214 6.5819 8.50162 6.04126 9.04226C5.50062 9.5829 4.83114 9.97687 4.096 10.187L1.25 11L4.097 11.814C4.83214 12.0241 5.50162 12.4181 6.04226 12.9587C6.5829 13.4994 6.97687 14.1689 7.187 14.904L8 17.75Z"
                                 fill="#7B66FF"
                                 stroke="black"
                                 strokeWidth="1.5"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 />
                              <path
                                 d="M15.894 19.567L15.5 20.75L15.106 19.567C14.9955 19.2356 14.8094 18.9345 14.5625 18.6875C14.3155 18.4406 14.0144 18.2545 13.683 18.144L12.5 17.75L13.683 17.356C14.0144 17.2455 14.3155 17.0594 14.5625 16.8125C14.8094 16.5655 14.9955 16.2644 15.106 15.933L15.5 14.75L15.894 15.933C16.0045 16.2644 16.1906 16.5655 16.4375 16.8125C16.6845 17.0594 16.9856 17.2455 17.317 17.356L18.5 17.75L17.317 18.144C16.9856 18.2545 16.6845 18.4406 16.4375 18.6875C16.1906 18.9345 16.0045 19.2356 15.894 19.567Z"
                                 fill="#EBCAFF"
                                 stroke="black"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 />
                           </svg>
                        </div>
                        <div className=" md:text-sm text-[14px]">
                           <div className=" false">Up to 6-8 hours per week</div>
                        </div>
                     </div>
                     <div className="pl-7 w-auto">
                        <div className="bg-red-300 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                           Crash Course
                        </div>
                     </div>
                  </div>
               </label>
         </div>
      {/* Speedster Course */}
         <div className='mb-3'>            
            <Field
                  type='radio'
                  className='sr-only dr_course_type'
                  name="dr_course_type"
                  id="dr_cc_type"
                  value="speedster"
                  onChange={(e) => {
                     handleChange(e);
                     setChangedData((changedData) => {
                        const { name, value } = e.target;
                        delete changedData.step2.dr_course_price;
                        return {
                          ...changedData,
                          step2: {
                            ...changedData.step2,
                            [name]: value,
                          },
                        };
                      });
                   }}
               />
               <label htmlFor="dr_cc_type" className="w-full flex items-center text-left  bg-emerald-100	py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
               <div className=" w-full flex justify-between items-center">
               <div className="flex items-center">
                  <div className="md:pr-5 pr-3 false">
                     <svg
                        width={24}
                        height={24}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           d="M13.182 13.182C12.7641 13.5999 12.2681 13.9313 11.7221 14.1575C11.1761 14.3836 10.591 14.5 10 14.5C9.40905 14.5 8.82388 14.3836 8.27791 14.1575C7.73194 13.9313 7.23586 13.5999 6.818 13.182M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10ZM7.75 7.75C7.75 8.164 7.582 8.5 7.375 8.5C7.168 8.5 7 8.164 7 7.75C7 7.336 7.168 7 7.375 7C7.582 7 7.75 7.336 7.75 7.75ZM7.375 7.75H7.383V7.765H7.375V7.75ZM13 7.75C13 8.164 12.832 8.5 12.625 8.5C12.418 8.5 12.25 8.164 12.25 7.75C12.25 7.336 12.418 7 12.625 7C12.832 7 13 7.336 13 7.75ZM12.625 7.75H12.633V7.765H12.625V7.75Z"
                           fill="#FFC700"
                           />
                        <path
                           d="M13.182 13.182C12.7641 13.5999 12.2681 13.9313 11.7221 14.1575C11.1761 14.3836 10.591 14.5 10 14.5C9.40905 14.5 8.82388 14.3836 8.27791 14.1575C7.73194 13.9313 7.23586 13.5999 6.818 13.182M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10ZM7.75 7.75C7.75 8.164 7.582 8.5 7.375 8.5C7.168 8.5 7 8.164 7 7.75C7 7.336 7.168 7 7.375 7C7.582 7 7.75 7.336 7.75 7.75ZM7.375 7.75H7.383V7.765H7.375V7.75ZM13 7.75C13 8.164 12.832 8.5 12.625 8.5C12.418 8.5 12.25 8.164 12.25 7.75C12.25 7.336 12.418 7 12.625 7C12.832 7 13 7.336 13 7.75ZM12.625 7.75H12.633V7.765H12.625V7.75Z"
                           stroke="black"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           />
                     </svg>
                  </div>
                  <div className=" md:text-sm text-[14px]">
                     <div className=" false">Up to 6 hours per day over 4 consecutive days or over consecutive weekends</div>
                  </div>
               </div>
               <div className="pl-7 w-auto">
                  <div className="bg-amber-200	 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                     Speedster Course
                  </div>
               </div>
            </div>
               </label>
         </div>
    
      {/* Guranteed Course */}
         <div className='mb-3'>            
            <Field
                  type='radio'
                  className='sr-only dr_course_type'
                  name="dr_course_type"
                  id="dr_gpc_type"
                  value="guaranteed_pass"
                  onChange={(e) => {
                     handleChange(e);
                     setChangedData((changedData) => {
                        const { name, value } = e.target;
                        delete changedData.step2.dr_course_price;
                        return {
                          ...changedData,
                          step2: {
                            ...changedData.step2,
                            [name]: value,
                          },
                        };
                      });
                   }}
               />
               <label htmlFor="dr_gpc_type" className="w-full flex items-center text-left  bg-emerald-100 py-4 md:px-5 px-3 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all  ">
                  <div className=" w-full flex justify-between items-center">
                  <div className="flex items-center">
                     <div className="pr-5 false">
                        <svg
                           width={24}
                           height={24}
                           viewBox="0 0 18 21"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           >
                           <path
                              d="M12.362 4.214C14.0869 4.98477 15.495 6.32406 16.3512 8.00814C17.2074 9.69222 17.4599 11.6191 17.0663 13.4669C16.6728 15.3147 15.6571 16.9715 14.189 18.1606C12.7209 19.3496 10.8892 19.9989 9 20C7.38401 19.9999 5.80363 19.5253 4.45502 18.6349C3.10642 17.7446 2.04898 16.4778 1.41398 14.9918C0.778983 13.5058 0.59438 11.8661 0.88309 10.2761C1.1718 8.68608 1.92111 7.21589 3.038 6.048C3.80766 7.12273 4.82326 7.99775 6 8.6C6.02061 7.27863 6.33252 5.97808 6.91348 4.79109C7.49444 3.6041 8.33015 2.55992 9.361 1.733C10.1477 2.78819 11.1767 3.63876 12.361 4.213L12.362 4.214Z"
                              fill="#FFB800"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                           <path
                              d="M9 17C9.95138 16.9996 10.8671 16.6377 11.5616 15.9875C12.2561 15.3372 12.6775 14.4473 12.7404 13.498C12.8033 12.5488 12.5031 11.611 11.9005 10.8748C11.2979 10.1386 10.438 9.65894 9.495 9.533C8.46257 10.4568 7.78229 11.71 7.57 13.079C6.79967 12.8905 6.07458 12.5506 5.437 12.079C5.25185 12.6423 5.20291 13.2414 5.29418 13.8273C5.38545 14.4131 5.61434 14.969 5.96206 15.4492C6.30978 15.9295 6.76642 16.3204 7.29451 16.59C7.8226 16.8596 8.40708 17.0001 9 17V17Z"
                              fill="#F15937"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              />
                        </svg>
                     </div>
                     <div className=" md:text-sm text-[14px]">
                        <div className=" false">Unlimited number of hours until I pass!</div>
                     </div>
                  </div>
                  <div className="pl-7 w-auto">
                     <div className="bg-teal-200 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                        Guaranteed Pass Course
                     </div>
                  </div>
                  </div>
               </label>
         </div>

         <ErrorMessage
            name="dr_course_type"
            component="p"
            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
         />
      </div>
      </motion.section>
      
      <motion.section
        animate={isCourseOpen ? "open" : "closed"}
        variants={variants}
        transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}        
        >
      <div className=" flex justify-between items-center md:mt-16 mt-10 gap-x-5">
         <h1 className=" text-[21px] leading-snug font-semibold">
            { course.name }
         </h1>
        
         <div className="cursor-pointer" onClick={(e) => setHintOpen_2(isHintOpen_2 => !isHintOpen_2)}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width={19}
               height={19}
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth={2}
               strokeLinecap="round"
               strokeLinejoin="round"
               >
               <circle cx={12} cy={12} r={10} />
               <line x1={12} y1={16} x2={12} y2={12} />
               <line x1={12} y1={8} x2="12.01" y2={8} />
            </svg>
         </div>
      </div>
      <motion.div
      animate={isHintOpen_2 ? "open" : "closed"}
      variants={variants}
      transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
      >
      <div className="pt-8">
      <div className="p-5 bg-white w-full rounded-lg border-2 border-secondary">
         <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] " dangerouslySetInnerHTML={{ __html: course.hint }} >
         </p>
      </div>
      </div>
      </motion.div>  
      <div className="mb-10 mt-7">
      <div className={`relative w-full p-2 -z-10 rounded-lg text-center capitalize text-secondary font-semibold mb-4 text-sm ${course.bg_color}`}>
         { course.title }
         <div className="absolute top-[7px] right-4 transition duration-300 hidden">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               width={21}
               height={21}
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
            </svg>
         </div>
      </div>
      <div className="flex justify-center md:space-x-5 space-x-3 course-pricehidebox ">


         {/* /////////////////// */}
         {courseOptions.map((option) => (
          <div key={option.id} className="md:w-1/3 w-1/2">
            <Field
              type="radio"
              className="sr-only dr_course_price"
              name={option.name}
              id={option.id}
              value={option.value}
              onChange={(e) => {
               handleChange(e);
               // setChangedData((changedData) => {
               //    return {
               //       ...changedData,
               //       'step2': {
               //         ...changedData.step2,
               //         'dr_course_price': e.target.value,
               //       },
               //     };
               // });
               setChangedData((changedData) => {
                  const { name, value } = e.target;
                  return {
                    ...changedData,
                    step2: {
                      ...changedData.step2,
                      [name]: JSON.parse(value),
                    },
                  };
                });
             }}
            />
            <label htmlFor={option.id} className="w-full flex items-center text-center bg-gray-100 py-4 
            px-5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 
            focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all h-full">
               <div className="w-full">
                  <p className="font-bold md:text-2xl text-xl">{option.hour}</p>
                  <p className="font-semibold text-xs">{option.variant}</p>
                  <div className="display-block">£{option.full}</div>
                  <div className='text-[12px] font-normal py-2 leading-4 hidden md:block'> <p>{option.desc}</p></div>
               </div>
            </label>          
         </div>
        ))}
        <ErrorMessage
          name="dr_course_price"
          component="p"
          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
         />
         {/* /////////////////// */}

      </div>
      </div>
      </motion.section>

  
            </div>
            <div className="flex items-center justify-content-center">
               <button type="submit" onClick={enableLoader} className="bg-theme-red-color hover:bg-red-900 md:w-full w-96
                hover:text-white mx-4 md:mx-0 rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline
                 focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600">
                  <span className="flex items-center justify-center">
                     Continue
                     <span className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M5 12h13M12 5l7 7-7 7"></path>
                        </svg>
                     </span>
                  </span>
               </button>
            </div>
         </div>
         <Sidebar data={
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
export default index;