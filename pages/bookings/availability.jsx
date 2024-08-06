import { React, useState, useEffect } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('@/app/components/sidebar/sidebar'), { ssr: false })
import Footnote from '@/app/components/Footnote';
import Formnav from '@/app/components/Formnav';
import OldUserLoader from "@/pages/bookings/OldUserLoader";
import { motion } from "framer-motion";
import Head from 'next/head';
import { autoLogin } from '@/app/service/mailService';
import axios from 'axios';
// let formdata = Cookies.get('formData');
// const data = formdata ? JSON.parse(formdata) : { auto_manual: '' };
const validationSchema = Yup.object().shape({
intensiveCourse: Yup.string()
.required('Please choose either one of the intensity')
});
const availablity = () => {
    const [info, setInfo] = useState();
    let formdata;
    if (typeof localStorage !== 'undefined') {
      formdata = JSON.parse(localStorage.getItem("formData"));
    }
    else {
      formdata = '';
    }
    useEffect(() => {
        if (formdata == null) {
            router.replace('/bookings');
        }
      setInfo(formdata)
    }, [])
    function enableLoader(){
        setLoader(true);
      }

const router = useRouter();
const [isHintOpen_1, setHintOpen_1] = useState(false)
const [changedData, setChangedData] = useState(formdata);
const [isLoader, setLoader] = useState();
const [valid, setValid] = useState();
const step5 = formdata ? formdata.step5 : {};

const variants = {
open: { opacity: 1, height: 'auto', position: 'relative', 'z-index': 1  },
closed: { opacity: 0, height: 0, position: 'relative', 'z-index': -1 },
}

function enableLoader(){
    setLoader(valid);
 }

 const handlePaymentSuccess = async (paymentMethod) => {
    
    const userData = {
      fname: changedData.step4.firstName,
      lname: changedData.step4.surname,
      postalcode: changedData.step1.postal_code,
      email: changedData.step4.email,
      password: changedData.step4.password,
      phone: changedData.step4.phone_number
    };
      try {
        const find = await axios.get(`/api/user/find/?email=${userData.email}`);
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

  };

return (
<div>
<Head>
        <title>Availability</title>
      </Head>
    <Formik
    initialValues={ step5 ? step5 : {
    intensiveCourse: '',
    }}
    validationSchema={validationSchema}
    onSubmit={async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    const formDatas = {
    ...formdata,
    ...{'step5': values}
    };
    localStorage.setItem("formData", JSON.stringify(formDatas));
    console.log("availability",formDatas)
    // ADDITION CODE START
    if(changedData.step2.dr_course_type == "regular" || changedData.step2.dr_course_type == "crash"){
        console.log("inside if condition of regular and crash")
        const userData = {
      fname: changedData.step4.firstName,
      lname: changedData.step4.surname,
      postalcode: changedData.step1.postal_code,
      email: changedData.step4.email,
      password: changedData.step4.password,
      phone: changedData.step4.phone_number
    };
      try {
        const find = await axios.get(`/api/user/find/?email=${userData.email}`);
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
          //step6: changedData.step6,
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
    //   ADDITION CODE END
        router.push('/bookings/thanks/');
    }
    else{
        router.push('/bookings/summary/');
        console.log('step 2 data',changedData.step2)
    }
    }}
    >
    {formikProps => (
    <Form>

    {setValid(formikProps.dirty)}

        <Formnav />
        <div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top  md:px-5 px-4 md:py-8 py-3">
            <div className='w-full lg:max-w-[750px] md:pb-24 pb-5'>
                <div className="mt-[10px] items-top md:py-8 py-5">
<div className="w-full lg:max-w-[750px]">
    <div className="w-full mb-5 pr-4">
        <div className="flex justify-between items-center mb-5 gap-x-5">
        <h1 className="md:text-[21px] text-[20px] leading-snug font-semibold">How fast do you want your course?</h1>
            <div className="cursor-pointer" onClick={(e) => setHintOpen_1(isHintOpen_1 => !isHintOpen_1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" 
                        y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            </div>
        </div>
    </div>

    <motion.div
      animate={isHintOpen_1 ? "open" : "closed"}
      variants={variants}
      transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
      className="overflow-y-hidden"
      >
        <div className="mb-8 p-5 bg-white w-full rounded-lg border-2 border-secondary">
            <p className="text-secondary leading-snug text-opacity-70 font-regular text-[15px] ">
                Course intensity is how fast you want to learn. You can do an intensive course with several lessons in a week, or take things 
                slower and spread your lessons over a longer time. If you would like an intensive course, you’ll need to have good availability
                during the day for lessons.
            </p>
        </div>
    </motion.div>

    <div className="mb-10">
        <div>            
            <div className="">
                <Field type="radio" name="intensiveCourse" className="sr-only intensive" id="intensive" value="Intensive" />
                <label htmlFor="intensive" className="w-full flex items-center text-left py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer
                    outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-indigo-400  
                    transition-all mb-5">
                    <div className="pr-5 false">
                        <svg width="24" height="24" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.362 4.214C14.0869 4.98477 15.495 6.32406 16.3512 8.00814C17.2074 9.69222 17.4599 11.6191 17.0663 13.4669C16.6728 15.3147 15.6571 16.9715 14.189 18.1606C12.7209 19.3496 10.8892 19.9989 9 20C7.38401 19.9999 5.80363 19.5253 4.45502 18.6349C3.10642 17.7446 2.04898 16.4778 1.41398 14.9918C0.778983 13.5058 0.59438 11.8661 0.88309 10.2761C1.1718 8.68608 1.92111 7.21589 3.038 6.048C3.80766 7.12273 4.82326 7.99775 6 8.6C6.02061 7.27863 6.33252 5.97808 6.91348 4.79109C7.49444 3.6041 8.33015 2.55992 9.361 1.733C10.1477 2.78819 11.1767 3.63876 12.361 4.213L12.362 4.214Z" fill="#FFB800" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M9 17C9.95138 16.9996 10.8671 16.6377 11.5616 15.9875C12.2561 15.3372 12.6775 14.4473 12.7404 13.498C12.8033 12.5488 12.5031 11.611 11.9005 10.8748C11.2979 10.1386 10.438 9.65894 9.495 9.533C8.46257 10.4568 7.78229 11.71 7.57 13.079C6.79967 12.8905 6.07458 12.5506 5.437 12.079C5.25185 12.6423 5.20291 13.2414 5.29418 13.8273C5.38545 14.4131 5.61434 14.969 5.96206 15.4492C6.30978 15.9295 6.76642 16.3204 7.29451 16.59C7.8226 16.8596 8.40708 17.0001 9 17V17Z" fill="#F15937" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </div>
                    <div className="">
                        <span className="w-full">Intensive</span>
                        <div className="text-secondary text-opacity-[0.65] text-sm false">
                            <p className="text-secondary leading-snug text-opacity-70 font-medium 
                                text-[15px] mt-2">The fastest way to pass! One example of an intensive course is four 3-hour lessons a week, so you could expect to 
                                complete a 10-hour course in a week, and one of our longest courses in around a month.
                            </p>
                        </div>
                    </div>
                </label>
        </div>
    <div className=" ">
        <Field type="radio" name="intensiveCourse" className="sr-only intensive" id="semi_intensive" value="Semi Intensive" />
        <label htmlFor="semi_intensive" className="w-full flex items-center text-left  bg-pmfGray py-4 px-5 rounded-lg border font-semibold text-secondary 
            cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 hover:bg-pmfLightGreen 
            hover:bg-opacity-50 transition-all mb-5">
            <div className="flex items-center">
                <div className="pr-5 false">
                    <svg width="24" height="24" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 12.5L11.25 1.25L9 9.5H17.25L6.75 20.75L9 12.5H0.75Z" fill="#ADFF00" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>
                <div className="">
                    <span className="w-full">Semi-Intensive</span>
                    <div className="text-secondary text-opacity-[0.65] text-sm false">
                        <p className="text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">The best of both worlds.
                            Fast shouldn't mean inflexible, so we invented the semi-intensive driving course.
                            An example of a semi-intensive course is having two or three 2-hour lessons a week.
                        </p>
                    </div>
                </div>
            </div>
        </label>
</div>
    <div className="">
        <Field type="radio" name="intensiveCourse" className="sr-only intensive" id="relaxed" value="Relaxed" />
        <label htmlFor="relaxed" className="w-full flex items-center text-left  bg-pmfGray py-4 px-5 rounded-lg border font-semibold text-secondary 
            cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 
            hover:bg-pmfLightGreen hover:bg-opacity-50 transition-all mb-5 ">
            <div className="flex items-center">
                <div className="pr-5 false">
                    <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8.75L17.259 7.715C17.4073 7.12147 17.7142 6.57941 18.1468 6.14681C18.5794 5.71421 19.1215 5.40733 19.715 5.259L20.75 5L19.715 4.741C19.1215 4.59267 18.5794 4.28579 18.1468 3.85319C17.7142 3.42059 17.4073 2.87854 17.259 2.285L17 1.25L16.741 2.285C16.5927 2.87841 16.286 3.42038 15.8536 3.85297C15.4212 4.28556 14.8794 4.59251 14.286 4.741L13.25 5L14.286 5.259C14.8794 5.40749 15.4212 5.71444 15.8536 6.14703C16.286 6.57962 16.5927 7.12159 16.741 7.715L17 8.75Z" fill="#DCA4FF" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 17.75L8.813 14.904L8.814 14.903C9.02413 14.1679 9.4181 13.4984 9.95874 12.9577C10.4994 12.4171 11.1689 12.0231 11.904 11.813L14.75 11L11.903 10.186C11.1679 9.97587 10.4984 9.5819 9.95774 9.04126C9.4171 8.50062 9.02313 7.83114 8.813 7.096L8 4.25L7.186 7.097C6.97587 7.83214 6.5819 8.50162 6.04126 9.04226C5.50062 9.5829 4.83114 9.97687 4.096 10.187L1.25 11L4.097 11.814C4.83214 12.0241 5.50162 12.4181 6.04226 12.9587C6.5829 13.4994 6.97687 14.1689 7.187 14.904L8 17.75Z" fill="#7B66FF" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M15.894 19.567L15.5 20.75L15.106 19.567C14.9955 19.2356 14.8094 18.9345 14.5625 18.6875C14.3155 18.4406 14.0144 18.2545 13.683 18.144L12.5 17.75L13.683 17.356C14.0144 17.2455 14.3155 17.0594 14.5625 16.8125C14.8094 16.5655 14.9955 16.2644 15.106 15.933L15.5 14.75L15.894 15.933C16.0045 16.2644 16.1906 16.5655 16.4375 16.8125C16.6845 17.0594 16.9856 17.2455 17.317 17.356L18.5 17.75L17.317 18.144C16.9856 18.2545 16.6845 18.4406 16.4375 18.6875C16.1906 18.9345 16.0045 19.2356 15.894 19.567Z" fill="#EBCAFF" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>
                <div className="">
                    <span className="w-full">Relaxed</span>
                    <div className="text-secondary text-opacity-[0.65] text-sm false">
                        <p className="text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
                            Have a more laidback outlook on life? This course structure will take you a little longer to pass than our intensive 
                            structures, but you get to set the pace. An example of a relaxed course would be one or two 2-hour lessons a week.
                        </p>
                    </div>
                </div>
            </div>
        </label>
    </div>
    <div className="mt-3">
            <ErrorMessage
                name="intensiveCourse"
                component="p"
                className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
            />
    </div>
    <div>
    </div>
</div>
</div>
</div>
</div>
    <div className="block items-center justify-content-center">
        <button type="submit" onClick={enableLoader} className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600">
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
}
export default availablity;