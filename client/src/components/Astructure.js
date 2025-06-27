import React, { useEffect, useState,Fragment } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import {Dropdown,Card,Button,Modal,Sidebar, SidebarItem, SidebarCollapse, SidebarItemGroup , Footer, Avatar, Breadcrumb,Accordion} from 'flowbite-react';
import logo from '../assets/loigo.png';
import { Dialog, Transition } from '@headlessui/react'
import * as HiIcons from 'react-icons/hi';
import avatar from '../assets/profile.png';
import Python from '../assets/Python.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { CreateStructure,updateStructure,deleteStructure } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'




export default function Astructure() {

    const [{ isLoading, apiData, serverError }] = useFetch()

  const [Structures, setStructures] = useState([]);


  const navigate = useNavigate()
 



  const formik = useFormik({
    initialValues: {
      Coursename: '',
      Description: '',
      CourseP: null,
      InteractiveP: null,
      QuizP: null,
      LearningpathName: localStorage.getItem('LearningpathName'),
    },
    onSubmit: async (values) => {
      let errors = {};

      // Verify the form fields
      if (!values.Coursename) {
        errors.Coursename = 'Course name is required';
      }

      if (!values.Description) {
        errors.Description = 'Description is required';
      }

      if (!values.CourseP) {
        errors.CourseP = 'Course percentage is required';
      } else if (isNaN(values.CourseP)) {
        errors.CourseP = 'Course percentage must be a number';
      }

      if (!values.InteractiveP) {
        errors.InteractiveP = 'Interactive percentage is required';
      } else if (isNaN(values.InteractiveP)) {
        errors.InteractiveP = 'Interactive percentage must be a number';
      }

      if (!values.QuizP) {
        errors.QuizP = 'Quiz percentage is required';
      } else if (isNaN(values.QuizP)) {
        errors.QuizP = 'Quiz percentage must be a number';
      }

      if (Object.keys(errors).length === 0) {
        // Submit the form and handle success/failure
        try {
          // Perform the structure creation operation
          await CreateStructure(values);

          // Display success toast notification
          toast.success(<b>Structure added successfully...!</b>);
        } catch (error) {
          // Display error toast notification
          toast.error(<b>Could not add the structure...!</b>);
        }
      } else {
        // Display error toast notifications for each field
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      }
    },
  });


    
const formik1 = useFormik({
    initialValues: {
      Coursename: '',
      Description: '',
      CourseP: null,
      InteractiveP: null,
      QuizP: null,
    },
    onSubmit: async (values) => {
      let errors = {};

      // Verify the form fields
      if (!values.Coursename) {
        errors.Coursename = 'Course name is required';
      }

      if (!values.Description) {
        errors.Description = 'Description is required';
      }

      if (!values.CourseP) {
        errors.CourseP = 'Course percentage is required';
      } else if (isNaN(values.CourseP)) {
        errors.CourseP = 'Course percentage must be a number';
      }

      if (!values.InteractiveP) {
        errors.InteractiveP = 'Interactive percentage is required';
      } else if (isNaN(values.InteractiveP)) {
        errors.InteractiveP = 'Interactive percentage must be a number';
      }

      if (!values.QuizP) {
        errors.QuizP = 'Quiz percentage is required';
      } else if (isNaN(values.QuizP)) {
        errors.QuizP = 'Quiz percentage must be a number';
      }

      if (Object.keys(errors).length === 0) {
        // Submit the form and handle success/failure
        try {
          // Perform the structure update operation
          await updateStructure(values);

          // Display success toast notification
          toast.success(<b>Structure updated successfully...!</b>);
        } catch (error) {
          // Display error toast notification
          toast.error(<b>Could not update the structure...!</b>);
        }
      } else {
        // Display error toast notifications for each field
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage);
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
    
    axios.get(`http://localhost:8080/api/getStructures/${localStorage.getItem('LearningpathName')}`)
      .then(response => {
        setStructures(response.data);
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


  
  <table className="min-w-full bg-gray-600 text-white shadow-md rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-gray-900">
      <th className="py-2 px-4 font-semibold">Name</th>
      <th className="py-2 px-4 font-semibold">Description</th>
      <th className="py-2 px-4 font-semibold">Section</th>
      <th className="py-2 px-4 font-semibold">Points</th>
      <th className="py-2 px-4 font-semibold"></th>
      <th className="py-2 px-4 font-semibold"></th>
    </tr>
  </thead>
  <tbody>
    {Structures.map((Structure, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <tr className="border-t border-gray-500 separator">
            <td colSpan="6"></td>
          </tr>
        )}
        <tr>
          <td rowSpan="3" className="py-2 px-4 bg-gray-400">
            {Structure.Coursename}
          </td>
          <td rowSpan="3" className="py-2 px-4 bg-gray-500">
            {Structure.Description}
          </td>
          <td className="py-2 px-4">Course</td>
          <td className="py-2 px-4">{Structure.CourseP}</td>
          <td rowSpan="3" className="py-2 px-4 bg-gray-700">
            <button
              onClick={(e) => {
                formik1.setFieldValue('Coursename', Structure.Coursename );

                formik1.setFieldValue('CourseP', Structure.CourseP );
                formik1.setFieldValue('InteractiveP', Structure.InteractiveP );
                formik1.setFieldValue('QuizP', Structure.QuizP );
                formik1.setFieldValue('Description', Structure.Description );
                openModal1();
              }}
              className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
            >
              Edit
            </button>
          </td>
          <td rowSpan="3" className="py-2 px-4 bg-gray-700">
            <button
             onClick={() => {
              const value = { Coursename: Structure.Coursename};
              const values = Object.assign(value)
              let registerPromise = deleteStructure( values );
                toast.promise(registerPromise, {
                  loading: 'deteting...',
                  success : <b>Structure deleted Successfully...!</b>,
                  error : <b>Could not deleted the Structure .</b>
                });
                                  
            
            }}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr className="border-t border-gray-500">
          <td className="py-2 px-4">Interactive Question</td>
          <td className="py-2 px-4">{Structure.InteractiveP}</td>
        </tr>
        <tr className="border-t border-gray-500">
          <td className="py-2 px-4">Quiz</td>
          <td className="py-2 px-4">{Structure.QuizP}</td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
</table>



      </div>
    </div>

    <button  onClick={() => {openModal()}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add structure 
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
          <label class="block text-white  font-bold mb-2" for="Coursename">
          Course name
          </label>
          <input {...formik.getFieldProps('Coursename')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Coursename" type="text" placeholder="Coursename" />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="challenge-name">
          Description
          </label>
          <textarea  rows={4} 
      cols={40}{...formik.getFieldProps('Description')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Description" type="text" placeholder="Description" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="CourseP">
          Course Points
          </label>
          <input {...formik.getFieldProps('CourseP')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="CourseP" type="number" placeholder="CourseP" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="InteractiveP">
          Interactive Question Points
          </label>
          <input {...formik.getFieldProps('InteractiveP')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="InteractiveP" type="number" placeholder="InteractiveP" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="QuizP">
          Quiz Points
          </label>
          <input {...formik.getFieldProps('QuizP')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="QuizP" type="number" placeholder="QuizP" />
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
          <label class="block text-white font-bold mb-2" for="challenge-name">
          Description
          </label>
          <textarea  rows={4} 
      cols={40}{...formik1.getFieldProps('Description')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Description" type="text" placeholder="Description" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="CourseP">
          Course Points
          </label>
          <input {...formik1.getFieldProps('CourseP')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="CourseP" type="number" placeholder="CourseP" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="InteractiveP">
          Interactive Question Points
          </label>
          <input {...formik1.getFieldProps('InteractiveP')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="InteractiveP" type="number" placeholder="InteractiveP" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="QuizP">
          Quiz Points
          </label>
          <input {...formik1.getFieldProps('QuizP')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="QuizP" type="number" placeholder="QuizP" />
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