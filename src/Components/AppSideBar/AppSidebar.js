import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { RiDashboardLine, RiProfileLine } from 'react-icons/ri';
import useCollapse from 'react-collapsed';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AppSideNavbar = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className='relative min-h-screen max-w-screen md:flex'>
      <div className='bg-[#4F46E5] text-blue-100 p-4 flex justify-between md:hidden'>
        <a
          href='/'
          aria-label='Company'
          title='Company'
          className='inline-flex items-center ml-4'
        >
          <svg
            className='w-8 text-white'
            viewBox='0 0 24 24'
            strokeLinejoin='round'
            strokeWidth='2'
            strokeLinecap='round'
            strokeMiterlimit='10'
            stroke='currentColor'
            fill='none'
          >
            <rect x='3' y='1' width='7' height='12' />
            <rect x='3' y='17' width='7' height='6' />
            <rect x='14' y='1' width='7' height='6' />
            <rect x='14' y='11' width='7' height='12' />
          </svg>
          <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase'>
            Neuro
          </span>
        </a>

        <button
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-indigo-700'
        >
          {/* <RiMenuUnfoldLine size={26} /> */}
        </button>
      </div>

      <section {...getCollapseProps()} className='md:hidden'>
        <nav>
          <Link
            // href={`/${role}/dashboard`}
            to='/admin/tickettracking'
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
          >
            <RiDashboardLine size={25} className='mr-3' />
            Ticket Tracking
          </Link>
          <Link
            to='/student/chat'
            className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
          >
            <RiProfileLine size={25} className='mr-3' />
            {userInfo.role === 'student'
              ? 'Chat with Mentor'
              : 'Chat with Student'}
          </Link>
        </nav>
      </section>

      <div className='sidebar bg-[#4F46E5] text-blue-100 w-64 space-y-12 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'>
        <a
          href='/'
          aria-label='Company'
          title='Company'
          className='inline-flex items-center ml-4'
        >
          <svg
            className='w-8 text-white'
            viewBox='0 0 24 24'
            strokeLinejoin='round'
            strokeWidth='2'
            strokeLinecap='round'
            strokeMiterlimit='10'
            stroke='currentColor'
            fill='none'
          >
            <rect x='3' y='1' width='7' height='12' />
            <rect x='3' y='17' width='7' height='6' />
            <rect x='14' y='1' width='7' height='6' />
            <rect x='14' y='11' width='7' height='12' />
          </svg>
          <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase'>
            Neuro
          </span>
        </a>

        <nav>
          {userInfo.role === 'mentor' && (
            <>
              <Link
                to='/mentor/dashboard'
                className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
              >
                <RiDashboardLine size={25} className='mr-3' />
                Ticket Tracking
              </Link>
              <Link
                to='/mentor/chat'
                className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
              >
                <RiProfileLine size={25} className='mr-3' />
                Chat with Student
              </Link>
            </>
          )}
          {userInfo.role === 'student' && (
            <>
              <Link
                to='/student/tickettracking'
                className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
              >
                <RiDashboardLine size={25} className='mr-3' />
                Ticket Tracking
              </Link>
              <Link
                to='/student/chat'
                className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
              >
                <RiProfileLine size={25} className='mr-3' />
                Chat with Mentor
              </Link>
            </>
          )}
          {userInfo.role === 'admin' && (
            <>
              <Link
                to='/admin/dashboard'
                className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
              >
                <RiDashboardLine size={25} className='mr-3' />
                Add User
              </Link>
              <Link
                to='/admin/tickettracking'
                className={`flex items-center py-4 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white mb-2`}
              >
                <RiProfileLine size={25} className='mr-3' />
                Ticket Tracking
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default AppSideNavbar;
