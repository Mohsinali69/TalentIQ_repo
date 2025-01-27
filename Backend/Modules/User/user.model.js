import mongoose from 'mongoose'
import { type } from 'os'
import validate from 'validator'
import { ObjectId } from 'mongodb'
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validate.isEmail, 'Please enter a valid email']
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    photo: {
      type: String
    },
    profession: {
      type: String
    },
    company: {
      type: String
    },
    bio: {
      type: String
    },
    social: {
      linkedin: {
        type: String
      },
      github: {
        type: String
      },
      social: {
        type: String
      }
    },
    address: {
      address: {
        type: String
      },
      country: {
        type: String
      },
      city: {
        type: String
      },
      zip_code: {
        type: String
      },
      state: {
        type: String
      }
    },
    resume: [
      {
        type: String
      }
    ],
    education:[
      {
        type:ObjectId,
        ref:'education'
      }
    ],
    skills:[
      String
    ]
  },
  {
    timestamp: true
  }
)

const Users = mongoose.model('users', userSchema)

export default Users
