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
import { HiChartPie, HiShoppingBag, HiInbox, HiUser, HiArrowSmRight, HiTable,HiHome,BsInstagram,BsGithub,BsTwitter,BsDribbble,HiAcademicCap } from 'react-icons/hi';
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { PlanCJob ,PlanCJobEdit,PlanCJobDelete } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
import { DatePicker, Space } from 'antd';
import * as HiIcons from 'react-icons/hi';

import job from '../assets/job.jpg';
const { RangePicker } = DatePicker;


export default function AplanJO() {

  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([]);
  const [challenge, setChallenge] = useState([]);

  const [JOs, setJOs] = useState([]);
  const [JO, setJO] = useState([]);
  console.log(challenge);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleRangePickerChange = (dates) => {
    if (dates && dates.length === 2) {

        formik.setFieldValue('selectedStartDate', dates[0].format('YYYY-MM-DD'));
        formik.setFieldValue('selectedEndDate', dates[1].format('YYYY-MM-DD'));

        formikEdit.setFieldValue('selectedStartDate', dates[0].format('YYYY-MM-DD'));
        formikEdit.setFieldValue('selectedEndDate', dates[1].format('YYYY-MM-DD'));

      setSelectedStartDate(dates[0].format('YYYY-MM-DD'));
      setSelectedEndDate(dates[1].format('YYYY-MM-DD'));
     
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };



  const formik = useFormik({
    initialValues: {
      Joboffername: '',
      selectedStartDate: selectedStartDate,
      selectedEndDate: selectedEndDate,
    },
    onSubmit: async (values) => {
      let errors = {};

      // Verify the form fields
      if (!values.Joboffername) {
        errors.Joboffername = 'Job offer name is required';
      }

      // Verify other form fields

      if (Object.keys(errors).length === 0) {
        // Submit the form and handle success/failure
        try {
          // Perform the job plan creation operation
          await PlanCJob(values);

          // Display success toast notification
          toast.success(<b>Plan created successfully...!</b>);
        } catch (error) {
          // Display error toast notification
          toast.error(<b>Could not plan the challenge...!</b>);
        }
      } else {
        // Display error toast notifications for each field
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      }
    },
  });


  const formikEdit = useFormik({
    initialValues: {
      Joboffername: '',
      selectedStartDate: selectedStartDate,
      selectedEndDate: selectedEndDate,
    },
    onSubmit: async (values) => {
      let errors = {};

      // Verify the form fields
      if (!values.Joboffername) {
        errors.Joboffername = 'Job offer name is required';
      }

      // Verify other form fields

      if (Object.keys(errors).length === 0) {
        // Submit the form and handle success/failure
        try {
          // Perform the job plan editing operation
          await PlanCJobEdit(values);

          // Display success toast notification
          toast.success(<b>Plan edited successfully...!</b>);
        } catch (error) {
          // Display error toast notification
          toast.error(<b>Could not edit the planned challenge...!</b>);
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


   
  const [{ isLoading, apiData, serverError }] = useFetch()

  useEffect(() => {
    // Make the API call to fetch the questions
    axios.get('http://localhost:8080/api/getJOs')
      .then(response => {
        setJOs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [showAllCards, setShowAllCards] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = JOs.filter((JOs) =>
  JOs.Joboffername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCards = showAllCards ? filteredCards : filteredCards;


   
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
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
         type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
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





      
      <div class="p-4 sm:ml-64 py-10 ">
      <div class="bg-gray-800 shadow-md rounded px-8 py-30 pt-6 pb-8 flex flex-wrap mb-4">

      {visibleCards.map(JO => (
  <div key={JO._id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 mb-4">
  <div className="relative">
    
    <Card imgSrc={job}>

    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            

            <Dropdown
                 inline={true}
                 label={JO.Joboffername}
               >
                 <Dropdown.Item>
                   <a
                     href="#" onClick={() => {
                      formik.setFieldValue('Joboffername', JO.Joboffername );
                      
                      openModal();
                    }}
                     className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                     Plan
                   </a>
                 </Dropdown.Item>
                 
                 <Dropdown.Item>
                   <a
                     href="#" onClick={() => {
                      formikEdit.setFieldValue('Joboffername', JO.Joboffername );
                      
                      openModal1();
                    }}
                     className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                     Edit
                   </a>
                 </Dropdown.Item>

                 <Dropdown.Item>
                   <a
                     href="#" onClick={() => {
                      const value = { Joboffername: JO.Joboffername};
                      const values = Object.assign(value)
                      let registerPromise = PlanCJobDelete( values );
                        toast.promise(registerPromise, {
                          loading: 'Deleting...',
                          success : <b>plan Delete Successfully...!</b>,
                          error : <b>Could not Delete the challenge planning.</b>
                        });
                                          
                    
                    }}
                     className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                     Delete
                   </a>
                 </Dropdown.Item>
               </Dropdown>
          </h5> 

      <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
        Experience: {JO.Experience}
      </p>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
        Salary: {JO.Salary}
      </p>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
        company: {JO.companyname}
      </p>
      { /* <div className="flex space-x-4 mt-4">
       
      <button
          onClick={() => {
            formik.setFieldValue('Joboffername', joboffer.Joboffername);
            formik.setFieldValue('Experience', joboffer.Experience );
            formik.setFieldValue('Salary', joboffer.Salary );
            formik.setFieldValue('companyname', joboffer.companyname );
            openModal();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          Edit
        </button>
        <button
           onClick={() => {
            const value = { Joboffername: joboffer.Joboffername};
            const values = Object.assign(value)
            let registerPromise = SubmitJobChallenge( values );
              toast.promise(registerPromise, {
                loading: 'Submiting...',
                success : <b>Job offer Submited Successfully...!</b>,
                error : <b>Could not Submited the Job offer.</b>
              });
                                
          
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>*/}
    </Card>
  </div>
</div>

 
   
    ))}


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
          <label class="block text-white  font-bold mb-2" for="Joboffername">
          Job offer Name
          </label>
          <input {...formik.getFieldProps('Joboffername')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="ChallengeName" type="text" placeholder="Joboffername" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="period">
          the time period
          </label>
          <Space direction="vertical" size={12}  >
      <RangePicker
        onChange={handleRangePickerChange}
        showTime={false} 
      />
    </Space>
          
                  </div>
        
      
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            create plan for the Job offer
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
                  
      <form onSubmit={formikEdit.handleSubmit} class="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
      
      <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="Joboffername">
          Job offer Name
          </label>
          <input {...formikEdit.getFieldProps('Joboffername')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="ChallengeName" type="text" placeholder="Joboffername" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="period">
          edit the time period
          </label>
          <Space direction="vertical" size={12}  >
      <RangePicker
        onChange={handleRangePickerChange}
        showTime={false} 
      />
    </Space>
          
                  </div>
        
      
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            edit the plans for the Job offer
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