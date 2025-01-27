import express from 'express';
import { adminData, createUser, deleteResume, fetchUser, updateImage, updateUser, userResumeUpdate } from './user.controller.js';
import userImageUploader from '../../Utilis/fileUpload/userImage.js';
import userResumeUploader from '../../Utilis/fileUpload/userResume.js';
import verifyToken from '../../Middleware/verifyToken.js';
import verifyAdminToken from '../../Middleware/verifyAdminToken.js';
const router = express.Router();

router.put('/delete-resume',verifyToken,deleteResume)
router.route('/update-user').put(verifyToken,updateUser)
router.post('/get-user',fetchUser)
router.post('/',createUser)
router.route('/update-image').post(userImageUploader.single('image') ,updateImage)
router.route('/update-resume').post(verifyToken,userResumeUploader.single('resume'), userResumeUpdate)
router.route('/admin-data').get(verifyAdminToken,adminData)

export default router