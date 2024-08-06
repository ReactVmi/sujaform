// Import necessary modules and components
import Layout from "@/app/components/Layout";
// import dbconstr from "@/database/dbconstr"; // Assume you have a utility function for connecting to the database
// import Lead from "@/database/models/Lead"; // Import your Mongoose model
import {users} from '@/app/service/user';

// Your page component
const Test = ({content}) => {
  console.log(content);
  return (
    <Layout>
      <div className="mt-10"> 
        Hello Test
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    let result = await users();
    return { props: { content: result } };
  } catch (error) {
    return { props: { content: null } };
  }
}

export default Test;
