import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  RiDashboardLine,
  RiMenuUnfoldLine,
  RiProfileLine,
  RiTaskLine,
} from 'react-icons/ri';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import useCollapse from 'react-collapsed';
import { useState } from 'react';

const AppSideNavbar = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const token = Cookies.get('token');
  if (token) {
    var decode = jwt_decode(token);
    var role = decode.role;
  }

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // const role = "";

  // isAdmin ? (role = "admin") : (role = "user");

  return (
    <div className='relative min-h-screen max-w-screen md:flex'>
      <div className='bg-indigo-800 text-blue-100 flex justify-between md:hidden'>
        <a href='/' className='block p-4 text-white font-bold'>
          My Office
        </a>

        <button
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-indigo-700'
        >
          <RiMenuUnfoldLine size={26} />
        </button>
      </div>

      <section {...getCollapseProps()} className='md:hidden'>
        <nav>
          <a
            href={`/${role}/dashboard`}
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2 ${
              pathname === `/${role}/dashboard`
                ? 'bg-indigo-700 text-white'
                : ''
            }`}
          >
            <RiDashboardLine size={25} className='mr-3' />
            Dashboard
          </a>
          <a
            href={`/${role}/projects`}
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2 ${
              pathname === `/${role}/projects` ? 'bg-indigo-700 text-white' : ''
            }`}
          >
            <RiProfileLine size={25} className='mr-3' />
            Projects
          </a>
          <a
            href='/user/tasks'
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2 ${
              pathname === '/user/tasks' ? 'bg-indigo-700 text-white' : ''
            }`}
          >
            <RiTaskLine size={25} className='mr-3' />
            Tasks
          </a>
        </nav>
      </section>

      <div className='sidebar bg-indigo-800 text-blue-100 w-64 space-y-12 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'>
        <a href='/' className='text-white flex items-center space-x-2 px-4'>
          <span className='text-2xl font-extrabold'>My Office</span>
        </a>

        <nav>
          <a
            href={`/${role}/dashboard`}
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2 ${
              pathname === `/${role}/dashboard`
                ? 'bg-indigo-700 text-white'
                : ''
            }`}
          >
            <RiDashboardLine size={25} className='mr-3' />
            Dashboard
          </a>
          <a
            href={`/${role}/projects`}
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2 ${
              pathname === `/${role}/projects` ? 'bg-indigo-700 text-white' : ''
            }`}
          >
            <RiProfileLine size={25} className='mr-3' />
            Projects
          </a>
          <a
            href='/user/tasks'
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2 ${
              pathname === '/user/tasks' ? 'bg-indigo-700 text-white' : ''
            }`}
          >
            <RiTaskLine size={25} className='mr-3' />
            Tasks
          </a>
        </nav>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default AppSideNavbar;
