import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app




/** POST Methods Instructor */

/** POST Methods Instructor */

router.route('/challenge').post(controller.CreateChallenge); // create challenge
router.route('/updateChallenge').post(controller.updateChallenge); // create update
router.route('/SubmitChallenge').post(controller.SubmitChallenge); // Submit Challenge
router.route('/DeleteChallenge').post(controller.DeleteChallenge); // Submit Challenge
router.route('/AddQChallenge').post(controller.AddQChallenge); // AddQChallenge
router.route('/challengesI/:username').get(controller.getChallengesI) // quistion with language
router.route('/CreateGcourse').post(controller.CreateGcourse); // CreateGcourse

router.route('/updateStructure').post(controller.updateStructure); // updateStructure
router.route('/deleteStructure').post(controller.deleteStructure); // updateStructure


router.route('/deleteLearningPath').post(controller.deleteLearningPath); // updateStructure
router.route('/updateLearningPath').post(controller.updateLearningPath); // updateStructure

router.route('/getJOCHresult/:username').get(controller.getJOCHresult); 

router.route('/DeleteGcourse').post(controller.DeleteGcourse); // updateStructure
router.route('/UpdateGcourse').post(controller.UpdateGcourse); // updateStructure


/** POST Methods Admin */
router.route('/question').post(controller.Createquestion); // create Question
router.route('/PlanC').post(controller.PlanC); // create plan
router.route('/PlanCEdit').post(controller.PlanCEdit); // update plan
router.route('/PlanCDelete').post(controller.PlanCDelete); // Delete plan
router.route('/Plan').get(controller.getplan); // Get plan
router.route('/challenges').get(controller.getChallenges) // quistion with language
router.route('/updateuser').post(controller.updateuser) // update user
router.route('/deleteuser').post(controller.deleteuser) // delete user
router.route('/PlanCJob').post(controller.PlanCJob) // delete user
router.route('/PlanCJobEdit').post(controller.PlanCJobEdit) // delete user
router.route('/PlanCJobDelete').post(controller.PlanCJobDelete) // delete user
router.route('/getJOs').get(controller.getJOs) // quistion with language
router.route('/getplanJ').get(controller.getplanJ) // quistion with language



/**  get admin */
router.route('/users').get(controller.getusers) // quistion with language
router.route('/AQuestion').get(controller.getAQuestion) // quistion with language
router.route('/deletequestion').post(controller.deletequestion) // quistion with language
router.route('/Createlearningpath').post(controller.Createlearningpath) // Create learning path
router.route('/getlearningpaths').get(controller.getlearningpaths) // get learning path
router.route('/CreateStructure').post(controller.CreateStructure) // get learning path
router.route('/getStructures/:LearningpathName').get(controller.getStructures) // get learning path


/**  get Dev */
router.route('/challenge/:ChallengeName').get(controller.getchallenge) // getchallenge
router.route('/CreatePChallenge').post(controller.CreatePChallenge) // getchallenge
router.route('/activeChallenges').get(controller.activeChallenges) // getchallenge
router.route('/Leaderboard/:ChallengeName').get(controller.Leaderboard) // getchallenge
router.route('/getlearningpath/:LearningpathName').get(controller.getlearningpath) // getlearningpath
router.route('/getGcourse/:LearningpathName').get(controller.getGcourse) // get learning path
router.route('/Gcourse/:Name').get(controller.Gcourse) // get Gcourse
router.route('/activeChallengesJob').get(controller.activeChallengesJob) // quistion with language


/**  post Dev */
router.route('/CreatePGcourse').post(controller.CreatePGcourse) // get Gcourse
router.route('/createPjobch').post(controller.createPjobch) // get Gcourse
router.route('/getJOchallenge/:Joboffername').get(controller.getJOchallenge) // quistion with language
router.route('/getDhome/:username').get(controller.getDhome) // quistion with language


/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
router.route('/question/:Language').get(controller.getQuestion) // quistion with language

/**  get REC */
router.route('/createjoboffer').post(controller.createJobOffer) // create job offer
router.route('/getjoboffers').get(controller.getJobOffers) // create job offer
router.route('/CreateJOchallenge').post(controller.CreateJOchallenge) // create job offer
router.route('/updateJobOffer').post(controller.updateJobOffer) // update job offer
router.route('/createinterview').post(controller.createinterview) // create interview
router.route('/getPjoboffer/:joboffer').get(controller.getPjoboffer) // create job offer
router.route('/DeleteJobChallenge').post(controller.DeleteJobChallenge) // delete jo
router.route('/SubmitJobChallenge').post(controller.SubmitJobChallenge) // delete jo
router.route('/getjoboffersR/:username').get(controller.getjoboffersR) // create job offer
router.route('/getJOsR/:username').get(controller.getJOsR) // quistion with language



/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

/** P */
router.route('/getPlearningpath/:Learningpath/:username').get(controller.getPlearningpath) // quistion with language

router.route('/getDashboard').get(controller.getDashboard) 


/** all*/
router.route('/getNotification/:username').get(controller.getNotification) // create job offer



/** analyst */
router.route('/createreport').post(controller.createreport) // create report
router.route('/updatereport').post(controller.updatereport) // update report
router.route('/deletreport').post(controller.deletreport) // delete report
router.route('/getreport/:statistic').get(controller.getreport) // get report
router.route('/getreportA/:statistic/:username').get(controller.getreportA) // get report





router.route('/Contact').post(controller.Contccdact) // create job offer

export default router;