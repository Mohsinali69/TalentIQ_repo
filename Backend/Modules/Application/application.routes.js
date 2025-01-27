import express from 'express';
import verifyToken from '../../Middleware/verifyToken.js';
import { addNewMessage, changeApplicationStatus, createApp, evaluateApplication, getApplicantsOfJob, getMyApplications, uploadOfferLetter } from './application.controller.js';
import verifyAdminToken from '../../Middleware/verifyAdminToken.js';
import offerLetterUploader from '../../Utilis/fileUpload/offerLetterUploader.js';
const router = express.Router();

router.route('/get-applicants/:job_id').get(verifyAdminToken,getApplicantsOfJob)
router.route('/update-status/:id').put(verifyAdminToken,changeApplicationStatus)
router.route('/evaluate-resume/:id').post(verifyAdminToken,evaluateApplication)
router.route('/add-message/:id').put(verifyAdminToken,addNewMessage)
router.route('/upload-offer-letter/:id').put(verifyAdminToken,offerLetterUploader.single('file'),uploadOfferLetter)
router.route('/my-applications').get(verifyToken,getMyApplications)
router.route('/create-app').post(verifyToken,createApp);

export default router;