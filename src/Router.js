import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tickets from "./Pages/Admin/Tickets";
import Admin from "./Pages/Admin/User";
import ChatwithMentor from "./Pages/Common/ChatwithMentor";
import TicketTracking from "./Pages/Common/TrackingTicket";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/users" element={<Admin />} />
          <Route path="/admin/tickets" element={<Tickets />} />
          <Route path="/admin/tickettracking" element={<TicketTracking />} />
          <Route path="/user/chat" element={<ChatwithMentor />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route element={<LoggedInUsers />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
