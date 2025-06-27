import UserModel from '../model/User.model.js'
import ChallengeModel from '../model/challenge.model.js'
import QuestionModel from '../model/question.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';
import PlanificationsystemeModel from '../model/planificationsysteme.model.js';
import ParticipationchallengeModel from '../model/participationchallenge.model.js';
import LearningpathModel from '../model/learningpath.model.js';
import StructureModel from '../model/structure.model.js';
import gamifiedcourseModel from '../model/gamifiedcourse.model.js';
import participationcourseModel from '../model/Participationcours.model.js';

import JobchallengeModel from '../model/jobchallenge.js';

import { Joboffer } from '../model/joboffer.model.js';

import  ParticipationjobchModel from '../model/participationjobch.model.js';
import  InterviewModel from '../model/interview.js';

import  notificationModel from '../model/notification.model.js';

import  reportModel from '../model/report.js';

import  PlanificationJO from '../model/PlanificationJO.js';


import  Contact from '../model/Contact.js';

import  CertificatModel from '../model/certificate.model.js';

import  LeaderboardModel from '../model/leaderboard.js';

import  TestcaseModel from '../model/testcase.js';


/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "type" : "Recruiter" ,
  "profile": ""
}
*/
export async function register(req,res){

    try {
        const { username, password, profile, email ,type } = req.body;        

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({ error : "Please use unique username"});

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error : "Please use unique Email"});

                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            

                          const notification = new notificationModel({
                            User: username, 
                            title: "Welcome to Codathon "+username+"!",
                            Content: "Welcome to Codathon!\n\nWe are thrilled to have you on board.\n\nGet ready to participate in exciting programming competitions,\nexplore learning paths, and tackle recruitment challenges\nto enhance your skills and get recruited.\n\nOur site is secure, ensuring the privacy\nand safety of your data.\n\nAt Codathon, you'll have access to a vast library of coding resources, \ntutorials, and practice problems\nto sharpen your programming prowess.\n\nEngage with our vibrant community of developers,\n share your knowledge, and learn from others.\n\nWhether you're a beginner or an experienced programmer,\nCodathon offers a wide range of challenges and learning opportunities\nto help you level up your skills.\n\nStay updated with the latest industry trends,\nbrush up on in-demand technologies,\n and showcase your abilities to top recruiters.\n\nJoin us today and embark on an exciting journey of coding, \nlearning, and career growth.\n\nHappy coding!",
                          });
                          notification.save();


                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email,
                                type
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req,res){
    
    const { username } = req.params;

    try {
        
        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req,res){
    try {
        
        // const id = req.query.id;
        const { userId } = req.user;

        if(userId){
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id : userId }, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({ msg : "Record Updated...!"});
            })

        }else{
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}


/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}




/** POST: http://localhost:8080/api/challenge 
 * @param : {
  "ChallengeName" : "ChallengeName",
  "Points" : 55,
"Language" : "Language",
"TypeofParticipation" : "TypeofParticipation",
"Difficulty" : "Difficulty",
"Question" : "Quetion",
"Description" : "Description",
"Examples" : "ex1"
"Test" : "Test",
"code" : "code",
"Solution" : "SolutionSolutionSolutionSolution"

  "Date" : "2023-05-01"
  "state" : "Finished"
  "Instructor" : "ilyes_nkk"
}
*/


export async function CreateChallenge(req, res) {

  try {
    const { ChallengeName, Points, Language, TypeofParticipation, Difficulty, Question, Description, Examples, Test, code, Solution, Date, state, Instructor, QCM} = req.body;

    // check the existing user
    const existchallengename = new Promise((resolve, reject) => {
      ChallengeModel.findOne({ ChallengeName }, function (err, ChallengeName) {
        if (err) reject(new Error(err))
        if (ChallengeName) reject({ error: "Please use unique challenge" });

        resolve();
      })
    });

    Promise.all([existchallengename])
      .then(() => {

        const challenge = new ChallengeModel({
          ChallengeName, Points, Language, TypeofParticipation, Difficulty, Description, Examples, Test, code, Date, state
          , Instructor, Solution,QCM
        });

        const qq = new QuestionModel({
          Language, Question
        });

        const qaq = new TestcaseModel({
          testcase: Test,
        });
     

        // save the question
        challenge.save()
          .then(() => {
            // save the challenge
            qq.save()
              .then(result => res.status(201).send({ msg: "Challenge created Successfully" }))
              .catch(error => res.status(500).send({ error }))
          })
          .then(() => {
            // Save the testcase
            return qaq.save();
          })
          .catch(error => res.status(500).send({ error }))

      }).catch(error => {
        return res.status(500).send({ error })
      })


  } catch (error) {
    return res.status(500).send(error);
  }

}




/** POST: http://localhost:8080/api/SubmitChallenge 
 * @param : {
  "ChallengeName" : "string"
}
*/


export async function SubmitChallenge(req,res){

    try {
        const { ChallengeName} = req.body;        
        const Finished = "finished";
        ChallengeModel.updateOne(
            { ChallengeName: ChallengeName },
            { $set: { state : Finished } },
            { new: true, upsert: false },
            (err, rr) => {
              if (err) {
                return res.status(500).json({ error: 'Internal server error' });
              }
          
              if (!rr) {
                return res.status(404).json({ error: 'Challenge not found' });
              }
          
              return res.status(200).json({ message: 'Challenge  submited successfully' });
            }
          );

           

    } catch (error) {
        return res.status(500).send(error);
    }

}



/** POST: http://localhost:8080/api/DeleteChallenge 
 * @param : {
  "ChallengeName" : "string"
}
*/


export async function DeleteChallenge(req,res){

    try {
        const { ChallengeName} = req.body;        

          ChallengeModel.deleteOne({ ChallengeName: ChallengeName }, function(err, result) {                   
            if (err) {
              return res.status(500).json({ error: 'Internal server error' });
            }                  
            if (!result) {
              return res.status(404).json({ error: 'Challenge  not found' });
            }                  
            return res.status(200).json({ message: 'Challenge  Deleted successfully' });
       } );    
           

    } catch (error) {
        return res.status(500).send(error);
    }

}

/** POST: http://localhost:8080/api/question 
 * @param : {
"Language" : "Language",
"Question" : "Question"
}
*/


