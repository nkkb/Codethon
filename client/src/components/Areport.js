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
import html2canvas from 'html2canvas';
import { BarChart, Bar,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { PDFViewer, Page, Text, Document, StyleSheet, View, Font,Image } from '@react-pdf/renderer';


const Areport = () => {


  const data1 = [
    { name: 'A', series1: 100, series2: 15 },
    { name: 'B', series1: 8, series2: 12 },
    { name: 'C', series1: 5, series2: 10 },
    { name: 'D', series1: 12, series2: 8},
    { name: 'E', series1: 15, series2: 5 },
  ];

  const data = [
    { name: 'A', value: 10 },
    { name: 'B', value: 15 },
    { name: 'C', value: 12 },
    { name: 'D', value: 8 },
    { name: 'E', value: 20 },
  ];


  const learningPathData = [
    {
      LearningPath: "Introduction to python",
      TotalStructures: 4,
      GamifiedCoursesCount: 2,
      RemainingStructuresCount: 2,
    },
    {
      LearningPath: "Python Master",
      TotalStructures: 4,
      GamifiedCoursesCount: 3,
      RemainingStructuresCount: 1,
    },
  ];


  const COLORS = ["#8884d8", "#82ca9d"];

 


  const statistic1 = "statistic1";
const statistic2 = "statistic2";
const statistic3 = "statistic3";
const statistic4 = "statistic4";
const statistic5 = "statistic5";

  const [{ isLoading, apiData, serverError }] = useFetch()

  const navigate = useNavigate();

  const [Dashboard, setDashboard] = useState([]); 
  const [reports, setreports] = useState([]); 
  const [statistic, setStatistic] = useState("");
  const [activeStatistic, setActiveStatistic] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [report, setReport] = useState({
    title: 'Example Title',
    analyst: 'John Doe',
    statistic: 'Example Statistic',
    report:'Example Statistic'
  });


  const handleButtonClick = (selectedStatistic) => {
    
    console.log(`Fetching data for ${selectedStatistic}...`);
    setStatistic(selectedStatistic);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getreport/${statistic}`
        );
        setreports(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (statistic !== "") {
      fetchData();
    }
  }, [statistic]);



  const handleGenerateImage = (statisticName) => {
    const divElement = document.getElementById(`your-div-id-${statisticName}`);

    html2canvas(divElement).then((canvas) => {
      const imageUrl = canvas.toDataURL('image/png');
      console.log(imageUrl);
      setActiveStatistic(statisticName);
      setImageData(imageUrl);
    });
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      width: '100%',
      height: '100%',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    description: {
      fontSize: 18,
      marginBottom: 20,
    },
    signature: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    photo: {
      width: 200, // Adjust the width as needed
      height: 200, // Adjust the height as needed
      marginBottom: 20,
    },
  });
  
  const generatePDF = () => (
    <Document>
      <Page size="A4" >
        <View style={styles.content}>
       
        <Text style={styles.title}>{report.title}</Text>
          <Image src={imageData} style={styles.photo} />
          
          <Text style={styles.description}>
              {report.report}
          </Text>
          <Text style={styles.signature}>ilyes</Text>
        </View>
      </Page>
    </Document>
  );
  

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
    return <div>Loading...</div>; 
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
    <div class="bg-gray-800 shadow-md rounded px-8 py-30 pt-6 pb-8 mb-4 flex flex-row flex-wrap">
     
        
 
<main class="p-6 sm:p-10 space-y-6">
     
    
     
      <section class="grid grid-cols-4 gap-6 mb-10 ">


      <div className="flex flex-col md:col-span-2 md:row-span-2 bg-gray-700 text-white shadow rounded-lg">
  <div value={statistic1} className="px-6 py-5 font-semibold border-b border-gray-100">
    <span>Number of points collected from each challenge</span>
    <span className="ml-2 text-blue-500 font-semibold">|</span>
    <a href="#" onClick={() => {
  handleButtonClick(statistic1);
  handleGenerateImage("statistic1");
  openModal();
}} className="ml-2 text-blue-500 font-semibold hover:underline">
      See Reports
    </a>
  </div>
  <div id="your-div-id-statistic1" className="p-4 flex-grow">
    <div className="flex items-center justify-center h-full px-4 py-16 bg-gray-700 text-white text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
    <BarChart width={400} height={400} data={Dashboard.result}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ChallengeName" style={{ fontSize: 12 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalPoints" fill="#8884d8" />
    </BarChart>
    </div>
  </div>
</div>


        
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-gray-700 text-white shadow rounded-lg">
        <div value={statistic2} className="px-6 py-5 font-semibold border-b border-gray-100">
    <span>The number of finished and unfinished challenges based on their instructor</span>
    <span className="ml-2 text-blue-500 font-semibold">|</span>
    <a href="#" onClick={() => {
  handleButtonClick(statistic2);
  handleGenerateImage("statistic2");
  openModal();
}} className="ml-2 text-blue-500 font-semibold hover:underline">
      See Reports
    </a>
  </div>
  <div id="your-div-id-statistic2"  class="p-4 flex-grow">
            <div class="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md"> 
            <BarChart width={400} height={400} data={Dashboard.statistics}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" style={{ fontSize: 12 }} /> {/* Adjust the fontSize */}
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="finishedChallenges" fill="#8884d8" />
  <Bar dataKey="unfinishedChallenges" fill="#82ca9d" />
</BarChart></div>
          </div>
        </div> 
      </section>
     
      <section class="grid grid-cols-4 gap-6 ">
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-gray-700 text-white shadow rounded-lg">
        <div value={statistic3} className="px-6 py-5 font-semibold border-b border-gray-100">
    <span>The number of users based on their type in our system </span>
    <span className="ml-2 text-blue-500 font-semibold">|</span>
    <a href="#" onClick={() => {
  handleButtonClick(statistic3);
  handleGenerateImage("statistic3");
  openModal();
}} className="ml-2 text-blue-500 font-semibold hover:underline">
      See Reports
    </a>
  </div>
  <div id="your-div-id-statistic3" class="p-4 flex-grow">
            <div class="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
           
        <PieChart width={400} height={400}>
      <Pie
        data={Dashboard.user}
        dataKey="numberOfUsers"
        cx="50%"
        cy="50%"
        outerRadius={60}
        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill={COLORS[index % COLORS.length]} // Assign different colors to each user type
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
              fontSize={10}
            >
              {Dashboard.user[index].userType}
            </text>
          );
        }}
      >
        {Dashboard.user.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Assign different colors to each user type
        ))}
      </Pie>
      <Legend verticalAlign="bottom" />
      <Tooltip />
    </PieChart>
     
        </div> </div>
        </div>
        
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-gray-700 text-white shadow rounded-lg">
        <div value={statistic4} className="px-6 py-5 font-semibold border-b border-gray-100">
    <span>The number of finished and unfinished job offers based on their recruiter</span>
    <span className="ml-2 text-blue-500 font-semibold">|</span>
    <a href="#" onClick={() => {
  handleButtonClick(statistic4);
  handleGenerateImage("statistic4");
  openModal();
}} className="ml-2 text-blue-500 font-semibold hover:underline">
      See Reports
    </a>
  </div>
          <div  id="your-div-id-statistic4" class="p-4 flex-grow">
            <div class="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md"> <BarChart width={400} height={400} data={Dashboard.statistics1}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" style={{ fontSize: 12 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="finishedJoboffer" fill="#82ca9d" style={{ fontSize: 12 }} />
      <Bar dataKey="unfinishedJoboffer" fill="#8884d8"  style={{ fontSize: 12 }} />
    </BarChart></div>
          </div>
        </div>
       

       
        <div className="flex flex-col md:col-span-4 md:row-span-4 bg-gray-700 text-white shadow rounded-lg">
  <div value={statistic5} className="px-6 py-5 font-semibold border-b border-gray-100">
    <span>How many of the learning paths are created or remained</span>
    <span className="ml-2 text-blue-500 font-semibold">|</span>
    <a href="#" onClick={() => {
  handleButtonClick(statistic5);
  handleGenerateImage("statistic5");
  openModal();
}} className="ml-2 text-blue-500 font-semibold hover:underline">
      See Reports
    </a>
  </div>
  <div  id="your-div-id-statistic5"  className="flex-grow flex items-center justify-center">
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
                  
                <div class="bg-gray-800 text-white p-4">
  <h2 class="text-2xl font-bold mb-4">List of Reports</h2>
  
  {reports.map((report) => (
    <div class="border-b border-gray-600 pb-4 mb-4 flex justify-between items-start" key={report.id}>
      <div>
        <h3 class="text-lg font-bold">{report.title}</h3>
        <p class="text-gray-400">Author: {report.analyst}</p>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded" onClick={() =>{ 
        setReport(report);
        openModal1();}}>
        Open
      </button>
    </div>
  ))}

</div>
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
                    
                <div className="px-20 py-10 pb-20 mb-4">
    <PDFViewer width={600} height={600}>
      {generatePDF()}
    </PDFViewer>
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
};

export default Areport;