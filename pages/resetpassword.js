// Import necessary libraries and components
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import decodeToken from "jwt-decode";
import Layout from "@/app/components/Layout";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { BiLoaderAlt } from "react-icons/bi";
import Head from "next/head";

const ChangePassword = () => {
  const router = useRouter();
  const [isLoader, setLoader] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirm_password: ""
  });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirm_password: Yup.string()
      .required("Please re-type your password")
      .oneOf([Yup.ref("password")], "Passwords do not match")
  });

  const [errors, setErrors] = useState({
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBlur = async () => {
    try {
      await validationSchema.validate(password, { abortEarly: false });
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
        confirm_password: ""
      }));
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors
      }));
    }
  };

  const [token, setToken] = useState(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get("token");
    setToken(urlToken);
  }, [token]);

  const cookie = Cookies.get("token");
  let user = false;

  if (cookie) {
    user = decodeToken(cookie);
  }

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(password, { abortEarly: false });
      const response = await axios.post("/api/user/resetPass", {
        password: password.password,
        token: token
        // Add other necessary fields if required
      });
      if (response) {
        setLoader(true);
        // console.log("PASSWORD UPDATED SUCCESSFULLY");
        setPassword({ password: "", confirm_password: "" });
        toast.success("Password updated");
        router.push("/login");
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <form
        className="pb-5 w-1/3 mx-auto p-10 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500"
        onSubmit={handlePassword}
      >
        <div className="mx-3">
          <div className="w-full pt-7 px-3">
            <label
              className="block uppercase text-sm tracking-wide text-gray-900 text-black-400 font-bold mb-2"
              htmlFor="grid-changepassword"
            >
              Change Password
            </label>
            <input
              value={password.password}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              id="grid-changepassword"
              type="password"
              name="password"
              placeholder="******************"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="error-message text-red-500">
                {errors.password}
              </div>
            )}
          </div>
          <div className="w-full pt-7 px-3">
            <label
              className="block uppercase text-sm tracking-wide text-gray-900 text-black-400 font-bold mb-2"
              htmlFor="grid-confirmchangepassword"
            >
              Confirm Change Password
            </label>
            <input
              value={password.confirm_password}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                errors.confirm_password ? "border-red-500" : ""
              }`}
              id="grid-confirmchangepassword"
              type="password"
              name="confirm_password"
              placeholder="******************"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && (
              <div className="error-message text-red-500">
                {errors.confirm_password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`flex items-center rounded-full mt-5 py-3  ${
              isLoader ? "pe-10" : "ps-10"
            } p-12 relative text-lg uppercase 
            font-semibold text-white shadow-sm bg-red-700 hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            {isLoader ? (
              <>
                Update{" "}
                <BiLoaderAlt className="animate-spin text-2xl absolute ml-[80px]" />
              </>
            ) : (
              "Update"
            )}
          </button>
          <ToastContainer />
        </div>
      </form>
    </Layout>
  );
};

export default ChangePassword;
