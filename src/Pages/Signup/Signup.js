import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { signupUser } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await signupUser(data, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('User created successfully!');
      }
    });
    reset();
    navigate('/');
  };

  return (
    <div className='relative h-screen'>
      <img
        src='https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260'
        className='absolute inset-0 object-cover w-full h-full'
        alt=''
      />
      <div className='relative bg-gray-900 h-screen bg-opacity-75 pt-12'>
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
          <div className='flex flex-col items-center justify-between xl:flex-row'>
            <div className='w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
              <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none'>
                The quick, brown fox <br className='hidden md:block' />
                jumps over a{' '}
                <span className='text-teal-accent-400'>lazy dog</span>
              </h2>
              <p className='max-w-xl mb-4 text-base text-gray-400 md:text-lg'>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                quae.
              </p>
            </div>
            <div className='w-full max-w-xl xl:px-8 xl:w-5/12'>
              <div className='bg-white rounded shadow-2xl p-7 sm:p-10'>
                <h3 className='mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                  Sign up
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-1 sm:mb-2'>
                    <label className='inline-block mb-1 font-medium'>
                      Username
                    </label>
                    <div>
                      <InputText
                        placeholder='Doe Moan'
                        {...register('name', {
                          required: 'Username is required',
                        })}
                        style={{ width: '100%' }}
                      />
                      <p
                        style={{ fontSize: '15px' }}
                        className='mt-1 text-red-400'
                      >
                        {errors.username?.message}
                      </p>
                    </div>
                  </div>
                  <div className='mb-1 sm:mb-2'>
                    <label className='inline-block mb-1 font-medium'>
                      Email
                    </label>
                    <InputText
                      placeholder='john.doe@example.org'
                      {...register('email', {
                        required: 'Email is required',
                      })}
                      style={{ width: '100%' }}
                    />
                    {errors.email && (
                      <p
                        style={{ fontSize: '15px' }}
                        className='mt-1 text-red-400'
                      >
                        Email is required
                      </p>
                    )}
                  </div>
                  <div className='mb-1 sm:mb-2'>
                    <label className='inline-block mb-1 font-medium'>
                      Password
                    </label>
                    <div className='w-full'>
                      <InputText
                        placeholder='Enter a new password'
                        type='password'
                        {...register('password', {
                          required: 'Password is required',
                        })}
                        className='w-full'
                      />
                      <p
                        style={{ fontSize: '15px' }}
                        className='mt-1 text-red-400'
                      >
                        {errors.password?.message}
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 mb-2 sm:mb-4'>
                    <Button
                      style={{ width: '100%' }}
                      type='submit'
                      label='Submit'
                      aria-label='Submit'
                      loading={loading}
                    />
                  </div>
                  <p className='text-xs text-gray-600 sm:text-sm text-center'>
                    Already have an account?{' '}
                    <Link className='text-blue-700' to='/signin'>
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
