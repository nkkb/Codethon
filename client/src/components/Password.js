import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'
import styles from '../styles/Username.module.css';

export default function Password() {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  let [loginT, setloginT] = useState(0)
  const formik = useFormik({
    initialValues : {
      password : '1234;'
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setloginT(loginT+1);
      if(loginT===3){ const errorMessage = 'too many tries. Please try again later.';
      const path = `/error?message=${encodeURIComponent(errorMessage)}`;
      navigate(path); }
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        if(apiData?.type === "recruiter"){navigate('/Rjoboffer')}
        if(apiData?.type === "developer"){navigate('/Dhome')} 
        if(apiData?.type === "Instructor"){navigate('/Cun')}
        if(apiData?.type === "admin"){navigate('/Dashboard')} 
        if(apiData?.type === "Analyst"){navigate('/Analyst')} 
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

 
     



  return (
    <div >

      <Toaster position='top-center' reverseOrder={false}></Toaster>


      <section class="bg-gray-50 dark:bg-gray-900 h-screen">
  <div class="flex flex-col justify-center h-full py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
    <div class="flex flex-col justify-center">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Unlock Your Potential with Codathone</h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">We are dedicated to embracing the untapped potential of competitive learning platforms like Codathon. Our primary focus lies in markets where the convergence of technology, innovation, and capital can unleash boundless opportunities for long-term value creation and fuel substantial economic growth.</p>
    </div>
    <div>
      <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Login to Codethon</h2>
        <form onSubmit={formik.handleSubmit} class="mt-8 space-y-6" action="#">
          <div class='profile flex justify-center py-4'>
            <img src={apiData?.profile || avatar} class={styles.profile_img} alt="avatar" />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input {...formik.getFieldProps('password')} type="text" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
          </div>
          <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
          <div class="text-center py-4">
            <span class='text-gray-500'>Forgot Password? <Link class='text-red-500' to="/recovery">Recover Now</Link></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
