import { useState } from "react";
import { motion } from "framer-motion";

export default function ThreeBoxes() {
  const [openState, setOpenState] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false,
    button6: false,
  });

  const toggleFAQ = (buttonId) => {
    setOpenState((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId],
    }));
    //console.log(buttonId);
  };
  
  const variants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
    
  }
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mx-auto w-full lg:px-0 px-4 lg:max-w-[48%] md:pb-20 pb-5">
      <div className="md:mt-6 mt-0 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* <button
          onClick={() => toggleFAQ("button1")}
          className="w-full flex items-center text-left bg-pmfGray py-4 px-5 rounded-lg font-semibold text-secondary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 bg-gray-200 hover:bg-gray-300 hover:bg-opacity-50 transition-all font-semibold w-full bg-opacity-30 border-transparent px-0 cursor-pointer hover:bg-opacity-50 hover:bg-slate-200 group"
          id="toggleButton1"
        >
          <div className="p-3 mx-3 bg-gray-200 opacity-1 transition-all rounded-xl">
          <svg className="w-8 h-8 text-black-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
</svg>

          </div>
          <div className="mx-4 mt-2">
            <p>100% Money Back Guarantee</p>           
              <motion.p
                className="overflow-y-hidden text-secondary leading-snug text-opacity-70 font-normal text-[15px] mt-2"
                id="detail-paragraph"
                animate={openState["button1"] ? "open" : "closed"}
                variants={variants}
                transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
                >
                We're certain that we can help you pass fast. You'll get all
                your money back if we can't fast-track your test within 30 days
                of booking or connect you with an instructor in time for your
                course.
              </motion.p>  
          </div>
        </button> */}
        <button
        onClick={() => toggleFAQ("button2")}
          className="w-full flex items-center text-left bg-pmfGray py-4 px-5 rounded-lg  font-semibold text-secondary
     cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1
      hover:bg-pmfLightGreen bg-gray-200 hover:bg-opacity-50 transition-all font-semibold w-full bg-opacity-30 border-transparent
      px-0 cursor-pointer bg-gray-200 hover:bg-gray-300 hover:bg-opacity-50 group "
        >
          <div className="p-3 mx-3 bg-gray-200  opacity-1 transition-all rounded-xl">
          <svg className="w-8 h-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.6 7.6L12 15.2l-3.6-3.6M8 12h8"/>
</svg>

{" "}
          </div>
          <div className="mx-4 mt-2">
            <p>Learn from the best</p>
              {/* <motion.p
              className="overflow-y-hidden text-secondary leading-snug text-opacity-70 font-normal text-[15px] mt-2"
              id="detail-paragraph"
              animate={openState["button2"] ? "open" : "closed"}
              variants={variants}
              transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
            >
                We're certain that we can help you pass fast. You'll get all
                your money back if we can't fast-track your test within 30 days
                of booking or connect you with an instructor in time for your
                course.
              </motion.p> */}
          </div>
        </button>
        <button
          onClick={() => toggleFAQ("button3")}
          className="w-full flex items-center text-left bg-pmfGray py-4 px-5 rounded-lg  font-semibold text-secondary
     cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1
      hover:bg-pmfLightGreen bg-gray-200 hover:bg-opacity-50 transition-all font-semibold w-full bg-opacity-30 border-transparent
      px-0 cursor-pointer hover:bg-gray-300 hover:bg-opacity-50 group "
        >
          <div className="p-3 mx-3 bg-gray-200  opacity-1 transition-all rounded-xl">
<svg className="w-8 h-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM12 2v4m0 16v-4m6-10h-4m-2 0H8m2 0v6h8v-6z"/>
</svg>

