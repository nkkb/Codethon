import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound'; 

import Landing from './components/Landing';
import Cun from './components/cun.js';


import Ausers from './components/Ausers';
import ListChallengesD from './components/List_ChallengesD';
import Aquestion from './components/Aquestion';
import Jobsdev from './components/Jobdev';

 
import Challenge from './components/challenge';
import Aplan from './components/Aplan';
import Cplan from './components/Cplan';






import Alearningpath from './components/Alearningpath';
import Astructure from './components/Astructure';
import CreateC from './components/createC';
import Istructure from './components/Istructure';
import Dcourses from './components/Dcourses';
import DPcourse from './components/DPcourse';

import Rjoboffer from './components/Rjoboffer';

import RCJchallenge from './components/RCJchallenge';

import DPjobchallenge from './components/DPjobchallenge';

import Ilearningpath from './components/Ilearningpath';

import Dlearningpath from './components/Dlearningpath';

import Dprofile from './components/Dprofile';



import Analyst from './components/Analyst';


import CreateCh from './components/CreateCh';

import Dhome from './components/Dhome';

import Areport from './components/Areport';

import AplanJO from './components/AplanJO';

import CreateCE from './components/CreateCE';

import ADprofile from './components/ADprofile';

import ANprofile from './components/ANprofile';

import Iprofile from './components/Iprofile';

import Rprofile from './components/Rprofile';

import Dashboard from './components/Dashboard';

import RRresult from './components/Result';

import RParticipantList from './components/RParticipantList';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/Log In',
        element : <Username></Username>
    },
 
    {
        path : '/cun',
        element : <Cun></Cun>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
   
 
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
   
  
    {
        path : '/',
        element : <Landing></Landing>
    },
    
    
   
   
  
  
   
    {
        path : '/Aplan',
        element : <Aplan></Aplan>
    },
    {
        path : '/Cplan',
        element : <Cplan></Cplan>
    },
   
    {
        path : '/Ausers',
        element : <Ausers></Ausers>
    },
    {
        path : '/Challenge',
        element : <Challenge></Challenge>
    },
    {
        path : '/ListChallengesD',
        element : <ListChallengesD></ListChallengesD>
    },
    {
        path : '/Aquestion',
        element : <Aquestion></Aquestion>
    },
    {
        path : '/Jobsdev',
        element : <Jobsdev></Jobsdev>
    },
   
   
    {
        path : '/Alearningpath',
        element : <Alearningpath></Alearningpath>
    },
    {
        path : '/Astructure',
        element : <Astructure></Astructure>
    },
    {
        path : '/CreateC',
        element : <CreateC></CreateC>
    },
    {
        path : '/Istructure',
        element : <Istructure></Istructure>
    },
    {
        path : '/Dcourses',
        element : <Dcourses></Dcourses>
    },
    {
        path : '/DPcourse',
        element : <DPcourse></DPcourse>
    },
    {
        path : '/Rjoboffer',
        element : <Rjoboffer></Rjoboffer>
    },
    {
        path : '/RCJchallenge',
        element : <RCJchallenge></RCJchallenge>
    },
    {
        path : '/DPjobchallenge',
        element : <DPjobchallenge></DPjobchallenge>
    },
    {
        path : '/Ilearningpath',
        element : <Ilearningpath></Ilearningpath>
    },
    {
        path : '/Dlearningpath',
        element : <Dlearningpath></Dlearningpath>
    },
    {
        path : '/Dprofile',
        element : <Dprofile></Dprofile>
    },
 
  
    {
        path : '/Analyst',
        element : <Analyst></Analyst>
    },
  
    {
        path : '/CreateCh',
        element : <CreateCh></CreateCh>
    },
    {
        path : '/Dhome',
        element : <Dhome></Dhome>
    },
    {
        path : '/Areport',
        element : <Areport></Areport>
    },
    {
        path : '/AplanJO',
        element : <AplanJO></AplanJO>
    },
    {
        path : '/CreateCE',
        element : <CreateCE></CreateCE>
    },
    {
        path : '/ADprofile',
        element : <ADprofile></ADprofile>
    },
    {
        path : '/ANprofile',
        element : <ANprofile></ANprofile>
    },
    {
        path : '/Iprofile',
        element : <Iprofile></Iprofile>
    },
    {
        path : '/Rprofile',
        element : <Rprofile></Rprofile>
    },
    {
        path : '/Dashboard',
        element : <Dashboard></Dashboard>
    },
    {
        path : '/RRresult',
        element : <RRresult></RRresult>
    },
    {
        path : '/RParticipantList',
        element : <RParticipantList></RParticipantList>
    },

])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
