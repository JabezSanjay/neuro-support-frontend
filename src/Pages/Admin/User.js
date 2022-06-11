import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import AppSideBar from '../../Components/AppSideBar/AppSidebar';
import AdminUserTable from '../../Components/AppAdminTable/AdminUserTable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { useForm } from 'react-hook-form';
import { createUser, readUser } from './helper/index';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Admin() {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    readUser(dispatch).then((res) => {
      setUsers(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const domain = [
    { name: 'Mentor', value: 'mentor' },
    { name: 'Student', value: 'student' },
  ];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createUser(data, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('User created successful!');
        reset();
      }
    });
  };

  return (
    <div>
      <AppSideBar>
        <Navbar />
        <div className='w-11/12 mx-auto mt-14'>
          <div className='flex justify-end'>
            <Button
              onClick={() => setModalOpen(true)}
              style={{ height: '45px' }}
              label='Create User'
              icon='pi pi-plus'
              className='p-button'
            />
          </div>
          <Dialog
            header='Create User'
            visible={modalOpen}
            style={{ width: '30vw' }}
            onHide={() => setModalOpen(false)}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1 sm:mb-2'>
                <label htmlFor='username1' className='block'>
                  Username
                </label>
                <InputText
                  // id="username1"
                  {...register('name', {
                    required: 'Username is required',
                  })}
                  aria-describedby='username1-help'
                  className='block w-full '
                />
                <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                  {errors.username?.message}
                </p>
              </div>
              <div className='mb-1 sm:mb-2'>
                <label htmlFor='username1' className='block'>
                  Email
                </label>
                <InputText
                  // id="username1"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  aria-describedby='username1-help'
                  className='block w-full '
                />
              </div>
              <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                {errors.email?.message}
              </p>
              <div className='mb-1 sm:mb-2'>
                <label className='block'>Password</label>
                <InputText
                  type='password'
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className='w-full'
                />
                <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                  {errors.password?.message}
                </p>
              </div>
              <div className='mb-1 sm:mb-3'>
                <label htmlFor='username1' className='block'>
                  Role
                </label>
                <Dropdown
                  value={watch('role')}
                  optionValue='value'
                  className='w-full'
                  options={domain}
                  {...register('role', {
                    required: 'Role is required',
                  })}
                  optionLabel='name'
                  placeholder='Select a role'
                />
                <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                  {errors.role?.message}
                </p>
              </div>
              <div className='mb-1 sm:mb-3'>
                <label htmlFor='username1' className='block'>
                  Course
                </label>
                <MultiSelect
                  value={watch('course')}
                  optionValue='label'
                  className='w-full'
                  options={courses}
                  {...register('course', {
                    required: 'Course is required',
                  })}
                  // optionLabel='name'
                  placeholder='Select a course'
                />
                <p style={{ fontSize: '15px' }} className='mt-1 text-red-400'>
                  {errors.course?.message}
                </p>
              </div>
              <div>
                <Button
                  style={{ height: '45px' }}
                  label='Create User'
                  // icon="pi pi-plus"
                  className='p-button w-full'
                />
              </div>
            </form>
          </Dialog>
          <AdminUserTable users={users} />
        </div>
      </AppSideBar>
    </div>
  );
}

export default Admin;
