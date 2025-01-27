import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
const educationSchema = mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'users',
        required:true,	
    },
    title:{
        type:String,
        required:[true,'Please provide the title of the education'],
    },
    institution:{
        type:String,
        required:[true,'Please provide the institution of the education'],
    },
    status:{
        type:String,
        enum: ['Graduated', 'Current'],
        default:'Current'
    },
    subject:{
        type:String,
        required:[true,'Please provide the subject of the education'],
    },
    startDate:{
        type:Date,
        required:[true,'Please provide the start date of the education'],
    },
    endDate:{
        type:Date,
        required:[true,'Please provide the end date of the education'],
    },
    description:{
        type:String,
    }
})

const Educations = mongoose.model('education', educationSchema)

export default Educations

