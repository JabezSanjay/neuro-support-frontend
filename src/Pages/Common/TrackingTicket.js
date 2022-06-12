import React from 'react';
import StudentTicketTable from '../../Components/AppAdminTable/StudentTicketTable';
import AppSideNavbar from '../../Components/AppSideBar/AppSidebar';
import Navbar from '../../Components/Navbar/Navbar';

function TrackingTicket() {
  return (
    <div>
      <AppSideNavbar>
        <Navbar />
        <div className='text-center'>
          <StudentTicketTable />
        </div>
      </AppSideNavbar>
    </div>
  );
}

export default TrackingTicket;
