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
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<AdminRoute />}>
            <Route path='/admin/users' element={<Admin />} />
            <Route path='/admin/tickettracking' element={<TicketTracking />} />
          </Route>
          <Route element={<StudentRoute />}>
            <Route path='/user/chat' element={<ChatwithMentor />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position='bottom-right'
        autoClose={3100}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
}

function AvoidCreateOrSignin() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (auth.isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

function StudentRoute() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (!auth.isLoggedIn || auth.userInfo.role !== 'student') {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

function MentorRoute() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (!auth.isLoggedIn || auth.userInfo.role !== 'mentor') {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

function AdminRoute() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (!auth.isLoggedIn || auth.userInfo.role !== 'admin') {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

export default Router;
