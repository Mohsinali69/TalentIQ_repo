import multer from 'multer';
import pkg from 'multer';
const { StorageEngine } = pkg;
import path from 'path';

const storage = multer.diskStorage({
    destination: 'images/User/resume/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-';
        cb(null, file.originalname);
    }
});


// Create the uploader with TypeScript
const userResumeUploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /pdf/;
        const extension = path.extname(file.originalname).toLowerCase();

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error('Must be a png/jpg/jpeg image'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

export default userResumeUploader;