{" "}
          </div>
          <div className="mx-4 mt-2">
            <p>Deposit Option</p>
              {/* <motion.p
                className="overflow-y-hidden text-secondary leading-snug text-opacity-70 font-normal text-[15px] mt-2"
                id="detail-paragraph"
                animate={openState["button3"] ? "open" : "closed"}
                variants={variants}
                transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
              >
                  We're certain that we can help you pass fast. You'll get all
                  your money back if we can't fast-track your test within 30 days
                  of booking or connect you with an instructor in time for your
                  course.
                </motion.p> */}
          </div>
        </button>
        {/* <button
          onClick={() => toggleFAQ("button4")}
          className="w-full flex items-center text-left bg-pmfGray py-4 px-5 rounded-lg  font-semibold text-secondary
     cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1
      hover:bg-pmfLightGreen bg-gray-200 hover:bg-opacity-50 transition-all font-semibold w-full bg-opacity-30 border-transparent
      px-0 cursor-pointer hover:bg-gray-300 hover:bg-opacity-50 group "
        >
          <div className="p-3 mx-3 bg-gray-200  opacity-1 transition-all rounded-xl">
<svg className="w-8 h-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm-1 9H8v3H7v2h3v-2H9v-3zm6 0h-2v3h-1v2h3v-2h-1v-3z"/>
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-1v-2l-4 1v2zM13 19l4 1v-2l-4-1v2z"/>
</svg>


         {" "}
          </div>
          <div className="mx-4 mt-2">
            <p>Not your average driving course</p>
              <motion.p
                className="overflow-y-hidden text-secondary leading-snug text-opacity-70 font-normal text-[15px] mt-2"
                id="detail-paragraph"
                animate={openState["button4"] ? "open" : "closed"}
                variants={variants}
                transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
              >
                  We're certain that we can help you pass fast. You'll get all
                  your money back if we can't fast-track your test within 30 days
                  of booking or connect you with an instructor in time for your
                  course.
                </motion.p>
          </div>
        </button> */}
        <button
          onClick={() => toggleFAQ("button5")}
          className="w-full flex items-center text-left bg-pmfGray py-4 px-5 rounded-lg font-semibold text-secondary
     cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1
      hover:bg-pmfLightGreen bg-gray-200 hover:bg-opacity-50 transition-all font-semibold w-full bg-opacity-30 border-transparent
      px-0 cursor-pointer hover:bg-gray-300 hover:bg-opacity-50 group "
        >
          <div className="p-3 mx-3 bg-gray-200  opacity-1 transition-all rounded-xl">
          <svg className="w-8 h-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 1h16c1.104 0 2 .896 2 2v18c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V3c0-1.104.896-2 2-2zm7 16v2m0 0v2m0-2h3m-3 0h3m-4-3v6"/>
</svg>
   {" "}
          </div>
          <div className="mx-4">
            <p>Flexible payment options</p>
              {/* <motion.p
                className="overflow-y-hidden text-secondary leading-snug text-opacity-70 font-normal text-[15px] mt-2"
                id="detail-paragraph"
                animate={openState["button5"] ? "open" : "closed"}
                variants={variants}
                transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
              >
                  We're certain that we can help you pass fast. You'll get all
                  your money back if we can't fast-track your test within 30 days
                  of booking or connect you with an instructor in time for your
                  course.
                </motion.p> */}
          </div>
        </button>
        <button
          onClick={() => toggleFAQ("button6")}
          className="w-full flex items-center text-left bg-pmfGray py-4 px-5 rounded-lg  font-semibold text-secondary
     cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1
      hover:bg-pmfLightGreen bg-gray-200 hover:bg-opacity-50 transition-all font-semibold w-full bg-opacity-30 border-transparent
      px-0 cursor-pointer hover:bg-gray-300 hover:bg-opacity-50 group "
        >
          <div className="p-3 mx-3 bg-gray-200  opacity-1 transition-all rounded-xl">
          <svg className="w-8 h-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <circle cx="12" cy="12" r="10" strokeWidth="2" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
</svg>


          
          {" "}
          </div>
          <div className="mx-4">
            <p>Support at every step </p>
              {/* <motion.p
                className="overflow-y-hidden text-secondary leading-snug text-opacity-70 font-normal text-[15px] mt-2"
                id="detail-paragraph"
                animate={openState["button6"] ? "open" : "closed"}
                variants={variants}
                transition= {{ delay: 0, duration: 0.3, ease: "easeInOut" }}
              >
                  We're certain that we can help you pass fast. You'll get all
                  your money back if we can't fast-track your test within 30 days
                  of booking or connect you with an instructor in time for your
                  course.
                </motion.p> */}
          </div>
        </button>
      </div>
    </div>
  );
}