export async function Createquestion(req,res){

    try {
        const { Language,Question } = req.body;        

        // check the existing user
        const existQuestion = new Promise((resolve, reject) => {
            QuestionModel.findOne({ Question }, function(err, Question){
                if(err) reject(new Error(err))
                if(Question) reject({ error : "Please use unique Quetion"});

                resolve();
            })
        });

        Promise.all([existQuestion])
            .then(() => {
                
                            
                            const qq = new QuestionModel({
                               Language,Question
                            });

                            // return save result as a response
                            qq.save()
                                .then(result => res.status(201).send({ msg: "Question created Successfully"}))
                                .catch(error => res.status(500).send({error}))

                     
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}

/** GET: http://localhost:8080/api/question/Language */
export async function getQuestion(req, res) {
    const { Language } = req.params;
  
    try {
      if (!Language) return res.status(501).send({ error: "Invalid Language" });
  
      QuestionModel.find({ Language }, function (err, questions) {
        if (err) return res.status(500).send({ err });
        if (questions.length === 0)
          return res.status(501).send({ error: "Couldn't Find the Language" });
  
        const questionData = questions.map((question) => {
          const { _id, Language, ...rest } = Object.assign({}, question.toJSON());
          return rest;
        });
  
        return res.status(201).send(questionData);
      });
    } catch (error) {
      return res.status(404).send({ error: "Cannot Find Language Data" });
    }
  }



/** GET: http://localhost:8080/api/AQuestion */
export async function getAQuestion(req, res) {


  try {

    QuestionModel.find({}, function (err, questions) {
      if (err) return res.status(500).send({ err });
      
      const questionData = questions.map((question) => {
        const { _id, ...rest } = Object.assign({}, question.toJSON());
        return rest;
      });
    
      return res.status(201).send(questionData);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find Language Data" });
  }
}



/** POST: http://localhost:8080/api/deletequestion
* @param: {
   "question": "Quetion"
 }
*/

export async function deletequestion(req, res) {
  try {
    const { Question } = req.body;
    const result = await QuestionModel.deleteOne({ Question: Question });
    if (!result.deletedCount) {
      return res.status(404).json({ error: 'Question not found' });
    }
    return res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

 /** GET: http://localhost:8080/api/Challenges */
export async function getChallenges(req, res) {
    try {
      const challenges = await ChallengeModel.find({state : "finished"}).exec();
      const challengeData = challenges.map((challenge) => {
        const { _id, ...rest } = challenge.toJSON();
        return { id: _id.toString(), ...rest };
      });
  
      return res.status(200).send(challengeData);
     } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Cannot find challenges" });
    }
  }


 /** GET: http://localhost:8080/api/ChallengesI/ilyes_nkk */
 export async function getChallengesI(req, res) {

    const { username } = req.params;
    try {
      const challenges = await ChallengeModel.find({ Instructor: username, state : "unfinished" }).exec();
      const challengeData = challenges.map((challenge) => {
        const { _id, ...rest } = challenge.toJSON();
        return { id: _id.toString(), ...rest };
      });
  
      return res.status(200).send(challengeData);
     } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Cannot find challenges" });
    }
  }


  
/** POST: http://localhost:8080/api/updateChallenge 
 * @param : {
"Language" : "Language",
"Quetion" : "Quetion"
}
*/


export async function updateChallenge(req,res){

   
        const { id,Points,code,Description,Test,Solution } = req.body;        
        try {
            
            ChallengeModel.findOneAndUpdate(
              { _id: id },
              { $set: { Points, Description, Test, code, Solution } },
              { new: true },
              (err, updatedChallenge) => {
                if (err) {
                  return res.status(500).json({ error: 'Internal server error' });
                }
          
                if (!updatedChallenge) {
                  return res.status(404).json({ error: 'Challenge not found' });
                }
          
                return res.status(200).json({ message: 'Challenge updated successfully' });
              }
            );
          } catch (error) {
            throw new Error('Error updating challenge: ' + error.message);
          }
        
}



/** POST: http://localhost:8080/api/PlanC
  * @param : {
 "ChallengeName":"array lists",
"selectedStartDate" : "2023-05-21",
"selectedEndDate":"2023-05-26"

}
*/
export async function PlanC(req,res){

    try {
        const { ChallengeName,selectedStartDate,selectedEndDate } = req.body;        

        // check the existing Planification systeme
        const existchallengename = new Promise((resolve, reject) => {
            ChallengeModel.findOne({ ChallengeName }, function(err, challenge){
                if (err) {
                    reject(new Error(err));
                  } else if (!challenge) {
                    // If a challenge with the same name already exists, reject the promise with an error message.
                    reject(new Error(`Challenge name '${ChallengeName}' does not exist. Please provide a valid name.`));
                  } else {
                    // If the challenge name doesn't exist, resolve the promise.
                    resolve();
                  }
            })
          });
          const existPlanificationsysteme = new Promise((resolve, reject) => {
            PlanificationsystemeModel.findOne({ ChallengeName }, function(err, plan){
                if (err) {
                    reject(new Error(err));
                  } else if (plan) {
                   
                    reject(new Error(`Challenge name '${ChallengeName}' already planned.`));
                  } else {
                  
                    resolve();
                  }
            })
          });
          

        Promise.all([existPlanificationsysteme , existchallengename])
            .then(() => {
                
                            
                            const qq = new PlanificationsystemeModel({
                                ChallengeName,selectedStartDate,selectedEndDate
                            });

                            // return save result as a response
                            qq.save()
                                .then(result => res.status(201).send({ msg: "Planification  created Successfully"}))
                                .catch(error => res.status(500).send({error}))

                     
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error.message);
    }

}



/** POST: http://localhost:8080/api/PlanCEdit
  * @param : {
 "ChallengeName":"array lists",
"StartDate" : "2023-05-21",
"EndDate":"2023-05-26"

}
*/
export async function PlanCEdit(req,res){

    try {
        const { ChallengeName,selectedStartDate,selectedEndDate } = req.body;        

        // check the existing Planification systeme
        const existchallengename = new Promise((resolve, reject) => {
            ChallengeModel.findOne({ ChallengeName }, function(err, challenge){
                if (err) {
                    reject(new Error(err));
                  } else if (!challenge) {
                    // If a challenge with the same name already exists, reject the promise with an error message.
                    reject(new Error(`Challenge name '${ChallengeName}' does not exist. Please provide a valid name.`));
                  } else {
                    // If the challenge name doesn't exist, resolve the promise.
                    resolve();
                  }
            })
          });
          

        Promise.all([ existchallengename])
            .then(() => {
                    
                    
                PlanificationsystemeModel.updateOne(
                    { ChallengeName: ChallengeName },
                    { $set: { selectedStartDate, selectedEndDate } },
                    { new: true, upsert: false },
                    (err, rr) => {
                      if (err) {
                        return res.status(500).json({ error: 'Internal server error' });
                      }
                  
                      if (!rr) {
                        return res.status(404).json({ error: 'Challenge planning not found' });
                      }
                  
                      return res.status(200).json({ message: 'Challenge planning updated successfully' });
                    }
                  );
                  
                
                            
                           

                     
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error.message);
    }

}




/** POST: http://localhost:8080/api/PlanCDelete
  * @param : {
 "ChallengeName":"array lists"
}
*/
export async function PlanCDelete(req,res){

    try {
        const { ChallengeName} = req.body;        

        // check the existing Planification systeme
        const existchallengename = new Promise((resolve, reject) => {
            ChallengeModel.findOne({ ChallengeName }, function(err, challenge){
                if (err) {
                    reject(new Error(err));
                  } else if (!challenge) {
                    // If a challenge with the same name already exists, reject the promise with an error message.
                    reject(new Error(`Challenge name '${ChallengeName}' does not exist. Please provide a valid name.`));
                  } else {
                    // If the challenge name doesn't exist, resolve the promise.
                    resolve();
                  }
            })
          });
          

        Promise.all([ existchallengename])
            .then(() => {
                    
               
                    
                    PlanificationsystemeModel.deleteOne({ ChallengeName: ChallengeName }, function(err, result) {                   
                        if (err) {
                          return res.status(500).json({ error: 'Internal server error' });
                        }                  
                        if (!result) {
                          return res.status(404).json({ error: 'Challenge planning not found' });
                        }                  
                        return res.status(200).json({ message: 'Challenge planning Deleted successfully' });
                   } );    
                
                            
                           

                     
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error.message);
    }

}


 /** GET: http://localhost:8080/api/Plan */
 export async function getplan(req, res) {
    try {
      const plan = await PlanificationsystemeModel.find({}).exec();
      const planData = plan.map((plan) => {
        const { _id, ...rest } = plan.toJSON();
        return { id: _id.toString(), ...rest };
      });
  
      return res.status(200).send(planData);
     } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Cannot find plans" });
    }
  }


/** GET: http://localhost:8080/api/users */
export async function getusers(req, res) {
    try {
      const user = await UserModel.find({}).exec();
      const userData = user.map((user) => {
        const { _id, ...rest } = user.toJSON();
        return { id: _id.toString(), ...rest };
      });
  
      return res.status(200).send(userData);
     } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Cannot find users" });
    }
  }

  
/** POST: http://localhost:8080/api/updateuser 
 * @param : {
  "username" : "ilyes",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "type" : "Recruiter" ,
  "profile": ""
}
*/
export async function updateuser(req, res) {


    const { username,firstName,lastName,mobile,address,profile } = req.body;    

    try {
        UserModel.updateOne(
            { username: username },
            { $set: { firstName,lastName,mobile,address,profile  } },
            { new: true, upsert: false },
            (err, rr) => {
              if (err) {
                return res.status(500).json({ error: 'Internal server error' });
              }
          
              if (!rr) {
                return res.status(404).json({ error: 'user not found' });
              }
          
              return res.status(200).json({ message: 'user updated successfully' });
            }
          );
     } catch (error) {
      console.log(error);
      return res.status(404).send({ error: "Cannot find users" });
    }
  }


/** POST: http://localhost:8080/api/deleteuser
  * @param : {
 "username" : "ilyes",
}
*/
export async function deleteuser(req,res){

    try {
        const { username} = req.body;              
        UserModel.deleteOne({ username: username }, function(err, result) {                   
                        if (err) {
                          return res.status(500).json({ error: 'Internal server error' });
                        }                  
                        if (!result) {
                          return res.status(404).json({ error: 'user not found' });
                        }                  
                        return res.status(200).json({ message: 'user Deleted successfully' });
                   } ); 
    } catch (error) {
        return res.status(500).send(error.message);
    }

}


/** GET: http://localhost:8080/api/challenge/:compress_string */
export async function getchallenge(req, res) {
  

        const { ChallengeName } = req.params;
        
      

      try {
          
          if(!ChallengeName) return res.status(501).send({ error: "Invalid challenge"});
  
          ChallengeModel.findOne({ ChallengeName }, function(err, challenge){
              if(err) return res.status(500).send({ err });
              if(!challenge) return res.status(501).send({ error : "Couldn't Find the challenge"});
  
              
              // mongoose return unnecessary data with object so convert it into json
              const { _id, ...rest } = Object.assign({}, challenge.toJSON());
  
              return res.status(201).send(rest);
          })
  
      } catch (error) {
          return res.status(404).send({ error : "Cannot Find challenge Data"});
      }
  
  } 





/** POST: http://localhost:8080/api/AddQChallenge 
 * @param : {
  "ChallengeName" : "sdcsdc",
   "question" : "drheqrherhqrehqrhq",
   "A" : "ezgaegaregare",
   "B" : "zevezvezve",
   "C" : "ezgaegaregare",
   "D" : "zevezvezve",
   "S" : "ezgaegaregare"
}
*/

export async function AddQChallenge(req, res) {
  try {
    const { ChallengeName, question, A, B, C, D, S } = req.body;

    const result = await ChallengeModel.findOneAndUpdate(
      { ChallengeName: ChallengeName },
      {
        $push: {
          QCM: {
            question: question,
            A: A,
            B: B,
            C: C,
            D: D,
            S: S
          }
        }
      },
      { new: true, upsert: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    return res.status(200).json({ message: 'Question added successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
}



  


/** POST: http://localhost:8080/api/CreatePChallenge 
 * @param : {
  "ChallengeName" : "sdcsdc",
   "Answer" : "drheqrherhqrehqrhq",
   "Points" : "ezgaegaregare",
   "username" : "ezgaegaregare"
}
*/


export async function CreatePChallenge(req, res) {
  try {
    const { ChallengeName, Answer, Points, username } = req.body;

    const existUser = await UserModel.findOne({ username });
    if (!existUser) {
      return res.status(400).send({ error: "User not found" });
    }

    const challengeExists = await ChallengeModel.exists({ ChallengeName });
    if (!challengeExists) {
      return res.status(400).send({ error: "Challenge does not exist" });
    }

    const existParticipation = new Promise((resolve, reject) => {
      ParticipationchallengeModel.findOne({ ChallengeName, username }, function (err, existingParticipation) {
        if (err) reject(new Error(err));

        if (existingParticipation) {
          reject({ error: "Please use unique Participation" });
        } else {
          resolve();
        }
      });
    });

    Promise.all([existParticipation, challengeExists])
    .then(async () => {
      // Increment the user's points by the new points received from the request
      await UserModel.updateOne({ username }, { $inc: { Points: Points } });

      const participationNotification = new notificationModel({
        User: username, // Replace with the username of the user
        title: "Challenge participation",
        Content: `Congratulations!\n\nYou have earned ${Points} points for your participation in ${ChallengeName}.\n\nKeep up the great work!`,
      });
      participationNotification.save();

      const qq = new ParticipationchallengeModel({
        ChallengeName,
        Answer,
        Points,
        username,
      });

      // return save result as a response
      qq.save()
        .then((result) => res.status(201).send({ msg: "Participation created Successfully" }))
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
} catch (error) {
  return res.status(500).send(error);
}
}





/** GET: http://localhost:8080/api/activeChallenges 
*/


export async function activeChallenges(req, res) {
  try {
    const today = new Date();
    const challenges = await PlanificationsystemeModel.find({
      selectedStartDate: {  $lte: today },
      selectedEndDate: { $gte: today },
    }).exec();
    const challengeNames = challenges.map((challenge) => challenge.ChallengeName);

    const challengesData = await ChallengeModel.find({ ChallengeName: { $in: challengeNames } }).exec();

    return res.status(200).send(challengesData);

} catch (error) {
  return res.status(500).send(error);
}
}


/** GET: http://localhost:8080/api/Leaderboard/:Leaderboard 
*/


export async function Leaderboard(req, res) {
  try {
    const { ChallengeName } = req.params;
   
    const Participation = await ParticipationchallengeModel.find({ ChallengeName })
      .sort({ Points: -1 })
      .exec();
  
    return res.status(200).send(Participation);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
}

}



   /** POST: http://localhost:8080/api/createjoboffer
  * @param : {
  "Joboffername": "Full Stack Developer",
  "Experience": "2+ years",
  "Salary": 80000,
  "state": "unfinished",
  "companyname": "Acme Corporation",
  "Recruiter": "hqer"
}
*/


export async function createJobOffer(req,res){

  try {
      const { Joboffername,Experience,Salary,companyname,Recruiter} = req.body;        

      // check the existing user
      const existjobename = new Promise((resolve, reject) => {
        Joboffer.findOne({ Joboffername }, function(err, Joboffername){
              if(err) reject(new Error(err))
              if(Joboffername) reject({ error : "Please use unique job offer"});

              resolve();
          })
      });

      Promise.all([existjobename])
          .then(() => {
              
                          
                          const joboffer = new Joboffer({
                            Joboffername,Experience,Salary,companyname,Recruiter
                          });

                          // return save result as a response
                          joboffer.save()
                              .then(result => res.status(201).send({ msg: "job offer  created Successfully"}))
                              .catch(error => res.status(500).send({error}))

                   
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error);
  }

}


   /** POST: http://localhost:8080/api/updateJobOffer
  * @param : {
  "Joboffername": "Full Stack Developer",
  "Experience": "2+ years",
  "Salary": 80000,
  "companyname": "Acme Corporation",
}
*/


export async function updateJobOffer(req,res){

  try {
      const { Joboffername,Experience,Salary,companyname} = req.body;        

      // check the existing user
      const existjobename = new Promise((resolve, reject) => {
        Joboffer.findOne({ Joboffername }, function(err, Joboffername){
              if(err) reject(new Error(err))
              if(!Joboffername) reject({ error : "Please use existing job offer"});

              resolve();
          })
      });

      Promise.all([existjobename])
          .then(() => {
          
            Joboffer.updateOne(
              { Joboffername: Joboffername },
              { $set: { Experience,Salary,companyname  } },
              { new: true, upsert: false },
              (err, rr) => {
                if (err) {
                  return res.status(500).json({ error: 'Internal server error' });
                }
            
                if (!rr) {
                  return res.status(404).json({ error: 'Joboffer not found' });
                }
            
                return res.status(200).json({ message: 'Joboffer updated successfully' });
              }
              );
                   
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error);
  }

}





/** GET:http://localhost:8080/api/getjoboffers */
export async function getJobOffers(req, res) {
  try {
    const jobOffers = await Joboffer.find({ }).exec();
    const jobOfferData = jobOffers.map((jobOffer) => {
      const { _id, ...rest } = jobOffer.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(jobOfferData);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find job offers" });
  }

}




 /** GET: http://localhost:8080/api/getjoboffersR/:ilyes_nkk */
 export async function getjoboffersR(req, res) {

  const { username } = req.params;
  try {
    const jobOffers = await Joboffer.find({ Recruiter: username, state: "unfinished" }).exec();
    const jobOfferData = jobOffers.map((jobOffer) => {
      const { _id, ...rest } = jobOffer.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(jobOfferData);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find job offers" });
  }
}


/** POST: http://localhost:8080/api/Createlearningpath
 * @param : {
  "LearningpathName" : "sdcsdc",
   "Language" : "drheqrherhqrehqrhq",
   "Points" : "ezgaegaregare",
   "Description" : "ezgaegaregare"
}
*/


export async function Createlearningpath(req, res) {
  try {
    const { LearningpathName, Language, Points, Description } = req.body;



    const existLearningpath = new Promise((resolve, reject) => {
      LearningpathModel.findOne({ LearningpathName }, function(err, LearningpathName){
          if(err) reject(new Error(err))
          if(LearningpathName) reject({ error : "Please use unique Quetion"});

          resolve();
      })
  });


    Promise.all([existLearningpath])
    .then(async () => {
     

      const qq = new LearningpathModel({
        LearningpathName,
        Language,
        Points,
        Description,
      });

      // return save result as a response
      qq.save()
        .then((result) => res.status(201).send({ msg: "Learning path created Successfully" }))
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
} catch (error) {
  return res.status(500).send(error);
}
}




/** GET:http://localhost:8080/api/getlearningpaths */
export async function getlearningpaths(req, res) {
  try {
    const Learningpaths = await LearningpathModel.find({ }).exec();
    const LearningpathData = Learningpaths.map((Learningpath) => {
      const { _id, ...rest } = Learningpath.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(LearningpathData);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find Learning paths" });
  }

}


/** GET:http://localhost:8080/api/getlearningpath/:learning */
export async function getlearningpath(req, res) {
  try {

    const { LearningpathName } = req.params;
    if(!LearningpathName) return res.status(501).send({ error: "Invalid Learning path"});
  
    LearningpathModel.findOne({ LearningpathName }, function(err, Learning){
        if(err) return res.status(500).send({ err });
        if(!Learning) return res.status(501).send({ error : "Couldn't Find the Learning path"});

        
        // mongoose return unnecessary data with object so convert it into json
        const { _id, ...rest } = Object.assign({}, Learning.toJSON());

        return res.status(201).send(rest);
    })
} catch (error) {
  console.error(error);
  return res.status(500).send(error);
}




  
}







/** POST: http://localhost:8080/api/CreateStructure
 * @param : {
  "Coursename" : "intro",
   "Description" : "intro",
   "CourseP" : 30,
   "InteractiveP" : 50,
   "QuizP" : 20,
   "LearningpathName" : "ezgaegaregare"
}
*/


export async function CreateStructure(req, res) {
  try {
    const {  Coursename, CourseP,InteractiveP,QuizP, Description, LearningpathName } = req.body;



    const existLearningpath = new Promise((resolve, reject) => {
      LearningpathModel.findOne({ LearningpathName }, function(err, LearningpathName){
          if(err) reject(new Error(err))
          if(!LearningpathName) reject({ error : "Please use valide learning path"});

          resolve();
      })
  });


    Promise.all([existLearningpath])
    .then(async () => {
     

      const qq = new StructureModel({
        Coursename, CourseP,InteractiveP,QuizP, Description, LearningpathName
      });

      // return save result as a response
      qq.save()
        .then((result) => res.status(201).send({ msg: "Structure created Successfully" }))
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
} catch (error) {
  return res.status(500).send(error);
}
}



/** GET:http://localhost:8080/api/getStructures/Python Master */
export async function getStructures(req, res) {
  try {
    const { LearningpathName } = req.params;

    const Structures = await StructureModel.find({ LearningpathName: LearningpathName }).exec();
    const StructureData = Structures.map((Structure) => {
      const { _id, ...rest } = Structure.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(StructureData);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find Structures" });
  }

}





/** POST: http://localhost:8080/api/CreateGcourse
 * @param : {
 
  "Name" : "intro to python",
   "Course" : "zegzeg",
   "Description" : "intro",
   "PDescription" : "30",
   "Hint" : "50",
   "Test" : "20",
   "code" : "ezgaegaregare"
   "question" : "50",
   "A" : "20",
   "B" : "ezgaegaregare"
   "C" : "50",
   "D" : "20",
   "S" : "ezgaegaregare"
  "LearningpathName" : "Python Master"

}
*/


export async function CreateGcourse(req, res) {
  try {
    const {  Name, Course, Description, PDescription,Hint,Test,code,question,A,B,C,D,S,LearningpathName, Solution } = req.body;

   

    const existLearningpath = new Promise((resolve, reject) => {
      LearningpathModel.findOne({ LearningpathName }, function(err, LearningpathName){
          if(err) reject(new Error(err))
          if(!LearningpathName) reject({ error : "Please use valide learning path"});

          resolve();
      })
  });

  const structure = await StructureModel.findOne({ Coursename: Name });

  const { CourseP, InteractiveP, QuizP } = structure;

    Promise.all([existLearningpath])
    .then(async () => {
     

      const qq = new gamifiedcourseModel({
        Name, Course, Description, PDescription,Hint,Test,code,question,A,B,C,D,S,CourseP, InteractiveP, QuizP,LearningpathName,Solution
      });

      // return save result as a response
      qq.save()
        .then((result) => res.status(201).send({ msg: "Gcourse created Successfully" }))
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
} catch (error) {
  return res.status(500).send(error);
}
}



/** GET:http://localhost:8080/api/getGcourse/Python Master */
export async function getGcourse(req, res) {
  try {
    const { LearningpathName } = req.params;

    const Gcourse = await gamifiedcourseModel.find({ LearningpathName: LearningpathName }).exec();
    const GcourseData = Gcourse.map((Gcourse) => {
      const { _id, ...rest } = Gcourse.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(GcourseData);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find Gcourse" });
  }

}



/** GET:http://localhost:8080/api/Gcourse/Python Master */
export async function Gcourse(req,res){
    
  const { Name } = req.params;

  try {
      
      if(!Name) return res.status(501).send({ error: "Invalid Gcourse Name"});

      gamifiedcourseModel.findOne({ Name }, function(err, Gcourse){
          if(err) return res.status(500).send({ err });
          if(!Gcourse) return res.status(501).send({ error : "Couldn't Find the Gcourse"});

          /** remove password from user */
          // mongoose return unnecessary data with object so convert it into json
          const { _id, ...rest } = Object.assign({}, Gcourse.toJSON());

          return res.status(201).send(rest);
      })

  } catch (error) {
      return res.status(404).send({ error : "Cannot Find Gcourse Data"});
  }

}



/** POST: http://localhost:8080/api/CreatePGcourse
 * @param : {
 
  "Name" : "intro to python",
   "Points" : 50
  "LearningpathName" : "Python Master"
    "username" : "ilyes_nkk"
}
*/


export async function CreatePGcourse(req, res) {
  try {
    const {  Name, Points,LearningpathName,username } = req.body;


    const existUser = await UserModel.findOne({ username });
    if (!existUser) {
      return res.status(400).send({ error: "User not found" });
    }

    const existLP = await LearningpathModel.findOne({ LearningpathName });
    if (!existLP) {
      return res.status(400).send({ error: "Learning path not found" });
    }

    const courseExists = await gamifiedcourseModel.exists({ Name });
    if (!courseExists) {
      return res.status(400).send({ error: "Course does not exist" });
    }

    const existParticipation = new Promise((resolve, reject) => {
      participationcourseModel.findOne({ Name, username }, function (err, existingParticipation) {
        if (err) reject(new Error(err));

        if (existingParticipation) {
          reject({ error: "Please use unique Participation" });
        } else {
          resolve();
        }
      });
    });

    Promise.all([existParticipation, courseExists])
    .then(async () => {

      await UserModel.updateOne({ username }, { $inc: { Points: Points } });



      const participationNotification = new notificationModel({
        User: username, // Replace with the username of the user
        title: "Course participation",
        Content: `Congratulations!\n\nYou have earned ${Points} points for your participation in ${Name}.\n\nKeep up the great work!`,
      });
      participationNotification.save();


      const qq = new participationcourseModel({
        Name, Points,LearningpathName,username
      });

      // return save result as a response
      qq.save()
        .then((result) => res.status(201).send({ msg: "participation in Gcourse created Successfully" }))
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
} catch (error) {
  return res.status(500).send(error);
}
}




/** POST: http://localhost:8080/api/CreateJOchallenge
 * @param : {
  "Joboffername" : "ChallengeName",
"Language" : "Language",
"Description" : "Description",
  "Date" : "2023-05-01",
  "state" : "Finished",
 "QCM": [
      {
        "question": "Which of the following compression algorithms is commonly used for compressing text data?",
        "A": "Lempel-Ziv-Welch (LZW)",
        "B": "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']",
        "C": "Arithmetic coding",
        "D": "Run-length encoding",
        "S": "Lempel-Ziv-Welch (LZW)"
        
      }
    ]
}
*/


export async function CreateJOchallenge(req,res){

  try {
      const { Joboffername,Description,state, QCM } = req.body;        

      // check the existing user
      const existJobchallenge = new Promise((resolve, reject) => {
        JobchallengeModel.findOne({ Joboffername}, function(err, Joboffername){
              if(err) reject(new Error(err))
              if(Joboffername) reject({ error : "Please use unique job challenge name"});

              resolve();
          })
      });

      Promise.all([existJobchallenge])
          .then(() => {
              
                          
                          const Jobchallenge = new JobchallengeModel ({
                            Joboffername,Description,state, QCM
                              
                          });

                          // return save result as a response
                          Jobchallenge.save()
                              .then(result => res.status(201).send({ msg: "job challenge created Successfully"}))
                              .catch(error => res.status(500).send({error}))

                   
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error);
  }

}


/** GET:http://localhost:8080/api/getJOchallenge/ */
export async function getJOchallenge(req,res){
    
  const { Joboffername } = req.params;

  try {
      
      if(!Joboffername) return res.status(501).send({ error: "Invalid Joboffername Name"});

      JobchallengeModel.findOne({ Joboffername }, function(err, Joboffer){
          if(err) return res.status(500).send({ err });
          if(!Joboffer) return res.status(501).send({ error : "Couldn't Find the Job offer"});

          /** remove password from user */
          // mongoose return unnecessary data with object so convert it into json
          const { _id, ...rest } = Object.assign({}, Joboffer.toJSON());

          return res.status(201).send(rest);
      })

  } catch (error) {
      return res.status(404).send({ error : "Cannot Find Job offer challenge Data"});
  }

}


/** POST: http://localhost:8080/api/createPjobch
 * @param : {
 
  "jobchallenge" : "intro to python",
   "NbrQ" : 50
  "NbrCAnswer" : 40
    "username" : "ilyes_nkk"
}
*/

export async function createPjobch(req, res) {
  try {

    const { jobchallenge, NbrCAnswer,NbrQ, username } = req.body;


    const existUser = await UserModel.findOne({ username });
    if (!existUser) {
      return res.status(400).send({ error: "User not found" });
    }

    const challengeExists = await JobchallengeModel.exists({ jobchallenge });
    if (!challengeExists) {
      return res.status(400).send({ error: "Challenge does not exist" });
    }



    const existParticipation = new Promise((resolve, reject) => {
      ParticipationjobchModel.findOne({ jobchallenge, username }, function (err, existingParticipation) {
        if (err) reject(new Error(err));

        if (existingParticipation) {
          reject({ error: "Please use unique Participation" });
        } else {
          resolve();
        }
      });
    });

   
    Promise.all([existParticipation, challengeExists])
    .then(async () => {
   

      const qq = new ParticipationjobchModel({
        jobchallenge, NbrCAnswer,NbrQ, username
      });

      // return save result as a response
      qq.save()
        .then((result) => res.status(201).send({ msg: "Participation created Successfully" }))
        .catch((error) => res.status(500).send({ error }));
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
} catch (error) {
  return res.status(500).send(error);
}
}



/** GET: http://localhost:8080/api/getPlearningpath/Python Master/ilyes_nkk */
export async function getPlearningpath(req, res) {
  const { Learningpath, username } = req.params;
  const LearningpathName = Learningpath;
  try {
    const PcourCount = await participationcourseModel.countDocuments({
      LearningpathName,
      username
    });

    const coursCount = await gamifiedcourseModel.countDocuments({ LearningpathName });

    const completionPercentage = (PcourCount / coursCount) * 100;

    if (completionPercentage === 100) {
   
      const newCertificate = new CertificatModel({
        Name: username,
        LearningpathName: LearningpathName,
      });

   
      await newCertificate.save();
    }

    return res.status(200).json({ completionPercentage });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}






/** POST: http://localhost:8080/api/createinterview
 * @param : {
 
   "Joboffername" : "web dev",
   "Dinterview" : '2023-06-01T05:00:00',
   "link" : "https://ant.design/components/date-picker",
   "username" : "ilyes_nkk",
   "username" : "hzar"
}
*/
export async function createinterview(req, res) {
  try {
    const { Joboffername, Dinterview, link, username, Rname } = req.body;

    const existUser = await UserModel.findOne({ $and: [{ username }, { Rname }] });
    if (!existUser) {
      return res.status(400).send({ error: "User not found" });
    }

    const JobofferExists = await JobchallengeModel.exists({ Joboffername });
    if (!JobofferExists) {
      return res.status(400).send({ error: "Job offer does not exist" });
    }

    // Convert the Dinterview string to a Date object with zero offset
    const utcDinterview = new Date(Dinterview + "Z");

    const existingInterview = await InterviewModel.findOne({
      Rname: Rname,
      $and: [
        { Dinterview: utcDinterview }, // Check if there is an interview at the exact same time
        {
          Dinterview: {
            $gte: new Date(utcDinterview.getTime() - 60 * 60 * 1000), // One hour before the given interview time
            $lte: new Date(utcDinterview.getTime() + 60 * 60 * 1000), // One hour after the given interview time
          },
        },
      ],
    });
    if (existingInterview) {
      return res.status(400).send({ error: "Interview already exists at the given time or within the one-hour time frame" });
    }

    const notification = new notificationModel({
      User: username,
      title: "Recruitment",
      Content: "An interview has been scheduled for the job offer: " + Joboffername + "\n At this time: " + Dinterview + "\n LINK:\n" + link,
    });
    notification.save();

    const qq = new InterviewModel({
      Joboffername,
      Dinterview: utcDinterview, // Store the converted UTC date
      link,
      username,
      Rname,
    });

    qq.save()
      .then(async (result) => {
        res.status(201).send({ msg: "Interview created successfully" });
      })
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "An error occurred" });
  }
}



/** GET:http://localhost:8080/api/getPjoboffer/web dev */
export async function getPjoboffer(req,res){
    
  const { joboffer } = req.params;

  try {
      
      if(!joboffer) return res.status(501).send({ error: "Invalid joboffer Name"});

      const participants = await ParticipationjobchModel.find({ jobchallenge: joboffer })
      .sort({ NbrCAnswer: -1 }) 
      .exec();
    
      const participantData = participants.map((participant) => {
        const { _id, ...rest } = participant.toJSON();
        return { id: _id.toString(), ...rest };
      });
    

      return res.status(200).send(participantData);
      

  } catch (error) {
      return res.status(404).send({ error : "Cannot Find job offer Data"});
  }

}


/** GET: http://localhost:8080/api/getNotification/web dev */
export async function getNotification(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid username" });

    const notifications = await notificationModel
      .find({ User: username })
      .sort({ Date: -1 }) // Sort by 'date' field in descending order
      .exec();

    const notificationData = notifications.map((notification) => {
      const { _id, ...rest } = notification.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(notificationData);
  } catch (error) {
    return res.status(404).send({ error: "Cannot find notifications data" });
  }
}










/** POST: http://localhost:8080/api/createreport
 * @param : {
 
   "analyst" : "ilyes_nkk",
   "title" : "svdsdvsd",
   "report" : "qsvvgsdbqdbqdfb",
   "statistic" : "nbr"
}
*/
export async function createreport(req, res) {
  try {
    const { analyst, title, report, statistic } = req.body;

    const reportExists = await reportModel.exists({ title });
    if (reportExists) {
      return res.status(400).send({ error: "report does exist" });
    }
   

    
   

    const notification = new notificationModel({
      User: "admin",
      title: "Report",
      Content: "A report has been added about: " + statistic + "\n by: " + analyst ,
    });
    notification.save();

    const qq = new reportModel({
      analyst, title, report, statistic
    });

    qq.save()
      .then(async (result) => {
        res.status(201).send({ msg: "report created successfully" });
      })
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "An error occurred" });
  }
}

   /** POST: http://localhost:8080/api/updatereport
  * @param : {
   "title" : "svdsdvsd",
   "report" : "qsvvgsdbqdbqdfb",
}
*/

export async function updatereport(req,res){

  try {
      const { title, report} = req.body;        

      // check the existing user
      const reportExists = new Promise((resolve, reject) => {
        reportModel.findOne({ title }, function(err, titlen){
              if(err) reject(new Error(err))
              if(!titlen) reject({ error : "Please use existing report"});

              resolve();
          })
      });

      Promise.all([reportExists])
          .then(() => {
          
            reportModel.updateOne(
              { title: title },
              { $set: { report  } },
              { new: true, upsert: false },
              (err, rr) => {
                if (err) {
                  return res.status(500).json({ error: 'Internal server error' });
                }
            
                if (!rr) {
                  return res.status(404).json({ error: 'report not found' });
                }
            
                return res.status(200).json({ message: 'report updated successfully' });
              }
              );
                   
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error);
  }

}

/** POST: http://localhost:8080/api/deletreport
  * @param : {
 "title" : "svdsdvsd",
}
*/
export async function deletreport(req,res){

  try {
      const { title} = req.body;              
      reportModel.deleteOne({ title: title }, function(err, result) {                   
                      if (err) {
                        return res.status(500).json({ error: 'Internal server error' });
                      }                  
                      if (!result) {
                        return res.status(404).json({ error: 'report not found' });
                      }                  
                      return res.status(200).json({ message: 'report Deleted successfully' });
                 } ); 
  } catch (error) {
      return res.status(500).send(error.message);
  }

}

/** GET: http://localhost:8080/api/getreport/nbr */

export async function getreport(req, res) {
  const { statistic } = req.params;

  try {
    const reports = await reportModel.find({ statistic: statistic }).exec();

    const reportData = reports.map((report) => {
      const { _id, ...rest } = report.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(reportData);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

/** GET: http://localhost:8080/api/getreportA/nbr/ilyes_nkk */

export async function getreportA(req, res) {
  const { statistic, username } = req.params;

  try {
    const reports = await reportModel.find({ statistic: statistic, analyst: username }).exec();

    const reportData = reports.map((report) => {
      const { _id, ...rest } = report.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(reportData);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



/** POST: http://localhost:8080/api/SubmitJobChallenge 
 * @param : {
  "Joboffername" : "string"
}
*/


export async function SubmitJobChallenge(req,res){

  try {
      const {Joboffername} = req.body;        
      const Finished = "finished";
      Joboffer.updateOne(
          { Joboffername: Joboffername},
          { $set: { state : Finished } },
          { new: true, upsert: false },
          (err, rr) => {
            if (err) {
              return res.status(500).json({ error: 'Internal server error' });
            }
        
            if (!rr) {
              return res.status(404).json({ error: 'job offer not found' });
            }
        
            return res.status(200).json({ message: 'job offer  submited successfully' });
          }
        );

         

  } catch (error) {
      return res.status(500).send(error);
  }

}


/** POST: http://localhost:8080/api/DeleteJobChallenge 
 * @param : {
  "Joboffername" : "string"
}
*/


export async function DeleteJobChallenge (req,res){

  try {
      const { Joboffername} = req.body;        

      Joboffer.deleteOne({ Joboffername: Joboffername }, function(err, result) {                   
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }                  
          if (!result) {
            return res.status(404).json({ error: 'job offer  not found' });
          }                  
          return res.status(200).json({ message: 'job offer  Deleted successfully' });
     } );    
         

  } catch (error) {
      return res.status(500).send(error);
  }

}







/** POST: http://localhost:8080/api/PlanCJob
  * @param : {
 "Joboffername":"array lists",
"selectedStartDate" : "2023-05-21",
"selectedEndDate":"2023-05-26"

}
*/
export async function PlanCJob(req, res) {
  try {
    const { Joboffername, selectedStartDate, selectedEndDate } = req.body;

    const existJoboffername = new Promise((resolve, reject) => {
      Joboffer.findOne({ Joboffername }, function (err, jobchallenge) {
        if (err) {
          reject(new Error(err));
        } else if (!jobchallenge) {
          reject(new Error(`Joboffer name '${Joboffername}' does not exist. Please provide a valid name.`));
        } else {
          resolve();
        }
      });
    });

    const existPlanificationjobc = new Promise((resolve, reject) => {
      PlanificationJO.findOne({ Joboffername }, function (err, plan) {
        if (err) {
          reject(new Error(err));
        } else if (plan) {
          reject(new Error(`Joboffer name '${Joboffername}' already planned.`));
        } else {
          resolve();
        }
      });
    });

    Promise.all([existPlanificationjobc, existJoboffername])
      .then(() => {
        const qq = new PlanificationJO({
          Joboffername,
          selectedStartDate,
          selectedEndDate
        });

        qq.save()
          .then(result => res.status(201).send({ msg: "Planification created Successfully" }))
          .catch(error => res.status(500).send({ error }));
      })
      .catch(error => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}



/** POST: http://localhost:8080/api/PlanCJobEdit
  * @param : {
 "Joboffername":"array lists",
"StartDate" : "2023-05-21",
"EndDate":"2023-05-26"

}
*/
export async function PlanCJobEdit(req,res){

  try {
      const { Joboffername,selectedStartDate,selectedEndDate } = req.body;        

      // check the existing Planification systeme
      const existJoboffername = new Promise((resolve, reject) => {
        PlanificationJO.findOne({ Joboffername }, function(err, challenge){
              if (err) {
                  reject(new Error(err));
                } else if (!challenge) {
                  // If a challenge with the same name already exists, reject the promise with an error message.
                  reject(new Error(`Job Challenge name '${Joboffername}' does not exist. Please provide a valid name.`));
                } else {
                  // If the challenge name doesn't exist, resolve the promise.
                  resolve();
                }
          })
        });
        

      Promise.all([ existJoboffername])
          .then(() => {
                  
                  
            PlanificationJO.updateOne(
                  { Joboffername: Joboffername },
                  { $set: { selectedStartDate, selectedEndDate } },
                  { new: true, upsert: false },
                  (err, rr) => {
                    if (err) {
                      return res.status(500).json({ error: 'Internal server error' });
                    }
                
                    if (!rr) {
                      return res.status(404).json({ error: 'Challenge planning not found' });
                    }
                
                    return res.status(200).json({ message: 'Challenge planning updated successfully' });
                  }
                );
                
              
                          
                         

                   
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error.message);
  }

}

/** POST: http://localhost:8080/api/PlanCJobDelete
  * @param : {
 "Joboffername":"array lists"
}
*/
export async function PlanCJobDelete(req,res){

  try {
      const { Joboffername} = req.body;        

      // check the existing Planification systeme
      const existJoboffername = new Promise((resolve, reject) => {
        PlanificationJO.findOne({ Joboffername }, function(err, challenge){
              if (err) {
                  reject(new Error(err));
                } else if (!challenge) {
                  // If a challenge with the same name already exists, reject the promise with an error message.
                  reject(new Error(`JO name '${Joboffername}' does not exist. Please provide a valid name.`));
                } else {
                  // If the challenge name doesn't exist, resolve the promise.
                  resolve();
                }
          })
        });
        

      Promise.all([ existJoboffername])
          .then(() => {
                  
             
                  
            PlanificationJO.deleteOne({ Joboffername: Joboffername }, function(err, result) {                   
                      if (err) {
                        return res.status(500).json({ error: 'Internal server error' });
                      }                  
                      if (!result) {
                        return res.status(404).json({ error: 'JO planning not found' });
                      }                  
                      return res.status(200).json({ message: 'JO planning Deleted successfully' });
                 } );    
              
                          
                         

                   
          }).catch(error => {
              return res.status(500).send({ error })
          })


  } catch (error) {
      return res.status(500).send(error.message);
  }

}


 /** GET: http://localhost:8080/api/getplanJ */
 export async function getplanJ(req, res) {
  try {
    const plan = await PlanificationJO.find({}).exec();
    const planData = plan.map((plan) => {
      const { _id, ...rest } = plan.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(planData);
   } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find plans" });
  }
}


 /** GET: http://localhost:8080/api/getJOs */
 export async function getJOs(req, res) {
  try {
    const JOs = await Joboffer.find({state : "finished"}).exec();
    const JOData = JOs.map((JO) => {
      const { _id, ...rest } = JO.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(JOData);
   } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find challenges" });
  }
}



/** GET: http://localhost:8080/api/activeChallengesJob 
*/


export async function activeChallengesJob(req, res) {
  try {
    const today = new Date();
    const JOS = await PlanificationJO.find({
      selectedStartDate: {  $lte: today },
      selectedEndDate: { $gte: today },
    }).exec();
    const JoboffernameS = JOS.map((JO) => JO.Joboffername);

    const JOSData = await Joboffer.find({ Joboffername: { $in: JoboffernameS } }).exec();

    return res.status(200).send(JOSData);

} catch (error) {
  return res.status(500).send(error);
}
}

 /** GET: http://localhost:8080/api/getJOsR/ilyes */
 export async function getJOsR(req, res) {
  const { username } = req.params;
  try {
    const JOs = await Joboffer.find({Recruiter: username,state : "finished"}).exec();
    const JOData = JOs.map((JO) => {
      const { _id, ...rest } = JO.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(JOData);
   } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find challenges" });
  }
}





/** POST: http://localhost:8080/api/Contact 
 * @param : {
"FULLNAME" : "FULLNAMEFULLNAME",
"EMAIL" : "QuestionQuestionQuestion",
"MESSAGE" : "QuestionQuestionQuestion"
}
*/


export async function Contccdact(req,res){

  try {
      const { FULLNAME,EMAIL,MESSAGE } = req.body;        
                          
                          const qq = new Contact({
                            FULLNAME,EMAIL,MESSAGE
                          });

                          // return save result as a response
                          qq.save()
                              .then(result => res.status(201).send({ msg: "Contact created Successfully"}))
                              .catch(error => res.status(500).send({error}))

  } catch (error) {
      return res.status(500).send(error);
  }

}


/** GET: http://localhost:8080/api/getDhome/ilyes */
export async function getDhome(req, res) {

  const { username } = req.params;

  try {

    const nP = await UserModel.findOne({ username: username}, { Points: 1 });
    const nbrP =nP.Points;
    
    const PCH = await ParticipationchallengeModel.countDocuments({ username: username });
    const PC = await participationcourseModel.countDocuments({ username: username });
    const PJO = await ParticipationjobchModel.countDocuments({ username: username });



    const challengeResult = await ParticipationchallengeModel.aggregate([
      { $match: { username: username } },
      {
        $project: {
          _id: 0,
          name: "$ChallengeName",
          value: "$Points",
          date: "$Date"
        }
      }
    ]);
    
    const courseResult = await participationcourseModel.aggregate([
      { $match: { username: username } },
      {
        $project: {
          _id: 0,
          name: "$Name",
          value: "$Points",
          date: "$Date"
        }
      }
    ]);
    
    const playlist = [...challengeResult, ...courseResult].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );


    const users = await UserModel.find({ type: "developer" }).sort({ Points: -1 });

    const rankedUsers = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      email: user.email,
      profilePicture: user.profile,
      points: user.Points || 0,
    }));

   
    const newLeaderboard = new LeaderboardModel({
      date: new Date(),
      leaderboard: rankedUsers, 
    });
    try {
      await newLeaderboard.save();
      console.log('Leaderboard saved successfully!');
    } catch (error) {
      console.error('Error saving leaderboard:', error);
    }
    const dashboardData = {
      nbrP,
      PCH,
      PC,
      PJO,
      playlist,
      rankedUsers
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    return res.status(404).send({ error: "Cannot find Dashboard data" });
  }
}


/** POST: http://localhost:8080/api/updateStructure
 * @param : {
  "Coursename" : "intro",
   "Description" : "intro",
   "CourseP" : 30,
   "InteractiveP" : 50,
   "QuizP" : 20,
   "LearningpathName" : "sdcsdc"
}
*/
export async function updateStructure(req, res) {
  try {
    const { Coursename, CourseP, InteractiveP, QuizP, Description } = req.body;

    // Check if the structure exists
    const existingStructure = await StructureModel.findOne({ Coursename });

    if (!existingStructure) {
      return res.status(404).send({ error: "Structure not found" });
    }

    // Update the structure fields
    existingStructure.CourseP = CourseP;
    existingStructure.InteractiveP = InteractiveP;
    existingStructure.QuizP = QuizP;
    existingStructure.Description = Description;


    // Save the updated structure
    existingStructure
      .save()
      .then(() => res.status(200).send({ msg: "Structure updated successfully" }))
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send({ error });
  }
}


/** POST: http://localhost:8080/api/deleteStructure
 * @param : {
  "Coursename" : "intro"
}
*/
export async function deleteStructure(req, res) {
  try {
    const { Coursename } = req.body;

    // Check if the structure exists
    const existingStructure = await StructureModel.findOne({ Coursename });

    if (!existingStructure) {
      return res.status(404).send({ error: "Structure not found" });
    }

    // Delete the structure
    existingStructure
      .remove()
      .then(() => res.status(200).send({ msg: "Structure deleted successfully" }))
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send({ error });
  }
}



/** POST: http://localhost:8080/api/updateLearningPath
{
  "LearningpathName" : "sdcsdc",
   "Language" : "java",
   "Points" : 50,
   "Description" : "hazar"
}
*/
export async function updateLearningPath(req, res) {
  try {
    const { LearningpathName, Language, Points, Description } = req.body;

    // Check if the learning path exists
    const existingLearningPath = await LearningpathModel.findOne({ LearningpathName });

    if (!existingLearningPath) {
      return res.status(404).send({ error: "Learning path not found" });
    }

    // Update the learning path fields
    existingLearningPath.Language = Language;
    existingLearningPath.Points = Points;
    existingLearningPath.Description = Description;

    // Save the updated learning path
    existingLearningPath
      .save()
      .then(() => res.status(200).send({ msg: "Learning path updated successfully" }))
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send({ error });
  }
}


/** POST: http://localhost:8080/api/deleteLearningPath
{
  "LearningpathName" : "sdcsdc",
  
}
*/
export async function deleteLearningPath(req, res) {
  try {
    const { LearningpathName } = req.body;

    // Check if the learning path exists
    const existingLearningPath = await LearningpathModel.findOne({ LearningpathName });

    if (!existingLearningPath) {
      return res.status(404).send({ error: "Learning path not found" });
    }

    // Delete the learning path
    existingLearningPath
      .remove()
      .then(() => res.status(200).send({ msg: "Learning path deleted successfully" }))
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send({ error });
  }
}


export async function UpdateGcourse(req, res) {
  try {
    const { Name, Course, Description, PDescription, Hint, Test, code, question, A, B, C, D, S } = req.body;

    const updatedCourse = await gamifiedcourseModel.findOneAndUpdate(
      { Name }, // filter
      { Course, Description, PDescription, Hint, Test, code, question, A, B, C, D, S }, // update
      { new: true } // options - return the updated document
    );

    if (updatedCourse) {
      res.status(200).send({ msg: "Gcourse updated successfully" });
    } else {
      res.status(404).send({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}

// Delete a course by name
export async function DeleteGcourse(req, res) {
  try {
    const { Name } = req.body;

    const deletedCourse = await gamifiedcourseModel.findOneAndDelete({ Name });

    if (deletedCourse) {
      res.status(200).send({ msg: "Gcourse deleted successfully" });
    } else {
      res.status(404).send({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}




/** GET: http://localhost:8080/api/getDashboard */
export async function getDashboard(req, res) {
  try {
    const nbrD = await UserModel.countDocuments({ type: "developer" });
    const nbrCH = await ChallengeModel.countDocuments({ state: "finished" });
    const nbrL = await LearningpathModel.countDocuments({});
    const nbrJob = await Joboffer.countDocuments({ state: "finished" });
    const nbrC = await gamifiedcourseModel.countDocuments({});

    const statistics = await ChallengeModel.aggregate([
      {
        $group: {
          _id: "$Instructor",
          finishedChallenges: {
            $sum: {
              $cond: [{ $eq: ["$state", "finished"] }, 1, 0],
            },
          },
          unfinishedChallenges: {
            $sum: {
              $cond: [{ $eq: ["$state", "unfinished"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          finishedChallenges: 1,
          unfinishedChallenges: 1,
        },
      },
    ]);
    

    const statistics1 = await Joboffer.aggregate([
      {
        $group: {
          _id: "$Recruiter",
          finishedJoboffer: {
            $sum: {
              $cond: [{ $eq: ["$state", "finished"] }, 1, 0],
            },
          },
          unfinishedJoboffer: {
            $sum: {
              $cond: [{ $eq: ["$state", "unfinished"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          finishedJoboffer: 1,
          unfinishedJoboffer: 1,
        },
      },
    ]);

    const learningPaths = await LearningpathModel.find();
    const learningPathData = [];

    for (const learningPath of learningPaths) {
      const structures = await StructureModel.find({
        LearningpathName: learningPath.LearningpathName,
      });

      const gamifiedCoursesCount = await gamifiedcourseModel.countDocuments({
        LearningpathName: learningPath.LearningpathName,
      });

      const remainingStructuresCount = structures.length - gamifiedCoursesCount;

      learningPathData.push({
        LearningPath: learningPath.LearningpathName,
        TotalStructures: structures.length,
        GamifiedCoursesCount: gamifiedCoursesCount,
        RemainingStructuresCount: remainingStructuresCount,
      });
    }



    const types = ["recruiter", "Instructor", "analyst"];

    const users = await UserModel.find({ type: { $in: types } }).select("-profile");

    const result = await ParticipationchallengeModel.aggregate([
      {
        $group: {
          _id: "$ChallengeName",
          totalPoints: { $sum: "$Points" }
        }
      },
      {
        $project: {
          _id: 0,
          ChallengeName: "$_id",
          totalPoints: 1
        }
      }
    ]);



    const userTypeCounts = await UserModel.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    // Extract the counts into an object
    const userCounts = userTypeCounts.reduce((counts, userType) => {
      counts[userType._id] = userType.count;
      return counts;
    }, {});

    const user = Object.keys(userCounts).map((userType) => ({
      numberOfUsers: userCounts[userType],
      userType: userType,
    }));

    const dashboardData = {
      nbrD,
      nbrCH,
      nbrL,
      nbrJob,
      nbrC,
      statistics,
      statistics1,
      learningPathData,
      users,
      result,
      userCounts,
      user,
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    return res.status(404).send({ error: "Cannot find Dashboard data" });
  }
}




 /** GET: http://localhost:8080/api/getJOCHresult/:ilyes_nkk */
 export async function getJOCHresult(req, res) {

  const { username } = req.params;
  try {
    const jobOffers = await Joboffer.find({ Recruiter: username, state: "finished" }).exec();
    const jobOfferData = jobOffers.map((jobOffer) => {
      const { _id, ...rest } = jobOffer.toJSON();
      return { id: _id.toString(), ...rest };
    });

    return res.status(200).send(jobOfferData);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Cannot find job offers" });
  }
}

