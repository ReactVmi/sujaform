import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import Dashboard from "./dashboard";
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
      <div>
        <Head>
        <title>Home</title>
        </Head>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen relative bottom-24">
          <PropagateLoader css={override} size={15} color={'#B91C1C'} loading={loading} />
        </div>
      ) : (
        <div className="md:p-5 ps-0  grid grid-cols-2 text-white bg-black flex-col tracking-widest capitalize">
          {/* <p className="text-4xl font-semibold my-10 text-gray-800 dark:text-white">
            Welcome to Admin
          </p> */}
          <Dashboard />
        </div>
      )}
    </Layout>
  );
}
