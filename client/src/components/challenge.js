import React, { useEffect, useState,Fragment } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Drawer from '@mui/material/Drawer';

import toast, { Toaster } from 'react-hot-toast';
import { challenge } from '../helper/helper'
import {Dropdown,Card,Button,Modal,Sidebar, SidebarItem, SidebarCollapse, SidebarItemGroup , Footer, Avatar, Breadcrumb,Accordion} from 'flowbite-react';
import logo from '../assets/loigo.png';
import { Dialog, Transition } from '@headlessui/react'
import avatar from '../assets/profile.png';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { CreatePChallenge } from '../helper/helper'
import Landinge from '../editor/Landing'
import VideoPlayer from '../editor/VideoPlayer'
import { Steps } from 'antd'
import YouTube from 'react-youtube';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as HiIcons from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom'

import CodeEditorWindow from "../editor/CodeEditorWindow";
import { classnames } from "../utils/general";
import useKeyPress from "../hooks/useKeyPress";
import { languageOptions } from "../editor/languageOptions";

export default function Challenge() {

    let [Points, setPoints] = useState(0);
    const [challenges, setChallenges] = useState([]);
    const [{ isLoading, apiData, serverError }] = useFetch()
    const [QCMC, setQCMC] = useState();
    let [QCMT, setQCMT] = useState(0);
    let [viewS, setviewS] = useState(false);
    let [QC, setQC] = useState(0);
    let [QT, setQT] = useState(0);
    let [cont, setcont] = useState(0);
    const navigate = useNavigate();


const steps = [
    'Intro',
    'Challenge question',
    'QCM',
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

    const description = 'This is a description.'
        const [step, setStep] = useState(1);
        
      
      
      
        const handleNextStep = () => {
          setStep(step + 1);
        };
      
        const handlePrevStep = () => {
          setStep(step - 1);
        };
      
        const handleSubmit = () => {
          // Do something with formValues

          const values = {
            ChallengeName: challenges.ChallengeName ,
       Points: Points ,
       Answer: code ,
       username: apiData?.username
          };
      
          let registerPromise = CreatePChallenge(values)
          toast.promise(registerPromise, {
            loading: 'Creating...',
            success : <b>Participation SAVED...!</b>,
            error : <b>Could not be SAVED.</b>
          });
          
        };
      
        


        
        
       


  useEffect(() => {
   
      axios.get(`http://localhost:8080/api/challenge/${localStorage.getItem('ChallengeName')}`)
        .then(response => {
          setChallenges(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    
  }, []);
   
  


  const incode = `
  `;

  const [code, setCode] = useState(incode);
  const [customInput, setCustomInput] = useState("");

  const [processing, setProcessing] = useState(null);
 
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {

         console.log(data);
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
 
  const handleCompile = () => {
    setProcessing(true);
    
    const cd ="import unittest"+"\n\n"+code+"\n\n"+challenges.Test
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(cd),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        console.log("output", response.data.stdout);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      
      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        
        console.log("response.data", response.data);
        
        const encodedString = response.data.stdout;
        
        const decodedString = atob(encodedString);
        Evaluate(decodedString);
        console.log(decodedString);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    
    }
  };
   

  function Evaluate(str) {
   
    console.log(str);
    if(str.trim().toLowerCase() === "success"){
      const p = (challenges.Points)*0.6;
      setQC(1);
      
     
      if(viewS === false){
        if(QT === 0){
        setPoints(prevPoints => prevPoints + p);
        }
    }}
    else{
      setQC(2);
    }
    setQT(QT+1);
  }





  function submitAnswer(Answer){
    
    const Solution = challenges.QCM.S;
    
    if(Answer === Solution){
     
      setQCMC(1);
      if(QCMT === 0){
     
      let  p = (challenges.Points)*0.4;
   
      setPoints(prevPoints => prevPoints + p);
      console.log(Points);
    
    }
    }else{
      setQCMC(2);
     
    }
    setQCMT(QCMT+1)
   }

  


   let [isOpen, setIsOpen] = useState(false)

   function closeModal() {
     
     setIsOpen(false)
   }
 
   function openModal() {
 
    
     setIsOpen(true)
   }

   const formik = useFormik({
    initialValues : {
       ChallengeName: challenges.ChallengeName ,
       Points: Points ,
       Answer: code ,
       username: apiData?.username
     },



      onSubmit : async values => {
          console.log(values);
          values = await Object.assign(values)
          let registerPromise = CreatePChallenge(values)
          toast.promise(registerPromise, {
            loading: 'Creating...',
            success : <b>Participation SAVED...!</b>,
            error : <b>Could not be SAVED.</b>
          });


      }
    })



    const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleChange = (index, option) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = {
        answer: option,
        solution: challenges.QCM[index].S,
      };
      return updatedAnswers;
    });
  };
  
  const evaluate = () => {
    let  p = (challenges.Points)*0.4;
    let count = 0;
    selectedAnswers.forEach((answerObj, index) => {
      const selectedAnswer = answerObj.answer;
      const solution = answerObj.solution;
  
      if (selectedAnswer === solution) {
        
          setQCMC(1);
        console.log(`Question ${index + 1}: Correct`);
        if(QCMT === 0){
        setPoints(prevPoints => prevPoints + (p/selectedAnswers.length)); }
        count++;
        
       
     
      } else {
        console.log(`Question ${index + 1}: Incorrect`);
      }
    });
    setcont(count);
  setQCMT(QCMT+1)
 

 
  };
  

  const handleSubmit1 = (e) => {
    e.preventDefault();
    evaluate();
  };


  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let intervalId;

    // Function to update the timer
    const updateTime = () => {
      setTime(prevTime => {
        const newTime = { ...prevTime };

        // Increment seconds
        newTime.seconds++;
        if (newTime.seconds === 60) {
          // Increment minutes
          newTime.seconds = 0;
          newTime.minutes++;
        }
        if (newTime.minutes === 60) {
          // Increment hours
          newTime.minutes = 0;
          newTime.hours++;
        }

        return newTime;
      });
    };

    // Start the timer
    intervalId = setInterval(updateTime, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = value => (value < 10 ? `0${value}` : value);




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


    <div className="relative">
  <div className="bg-gray-800 text-white text-center absolute top-0 right-0">
    <p className="text-4xl">
      {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
    </p>
  </div>
</div>




      
      {step === 1 && (
    <div class=" w-full h-full flex items-center">
    <div class="mx-auto">
    <div className="bg-gray-800 text-white">
      <div className="max-w-lg mx-auto py-20 px-6 sm:px-8 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight">{challenges.ChallengeName}</h1>
     
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold">Language</h2>
            <p className="mt-2 text-gray-300">{challenges.Language}</p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold">Type of Participation</h2>
            <p className="mt-2 text-gray-300">{challenges.TypeofParticipation}</p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold">Points</h2>
            <p className="mt-2 text-gray-300">{challenges.Points}</p>
          </div>
        </div>
      </div>
    </div>
    </div>

            <div class="flex justify-between">
          <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleNextStep}>Next</button>
        </div>
       </div>
   
   
      )}
      {step === 2 && (
        <div>
          
           <div class="flex flex-row space-x-2 items-start px-4 py-6">
  <div class="flex flex-col w-full h-full justify-start py-4">
    <div class="bg-gray-800 text-white px-6 py-4 rounded-lg">
        <h1 class="text-3xl font-bold mb-8">{challenges.ChallengeName}</h1>
        <div class="bg-gray-600 text-white px-6 py-4 rounded-lg  mb-4">
        <h2 class="text-2xl font-bold mb-4">Problem Description</h2>
        <p class="text-sm mb-6">{challenges.Description}</p>
      </div>
      <div class="bg-gray-600 text-white px-6 py-4 rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-4">Example :</h2>
        <p class="text-sm mb-6">{challenges.Examples}
       </p> </div>
    </div>
    
  </div>

 
  <div className="sticky top-30 w-full h-full justify-start items-right py-20"  style={{ position: "sticky", top: "0" }}>
  <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl ">
    <CodeEditorWindow
      code={challenges.code}
      onChange={onChange}
      language={language?.value}
      theme="dark"
    />
  </div>
  <button
  onClick={handleCompile}
  disabled={!code}
  className={classnames(
    "w-full h-full mt-4 border-2 border-black z-10 rounded-md  px-4 py-2  transition duration-200 text-white bg-blue-500",
    !code ? "opacity-50" : ""
  )}
>
  {processing ? "Processing..." : "Submit"}
</button>

{/* <button  onClick={() => { 
  setviewS(true);
  openModal(); }} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Show solution
</button> */}

{QC === 1 && (
        <div class="bg-green-500 text-white  font-bold rounded-lg p-4">
      correct Answer
    </div>  )}
    {QC === 2 && (
        <div class="bg-red-500 text-white  font-bold rounded-lg p-4">
      Wrong Answer
    </div>  )}
</div>


        
        
      </div>
          <div class="flex justify-between">
  <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handlePrevStep}>Back</button>
  <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleNextStep}>Next</button>
</div>

        </div>
      )}
      {step === 3 && (
        <div class="full-w ">
     <div className="bg-gray-800 text-white py-10 p-6 rounded-lg mb-4">
      <form onSubmit={handleSubmit1}>
        {challenges.QCM.map((QCM, index) => (
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 mb-4">
          <div key={index} className="mb-6">
            <h2 className="text-lg font-bold mb-2">{QCM.question}</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={QCM.A}
                  onChange={() => handleChange(index, QCM.A)}
                  className="mr-2"
                />
                <span className="text-gray-100">{QCM.A}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={QCM.B}
                  onChange={() => handleChange(index, QCM.B)}
                  className="mr-2"
                />
                <span className="text-gray-100">{QCM.B}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={QCM.C}
                  onChange={() => handleChange(index, QCM.C)}
                  className="mr-2"
                />
                <span className="text-gray-100">{QCM.C}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={QCM.D}
                  onChange={() => handleChange(index, QCM.D)}
                  className="mr-2"
                />
                <span className="text-gray-100">{QCM.D}</span>
              </label>
            </div>
          </div></div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Check Answers
        </button>
      </form>

      {QCMC === 1 && (
        <div class="bg-green-500 text-white  font-bold rounded-lg p-4">
      nbr correct Answer {cont}
    </div>  )}
    
    </div>



        <div class="flex justify-between">
<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handlePrevStep}>Back</button>
<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => {
              handleSubmit();
               navigate('/ListChallengesD');
            }}>Finish</button>
</div>
          
        </div>
      )}
    

     


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
                  
               
          <CodeEditorWindow
      code={challenges.Solution}
      
      language={language?.value}
      theme="dark"
    />
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