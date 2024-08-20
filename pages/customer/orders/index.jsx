import Layout from "@/app/components/Layout";
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
import Head from "next/head";

const Index = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [loading, setLoading] = useState(true);
  const [Toggle, setToggle] = useState(false);
  const [viewLead, setViewLead] = useState(null);
  const [SecondToggle, setSecondToggle] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [selectedLead, setSelectedLead] = useState();
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

  // Truncate Id Start
  const truncateID = (id, length) => {
    const truncatedID = id.toString().substring(0, length);
    return truncatedID;
  };
  // Truncate Id End

  const handleEdit = async (lead) => {
    setFormData(lead);
    setToggle(true);
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
        // console.log('')
      } else {
        console.error("Error updating lead");
      }
    } catch (error) {
      console.error("Error updating lead", error);
    }
  };

  const handleLeadsData = async () => {
    try {
      const response = await fetch("/api/leads/userLeads");
      const responseData = await response.json();
      // console.log("Response of User LEADS FROM FRONT END", responseData.leads);
      if (responseData && Object.keys(responseData).length > 0) {
        setLoading(true);
        setLeadsData(responseData.leads);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
      }
    } catch (error) {
      console.error(error, "Error While Fetching Leads Data In order");
    }
  };

  useEffect(() => {
    handleLeadsData();
  }, []);

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
        const response = await fetch(`/api/leads/del?leadId=${leadId}`, {
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

  return (
    <Layout>
      <Head>
        <title>Orders</title>
      </Head>
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
                        className="border-b border-gray-200  pb-5 text-start"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800 capitalize">
                          Name
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Email
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start"
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
                        className="border-b border-gray-200  pb-5 text-start"
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
                        className="border-b border-gray-200  pb-5 text-start"
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
                        className="border-b border-gray-200  pb-5 text-start"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold tracking-wide text-gray-800">
                          Date Time
                        </div>
                      </th>

                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200  pb-5 text-start"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-end text-sm font-bold  capitalize  text-gray-800">
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                  {console.log("Lead data customer",leadsData)}
                    {leadsData &&
                      leadsData.map((data) => (
                        <tr key={data._id}>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px]"
                          >
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-gray-900">
                                {data.step4.firstName}
                              </p>
                            </div>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] w-[16%]"
                          >
                            <div className="flex items-center">
                              <p className="text-sm font-bold text-navy-700 pr-6 md:px-3">
                                {data.step4.email}
                              </p>
                            </div>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] w-[14%]"
                          >
                            <p className="text-sm font-bold text-navy-700">
                              {data.step4.phone_number}
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] w-[15%]"
                          >
                            <p className="text-sm font-bold text-navy-700">
                              {data.step1.postal_code}
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] w-[15%]"
                          >
                            <p className="text-sm font-bold text-navy-700">
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
                                <div>/ {data.step5?.intensiveCourse && data.step5.intensiveCourse}</div> 
                              </div>
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="pt-[14px] pb-[16px] sm:text-[14px] w-[14%]"
                          >
                            <p className="text-sm font-bold text-navy-700">
                              {moment(data.createdAt).format(
                                "DD-MM-YYYY HH:mm A"
                              )}
                            </p>
                          </td>
                          <td
                            role="cell"
                            className="flex justify-end pb-[16px] pt-[14px] sm:text-[14px] mr-3 "
                          >
                            <span className="text-sm font-bold text-gray-800">
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
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal
              isOpen={Toggle}
              onRequestClose={closeModal}
              className="mx-auto py-3 bg-gray-50 w-[50%] relative z-50 rounded-3xl"
            >
              <form
                onSubmit={handleEditSubmit}
                className="text-gray-800 w-full mt-2"
              >
                <h2 className="text-center text-4xl text-gray-900 mb-7 font-bold">
                  Edit Leads
                </h2>
                <div className="flex justify-center w-full gap-4 px-10">
                  <div className="flex flex-col w-1/2 mr-3">
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
                      value={formData?.step6?.payment}
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
                      value={formData?.step6.amount}
                      type="text"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          step4: {
                            ...formData.step6,
                            amount: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col w-1/2 mr-3">
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
                className="mx-auto bg-gray-50 w-[40%] rounded-3xl flex flex-col"
              >
                <div className="flex justify-between py-4 px-5 bg-red-400 rounded-t-xl pb-3">
                  <h4 className="text-center w-full text-2xl  text-dark font-semibold">
                    Order#{" "}
                    <span className="uppercase">
                      {truncateID(viewLead._id, 5)}
                    </span>
                  </h4>
                </div>
                <div className="overflow-y-auto">
                  <div className="orderCustomerDetails md:p-7 lg:p-7 xl:p-7 2xl:p-7 p-4 pb-3">
                    <div className="flex justify-between items-center items-middle">
                      <div className="">
                        <h3 className="text-xl font-bold">
                          Customer Details
                        </h3>
                        <h4 className="font-semibold">
                          Postal Code
                          <span className="bg-teal-200 ms-3 py-1 px-3 font-semibold  text-xs rounded-full">
                            {" "}
                            {viewLead.step1.postal_code}
                          </span>
                        </h4>
                      </div>
                      <div className="md:mr-[24px] lg:mr-[24px] xl:mr-[24px] 2xl:mr-[24px] mr-[25px]">
                        <span className="">
                          {" "}
                          <span className="text-xl font-bold mb-2">
                            {" "}
                            Date Time{" "}
                          </span>{" "}
                          <br />
                          <span className="font-normal">
                            {moment(viewLead.createdAt).format(
                              "DD-MM-YYYY HH:mm A"
                            )}
                          </span>{" "}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex mt-5 justify-between">
                      <div>
                        <h4 className="font-bold text-lg">Full Name: </h4>
                        <span className="font-semibold text-sm">
                          {viewLead.step4.title}. {viewLead.step4.firstName}{" "}
                          {viewLead.step4.surname}
                        </span>
                        <h4 className="font-bold text-lg pt-3">Email: </h4>
                        <span className="font-semibold text-sm">
                          {viewLead.step4.email}
                        </span>
                      </div>
                      <div className="md:mr-[35px] lg:mr-[35px] xl:mr-[35px] 2xl:mr-[35px]">
                        <h4 className="font-bold text-lg">Mobile Number: </h4>
                        <span className="font-semibold text-sm">
                          {viewLead.step4.phone_number}
                        </span>
                        <h4 className="font-bold text-lg pt-3">
                          Course Speed:{" "}
                        </h4>
                        <span className=" text-xs md:text-sm">
                            {viewLead.step5?.intensiveCourse && viewLead.step5?.intensiveCourse}
                          </span>
                      </div>
                    </div>
                  </div>

                  <div className="order-details md:p-4 lg:p-4 xl:p-4 2xl:p-4 pb-8 relative overflow-x-auto shadow-md sm:rounded-lg">
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
                            <span className="bg-amber-200  py-1 px-3 font-semibold  text-xs rounded-full
                            capitalize">
                            {viewLead.step2.dr_course_type}
                            </span>
                            {viewLead.step2.dr_course_price ? (
                              <span className="block mt-2 ms-1">
                                {" "}
                                {Object.keys(
                                  viewLead.step2.dr_course_price
                                ).map((courseKey, index) => (
                                  <span key={index}>
                                    {
                                      viewLead.step2.dr_course_price[courseKey]
                                        .value
                                    }
                                    {
                                      viewLead.step2.dr_course_price[courseKey]
                                        .variant
                                    }{" "} 
                                    -{" "}
                                    <span className="capitalize">
                                      {viewLead.step2.dr_type}
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
                          {/* <td className="px-6 py-4 font-semibold text-sm">
                            {viewLead.step6.payment && (
                              <div>
                                {Object.keys(
                                  viewLead.step2.dr_course_price
                                ).map((courseKey, index) => (
                                  <span key={index}>
                                    £
                                    {
                                      viewLead.step2.dr_course_price[courseKey].full
                                    }
                                  </span>
                                ))}
                              </div>
                            )}
                          </td> */}
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
                              Fast Track Practical (Practical Test) 
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
                              Free Theory Subscription (Theory Test)
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
                              I've already passed (Theory Test)
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
                              {viewLead.step3.i_have_already ? "I have Already Booked" : ''} (Theory Test) 
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
                          £{viewLead.step6?.amount ? viewLead.step6?.amount : 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Modal>
            )}
          </div>
          <ToastContainer autoClose={2000} />
        </>
      )}
    </Layout>
  );
};

export default Index;
