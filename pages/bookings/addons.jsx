import { React, useState, useEffect } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
//import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('@/app/components/sidebar/sidebar'), { ssr: false })
import Footnote from '@/app/components/Footnote';
import Formnav from '@/app/components/Formnav';
import { test } from '@/database/models/drivingCoursesData';
import Amex from '@/public/assets/amex.f54f9bb1.svg';
import Mastercard from '@/public/assets/mastercard.a1764ac8.svg';
import Visa from '@/public/assets/visa.7c2bf868.svg';
import Apple from '@/public/assets/apple_pay.svg';
import Googlepay from '@/public/assets/google_pay.svg';
import Image from "next/image";
// stripe integration
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '@/app/components/PaymentForm';
// stripe integration

// let formdata = Cookies.get('formData');
// const data = formdata ? JSON.parse(formdata) : { auto_manual: '' };

const validationSchema = Yup.object().shape({
  // auto_manual: Yup.string()
  //   .required("Auto Manual is required")
});


const addons = () => {
  const [info, setInfo] = useState();
    let formdata;
    if (typeof localStorage !== 'undefined') {
      formdata = JSON.parse(localStorage.getItem("formData"));
    }
    else {
      formdata = '';
    }
    useEffect(() => {
      setInfo(formdata)
    }, [])
  const router = useRouter();
  const [changedData, setChangedData] = useState(formdata);
  const [checkboxValue, setCheckboxValue] = useState(test);
  const step6 = formdata.step6
  // console.log(changedData)

  return (
    <div>
      <Formik
        initialValues={{ pass_protect: (step6 && step6.pass_protect != '') ? true : false }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          const passProtect = values.pass_protect ? checkboxValue.pass_protect : '';
          // const fieldNames = Object.keys(values);
          const formDatas = {
            ...formdata,
            step6: {
              'pass_protect': passProtect,
            },
          };
          // const formDatas = {
          // ...formdata,
          // ...{'step6': values}
          // };
          // console.log(formDatas)
          localStorage.setItem("formData", JSON.stringify(formDatas));
          router.push('/bookings/summary/');
        }}
      >
        {({ handleChange, setFieldValue, values }) => (
          <Form>
        <Formnav />
<div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top px-7 py-8">
 <div className='w-full lg:max-w-[750px] pb-24'>  
 <div className="mt-[10px] items-top py-16">
  <div className="w-full lg:max-w-[750px]">
    <div className="w-full mb-5 pr-4">
      <h1 className="text-[24px] text-black font-bold pb-5"> Give yourself the best chance at success! </h1>
     
        <div>
        <Field 
        type="checkbox" 
        name="pass_protect" 
        className="sr-only fast_track  flex items-center text-left  ring-2 ring-primary ring-offset-1 bg-slate-300 py-4 px-5 rounded-lg border font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1  transition-all mb-5"
        id="pass_protect" 
        onChange={(e) => {
          handleChange(e);
          setChangedData((changedData) => {
            // console.log(values)
            return {
              ...changedData,
              step6: {
                ...changedData.step6,
                pass_protect: e.target.checked ? checkboxValue.pass_protect : '',
              },
            };
          });
        }}
        // onChange={() => setFieldValue('pass_protect', !values.pass_protect)}
        />
        <label htmlFor="pass_protect" 
        className="border cursor-pointer flex focus-visible:ring-2 font-semibold hover:bg-opacity-50 hover:bg-pmfLightGreen
        items-center outline-none pl-5 pr-3.5 rounded-lg text-left text-secondary transition-all w-full">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center p-5">
                <div className="">
                  <span className="w-full text-xl text-gray-900 font-bold">
                    PassProtect
                  </span>
                  <div className="text-secondary text-opacity-[0.65] text-sm false">
                    <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-3">
                      At just £150, PassProtect gives you two extra fast-tracked
                      practical tests for the price of one. PassProtect is the
                      simpler, cheaper alternative to “guaranteed pass” courses.
                      Nearly 9/10 of people pass their driving test within 3
                      attempts — if at first you don’t succeed, you can try and
                      try again with PassProtect.
                    </p>
            <div className="flex justify-between items-center mt-5">
      <div>
        <div className="mt-1 text-white bg-gray-900 text-sm w-max py-1 px-3 font-semibold rounded-full add_remove_label">
          
        </div>
      </div>
        <p className="text-lg text-gray-700">£150</p>
      </div>
    </div>
    </div>
    </div>
    </div>
  </label>
  </div>
    
</div>
</div>
</div>



<div className="block items-center justify-content-center">
<button type="submit" className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600">
<span className="flex items-center justify-center">Continue<span className="ml-4"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"></path></svg></span></span>
</button>

</div>
</div> 
<Sidebar data={changedData} />
</div>            
  </Form>
        )}
  </Formik>
  <Footnote />
    </div>
  );
}
export default addons;


