import React, { useEffect, useState } from 'react';
import MentorTicketTable from '../../Components/AppAdminTable/MentorTicketTable';
import AppSideNavbar from '../../Components/AppSideBar/AppSidebar';
import Navbar from '../../Components/Navbar/Navbar';

const Tickets = () => {
  return (
    <div>
      <AppSideNavbar>
        <Navbar />
        <div className='p-20'>
          <MentorTicketTable />
        </div>
      </AppSideNavbar>
    </div>
  );
};

export default Tickets;
