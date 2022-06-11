import React from "react";
import AppSideNavbar from "../../Components/AppSideBar/AppSidebar";
import Navbar from "../../Components/Navbar/Navbar";

function TrackingTicket() {
  return (
    <div>
      <AppSideNavbar>
        <Navbar />
        <div className="text-center">TrackingTicket</div>
      </AppSideNavbar>
    </div>
  );
}

export default TrackingTicket;
