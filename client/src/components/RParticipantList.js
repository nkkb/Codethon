import React, { useEffect, useState,Fragment } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Drawer from '@mui/material/Drawer';


import axios from 'axios';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { challenge } from '../helper/helper'
import {Dropdown,Card,Button,Modal,Sidebar, SidebarItem, SidebarCollapse, SidebarItemGroup , Footer, Avatar, Breadcrumb,Accordion} from 'flowbite-react';
import logo from '../assets/loigo.png';
import { Dialog, Transition } from '@headlessui/react'
import * as HiIcons from 'react-icons/hi';
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { createinterview } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
import { HiPuzzle,HiChartBar,HiBookOpen,HiChartPie, HiShoppingBag,HiCheck, HiInbox, HiUser, HiArrowSmRight, HiTable,HiHome,BsInstagram,BsGithub,BsTwitter,BsDribbble,HiAcademicCap } from 'react-icons/hi';

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;



export default function RParticipantList() {

  


    const [{ isLoading, apiData, serverError }] = useFetch()

  const [users, setusers] = useState([]);
  const [user, setuser] = useState([]);
  const [Notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues : {
        Joboffername : localStorage.getItem('Joboffer'),
        Dinterview: "",
        link: "",
        username: "ilyes_nkk",
        Rname : "hzar"
     },
      onSubmit : async values => {
          
          values = await Object.assign(values)
          let registerPromise = createinterview(values)
          toast.promise(registerPromise, {
            loading: 'Creating...',
            success : <b>interview created Successfully...!</b>,
            error : <b>Could not created the interview Enter a different date .</b>
          });
      }
    })


  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/getPjoboffer/${localStorage.getItem('Joboffer')}`)
      .then(response => {
        setusers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

   
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
  
  const handleRangePickerChange = (dates) => {
    if (dates) {

        formik.setFieldValue('Dinterview', dates.format('YYYY-MM-DDTHH:mm:ss'));

    }
  };

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



      <div className="p-4 sm:ml-64 py-10">
  <div className="bg-gray-800 shadow-md rounded mb-4 ">
    <div className="max-w-5xl mx-auto py-10">
    <h2 className="text-4xl text-white font-bold mb-6">Participant List</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.username}
            className="bg-gray-500 shadow-md rounded-lg overflow-hidden text-gray-100"
          >
            <div className="px-6 py-4">
              <h3 className="text-2xl font-semibold">
                {user.username}
              </h3>
              <div className="flex items-center mt-2">
                <span>
                  Score: {user.NbrCAnswer} | Questions: {user.NbrQ}
                </span>
              </div>
            </div>
            <div className="flex justify-center bg-gray-400 py-3 dark:hover:bg-gray-600">
              <button   className="px-4 py-2 text-white bg-blue-500 rounded-md dark:hover:bg-blue-600 dark:hover:text-white" onClick={() => {
                            formik.setFieldValue('username', user.username);
                            formik.setFieldValue('Rname', apiData?.username);
                            openModal();

                          }}>
                Schedule an Interview
              </button>
            </div>
          </div>
        ))}
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
                  
      <form onSubmit={formik.handleSubmit} class="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
      
      <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="firstName">
          Data
          </label>
          <Space direction="vertical" size={12}>
    <DatePicker showTime onChange={handleRangePickerChange} />
    
     </Space>
      </div>
       
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="ChallengeName">
          Link
          </label>
          <input {...formik.getFieldProps('link')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="link" type="text" placeholder="link" />
        </div>
      
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            add interview 
          </button>
</div>
</form>
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