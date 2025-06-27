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
import Python from '../assets/Python.png';
import useFetch from '../hooks/fetch.hook';

import { Createlearningpath,updateLearningPath,deleteLearningPath } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'



export default function Alearningpath() {

    const [{ isLoading, apiData, serverError }] = useFetch()

  const [paths, setpaths] = useState([]);
  const [path, setpath] = useState([]);

  const navigate = useNavigate()
 

  const formik = useFormik({
    initialValues: {
      LearningpathName: '',
      Language: '',
      Points: null,
      Description: '',
    },
    onSubmit: async (values) => {
      let errors = {};

      // Perform manual validation
      if (!values.LearningpathName) {
        errors.LearningpathName = 'Learning path name is required';
      }

      if (!values.Language) {
        errors.Language = 'Language is required';
      }

      if (!values.Points) {
        errors.Points = 'Points is required';
      } else if (isNaN(values.Points)) {
        errors.Points = 'Points must be a number';
      }

      if (!values.Description) {
        errors.Description = 'Description is required';
      }

      if (Object.keys(errors).length > 0) {
        // Display validation errors as toasts
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {
        // No validation errors, submit the form
        let registerPromise = Createlearningpath(values);
        toast.promise(registerPromise, {
          loading: 'Creating...',
          success: 'Learning path added successfully!',
          error: 'Could not add the learning path.',
        });
      }
    },
  });

  const formik1 = useFormik({
    initialValues: {
      LearningpathName: '',
      Language: '',
      Points: null,
      Description: '',
    },
    onSubmit: async (values) => {
      let errors = {};

      // Perform manual validation
      if (!values.LearningpathName) {
        errors.LearningpathName = 'Learning path name is required';
      }

      if (!values.Language) {
        errors.Language = 'Language is required';
      }

      if (!values.Points) {
        errors.Points = 'Points is required';
      } else if (isNaN(values.Points)) {
        errors.Points = 'Points must be a number';
      }

      if (!values.Description) {
        errors.Description = 'Description is required';
      }

      if (Object.keys(errors).length > 0) {
        // Display validation errors as toasts
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {
        // No validation errors, update the learning path
        let registerPromise = updateLearningPath(values);
        toast.promise(registerPromise, {
          loading: 'Updating...',
          success: 'Learning path updated successfully!',
          error: 'Could not update the learning path.',
        });
      }
    },
  });

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    
    setIsOpen(false)
  }

  function openModal() {

   
    setIsOpen(true)
  }


  let [isOpen1, setIsOpen1] = useState(false)

  function closeModal1() {
    
    setIsOpen1(false)
  }

  function openModal1() {

   
    setIsOpen1(true)
  }

  useEffect(() => {
    
    axios.get('http://localhost:8080/api/getlearningpaths')
      .then(response => {
        setpaths(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
        <a href="/" class="flex ml-2 md:mr-24">
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
          
          <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleDrawer(true)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-6 h-6 mr-4">
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
      <Link to="/ADprofile">Profile </Link>  
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
             icon={HiIcons.HiChartBar}
             onClick={(e) => {
               navigate('/Dashboard');
             }}
           >
             Dashboard
           </Sidebar.Item>
           <Sidebar.Collapse
             icon={HiIcons.HiPuzzle}
             label="Challenges"
            
           >
              <Sidebar.Item  onClick={(e) => {
               navigate('/Aplan');
             }}>
              Planify a challenges
             </Sidebar.Item>
             <Sidebar.Item  onClick={(e) => {
               navigate('/AplanJO');
             }}>
              Planify a job offer 
             </Sidebar.Item>
             <Sidebar.Item  onClick={(e) => {
               navigate('/Cplan');
             }}>
              view the Planifiction
             </Sidebar.Item>
           </Sidebar.Collapse>
          
           <Sidebar.Item
             href="#"
             icon={HiIcons.HiUser}
             onClick={(e) => {
               navigate('/Ausers');
             }}
           >
             users
           </Sidebar.Item>
           <Sidebar.Item
             href="#"
             icon={HiIcons.HiOutlineTable}
             onClick={(e) => {
               navigate('/Aquestion');
             }}
           >
             Question
           </Sidebar.Item>
           <Sidebar.Item
             href="#"
             icon={HiIcons.HiAcademicCap}
             onClick={(e) => {
               navigate('/Alearningpath');
             }}
           >
             Learning path
           </Sidebar.Item>
           <Sidebar.Item
             href="#"
             icon={HiIcons.HiOutlineTable}
             onClick={(e) => {
               navigate('/Areport');
             }}
           >
             reports
           </Sidebar.Item>
           
         </Sidebar.ItemGroup>
       </Sidebar.Items>
     </Sidebar>
   
         </aside>





      
      <div class="p-4 sm:ml-64 py-10">
  <div class="bg-gray-800  rounded px-8 py-30 pt-6 pb-8 flex flex-wrap mb-4">

  <div class="overflow-x-auto w-full border-b border-gray-600 sm:rounded-lg">
  <div class="flex flex-wrap">

  {paths.map((path) => (
    <div value={path} class="w-full md:w-1/2 p-4">
      <div class="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-600">
        <img class="h-40 w-full rounded-t-lg object-cover" src={Python} alt="" />
        <div class="flex flex-col justify-start p-4">
          <h5 class="mb-2 text-lg font-medium text-neutral-800 dark:text-neutral-50">
          {path.LearningpathName}
          </h5>
          <p class="mb-2 text-sm text-neutral-600 dark:text-neutral-200">
          {path.Description}
          </p>
      
          </div>
          <div class="flex items-center justify-center space-x-2"> {/* Centered Buttons */}
  <button
    class="bg-yellow-500 text-white p-2 rounded"
    onClick={() => {
      formik1.setFieldValue('LearningpathName', path.LearningpathName );
                formik1.setFieldValue('Description', path.Description );
                formik1.setFieldValue('Language', path.Language );
                formik1.setFieldValue('Points', path.Points );
      openModal1();

    }}
  >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
  </button>
  <button
    class="bg-red-500 text-white p-2 rounded"
    onClick={() => {
      const value = { LearningpathName: path.LearningpathName};
      const values = Object.assign(value)
      let registerPromise = deleteLearningPath( values );
        toast.promise(registerPromise, {
          loading: 'deteting...',
          success : <b>Learning path deleted Successfully...!</b>,
          error : <b>Could not deleted the Learning path .</b>
        });
                   
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
  </button>
</div>

        <a href="#" onClick={(e) => {
  localStorage.setItem('LearningpathName', path.LearningpathName);
  navigate('/Astructure');
}}
 class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  see structure
  <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
  </svg>
</a>

      </div>
    </div>

))}
    
  </div>
</div>



    <button  onClick={() => {openModal()}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add learning path 
        </button>
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
          <label class="block text-white  font-bold mb-2" for="LearningpathName">
          Learning path Name
          </label>
          <input {...formik.getFieldProps('LearningpathName')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="LearningpathName" type="text" placeholder="LearningpathName" />
        </div>
       
        <div class="mb-4">
          <label  class="block text-white  font-bold mb-2"  id="Language" for="language">
            Type
          </label>
          <select {...formik.getFieldProps('Language')}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="language">
            <option value="">Select a Language</option>
                     <option value="Python">Python</option>
                     <option value="JavaScript">JavaScript</option>
                     <option value="Java">Java</option>
                    </select>
               </div>
        
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="Points">
          Points
          </label>
          <input {...formik.getFieldProps('Points')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Points" type="number" placeholder="Points" />
        </div>

        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="challenge-name">
          Description
          </label>
          <textarea  rows={4} 
      cols={40}{...formik.getFieldProps('Description')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Description" type="text" placeholder="Description" />
        </div>
        
        
                
             
      
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                add  
          </button>
</div>
</form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>





      <Transition appear show={isOpen1} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal1}>
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
                  
      <form onSubmit={formik1.handleSubmit} class="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
      
      <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="LearningpathName">
         update Learning path
          </label>
        </div>
       
        <div class="mb-4">
          <label  class="block text-white  font-bold mb-2"  id="Language" for="language">
            Type
          </label>
          <select {...formik1.getFieldProps('Language')}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="language">
            <option value="">Select a Language</option>
                     <option value="Python">Python</option>
                     <option value="JavaScript">JavaScript</option>
                     <option value="Java">Java</option>
                    </select>
               </div>
        
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="Points">
          Points
          </label>
          <input {...formik1.getFieldProps('Points')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Points" type="number" placeholder="Points" />
        </div>

        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="challenge-name">
          Description
          </label>
          <textarea  rows={4} 
      cols={40}{...formik1.getFieldProps('Description')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Description" type="text" placeholder="Description" />
        </div>
        
        
                
             
      
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                update  
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