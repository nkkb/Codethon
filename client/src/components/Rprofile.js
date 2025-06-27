import React, { useEffect, useState,Fragment } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { challenge } from '../helper/helper'
import {Dropdown,Card,Button,Modal,Sidebar, SidebarItem, SidebarCollapse, SidebarItemGroup , Footer, Avatar, Breadcrumb,Accordion} from 'flowbite-react';
import logo from '../assets/loigo.png';
import { Dialog, Transition } from '@headlessui/react'
import * as HiIcons from 'react-icons/hi';
import styles from '../styles/Username.module.css';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { updateUser } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import convertToBase64 from '../helper/convert';
import extend from '../styles/Profile.module.css'
import { HiChartPie, HiShoppingBag, HiInbox, HiUser, HiArrowSmRight, HiTable,HiHome,BsInstagram,BsGithub,BsTwitter,BsDribbble,HiAcademicCap,HiCheck } from 'react-icons/hi';


export default function Rprofile() {
 


    const [file, setFile] = useState();
  const navigate = useNavigate()

  const [{ isLoading, apiData, serverError }] = useFetch()


  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    
    setIsOpen(false)
  }

  function openModal() {

   
    setIsOpen(true)
  }

  const formik = useFormik({
    initialValues : {
      firstName:  null,
      lastName:  null,
      email:  null,
      mobile:  null,
      address: null
     },



      onSubmit : async values => {
        values = await Object.assign(values, { profile : file || apiData?.profile || ''})
        let updatePromise = updateUser(values);

        toast.promise(updatePromise, {
          loading: 'Updating...',
          success : <b>Update Successfully...!</b>,
          error: <b>Could not Update!</b>
        });


      }
    })
   
      /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }



  const [Notifications, setNotifications] = useState([]);
 useEffect(() => {
    if (apiData) {
    axios.get(`http://localhost:8080/api/getNotification/${apiData?.username}`)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.log(error);
      });}
  }, [apiData]);
  


  const theme = createTheme({
    palette: {
      mode: 'dark', // Set the theme mode to dark
    },
  });

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, right: open });
  };



  const list = (anchor) => (
    <div className="bg-gray-700 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {Notifications.map((notification, index) => (
        <div key={index} className="bg-gray-800 rounded p-3 mb-3">
          <h3 className="text-lg font-semibold mb-1">{notification.title}</h3>
          <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: notification.Content }}></p>

        </div>
      ))}
    </div>
  );





  return (

    
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      

      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="*" class="flex ml-2 md:mr-24">
          <img src={logo} class="h-8 mr-3" alt="FlowBite Logo" />
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Codathon</span>
        </a>
      </div>



      <div class="flex items-center justify-start">
      <div class="flex md:order-2">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Search</span>
    </button>
    <div class="relative hidden md:block">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
    </div>
    <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
      <span class="sr-only">Open menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
      </div>



    
      <div class="flex items-center">
        
          <div class="flex items-center ml-3">
          
          <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleDrawer(true)}  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-6 h-6 mr-4">
           <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
         </svg>



            <div>
            <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img={apiData?.profile || avatar } rounded={true} size="sm" />}
    >
      
      <Dropdown.Header>
        <span className="block text-sm">
        {apiData?.username || '' }
        </span>
        <span className="block truncate text-sm font-medium">
        {apiData?.email || '' }
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
      <Link to="/Rprofile">Profile </Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>
      <Link to="/Log In">Log out</Link> 
      </Dropdown.Item>
    </Dropdown>
    
            </div>
            <span class="ml-4 self-center  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{apiData?.username}</span>
          </div>
        </div>
        
    </div>
  </div>
      </nav>
      
      <aside class="fixed top-0 left-0 z-40 w-64 h-screen mt-10 pt-0 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" >
     
    
  <Sidebar >
    <Sidebar.Items>
      <Sidebar.ItemGroup>
         <Sidebar.Item
          href="#"
          icon={HiTable}
          onClick={(e) => {
            navigate('/Rjoboffer');
          }}
        >
          job offer
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiCheck}
          onClick={(e) => {
            navigate('/RRresult');
          }}
        >
          result
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>


      </aside>

  
      
      <div class="p-4 sm:ml-64 py-10 ">
      <div class="bg-gray-800 shadow-md rounded px-8 py-10 pt-6 pb-8 flex flex-wrap mb-4">

        
 
    <div className="container mx-auto py-80 px-4">
    <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-xl rounded-lg -mt-64">
  <div className="px-6">
    <div className="flex flex-wrap justify-center">
      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
        <div className="relative">
          <img
            alt="..."
            src={apiData?.profile || avatar}
            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
            style={{ maxWidth: "150px" }}
          />
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4 lg:order-1 lg:text-right lg:self-center">
        <div className="py-6 px-20 mt-32 sm:mt-0">
        <button
            className="bg-blue-500 active:bg-blue-300 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={() => {
              formik.setFieldValue('lastName', apiData?.lastName );
              formik.setFieldValue('firstName', apiData?.firstName );
              formik.setFieldValue('mobile', apiData?.mobile );
              formik.setFieldValue('address', apiData?.address );
              openModal();
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4 lg:order-3">
        <div className="flex justify-center py-4 lg:pt-4 pt-8">
          <div className="mr-4 p-3 text-center">
            <span className="text-xl font-bold block uppercase tracking-wide text-white">
            {apiData?.firstName}  {apiData?.lastName} 
            </span>
            <span className="text-sm text-gray-300">FULLNAME</span>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center mt-12">
      <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
      {apiData?.username || "" } 
      </h3>
      <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold uppercase">
        <i className="fas fa-map-marker-alt mr-2 text-lg text-white"></i>{" "}
        {apiData?.email || "" } 
      </div>
      <div className="mb-2 text-gray-300 mt-10">
        <i className="fas fa-briefcase mr-2 text-lg text-gray-300"></i>
        {apiData?.type || "" } 
      </div>
      <div className="mb-2 text-gray-300">
        <i className="fas fa-university mr-2 text-lg text-gray-300"></i>
        Recruiter of our system
      </div>
    </div>
    <div className="mt-10 py-10 border-t border-gray-300 text-center">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-9/12 px-4">
          <p className="mb-4 text-lg leading-relaxed text-gray-300">
          Our recruiters play a pivotal role in our competitive learning platform, driving the talent acquisition process by leveraging challenges to identify and assess the best-suited candidates. As recruiters, they utilize innovative and data-driven approaches to attract, evaluate, and onboard top talent for various roles.
          </p>
         
        </div>
      </div>
    </div>
  </div>
 </div>
</div>



</div>
</div>

<Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl sm:max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <div class="overflow-x-auto w-full shadow-md overflow-hidden border-b  border-gray-600 sm:rounded-lg">

                <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>
                <form onSubmit={formik.handleSubmit} class="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        


        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="firstName">
          firstName
          </label>
          <input {...formik.getFieldProps('firstName')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="points" type="text" placeholder="firstName" />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="lastName">
          lastName
          </label>
          <textarea {...formik.getFieldProps('lastName')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Description" type="text" placeholder="lastName" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="challenge-name">
          mobile
          </label>
          <input {...formik.getFieldProps('mobile')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Test" type="number" placeholder="mobile" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="address">
          address
          </label>
          <input {...formik.getFieldProps('address')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Test" type="text" placeholder="address" />
        </div>
      
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            update user
          </button>
</div>
</form>
      
    </div>
     
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>





      <ThemeProvider theme={theme}> {/* Apply the custom theme */}
      <Drawer
       
        anchor="right"
        open={state.right}
        onClose={toggleDrawer(false)}
        classes={{
          paper: 'bg-gray-300',
        }}
      >
        {list('right')}
      </Drawer>
      </ThemeProvider>







</div>
);
}