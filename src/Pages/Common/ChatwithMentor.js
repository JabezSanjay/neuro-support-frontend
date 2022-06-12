import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import AppSideNavbar from '../../Components/AppSideBar/AppSidebar';
import Navbar from '../../Components/Navbar/Navbar';
import socket, { connectingSocket } from '../../socket';
import { getConnectedUser } from './helper';
import { AvatarGenerator } from 'random-avatar-generator';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from '../../axiosConfig';
import { toast } from 'react-toastify';

function ChatwithMentor() {
  const generator = new AvatarGenerator();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectedUser, setConnectedUser] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [reloadmesssage, setReloadmesssage] = useState(true);
  const [modal, setModal] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    connectingSocket(userInfo);
    getConnectedUser().then((res) => {
      setConnectedUser(res.data.data);
      setChatUser(res.data.data[0]);
      socket.emit('retrieve-messages', {
        connectedUserId: res.data.data[0]?.socketId,
      });

      // console.log(userInfo)
      socket.on('private-message', (data) => {
        setMessages(data);
      });
    });
  }, [userInfo]);

  const [status] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ]);

  const [selectedStatus, setSelectedStatus] = useState({
    status: '',
    createdFor: '',
  });

  const courses = [
    {
      label: 'Web Development',
    },
    {
      label: 'Mobile Development',
    },
    {
      label: 'Data Science',
    },
  ];

  useEffect(() => {
    // console.log(userInfo)
    socket.on('private-message', (data) => {
      setMessages(data);
    });
  }, [reloadmesssage]);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const onSubmitHandler = (msg) => {
    // console.log(message)
    message &&
      socket.emit('private-message', {
        connectedUserId: chatUser.socketId,
        content: message,
      });
    socket.on('private-message', (data) => {
      setMessages(data);
    });
    setMessage('');
    setReloadmesssage(!reloadmesssage);
  };
  const onUserSelect = (user) => {
    setChatUser(user);
    socket.emit('retrieve-messages', {
      connectedUserId: user.socketId,
    });
    // console.log(userInfo)
    socket.on('private-message', (data) => {
      setMessages(data);
    });
  };
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  });
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const getMentors = async () => {
    await axios
      .post('/mentor/read/course', {
        course: watch('course'),
      })
      .then((res) => {
        setMentors(res.data.data);
      });
  };

  useEffect(() => {
    getMentors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('course')]);

  const onSubmit = async (data) => {
    // reset();
    data.createdFor = chatUser.socketId;
    setLoading(true);
    await axios.post('/mentor/create/ticket', data).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
        setModal(false);
        reset();
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className='h-screen'>
      <AppSideNavbar>
        <Navbar />
        <div className='h-24'>
          <div className=' mx-auto'>
            <div className='min-w-full border rounded lg:grid lg:grid-cols-3'>
              <div className='border-r border-gray-300 lg:col-span-1'>
                <div className='mx-3 my-3'>
                  <div className='relative text-gray-600'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        viewBox='0 0 24 24'
                        className='w-6 h-6 text-gray-300'
                      >
                        <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                      </svg>
                    </span>
                    <input
                      type='search'
                      className='block w-full py-2 pl-10 bg-gray-100 rounded outline-none'
                      name='search'
                      placeholder='Search'
                      required
                    />
                  </div>
                </div>
                <ul className='h-[32rem]'>
                  <h2 className='my-2 mb-2 ml-2 text-lg text-gray-600'>
                    Chats
                  </h2>
                  <li>
                    {connectedUser.map((user) => {
                      return (
                        <div
                          onClick={() => {
                            onUserSelect(user);
                          }}
                          className={`flex items-center px-3 py-2 ${
                            chatUser._id === user._id ? 'bg-gray-100' : ''
                          } text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none`}
                        >
                          <img
                            className='object-cover w-10 h-10 rounded-full'
                            src={generator.generateRandomAvatar('avatar')}
                            alt='username'
                          />
                          <div className='w-full pb-2'>
                            <div className='flex justify-between'>
                              <span className='block ml-2 font-semibold text-gray-600'>
                                {user.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
              <div className='hidden lg:col-span-2 lg:block'>
                <div className='w-full'>
                  <div className='relative flex items-center p-3 border-b border-gray-300'>
                    <div className='flex justify-between  items-center w-full'>
                      <div className='flex justify-center items-center'>
                        <img
                          className='object-cover w-10 h-10 rounded-full'
                          src={generator.generateRandomAvatar('avatar')}
                          alt='username'
                        />
                        <span className='block ml-2 font-bold text-gray-600'>
                          {chatUser.name}
                        </span>
                        <span className='absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3'></span>
                      </div>
                      <div className='items-center mr-4'>
                        {
                          //find the index of the user in the connectedUser array
                          chatUser.role === 'student' && (
                            <Button
                              className='bg-gray-100'
                              onClick={() => {
                                setModal(true);
                              }}
                            >
                              Create Ticket
                            </Button>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className='relative w-full p-6 overflow-y-auto h-[40rem]'>
                    <ul className='space-y-2' ref={divRef}>
                      {messages && (
                        <>
                          {messages.map((message) => {
                            return (
                              <>
                                {message.sender === userInfo.socketId ? (
                                  <>
                                    <li className='flex justify-end'>
                                      <div className='relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow'>
                                        <span className='block'>
                                          {message.content}
                                        </span>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <>
                                    <li className='flex justify-start'>
                                      <div className='relative max-w-xl px-4 py-2 text-gray-700 rounded shadow'>
                                        <span className='block'>
                                          {message.content}
                                        </span>
                                      </div>
                                    </li>
                                  </>
                                )}
                              </>
                            );
                          })}
                        </>
                      )}
                      <li
                        style={{
                          height: '20px',
                        }}
                      ></li>
                    </ul>
                  </div>
                  <div className='flex items-center justify-between w-full p-3 border-t border-gray-300'>
                    <input
                      type='text'
                      placeholder='Message'
                      className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
                      name='message'
                      required
                      value={message}
                      onChange={onMessageChange}
                    />
                    <button type='submit' onClick={onSubmitHandler}>
                      <svg
                        className='w-5 h-5 text-gray-500 origin-center transform rotate-90'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          header='Create Ticket'
          visible={modal}
          style={{ width: '30vw' }}
          onHide={() => setModal(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1 sm:mb-2'>
              <label htmlFor='username1' className='block'>
                Content
              </label>
              <InputText
                // id="username1"
                {...register('content', {
                  required: 'Content is required',
                })}
                aria-describedby='username1-help'
                className='block w-full '
              />
              <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                {errors.content?.message}
              </p>
            </div>
            <div className='mb-1 sm:mb-2'>
              <label htmlFor='username1' className='block'>
                Created For
              </label>
              <InputText
                // id="username1"

                value={chatUser.name}
                aria-describedby='username1-help'
                className='block w-full'
                disabled
              />
            </div>
            <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
              {errors.createdFor?.message}
            </p>
            <div className='mb-1 sm:mb-2'>
              <label className='block'>Course</label>
              <Dropdown
                value={watch('course')}
                optionValue='label'
                className='w-full'
                options={courses}
                {...register('course', {
                  required: 'Course is required',
                })}
                optionLabel='label'
                placeholder='Select a course'
              />
              <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                {errors.course?.message}
              </p>
            </div>
            <div className='mb-1 sm:mb-3'>
              <label htmlFor='username1' className='block'>
                Assignee Mentor
              </label>
              <Dropdown
                value={watch('mentor')}
                optionValue='socketId'
                className='w-full'
                options={mentors}
                {...register('mentor', {
                  required: 'Mentor is required',
                })}
                optionLabel='name'
                placeholder='Select a mentor'
              />
              <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                {errors.mentor?.message}
              </p>
            </div>

            <div>
              <Button
                style={{ height: '45px' }}
                label='Create Ticket'
                // icon="pi pi-plus"
                className='p-button w-full'
                type='submit'
                loading={loading}
              />
            </div>
          </form>
        </Dialog>
      </AppSideNavbar>
    </div>
  );
}

export default ChatwithMentor;
