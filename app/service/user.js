import dbconstr from "@/database/dbconstr"; // Assume you have a utility function for connecting to the database
import Lead from '@/database/models/Lead';
await dbconstr();
const users = async () => {
  try {
    const leads = await Lead.find({ del: 0 }).limit(5).skip(0).sort({ createdAt: -1 }).populate("user").exec();
    return await JSON.parse(JSON.stringify(leads));
  } catch (error) {
    throw error
  }
};

const create = () => {
  console.log("user create");
};
export { users, create };