import MiniCalendar from "@/app/components/calendar/MiniCalendar";
import WeeklyRevenue from "@/app/components/default/WeeklyRevenue";
import TotalSpent from "@/app/components/default/TotalSpent";
import PieChartCard from "@/app/components/default/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import {
  columnsDataCheck,
  columnsDataComplex
} from "@/app/components/default/variables/columnsData";

import Widget from "@/app/components/widget/Widget";
import CheckTable from "@/app/components/default/CheckTable";
import ComplexTable from "@/app/components/default/ComplexTable";
import DailyTraffic from "@/app/components/default/DailyTraffic";
import TaskCard from "@/app/components/default/TaskCard";
import tableDataCheck from "@/app/components/default/variables/tableDataCheck.json";
import tableDataComplex from "@/app/components/default/variables/tableDataComplex.json";
import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const isCustomerRoute = router.pathname.startsWith("/customer");
  
  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={isCustomerRoute ? "/customer/orders" : "/admin/orders"}>
          <Widget
            icon={<FaBasketShopping className="h-7 w-7" />}
            title={"View "}
            subtitle={"Order"}
          />
        </Link>
        <Link href={isCustomerRoute ? "/customer/profile" : "/admin/profile"}>
          <Widget
            icon={<FaUser className="h-6 w-6" />}
            title={"View"}
            subtitle={"Profile"}
          />
        </Link>
        {/* <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"£574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"£1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"£2433"}
        /> */}
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          {/* <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          /> */}
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          {/* <DailyTraffic />
          <PieChartCard /> */}
        </div>

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          {/* <TaskCard /> */}
          <div className="grid grid-cols-1 rounded-[20px]">
            {/* <MiniCalendar /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
