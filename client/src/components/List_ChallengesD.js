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
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { UpdateChallenge,SubmitChallenge,DeleteChallenge,AddQChallenge } from '../helper/helper'
import { Link, useNavigate } from 'react-router-dom'

import rrr from '../assets/rrr.png';

export default function ListChallengesD() {


  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [Leaderboard, setLeaderboard] = useState([]);
  const [{ isLoading, apiData, serverError }] = useFetch()


  localStorage.setItem('ChallengeName', challenge );

  useEffect(() => {
   
      axios.get(`http://localhost:8080/api/activeChallenges`)
        .then(response => {
          setChallenges(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    
  }, []);

  
  

  const handleChallengeClick = (challengeName) => {
    axios
      .get(`http://localhost:8080/api/Leaderboard/${challengeName}`)
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    
    setIsOpen(false)
  }

  function openModal() {

   
    setIsOpen(true)
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




  const [showAllCards, setShowAllCards] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = challenges.filter((challenges) =>
  challenges.ChallengeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCards = showAllCards ? filteredCards : filteredCards;

   

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
        <span className="block truncate text-sm font-medium">
       points : {parseInt(apiData?.Points) || '' } XP
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
      <Link to="/Dprofile"> Profile </Link> 
      </Dropdown.Item>
      <Dropdown.Divider />
      
      <Dropdown.Item>
      <Link to="/Log In">  Log out</Link> 
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
          icon={HiIcons.HiOutlineHome}
          onClick={(e) => {
            navigate('/Dhome');
          }}
        >
           home
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiIcons.HiPuzzle}
          onClick={(e) => {
            navigate('/ListChallengesD');
          }}
        >
           challenges
        </Sidebar.Item>
         <Sidebar.Item
          href="#"
          icon={HiIcons.HiOutlineSearchCircle}
          onClick={(e) => {
            navigate('/Jobsdev');
          }}
        >
          job offer
        </Sidebar.Item>
        <Sidebar.Item
          href="#"
          icon={HiIcons.HiAcademicCap}
          onClick={(e) => {
            navigate('/Dlearningpath');
          }}
        >
          learning path
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>

      </aside>
      
      <div class="p-4 sm:ml-64 py-10 ">
      <div class="bg-gray-800 shadow-md rounded px-8 py-30 pt-6 pb-8 flex flex-wrap mb-4">

       {visibleCards.map(challenge => (
              <div key={challenge._id} Value={challenge} className="max-w-sm w-full md:w-1/3 px-4 mb-4">
             <Card imgSrc={rrr}>
                
             <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {challenge.ChallengeName}
                </h5> 
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                  Difficulty: {challenge.Difficulty}
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                  Language: {challenge.Language}
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                  Type of Participation: {challenge.TypeofParticipation}
                </p>
                <div class="flex gap-4">
  <button onClick={(e) => {
  openModal();
  handleChallengeClick(challenge.ChallengeName);
}} class="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5">Leaderboard</button>
  <button onClick={(e) => {
  localStorage.setItem('ChallengeName', challenge.ChallengeName);
  navigate('/challenge');
}} class="bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-2.5">Enter</button>

</div>


           
             </Card>
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
                <div class="overflow-x-auto w-full shadow-md overflow-hidden border-b  border-gray-600 sm:rounded-lg">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-gray-700">
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Username</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Points</th>
          </tr>
        </thead>
        <tbody class="bg-gray-600 divide-y divide-gray-500">
   
        {Leaderboard.map((Leaderboard) => (
            <tr key={Leaderboard._id} value={Leaderboard}>
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="flex items-center">
                  
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-100">{Leaderboard.username}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-2 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {parseInt(Leaderboard.Points)}
                </span>
              </td>
              
             
              
              
            </tr>
          ))}
        </tbody>
      </table>
      
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