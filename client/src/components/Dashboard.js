import React, { useEffect, useState,Fragment } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { getJobOffers} from '../helper/helper'
import {Dropdown,Card,Button,Modal,Sidebar, SidebarItem, SidebarCollapse, SidebarItemGroup , Footer, Avatar, Breadcrumb,Accordion} from 'flowbite-react';
import logo from '../assets/loigo.png';
import { Dialog, Transition } from '@headlessui/react'
import { HiChartPie, HiShoppingBag, HiInbox, HiUser, HiArrowSmRight, HiTable,HiHome,BsInstagram,BsGithub,BsTwitter,BsDribbble,HiAcademicCap } from 'react-icons/hi';
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { UpdateChallenge,SubmitChallenge,DeleteChallenge } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
import job from '../assets/job.jpg';
import * as HiIcons from 'react-icons/hi';

import { BarChart, Bar,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';




const Dashboard = () => {




  const COLORS = ["#8884d8", "#82ca9d"];




  const [{ isLoading, apiData, serverError }] = useFetch()

  const navigate = useNavigate();


  const [Dashboard, setDashboard] = useState([]); 
  



 

  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/getDashboard`)
      .then(response => {
        setDashboard(response.data);
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
 
 
 
 
 
 
 
 


  if (Dashboard.length === 0) {
    return <div>Loading...</div>; // or a loading state/placeholder component
  }


  const data3 = Dashboard.learningPathData.flatMap((item) => {
    return [
      { name: `${item.LearningPath} - Existing`, value: item.GamifiedCoursesCount },
      { name: `${item.LearningPath} - Remaining`, value: item.RemainingStructuresCount },
    ];
   });

  return (

    <div>
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
    <div class="bg-gray-800 shadow-md rounded px-8 py-30 pt-6 pb-8 mb-4 flex flex-row flex-wrap">
     
        
 
<main class="p-6 sm:p-10 space-y-6">
     
      <section class="grid md:grid-cols-2  xl:grid-cols-4 gap-6">
        <div class="flex items-center p-8 bg-gray-700 text-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">{Dashboard.nbrD}</span>
            <span class="block text-gray-500">Developers</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-gray-700 text-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6">
  <path fill="none" d="M0 0h24v24H0z"/>
  <path d="M12 1L3 5v14l9 4 9-4V5l-9-4zm0 2.236L18.764 5H5.236L12 3.236z" fill="currentColor"/>
</svg>





          </div>
          <div>
            <span class="block text-2xl font-bold">{Dashboard.nbrCH}</span>
            <span class="block text-gray-500">Challenges</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-gray-700 text-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-person-workspace" viewBox="0 0 16 16">
  <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
  <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
</svg>


          </div>
          <div>
            <span class="inline-block text-2xl font-bold">{Dashboard.nbrJob}</span>
            <span class="block text-gray-500">Job offers</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-gray-700 text-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">{Dashboard.nbrL}</span>
            <span class="block text-gray-500">learning paths</span>
          </div>
        </div>
      </section>

     
      <section class="grid grid-cols-4 gap-6 mb-10 ">
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-gray-700 text-white shadow rounded-lg">
          <div class="px-6 py-5 font-semibold border-b border-gray-100">The number of finished and unfinished challenges for each instructor</div>
          <div class="p-4 flex-grow">
            <div class="flex items-center justify-center h-full px-4 py-16 bg-gray-700 text-white text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
      <BarChart width={400} height={400} data={Dashboard.result}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ChallengeName" style={{ fontSize: 12 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalPoints" fill="#8884d8" />
    </BarChart></div>
          </div>
        </div>
        
       
      
       
        
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-gray-700 text-white shadow rounded-lg">
          <div class="px-6 py-5 font-semibold border-b border-gray-100">The number of points collected from each challenge</div>
          <div class="p-4 flex-grow">
            <div class="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md"> 
            <BarChart width={400} height={400} data={Dashboard.statistics}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" style={{ fontSize: 12 }} /> {/* Adjust the fontSize */}
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="finishedChallenges" fill="#8884d8" />
  <Bar dataKey="unfinishedChallenges" fill="#82ca9d" />
</BarChart>

</div>
          </div>
        </div>
       


        <div class="flex items-center p-8 bg-gray-700 text-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div>
            <span class="block text-2xl font-bold">{Dashboard.nbrC}</span>
            <span class="block text-gray-500">Course modules</span>
          </div>
        </div>
       
        <div class="relative md:col-span-3 md:row-span-3 bg-gray-600  pt-5  ">
          
          <div class="w-full   xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
           
                <table class="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        username
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      email
                      </th>
                      <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      type
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody>
                      {Dashboard.users.map((user, index) => (
                        <tr key={index}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {user.username}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.email}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.type}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                </table>
              </div>
            
          </div>
      </div>

        
      </section>
     
      <section class="grid grid-cols-4 gap-6 ">
       
         <div className="flex flex-col md:col-span-4 md:row-span-4 bg-gray-700 text-white shadow rounded-lg">
  <div className="px-6 py-5 font-semibold border-b border-gray-100 text-center">
  How many of the learning paths are created or remained
  </div>
  <div className="flex-grow flex items-center justify-center">
    <div className="flex items-center justify-center">
      <PieChart width={900} height={350}>
        <Pie
          data={data3}
          dataKey="value"
          cx={450}
          cy={175}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          label={(entry) => entry.name}
        >
          {data3.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" />
        <Tooltip />
      </PieChart>
    </div>
  </div>
</div> 

      </section>

      
    </main>
  






</div></div>



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
};

export default Dashboard;