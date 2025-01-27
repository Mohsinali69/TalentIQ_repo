import express from 'express';
import verifyToken from '../../Middleware/verifyToken.js';
import { createEducation, deleteEducation, getEducationList, updateEducation } from './education.controller.js';
const router = express.Router();

router.route('/delete-education/:id').delete(verifyToken,deleteEducation)
router.route('/update-education/:id').put(verifyToken,updateEducation);
router.route('/create-education').post(verifyToken,createEducation)
router.route('/get-education').get(verifyToken,getEducationList)

export default router;