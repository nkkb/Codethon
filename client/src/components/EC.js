import React, { useEffect, useState,Fragment } from 'react';
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
import { UpdateChallenge } from '../helper/helper'
import { Link } from 'react-router-dom'
import Landinge from '../editor/Landing'
import VideoPlayer from '../editor/VideoPlayer'
import { Steps } from 'antd'
import YouTube from 'react-youtube';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function EC() {

    
const steps = [
    'Course',
    'Interactive question',
    'Quiz',
  ];
  
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  });

  
        const [step, setStep] = useState(1);
        const [formValues, setFormValues] = useState({
          name: '',
          email: '',
          password: '',
          address: '',
          city: '',
          state: '',
          zip: '',
        });
      
        const handleFormChange = (event) => {
          setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
          });
        };
      
        const handleNextStep = () => {
          setStep(step + 1);
        };
      
        const handlePrevStep = () => {
          setStep(step - 1);
        };
      
        const handleSubmit = () => {
          // Do something with formValues
          console.log(formValues);
        };
      
        const getProgress = () => {
          return ((step - 1) / 3) * 100;
        };


   
        

        
         

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-6 h-6 mr-4">
           <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-6 h-6 mr-4">
           <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
         </svg>



            <div>
            <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt="User settings" img={avatar } rounded={true} size="sm" />}
    >
      
      <Dropdown.Header>
        <span className="block text-sm">
        { 'csdcsdcc' }
        </span>
        <span className="block truncate text-sm font-medium">
        {'xqsxqscfqfq' }
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
       Profile 
      </Dropdown.Item>
      <Dropdown.Item>
        Settings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Link to="/Log In">
      <Dropdown.Item>
       Log out
      </Dropdown.Item></Link> 
    </Dropdown>
    
            </div>
            <span class="ml-4 self-center  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">rehgergegr</span>
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
          icon={HiAcademicCap}
        >
          Courses
        </Sidebar.Item>
        <Sidebar.Collapse
          icon={HiChartPie}
          label="Challenges"
        >
           <Sidebar.Item href="#">
            create Challenge
          </Sidebar.Item>
          <Sidebar.Item href="#">
           view the challenges
          </Sidebar.Item>
        </Sidebar.Collapse>
       
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>

      </aside>
      
      <div class="p-4 sm:ml-64 py-10 ">
      <div class="bg-gray-800 shadow-md rounded px-8 py-30 pt-6 pb-8 flex flex-wrap mb-4">





<ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </ThemeProvider>




      
      {step === 1 && (
    <div class=" w-full h-full flex items-center">
    <div class="mx-auto">
      <YouTube videoId="9gxlb-xScxs" className="w-full h-full" style={{ top: '0', left: '0' }} />
    </div>

            <div class="flex justify-between">
          <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleNextStep}>Next</button>
        </div>
       </div>
   
   
      )}
      {step === 2 && (
        <div>
          
          <Landinge></Landinge>
          <div class="flex justify-between">
  <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handlePrevStep}>Back</button>
  <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleNextStep}>Next</button>
</div>

        </div>
      )}
      {step === 3 && (
        <div class="full-w">
          <div class="bg-gray-800 text-white py-10">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-xl font-bold mb-4">Question:</h2>
    <p class="text-lg mb-4">What is the capital of France?</p>

    <h2 class="text-xl font-bold mb-4">Options:</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex items-center">
        <input type="radio" id="option-a" name="options" value="a" class="mr-2" />
        <label for="option-a" class="text-lg">A) Paris</label>
      </div>
      <div class="flex items-center">
        <input type="radio" id="option-b" name="options" value="b" class="mr-2" />
        <label for="option-b" class="text-lg">B) Madrid</label>
      </div>
      <div class="flex items-center">
        <input type="radio" id="option-c" name="options" value="c" class="mr-2" />
        <label for="option-c" class="text-lg">C) Berlin</label>
      </div>
      <div class="flex items-center">
        <input type="radio" id="option-d" name="options" value="d" class="mr-2" />
        <label for="option-d" class="text-lg">D) Rome</label>
      </div>
    </div>

    <button class="bg-blue-600 text-white px-4 py-2 mt-8 rounded-lg hover:bg-blue-700" onclick="submitAnswer()">Check Answer</button>
  </div>
</div>


          <div class="flex justify-between">
  <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handlePrevStep}>Back</button>
  <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSubmit}>Finish</button>
</div>
          
        </div>
      )}
    


   


     


</div>
</div>

</div>
);
}