import Layout from "@/app/components/Layout";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import Head from "next/head";

const Index = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState(null);
  const [editUserData, setEditUserData] = useState({
    fname: "",
    lname: "",
    phone: "",
    postalcode: "",
    _id: ""
  });

  const [Toggle, setToggle] = useState(false);

  const handleUsersData = async () => {
    try {
      // Set loading to true
      const response = await fetch("/api/admin");
      const responseData = await response.json();
      setLoading(true);
      setUsersData(responseData);
      // console.log("Users Data in Orders", responseData);
      setTimeout(() => {
        setLoading(false); // Set loading to false when done
      }, 1000);
    } catch (error) {
      console.error("Error While Fetching Leads Data In order", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    handleUsersData();
    // console.log("User ID From EDITUSERDATA State", editUserData._id);
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/user/edit?id_=${editUserData._id}`,
        editUserData
      );
      // console.log("Edit Response:", response.data);
      await toast.success("User data edited successfully!");
      setToggle(false);
    } catch (error) {
      console.error("Error While Editing User:", error);
      await toast.error("Error editing user data. Please try again.");
    }
  };

  const openModal = (user) => {
    setToggle(true);
    setEditUserData({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      postalcode: user.postalcode
    });
  };
  const closeModal = () => {
    setToggle(false);
  };

  const handleDelete = async (_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this user data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`/api/user/del?id=${_id}`);

        if (response.data.success) {
          router.push("/admin");
          toast.success("User data deleted successfully!");
        }
      }
    } catch (error) {
      console.error("Error While Deleting User:", error);
    }
  };

  return (
    <Layout>
    <div>
        <Head>
        <title>Users</title>
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
          <div className="w-full p-2 my-3  flex items-center justify-center text-white bg-black flex-col ">
            {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
            <div className="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full h-full sm:overflow-auto">
              <div className="overflow-x-scroll xl:overflow-x-hidden p-10">
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
                        <div className="text-sm font-bold  text-gray-800">
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
                        <div className="text-sm font-bold  text-gray-800">
                          Email
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200 pb-5 text-start"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold text-gray-800">
                          Postal Code
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200 pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold  text-gray-800">
                          Mobile
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        className="border-b border-gray-200 pb-5 text-start "
                        style={{ cursor: "pointer" }}
                      >
                        <div className="text-sm font-bold  text-gray-800">
                          Action
                        </div>
                      </th>
                      {/* <th
                    colSpan={1}
                    role="columnheader"
                    title="Toggle SortBy"
                    className="border-b border-gray-200  pb-5 text-start dark:!border-navy-700"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="text-end text-sm font-bold  text-gray-800">
                      Action
                    </div>
                  </th> */}
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {usersData &&
                      usersData.map((data) => (
                        <>
                          <tr role="row">
                            {/* <td> <input
                          type="checkbox"                          
                          className="defaultCheckbox customerCheck relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
                      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400 undefined"
                          name="weekly"
                        /></td> */}
                            <td
                              role="cell"
                              className="pt-[14px] pb-[16px] sm:text-[14px]"
                            >
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-navy-700 ">
                                  {data.user.fname}
                                </p>
                              </div>
                            </td>
                            <td
                              role="cell"
                              className="pt-[14px] pb-[16px] sm:text-[14px]"
                            >
                              <div className="flex items-center">
                                <p className="text-sm font-semibold text-navy-700 ">
                                  {data.user.email}
                                </p>
                              </div>
                            </td>
                            <td
                              role="cell"
                              className="pt-[14px] pb-[16px] sm:text-[14px]"
                            >
                              <p className="text-sm font-semibold text-navy-700 ">
                                {data.user.postalcode}
                              </p>
                            </td>
                            <td
                              role="cell"
                              className="pt-[14px] pb-[16px] sm:text-[14px]"
                            >
                              <p className="text-sm font-semibold text-navy-700 ">
                                {data.user.phone}
                              </p>
                            </td>

                            <td
                              role="cell"
                              className=" flex flex-1 justify-start pt-[14px] pb-[16px] sm:text-[14px] w-full gap-2 mx-auto"
                            >
                              <span
                                onClick={() => {
                                  handleDelete(data.user._id);
                                }}
                                className="text-sm font-bold text-red-700 "
                              >
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 1024 1024"
                                  className="text-2xl cursor-pointer"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
                                </svg>
                              </span>
                              <span
                                onClick={() => {
                                  openModal(data.user);
                                }}
                                className="text-sm font-bold text-gray-800 "
                              >
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  strokeWidth="0"
                                  viewBox="0 0 1024 1024"
                                  className="text-2xl cursor-pointer"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path>
                                </svg>
                              </span>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            isOpen={Toggle}
            isClose={closeModal}
            onRequestClose={closeModal}
            className="w-[40%] mx-auto"
          >
            {/* <button onClick={closeModal} className="absolute left-[830px] text-2xl">x</button> */}
            <div className="flex justify-between py-4 px-5 bg-red-400 rounded-t-xl pb-3">
              <h4 className="text-center w-full text-xl  text-dark font-semibold">
                Update User Details
              </h4>
            </div>
            <div className="p-6 my-5 rounded-[20px] bg-white">
              <form className="" onSubmit={handleEdit}>
                <div className="flex flex-wrap  mb-6">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block  text-gray-900 text-sm font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Ttile
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                        <option>Mx</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block  text-gray-900 text-sm font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder=""
                      value={editUserData.fname}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          fname: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3">
                    <label
                      className="block  text-gray-900 text-sm font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder=""
                      value={editUserData.lname}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          lname: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="w-full px-3 py-4">
                    <label
                      className="block  text-gray-900 text-sm font-bold mb-2"
                      htmlFor="grid-mobilenumber"
                    >
                      Postal Code
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-mobilenumber"
                      type="tel"
                      placeholder=""
                      value={editUserData.postalcode}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          postalcode: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="w-full px-3 py-4">
                    <label
                      className="block  text-gray-900 text-sm font-bold mb-2"
                      htmlFor="grid-mobilenumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-mobilenumber"
                      type="tel"
                      placeholder=""
                      value={editUserData.phone}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          phone: e.target.value
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mx-3">
                  <button
                    type="submit"
                    className="rounded-full py-3  px-8  text-lg uppercase  font-semibold text-white shadow-sm
bg-red-500 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <ToastContainer position="bottom-right" autoClose={2000} />
        </>
      )}
    </Layout>
  );
};

export default Index;
