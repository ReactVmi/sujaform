import React from 'react'
import Form from './form'
import Layout from '@/app/components/Layout'
import { useAuth } from '@/app/context/AuthContext';
import Head from 'next/head';

const index = () => {
  const {userRole, isLoggedIn} = useAuth();
  // console.log(userRole,isLoggedIn);
  return (
    <div >
    <Head>
        <link rel="icon" href="./public/favicon.ico" />
      </Head>
      <Layout>
        <Form />
      </Layout>
      
    </div>
  )
}

export default index