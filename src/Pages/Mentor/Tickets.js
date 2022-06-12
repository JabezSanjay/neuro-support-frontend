import React, { useEffect } from 'react';
import MentorTicketTable from '../../Components/AppAdminTable/MentorTicketTable';
import AppSideNavbar from '../../Components/AppSideBar/AppSidebar';
import Navbar from '../../Components/Navbar/Navbar';
import axios from '../../axiosConfig';

const Tickets = () => {
  const readTickets = async () => {};
  useEffect(() => {}, []);
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
