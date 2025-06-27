import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

 
/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try { 
        
        console.log(credentials);
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials)
        .catch( error => {
            return console.log(error);
        })
        
        let { username, email , type } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function challange(credentials){
    try {
        let { title} = credentials;
        if(title){
            const { data } = await axios.post('/api/challange', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challange doesn't Match...!"})
    }
}



export async function challenge(credentials){
    try {
        let { ChallengeName} = credentials;
        console.log(credentials);
        if(ChallengeName){
            const { data } = await axios.post('/api/challenge', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge doesn't Match...!"})
    }
}



export async function UpdateChallenge(credentials){
    try {
        const { id,Points,code,Description,Test,Solution } = credentials;
        if(id){
            const { data } = await axios.post('/api/updateChallenge', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge did not get updated...!"})
    }
}



export async function PlanC(credentials){
    try {
        let { ChallengeName ,selectedStartDate ,selectedEndDate } = credentials;
        

        if(ChallengeName){
            console.log(selectedStartDate +"sfzesf");
            const { data } = await axios.post('/api/PlanC', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge is not planned ...!"})
    }
}



export async function PlanCEdit(credentials){
    try {
        let { ChallengeName ,selectedStartDate ,selectedEndDate } = credentials;
        

        if(ChallengeName){
            const { data } = await axios.post('/api/PlanCEdit', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge is not plan edited ...!"})
    }
}


export async function PlanCDelete(credentials){
    try {
        let { ChallengeName } = credentials;
        console.log(ChallengeName);

        if(ChallengeName){
            const { data } = await axios.post('/api/PlanCDelete', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge is not plan Deleted ...!"})
    }
}

export async function SubmitChallenge(credentials){
    try {
        let { ChallengeName } = credentials;
        console.log(ChallengeName);

        if(ChallengeName){
            const { data } = await axios.post('/api/SubmitChallenge', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge is not Submited ...!"})
    }
}


export async function DeleteChallenge(credentials){
    try {
        let { ChallengeName } = credentials;
        console.log(ChallengeName);

        if(ChallengeName){
            const { data } = await axios.post('/api/DeleteChallenge', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "challenge is not Deleted ...!"})
    }
}




export async function updateuser(credentials){
    try {
        let { username } = credentials;
        console.log(username);

        if(username){
            const { data } = await axios.post('/api/updateuser', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "user has been updated...!"})
    }
}



export async function deleteuser(credentials){
    try {
        let { username } = credentials;
        if(username){
            const { data } = await axios.post('/api/deleteuser', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "user has been delete...!"})
    }
}



export async function AddQChallenge(credentials){
    try {
        let { ChallengeName } = credentials;
        console.log(ChallengeName);

        if(ChallengeName){
            const { data } = await axios.post('/api/AddQChallenge', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Challenge Question has been Added...!"})
    }
}


export async function CreatePChallenge(credentials){
    try {
        let { ChallengeName, Answer, Points, username  } = credentials;
        console.log(Answer)

        if(ChallengeName, Answer, Points, username ){
            const { data } = await axios.post('/api/CreatePChallenge', credentials)
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Participation has been saved...!"})
    }
}





export async function createJobOffer(credentials) {
    try {
      
        const { data } = await axios.post('http://localhost:8080/api/createjoboffer', credentials);
        console.log(`Job offer created successfully: ${data}`);
        return Promise.resolve({ message: "Job offer created successfully", jobOffer: data });
      
    } catch (error) {
      console.error(`An error occurred while creating the job offer: ${error}`);
      return Promise.reject({ message: "Error creating job offer", error: error });
    }
    return Promise.reject({ message: "Missing job offer details" });
  }
  


  export async function updateJobOffer(credentials) {
    try {
      
        const { data } = await axios.post('http://localhost:8080/api/updateJobOffer', credentials);
        console.log(`Job offer update successfully: ${data}`);
        return Promise.resolve({ message: "Job offer update successfully", jobOffer: data });
      
    } catch (error) {
      console.error(`An error occurred while creating the job offer: ${error}`);
      return Promise.reject({ message: "Error creating job offer", error: error });
    }
    
  }
  

  
  //get job offers for developper 
  export async function getJobOffers() {
      try {
        const jobOffers = await axios.get('http://localhost:8080/api/getjoboffers');
        return jobOffers.data;
      } catch (error) {
        console.log(error);
        throw new Error("Cannot find job offers");
      }
    }
  

    export async function deleteQuestion(credentials){
        try {
            const { Question } = credentials;
            if(Question){
                const { data } = await axios.post('/api/deletequestion', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "Question did not get deleted...!"})
        }
    }
    
    export async function Createquestion(credentials){
        try {
            const { Question } = credentials;
            if(Question){
                const { data } = await axios.post('/api/question', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "Question did not get add...!"})
        }
    }

    
    export async function Createlearningpath(credentials){
        try {
            const { LearningpathName } = credentials;
            if(LearningpathName){
                const { data } = await axios.post('/api/Createlearningpath', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "Learning path did not get add...!"})
        }
    }

    
    
    export async function CreateStructure(credentials){
        try {
            const { LearningpathName } = credentials;
            if(LearningpathName){
                const { data } = await axios.post('/api/CreateStructure', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "structure did not get add...!"})
        }
    }

    
    export async function CreateGcourse(credentials){
        try {
            const { LearningpathName } = credentials;
            console.log(LearningpathName);
            if(LearningpathName){
                const { data } = await axios.post('/api/CreateGcourse', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "course did not get add...!"})
        }
    }


    
    export async function CreatePGcourse(credentials){
        try {
          
                const { data } = await axios.post('/api/CreatePGcourse', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "Participation in court did not get added...!"})
        }
    }


    
    export async function CreateJochallenge(credentials){
        try {
          
          console.log(credentials);
                const { data } = await axios.post('/api/CreateJOchallenge', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " Jochallenge did not get added...!"})
        }
    }
    

    export async function createPjobch(credentials){
        try {
                const { data } = await axios.post('/api/createPjobch', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " create P job ch did not get added...!"})
        }
    }

    export async function createinterview(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/createinterview', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "interview did not get added...!"})
        }
    }


    
    export async function createreport(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/createreport', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "interview did not get added...!"})
        }
    }

    
    export async function updatereport(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/updatereport', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "interview did not get added...!"})
        }
    }

    
    export async function deletreport(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/deletreport', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "interview did not get added...!"})
        }
    }

    export async function SubmitJobChallenge(credentials){
        try {
            let { Joboffername } = credentials;
            console.log(Joboffername);
    
            if(Joboffername){
                const { data } = await axios.post('/api/SubmitJobChallenge', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "challenge is not Submited ...!"})
        }
    }

    export async function DeleteJobChallenge(credentials){
        try {
            const { Joboffername } = credentials;
            if(Joboffername){
                const { data } = await axios.post('/api/DeleteJobChallenge', credentials)
                return Promise.resolve({ data });
            }
        } catch (error) {
            return Promise.reject({ error : "Job Challenge did not get deleted...!"})
        }
    }


    export async function PlanCJob(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/PlanCJob', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "plan did not get added...!"})
        }
    }

    
    export async function PlanCJobEdit(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/PlanCJobEdit', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "plan did not get updated...!"})
        }
    }

    
    export async function PlanCJobDelete(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/PlanCJobDelete', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "plan did not get deleted...!"})
        }
    }

    export async function Contact(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/Contact', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "Contact added ...!"})
        }
    }

    export async function updateStructure(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/updateStructure', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " Structure updated...!"})
        }
    }

    export async function deleteStructure(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/deleteStructure', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " Structure Deleted...!"})
        }
    }

    export async function updateLearningPath(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/updateLearningPath', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " Learning Path updated...!"})
        }
    }

    export async function deleteLearningPath(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/deleteLearningPath', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " Learning Path Deleted...!"})
        }
    }


    
    export async function UpdateGcourse(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/UpdateGcourse', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : "Gcourse did not update...!"})
        }
    }

    export async function DeleteGcourse(credentials){
        try {

            console.log(credentials);
                const { data } = await axios.post('/api/DeleteGcourse', credentials)
                return Promise.resolve({ data });
            
        } catch (error) {
            return Promise.reject({ error : " Gcourse Deleted...!"})
        }
    }