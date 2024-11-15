import Layout from "@/app/components/Layout";
import { MdChangeCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "react-modal";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";
import moment from "moment";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaRegTrashAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
const Index = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

 
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [Toggle, setToggle] = useState(false);
  const [viewLead, setViewLead] = useState(null);
  const [SecondToggle, setSecondToggle] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedLead, setSelectedLead] = useState();
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    step1: {
      postal_code: selectedLead?.step1?.postal_code
    },
    step4: {
      title: selectedLead?.step4?.title,
      firstName: selectedLead?.step4?.firstName,
      surname: selectedLead?.step4?.surname,
      phone_number: selectedLead?.step4?.phone_number
    },
    step6: {
      payment: selectedLead?.step6?.payment,
      amount: selectedLead?.step6?.amount
    }
  });

  useEffect(() => {
    const userCall = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get('/api/admin');
        // Access the data directly from the response object
        const userAPI = response.data;
        console.log("All user api....",userAPI);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching user data:', error);
      }
    };

    userCall();
  }, []);


  const handleEdit = async (lead) => {
    setFormData(lead);
    setToggle(true);
  };

  const truncateID = (id, length) => {
    const truncatedID = id.toString().substring(0, length);
    return truncatedID;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/leads/edit?id=${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        handleLeadsData();
        closeModal();
        setFormData(null);
        await toast.success("Lead Updated");
      } else {
        console.error("Error updating lead");
      }
    } catch (error) {
      console.error("Error updating lead", error);
    }
  };

  const handleLeadsData = async () => {
    try {
     
      const response = await fetch("/api/leads/");
      const responseData = await response.json();

      setLoading(true);
      setLeadsData(responseData);
      setTimeout(() => {
        setLoading(false);
        // console.log("default", leadsData);
      }, 1000);
    } catch (error) {
      console.error(error, "Error While Fetching Leads Data In order");
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      // console.log("Page no",page);
      const response = await fetch("/api/leads/loadMore/?page=" + page);
      const responseData = await response.json();
      // console.log("handleLoadMore",responseData);
      setLoad(true);
      setTotal((prev)=>responseData.totalCount);
      // console.log("Total Count",total);
      setLeadsData((prevData) => [...prevData, ...responseData.leads]);
      setLoad(false);
    } catch (error) {
      console.error(error, "Error While Fetching Leads Data In order");
      setLoading(false);
    }
  };

  const handleClickMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDelete = async (leadId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const response = await fetch(`/api/leads/softDelete?leadId=${leadId}`, {
          method: "DELETE"
        });

        if (response.ok) {
          toast.success("Lead deleted successfully!");
          handleLeadsData();
        } else {
          toast.error("Error deleting lead. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error deleting lead", error);
      toast.error("Error deleting lead. Please try again.");
    }
  };

  const closeModal = () => {
    setToggle(false);
    setSecondToggle(false);
  };

  const handleView = (lead) => {
    setViewLead(lead);
    setSecondToggle(true);
  };

  const [orderId, setOrderId] = useState("");
  const [idFilter, setidFilter] = useState([]);

  const handleIdFilterData = async () => {
    try {
      const result = await axios.post("/api/leads/userFilter", { orderId });
      if (result.status === 200) {
        let finalResult = await result.data.filterData;
        // console.log("FINAL", finalResult);
        setLeadsData([finalResult]);
      }
    } catch (error) {
      setLeadsData([]);
      // console.log("Error in handle filter function", error.response.data);
    }
  };

  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState("");

  const handleDateFilter = async () => {
    try {
      const result = await axios.post("/api/leads/userFilter/datePicker", {
        start: startDate,
        end: endDate
      });
      // console.log("result of date", result);
      let finalResult = result.data.msg;
      // finalResult = finalResult.json();
      setLeadsData(finalResult);
      // console.log("handledata filter", finalResult);
    } catch (error) {
      console.log("Handle date filter", error);
    }
  };

  const handleuserData = async () => {
    const response = await fetch("/api/admin");
    const responseData = await response.json();
    // console.log("Users Data in Orders", responseData);
  };


  useEffect(()=>{
    handleuserData();
    handleLeadsData();
  },[])


  useEffect(() => {
    if (orderId !== "") {
      handleIdFilterData();
    } else {
      handleuserData();
      handleLeadsData();
    }
  }, [orderId]);

  useEffect(() => {
    if (startDate > 0 && endDate > 0) {
      handleDateFilter();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if(page > 0){handleLoadMore();}
    
  }, [page]);

  useEffect(()=>{
    const fetchTotal = async()=>{
        const result = await fetch('/api/leads/loadMore/');
        let fetchTotalLead = await result.json();
        // console.log("Total Leads Count",fetchTotalLead.totalCount);
        setCount(fetchTotalLead.totalCount)
    }
    fetchTotal();
  },[])
 

 
  const [crossIconState, setcrossIconState] = useState(false);

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleTimeString([], options);
  };
  
  const formatAvailability = (startTime, endTime) => {
    return `${formatTime(startTime)}-${formatTime(endTime)}`;
  };
  
  const getAvailabilityData = (viewLead) => {
    const days = [
      { day: 'Mon', start: viewLead?.step4?.mondayStartTime, end: viewLead?.step4.mondayEndTime },
      { day: 'Tue', start: viewLead?.step4?.tuesdayStartTime, end: viewLead?.step4.tuesdayEndTime },
      { day: 'Wed', start: viewLead?.step4?.wednesdayStartTime, end: viewLead?.step4.wednesdayEndTime },
      { day: 'Thu', start: viewLead?.step4?.thursdayStartTime, end: viewLead?.step4.thursdayEndTime },
      { day: 'Fri', start: viewLead?.step4?.fridayStartTime, end: viewLead?.step4.fridayEndTime },
      { day: 'Sat', start: viewLead?.step4?.saturdayStartTime, end: viewLead?.step4.saturdayEndTime },
      { day: 'Sun', start: viewLead?.step4?.sundayStartTime, end: viewLead?.step4.sundayEndTime },
    ];
  
    // Filter out days without both start and end times
    return days.filter(day => day.start && day.end);
  };
                        
  const availabilityData = getAvailabilityData(viewLead);
  console.log("availabilityData",availabilityData)

  return (
    <Layout>
    <div>
        <Head>
        <title>Orders</title>
        </Head>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen relative bottom-24">
          <PropagateLoader
            css={override}
            size={15}
            color={"#B91C1C"}
            loading={loading}
          />
        </div>
      ) : (
        <>
          <div className="flex md:mt-10 mt-5 ms-2 justify-between flex-wrap items-center flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row md:gap-0 lg:gap-0 xl:gap-0 gap-2">
          <Link href="/admin/recycleBin">
            <div className="relative flex hover:cursor-pointer bg-[#F13C3D] ms-2 text-white rounded-sm py-2">
              <li className="my-[3px] flex cursor-pointer items-center px-8 ">
                
                <span
                  className={`font-bold text-white ${router.pathname ===
                  "/admin/recycleBin"
                    ? "text-red-500 border-b-red-500"
                    : "text-gray-600"}`}
                >
                  <FaRegTrashAlt  className="h-5 w-6"></FaRegTrashAlt>
                </span>
                
              </li>
              {router.pathname === "/admin/recycleBin" &&
                <div className="absolute top-px h-9 w-1 rounded-lg bg-[#F13C3D] end-0 dark:bg-brand-400" />}
            </div>
          </Link>
            <div className="text-start lg:ms-2 text-gray-400 relative datepicker-wrap flex gap-2 md:flex-row flex-col items-center">
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setstartDate(date)}
                icon={FaCalendar}
                placeholderText="Start date"
                className=""
              />
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setendDate(date)}
                icon={FaCalendar}
                placeholderText="End date"
              />
              <button
                className="font-bold md:ms-2 text-red-500 hidden md:block sm:block lg:block xl:block"
                onClick={() => {
                  setPage(0);
                  setOrderId("");
                  setstartDate("");
                  setendDate("");
                  setcrossIconState(false);
                  handleLeadsData();
                  
                }}
              >
     <span className="font-bold text-[#F23B3C]"><MdChangeCircle  className="text-3xl cursor-pointer"/></span>
                   </button>
            </div>
            <div className="flex justify-between mt-2 sm:mt-0 ">
              {/* <div className="text-gray-400 mr-4 my-2">
                <strong>Current Order Count: </strong>{" "}
                {leadsData && leadsData.length > 0 ? leadsData.length : 0}
              </div> 
              <div className="text-gray-400 mr-4 my-2">
                <strong>Total Orders </strong>{" "}
                {count}
              </div> */}
              <div className="md:text-end relative">
                <input
                  className={`p-2 md:me-2 rounded-md border-white border-[2px]`}
                  type="text"
                  value={orderId}
                  onChange={(e) => {
                    setOrderId(e.target.value);
                    setcrossIconState(true);
                  }}
                  placeholder="Search Order...."
                />
                <div className="absolute right-4 top-3 mb-1 text-lg text-gray-400">
                  <span>
                    {crossIconState ? (
                      <>
                        <IoCloseCircle
                          onClick={() => {
                            setOrderId("");
                            setcrossIconState(false);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <AiOutlineSearch />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-2 my-3  flex items-center justify-center text-white bg-black flex-col">
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full h-full sm:overflow-auto">
              <div className="overflow-x-scroll 2xl:overflow-x-hidden p-10">
                <table
                  role="table"
                  className="w-full table-auto 2xl:min-w-full min-w-[1200px]"
                  variant="simple"
                  color="gray-500"
                  mb="24px"
                >
                  <thead>
                    <tr role="row bg-gray-500">
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          ID
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Name
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Email
                        </div>
                      </th>
                      {/* <th
                    colSpan={1}
                    role="columnheader"
                    title="Toggle SortBy"
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="text-sm font-bold tracking-wide text-gray-800">
                      Postal code
                    </div>
                  </th> */}
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start px-5 md:px-0 lg:px-0 xl:px-0 sm:px-0 2xl:px-0"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Mobile
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Postal Code
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Hours
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Date / Time
                        </div>
                      </th>

                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-end text-sm font-bold  text-gray-800">
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {leadsData && leadsData.length > 0 ? (
                      leadsData.map((data) => (
                        <tr key={data._id}>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px]"
                          >
                            <div className="flex items-center gap-2">
                              {/* <input
                            type="checkbox"
                            className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
                          checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400 undefined"
                            name="weekly"
                          /> */}
                              <p className="text-sm font-bold text-gray-900 ">
                                #{data._id}
                              </p>
                            </div>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px]"
                          >
                            <div className="flex items-center gap-2">
                              {/* <input
                            type="checkbox"
                            className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
                          checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400 undefined"
                            name="weekly"
                          /> */}
                              <p className="text-sm font-bold text-gray-900 ">
                                {data.step4.firstName}
                              </p>
                            </div>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] md:w-[18%] w-[14%]"
                          >
                            <div className="flex items-center">
                              <p className="text-sm font-bold text-navy-700 ">
                                {data.step4.email}
                              </p>
                            </div>
                          </td>
                          {/* <td
                        role="cell"
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
                      >
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {data.step6.couponcode}
                        </p>
                      </td> */}
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] md:px-0 lg:px-0 xl:px-0 sm:px-0 2xl:px-0 px-5"
                          >
                            <p className="text-sm font-bold text-navy-700 ">
                              {data.step4.phone_number}
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] "
                          >
                            <p className="text-sm font-bold text-navy-700 ">
                              {data.step1.postal_code}
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] w-[18%]"
                          >
                            <p className="text-sm font-bold text-navy-700 ">
                              <div className="flex gap-2">
                                {Object.keys(data.step2.dr_course_price).map(
                                  (courseKey, index) => (
                                    <div key={index}>
                                      {
                                        data.step2.dr_course_price[courseKey]
                                          .value
                                      }
                                    </div>
                                  )
                                )}
                                <div>/ {data.step5?.intensiveCourse && data.step5?.intensiveCourse}</div>
                              </div>
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] md:w-[14%] w-[20%]"
                          >
                            <p className="text-sm font-bold text-navy-700 ">
                              {moment(data.createdAt).format(
                                "DD-MM-YYYY HH:mm A"
                              )}
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="flex flex-1 justify-end pt-[14px] pb-[16px] sm:text-[14px] w-full gap-2 mx-auto"
                          >
                            <span className="text-sm font-bold text-red-700 ">
                              <AiFillDelete
                                className="text-2xl cursor-pointer"
                                onClick={() => {
                                  handleDelete(data._id, 0);
                                }}
                              />
                            </span>
                            <span className="text-sm font-bold text-gray-800 ">
                              <AiFillEdit
                                className="text-2xl cursor-pointer"
                                onClick={() => handleEdit(data)}
                              />
                            </span>
                            <span className="text-sm font-bold text-gray-800 ">
                              <IoEye
                                className="text-2xl cursor-pointer"
                                onClick={() => {
                                  setSecondToggle(true);
                                  handleView(data);
                                }}
                              />
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h1 className="text-xl text-gray-800 mt-3">
                      No results found
                      </h1>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="flex my-2 gap-1 sm:gap-4 flex-wrap ">
            <div className="text-gray-400">
                <span>Current Order Count: </span>{" "}
                <span className="font-bold">{leadsData && leadsData.length > 0 ? leadsData.length : 0} </span>
              </div> 
              <div className="text-gray-400">
                <span>Total Orders </span>{" "}
               <span className="font-bold"> {count} </span>
              </div>
            </div> */}
            {leadsData && leadsData.length != total &&
            (
              <>
            <button className="bg-red-500 p-3 rounded-md mt-4" disabled={load} onClick={handleClickMore}>
              {load ? 'Loading...' : 'Load More'}
            </button>
            </>
            )
            }
            <Modal
              isOpen={Toggle}
              onRequestClose={closeModal}
              className="mx-auto py-3 bg-gray-50 w-[50%] relative z-50 rounded-3xl"
            >
              <form
                onSubmit={handleEditSubmit}
                className="text-gray-800 w-full mt-2"
              >
                <h2 className="text-center md:text-4xl text-3xl text-gray-900 mb-7 font-bold">
                  Edit Leads
                </h2>
                <div className="flex justify-center w-full gap-4 md:px-10 px-5">
                  <div className="flex flex-col md:w-1/2 w-full md:mr-3 mr-0">
                    <label className="mb-1 font-semibold text-gray-900">
                      Postal Code
                    </label>
                    <input
                      className="block mb-4 w-full p-2 text-xs border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step1.postal_code}
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step1: {
                            ...formData.step1,
                            postal_code: e.target.value
                          }
                        })
                      }
                    />

                    <label className="mb-1 font-semibold text-gray-900">
                      Payment
                    </label>
                    <input
                      className="block mb-4 w-full text-xs p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step6 ? formData.step6.payment : '0'} // I have added Hard Code value it will be change to formData?.step6?.payment for normal functionality
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step6: { ...formData.step6, payment: e.target.value }
                        })
                      }
                    />
                    <label className="mb-1 font-semibold text-gray-900">
                      Amount
                    </label>
                    <input
                      className="block mb-4 w-full text-xs p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step6 ? formData.step6.amount : '0'} // I have added Hard Code value it will be change to formData?.step6?.amount for normal functionality
                      type="text"
                      readOnly
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     step6: {
                      //       ...formData.step6,
                      //       amount: e.target.value
                      //     }
                      //   })
                      // }
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2 w-full md:mr-3 mr-0">
                    <label className="mb-1 font-semibold text-gray-900">
                      First name
                    </label>
                    <input
                      className="block mb-4 w-full text-xs p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step4.firstName}
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step4: {
                            ...formData.step4,
                            firstName: e.target.value
                          }
                        })
                      }
                    />
                    <label className="mb-1 font-semibold text-gray-900">
                      Last Name
                    </label>
                    <input
                      className="block mb-4 w-full text-xs p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step4.surname}
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step4: { ...formData.step4, surname: e.target.value }
                        })
                      }
                    />
                    <label className="mb-1 font-semibold text-gray-900">
                      Mobile
                    </label>
                    <input
                      className="block mb-4 w-full text-xs p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step4.phone_number}
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step4: {
                            ...formData.step4,
                            phone_number: e.target.value
                          }
                        })
                      }
                    />
                    <label className="mb-1 font-semibold text-gray-900">
                      Title
                    </label>
                    <input
                      className="block mb-4 text-xs w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={formData?.step4.title}
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step4: { ...formData.step4, title: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
                <div className="text-center flex justify-center w-full mt-4">
                  <button
                    className="bg-theme-red-color hover:bg-red-900  mt-2 hover:text-white rounded-md mb-5 
              px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
            {viewLead && (
              <Modal
                isOpen={SecondToggle}
                onRequestClose={closeModal}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
                className="mx-auto bg-gray-50 md:w-[40%] w-96 rounded-3xl flex flex-col"
              >
                <div className="flex justify-between py-4 px-5 bg-red-400 rounded-t-xl pb-3">
                  <h4 className="text-center w-full text-2xl  text-dark font-semibold">
                    Order#{" "}
                    <span className="uppercase">
                      {truncateID(viewLead._id, 5)}
                    </span>
                  </h4>
                  {/* <span className="text-sm  w-1/5 text-center  font-semibold rounded-md bg-white px-1 py-2  text-red-500">Paid</span> */}
                </div>
                <div className="overflow-y-auto">
                  <div className="orderCustomerDetails md:px-5 md:py-2 p-4 pb-3">
                    <div className="flex justify-between ">
                      <div className="w-1/3">
                        <h3 className="md:text-xl text-sm font-bold mb-2">
                          Customer Details
                        </h3>
                        <h4 className="font-semibold text-sm mb-3">
                          Postal Code
                          <span className="bg-teal-200 md:ms-3 ms-0 py-1 px-3 font-semibold md:inline block text-xs rounded-full">
                            {" "}
                            {viewLead.step1.postal_code}
                          </span>
                        </h4>
                      </div>
                      <div className="w-1/3 pl-5">
                        <span className="font-bold md:text-base text-sm text-start ">
                          <span className="">
                            {" "}
                            <span className="md:text-xl text-sm font-bold mb-2">
                              {" "}
                              Date Time{" "}
                            </span>{" "}
                            <br />
                            <span className="font-normal text-start">
                              {/* {console.log("createdAt:", viewLead.createdAt)} */}
                              {moment(viewLead.createdAt).format(
                                "DD-MM-YYYY HH:mm A"
                              )}
                            </span>{" "}
                          </span>
                        </span>
                      </div>
                      {/*  <div className="">
                  <span className="font-regular  text-sm text-end rounded-full font-semibold">
                      {" "}
                      Transaction ID <br />
                      <span className="font-normal">
                      {viewLead.stripe.id}
                      </span>
                    </span>
                  </div> */}
                    </div>
                    <div>
                      <div className="grid md:grid-cols-3 grid-cols-2 mt-2">
                        <div>
                          <h4 className="font-bold md:text-lg text-sm">
                            Full Name:{" "}
                          </h4>
                          <span className="text-sm md:text-base">
                            {viewLead.step4.title}. {viewLead.step4.firstName}{" "}
                            {viewLead.step4.surname}
                          </span>
                          {/* <h4 className="font-bold text-lg pt-3">Email: </h4>
                    <span className="font-semibold">
                      {viewLead.step4.email}
                    </span> */}
                        </div>
                        <div>
                          <h4 className="font-bold md:text-lg text-sm">
                            Email:{" "}
                          </h4>
                          <span className="md:text-base text-sm">
                            {viewLead.step4.email}
                          </span>
                        </div>
                        <div className="md:ms-5 ms-0 md:my-0 my-4">
                          <h4 className="font-bold md:text-lg text-sm">
                            Mobile Number:{" "}
                          </h4>
                          <span className=" md:text-base text-sm">
                            {viewLead.step4.phone_number}
                          </span>
                        </div>
                        {viewLead?.step2?.dr_course_type === "regular" || viewLead?.step2?.dr_course_type === "crash" ? null : (
                          <>
                            <div>
                              <h4 className="font-bold md:text-lg text-sm md:pt-3 pt-5">
                                Course Speed:{" "}
                              </h4>
                              <span className=" md:text-base text-sm">
                                {viewLead.step5?.intensiveCourse && viewLead.step5?.intensiveCourse}
                              </span>
                            </div>
                          </>
                        )}
                        <div>
                          <span className="font-regular  text-sm text-start rounded-full font-semibold">
                            <h4 className="font-bold md:text-lg text-sm md:pt-3 pt-5">
                              {" "}
                              Transaction ID
                            </h4>
                            <span className="font-normal md:text-base">
                              {viewLead.stripe ? viewLead.stripe?.paymentId : '-'}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-2 pt-2">
                    <div className=" ms-0 md:my-0 my-4">
                          <h4 className="font-bold md:text-lg text-sm">
                            Address
                          </h4>
                          <span className=" md:text-base text-sm">
                            {viewLead.step4.addressLineOne+viewLead?.step4?.addressLineTwo}
                          </span>
                        </div>
                        
                        <div className="ms-0 md:my-0 my-4">
                        <h4 className="font-bold md:text-lg text-sm">Availability</h4>
                        <div className="md:text-base text-sm">
                          {availabilityData.map(({ day, start, end }) => (
                            <div key={day}>
                              <span className="font-bold">{day}</span>: {formatAvailability(start, end)}
                            </div>
                          ))}
                        </div>
                       </div>
                    </div>
                  </div>

                  <div className="order-details p-4 pb-8 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left border rtl:text-right">
                      <tbody>
                        <tr className="border  bg-gray-200">
                          <th
                            scope="col"
                            className="px-6 py-3 text-dark font-bold text-sm"
                          >
                            Course Details
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 font-bold text-sm"
                          >
                            Price
                          </th>
                        </tr>
                        <tr className="bg-white border-b  ">
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <span className="bg-amber-200  py-1 px-3 font-semibold  text-xs rounded-full capitalize">
                            {viewLead.step2.dr_course_type.replace('_', ' ')}
                            </span>
                            {viewLead.step2.dr_course_price ? (
                              <span className="block mt-2 ms-1">
                                {Object.keys(
                                  viewLead.step2.dr_course_price
                                ).map((courseKey, index) => (
                                  <span key={index}>
                                    {
                                      viewLead.step2.dr_course_price[courseKey]
                                        .value
                                    }
                                    &nbsp;
                                    {
                                      viewLead.step2.dr_course_price[courseKey]
                                        .variant
                                    }{" "} 
                                    -{" "}
                                    <span className="capitalize">
                                      ({viewLead.step2.dr_type})
                                    </span>{" "}
                                    {viewLead.step6?.payment ? (viewLead.step6?.payment) : ''}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <span className="text-gray-800">
                                No course price available
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 font-semibold text-sm">
                          {/* FOR FULL PAYMENT */}
                            {viewLead.step6?.payment === "Full" && (
                              <div>
                              <span>{viewLead.step6?.amount}</span>
                                {/* {Object.keys(
                                  viewLead.step2.dr_course_price
                                ).map((courseKey, index) => (
                                  <span key={index}>
                                    £
                                    {
                                      viewLead.step2.dr_course_price[courseKey]
                                        .full 
                                    } hello
                                  </span>
                                ))} */}
                              </div>
                            )}
                            {/* FOR DEPOSIT PAYMENT */}
                            {viewLead.step6?.payment === "Deposit" && (
                              <div>
                              <span>{viewLead.step6?.amount}</span>
                                {/* {Object.keys(
                                  viewLead.step2.dr_course_price
                                ).map((courseKey, index) => (
                                  <span key={index}>
                                    £
                                    {
                                      viewLead.step2.dr_course_price[courseKey]
                                        .deposit
                                    }
                                  </span>
                                ))} */}
                              </div>
                            )}
                          </td>
                        </tr>
                      
                        {viewLead.step3.fast_track_practical != "" && (
                          <tr className="bg-white border-b  p-3 ">
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <span className="bg-lime-300 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                                Add-ons
                              </span>
                              <span className="block mt-2 ms-1">
                              Practical Test (Fast Track Practical)  
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-sm">
                            {/* £0 */}
                            </td>
                          </tr>
                        )}
                        {viewLead.step3.fast_track_theory != "" && (
                          <tr className="bg-white border-b  p-3 ">
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <span className="bg-lime-300 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                                Add-ons
                              </span>
                              <span className="block mt-2 ms-1">
                              Theory Test  (Free Theory Subscription)
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-sm">
                              {/* £{viewLead.step3.fast_track_theory} */}
                              
                            </td>
                          </tr>
                        )}
                        {viewLead.step3.i_have_already === "passed" && (
                          <tr className="bg-white border-b  p-3 ">
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <span className="bg-lime-300 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                                Add-ons
                              </span>
                              <span className="block mt-2 ms-1">
                              Theory Test  (I've already passed) 
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-sm">
                              {/* £{viewLead.step3.i_have_already} */} 
                            </td>
                          </tr>
                        )}
                        {viewLead.step3.i_have_already === "booked" && (
                          <tr className="bg-white border-b  p-3 ">
                            <td
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <span className="bg-lime-300 w-max py-1 px-3 font-semibold  text-xs rounded-full">
                                Add-ons
                              </span>
                              <span className="block mt-2 ms-1">
                              Theory Test  {viewLead.step3.i_have_already ? "(I have Already Booked)" : ''} 
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-sm">
                              {/* £{viewLead.step3.i_have_already} */} 
                            </td>
                          </tr>
                        )}
                        <tr className="border-b  p-3 bg-gray-200 ">
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            <span className="block mt-2 ms-1">Total</span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-sm">
                            £ {viewLead.step6?.amount ? viewLead.step6?.amount : 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <ToastContainer position="bottom-right" autoClose={2000} />
        </>
      )}
    </Layout>
  );
};
export default Index;
