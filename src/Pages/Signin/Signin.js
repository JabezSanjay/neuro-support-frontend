import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signinUser } from './helper';

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signinUser(data, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('User signin successful!');
        reset();
        navigate(`${response.data.role}/dashboard`);
      }
    });
  };

  return (
    <div className='bg-gray-700 h-screen'>
      <div className='lg:pt-24'>
        <div className='overflow-hidden'>
          <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
            <div className='flex flex-col items-center justify-between xl:flex-row'>
              <div className='w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12'>
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
                <div className='relative'>
                  <svg
                    viewBox='0 0 52 24'
                    fill='currentColor'
                    className='absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block'
                  >
                    <defs>
                      <pattern
                        id='766323e1-e594-4ffd-a688-e7275079d540'
                        x='0'
                        y='0'
                        width='.135'
                        height='.30'
                      >
                        <circle cx='1' cy='1' r='.7' />
                      </pattern>
                    </defs>
                    <rect
                      fill='url(#766323e1-e594-4ffd-a688-e7275079d540)'
                      width='52'
                      height='24'
                    />
                  </svg>
                  <div className='relative bg-white rounded shadow-2xl p-7 sm:p-10'>
                    <h3 className='mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                      Sign In
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-1 sm:mb-2'>
                        <label
                          htmlFor='email'
                          className='inline-block mb-1 font-medium'
                        >
                          E-mail
                        </label>
                        <InputText
                          placeholder='john.doe@example.org'
                          {...register('email', {
                            required: 'Email is required',
                          })}
                          style={{ width: '100%' }}
                        />
                        <p
                          style={{ fontSize: '15px' }}
                          className='mt-1 text-red-400'
                        >
                          {errors.email?.message}
                        </p>
                      </div>
                      <div className='mb-1 sm:mb-2'>
                        <label
                          htmlFor='password'
                          className='inline-block mb-1 font-medium'
                        >
                          Password
                        </label>
                        <InputText
                          type='password'
                          placeholder='Enter a new password'
                          {...register('password', {
                            required: 'Password is required',
                          })}
                          className='w-full'
                          feedback={false}
                        />
                        <p
                          style={{ fontSize: '15px' }}
                          className='mt-1 text-red-400'
                        >
                          {errors.password?.message}
                        </p>
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
                      <p className='text-xs text-gray-600 sm:text-sm'>
                        Dont have an account?
                        <Link className='text-blue-700' to='/signin'>
                          Sign Up
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
