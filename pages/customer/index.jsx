import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Dashboard from "../admin/dashboard";
import Layout from "@/app/components/Layout";
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';
import Head from "next/head";


export default function Home() {

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const [loading, setLoading] = useState(true);

useEffect(() => {
  const customLoader = () => {
    // Simulate loading delay for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  customLoader();
}, []);

  return (
    <Layout>
    <Head>
        <title>Customer</title>
      </Head>
    {loading ? (
      <div className="flex justify-center items-center h-screen relative bottom-24">
        <PropagateLoader css={override} size={15} color={'#B91C1C'} loading={loading} />
      </div>
      ) :
      <div className="w-full p-2 flex justify-center text-white bg-black flex-col tracking-widest uppercase">
        <Dashboard></Dashboard>
      </div>
    }
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const token = context.req.cookies.token;

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/admin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
