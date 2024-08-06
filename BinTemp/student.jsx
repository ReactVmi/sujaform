//4th STEP
import { React, useState } from "react";
import Link from "next/link";

const Student = () => {
  const [Toggle, setToggle] = useState(false);

  return (
    <div className="space-y-12 mx-auto max-w-5xl p-10 pb-0">
      <label className='uppercase text-xs tracking-wide font-bold text-opacity-70 text-dust "text-opacity-70" '>
        Title
      </label>
      <div className="w-full mb-5 pr-4">
        <h1 className=" text-[21px] leading-snug font-semibold">
          Let's get to know each other
        </h1>
        <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">
          <span>
            We've helped over 50,000 people get on the road - <i>fast</i>. We
            could get you passed in as little as 4 months!
          </span>
        </p>
      </div>
      <div className="mt-1">
        <div className="grid grid-cols-4 gap-3">
          <button className=" w-full bg-pmfGray  bg- flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all">
            <span className="flex items-center">Mr</span>
          </button>
          <button className=" w-full bg-pmfGray  bg- flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all">
            <span className="flex items-center">Mrs</span>
          </button>
          <button className=" w-full bg-pmfGray  bg- flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all">
            <span className="flex items-center">Miss</span>
          </button>
          <button className=" w-full bg-pmfGray  bg- flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all">
            <span className="flex items-center">Mx</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
