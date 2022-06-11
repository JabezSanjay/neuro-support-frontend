import React from "react";
import AppAdminTable from "../../Components/AppAdminTable/AppAdminTable";
import AppSideNavbar from "../../Components/AppSideBar/AppSidebar";
import Navbar from "../../Components/Navbar/Navbar";

function Tickets() {
  return (
    <div>
      <AppSideNavbar>
        <Navbar />
        <div className="w-11/12 mx-auto mt-14">
          <AppAdminTable />
        </div>
      </AppSideNavbar>
    </div>
  );
}

export default Tickets;
