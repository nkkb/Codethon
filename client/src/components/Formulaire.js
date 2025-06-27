import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { challenge } from '../helper/helper'
import {Dropdown,Card,Button,Modal,Sidebar, SidebarItem, SidebarCollapse, SidebarItemGroup , Footer, Avatar, Breadcrumb,Accordion} from 'flowbite-react';
import logo from '../assets/loigo.png';
import { Dialog, Transition } from '@headlessui/react'
import { HiChartPie,HiAcademicCap, HiShoppingBag, HiInbox, HiUser, HiArrowSmRight, HiTable,HiHome,BsInstagram,BsGithub,BsTwitter,BsDribbble } from 'react-icons/hi';
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { Link, useNavigate } from 'react-router-dom'
export default function Formulaire() {


  const navigate = useNavigate();
   
  const [{ isLoading, apiData, serverError }] = useFetch()


  const [selectedValue, setSelectedValue] = useState('');

  const [code, setcode] = useState('');
  const [Description, setDescription] = useState('');
  const [Test, setTest] = useState('');

  


  function handleSelectChange(event) {
    formik.setFieldValue('Language', event.target.value);
    
    setSelectedValue(event.target.value);
  }


  const [questions, setQuestions] = useState([]);

 /* useEffect(() => {
    // Make the API call to fetch the questions
    axios.get('http://localhost:8080/api/question/Python')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);*/


  useEffect(() => {
    fetchData();
  }, [selectedValue]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/question/${selectedValue}`);
      setQuestions(response.data);
      formik.setFieldValue('Instructor', apiData?.username)
    } catch (error) {
      setQuestions ([]);
      console.error(error);
    }
  };


    const formik = useFormik({
      initialValues : {
        ChallengeName: "",
         Points: null,
         Language: "",
         TypeofParticipation: "",
         Difficulty: "",
         Question: "",
         Description: "",
         Examples: "",
         Test: "",
         code: "",
         Solution: "",
         state: "unfinished",
         Instructor: ""


       },



        onSubmit : async values => {
            values = await Object.assign(values)
            console.log(values)
            let registerPromise = challenge(values)
            toast.promise(registerPromise, {
              loading: 'Creating...',
              success : <b>challenge created Successfully...!</b>,
              error : <b>Could not create challenge.</b>
            });
        }
      })

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
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Codathon </span>
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
            <span class="ml-5 self-center text-gray-500 text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{apiData?.username}</span>
          </div>
        </div>
        
    </div>
  </div>
      </nav>

      <aside class="fixed top-0 left-0 z-40 w-64 h-screen mt-10 pt-0 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
     
     
      <Sidebar >
    <Sidebar.Items>
      <Sidebar.ItemGroup>
      <Sidebar.Collapse
          icon={HiChartPie}
          label="Challenges"
        >
           <Sidebar.Item href="#"
           onClick={(e) => {
            navigate('/Formulaire');
          }}
           >
            create
          </Sidebar.Item>
          <Sidebar.Item onClick={(e) => {
            navigate('/Cun');
          }}>
           view 
          </Sidebar.Item>
        </Sidebar.Collapse>
        <Sidebar.Collapse
          icon={HiAcademicCap}
          label="Courses"
        >
           <Sidebar.Item href="#"
           onClick={(e) => {
            navigate('/Istructure');
          }}
           >
            create
          </Sidebar.Item>
          <Sidebar.Item onClick={(e) => {
            navigate('/Ilearningpath');
          }}>
           view 
          </Sidebar.Item>
        </Sidebar.Collapse>
        
       
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>


      </aside>
    

<div class="p-4 sm:ml-64 py-10 ">
<div class="bg-gray-800 shadow-md rounded px-8 py-20 pt-6 pb-8 mb-4">
      
     
      
      <form onSubmit={formik.handleSubmit} class="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="challenge-name">
            ChallengeName
          </label>
          <input {...formik.getFieldProps('ChallengeName')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="ChallengeName" type="text" placeholder="Challenge Name" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="points">
            Points
          </label>
          <input {...formik.getFieldProps('Points')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="points" type="number" placeholder="Points" />
        </div>
        <div class="mb-4">
          <label  class="block text-white  font-bold mb-2"  id="Language" for="language">
            Language
          </label>
          <select {...formik.getFieldProps('Language')} value={selectedValue} onChange={ handleSelectChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="language">
            <option value="">Select a Language</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            
          </select>
        </div>
    
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="participation-type">
            Type of Participation
          </label>
          
          <select {...formik.getFieldProps('TypeofParticipation')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="TypeofParticipation">
            <option value="">Select a Type of Participation</option>
            <option value="solo">Solo</option>
            <option value="collective">Collective</option>
          </select>
        </div>
       
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="difficulty">
            Difficulty
          </label>
          <select {...formik.getFieldProps('Difficulty')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Difficulty">
            <option value="">Select a Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
  <label className="block text-white font-bold mb-2" htmlFor="challenge-name">
    Question
  </label>
  <input
    {...formik.getFieldProps('Question')}
    list="options"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    id="Question"
    type="text"
    placeholder="Question"
  />
  
  <select {...formik.getFieldProps('Question')}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    id="TypeofParticipation"
  >
    <option >Bank of questions</option>
    
    {questions.map(question => (
             
             <option key={question._id} >{question.Question}</option>
          ))}
         

  </select>
</div>


        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="challenge-name">
          Description
          </label>
          <textarea  rows={4} 
      cols={40}{...formik.getFieldProps('Description')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Description" type="text" placeholder="Description" />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="Examples">
          Examples
          </label>
          <textarea  rows={4} 
      cols={40}{...formik.getFieldProps('Examples')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Examples" type="text" placeholder="Examples" />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="challenge-name">
            code
          </label>
          <textarea value={code} rows={4} 
      cols={40}{...formik.getFieldProps('code')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="code" type="text" placeholder="code" />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="Solution">
          Solution
          </label>
          <textarea value={code} rows={4} 
      cols={40} {...formik.getFieldProps('Solution')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Solution" type="text" placeholder="Solution" />
        </div>
        <div class="mb-4">
          <label class="block text-white  font-bold mb-2" for="challenge-name">
          Test cases
          </label>
          <textarea value={code} rows={4} 
      cols={40} {...formik.getFieldProps('Test')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Test" type="text" placeholder="Test cases" />
        </div>
       
        <div class="mb-6">
          <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Create Challenge
          </button>
</div>
</form>

</div>
</div>
</div>
);
}