import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide the title of the job'],
    },
    company_name:{
        type:String,
        required:[true,'Please provide the name of the company'],
    },
    description:{
        type:String,
        required:[true,'Please provide a description of the job'],
    },
    requirements:{
        type:String,
        required:[true,'Please provide the required skills and experience'],
    },
    job_category:{
        type:String,
        required:[true,'Please provide the category of the job'],
    },
    job_type:{
        type:String,
        required:[true,'Please provide the type of the job'],
    },
    salary:{
        salary:{
            type:String,
            required:[true,'Please provide the salary range'],
            min:1
        },
        min:{
            type:String,
            required:[true,'Please provide the minimum salary'],

        },
        max:{
            type:String,
            required:[true,'Please provide the maximum salary'],

        }
    },
    skills:[
        String
    ],
    experience:{
        type:String,
        required:[true,'Please provide the experience required'],
    },
    english_fluency:{
        type:String,
        required:[true,'Please provide the English fluency required'],
    },
    address:{
        address:{
            type:String,
        },
        country:{
            type:String,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        }
    },
    applicants:[
        {
            type:ObjectId,
            ref:'users'
        }
    ],
    createdBy:{
        type:ObjectId,
        ref:'users'
    }
},{
    timestamps: true
})

const Job = mongoose.model('Job',jobSchema)

export default Job;