import generateToken from '../../Utilis/token.js'
import Users from './user.model.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import Job from '../Job/job.model.js'
import Application from '../Application/application.model.js'

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const deleteImage = (type, file) => {
  const filePath = path.join(__dirname, `../../images/User/${type}/`, file)
  fs.unlink(filePath, unlinkError => {
    if (unlinkError) {
      console.error('Failed to delete the uploaded file:', unlinkError)
    } else {
      console.log('Uploaded file deleted successfully.')
    }
  })
}

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const { name, email, role } = userData

    const user = await Users.findOne({ email }).populate({ path: 'education' })
    if (user) {
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      const token = generateToken(data)
      return res.status(200).json({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
      const result = await Users.create(userData)
      const token = generateToken({ _id: result?._id, ...userData })

      return res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: result,
        token: token
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to create user',
      error: error.message
    })
  }
}

export const updateImage = async (req, res) => {
  try {
    const image =
      req.protocol +
      '://' +
      req.get('host') +
      '/images/User/image/' +
      req?.file.filename

    const { email } = req.body
    const user = await Users.findOne({ email })

    if (user.photo) {
      const fileName = user.photo.split('/')[6]
      deleteImage('image', fileName)
    }
    const updateUser = await Users.updateOne(
      { _id: user?.id },
      {
        $set: {
          photo: image
        }
      }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Category image updated successfully'
    })
  } catch (error) {
    if (req.file) {
      deleteImage('image', req.file.filename)
    }
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

export const userResumeUpdate = async (req, res, next) => {
  try {
    const resume =
      req.protocol +
      '://' +
      req.get('host') +
      '/images/User/resume/' +
      req?.file.filename

    const { email } = req.user
    const user = await Users.findOne({ email })

    // if (user?.resume) {
    //   const fileName = user.photo.resume('/')[6]
    //   deleteImage('resume', fileName)
    // }
    const updateUser = await Users.updateOne(
      { _id: user?.id },
      {
        $push: {
          resume: resume
        }
      }
    )
    const getUser = await Users.findOne({ email })
    res.status(200).json({
      status: 'Success',
      message: 'User resume updated successfully',
      data: getUser
    })
  } catch (error) {
    if (req.file) {
      deleteImage('resume', req.file.filename)
    }
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { email } = req.user
    const data = req.body

    const getUser = await Users.findOne({ email: email })

    if (!getUser) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }
    const result = await Users.updateOne(
      { _id: getUser?.id },
      {
        $set: data
      }
    )

    const getUserAgain = await Users.findOne({ email: email })
    res.status(200).json({
      status: 'Success',
      message: 'User updated successfully',
      data: getUserAgain
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Failed to update user',
      error: error.message
    })
  }
}

export const fetchUser = async (req, res, next) => {
  try {
    const data = req.body
    const user = await Users.findOne({ email: data.email }).populate({
      path: 'education'
    })

    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    if (user?.role === 'user') {
      const result = await Application.aggregate([
        {
          $match: {
            candidate: user?._id, // Filter applications by user ID
          },
        },
        {
          $facet: {
            // Group by status and count the number of occurrences for each
            groupedStatus: [
              {
                $group: {
                  _id: '$status',
                  count: { $sum: 1 },
                },
              },
            ],
            // Count the total number of applications
            totalCount: [
              {
                $count: 'total',
              },
            ],
          },
        },
      ]);
      const groupedStatus = result[0]?.groupedStatus || []
      const totalCount = result[0]?.totalCount?.[0]?.total || 0

      const userData = user.toObject() // Convert to a plain object
      userData.application = {
        groupedStatus,
        totalCount
      }

      return res.status(200).json({
        status: 'Success',
        message: 'User fetched successfully',
        data: userData
      })
    }

    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch users',
      error: error.message
    })
  }
}

export const deleteResume = async (req, res, next) => {
  try {
    const { resume } = req.body
    const { email } = req.user
    console.log(resume)
    const findResume = await Users.findOne({
      email: email,
      resume: resume.toString()
    })

    if (!findResume) {
      return res.status(404).send({
        status: 'Fail',
        message: 'Resume not found'
      })
    }

    const deleteResume = await Users.updateOne(
      { _id: findResume._id },
      {
        $pull: { resume: resume.toString() }
      }
    )
    if (deleteResume.modifiedCount == 1) {
      deleteImage('resume', resume.split('/')[6])
    }
    const user = await Users.findOne({ _id: findResume._id })
    res.status(200).json({
      status: 'Success',
      message: 'Resume deleted successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Failed to delete resume',
      error: error.message
    })
  }
}

export const adminData = async (req, res, next) => {
  try {
    const getJobs = await Job.find();
    
    const result = await Application.aggregate([
      {
        $group: {
          _id: '$status', // Group by the "status" field
          count: { $sum: 1 } // Count the number of occurrences for each status
        }
      }
    ]);

    // Convert the array into the desired object structure in JavaScript
    const statuses = result.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const totalApplications = Object.values(statuses).reduce(
      (sum, count) => sum + count,
      0
    );

    const getApplications = await Application.find({});
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const currentYear = new Date().getFullYear(); // Get the current year

    // Filter applications to only include those created in the current year
    const applicationsThisYear = getApplications.filter(application => {
      const createdAt = new Date(application.createdAt);
      return createdAt.getFullYear() === currentYear; // Check if the year matches the current year
    });

    // Mapping the application count according to the month name for the current year
    const applicationsByMonth = applicationsThisYear.reduce((acc, application) => {
      const createdAt = new Date(application.createdAt); // Parse the creation date
      const month = monthNames[createdAt.getMonth()]; // Get the month name

      acc[month] = (acc[month] || 0) + 1; // Increment the count for this month
      return acc;
    }, {});

    // Ensure all months are represented
    const applicationOfMonth = monthNames.map(month => ({
      month,
      count: applicationsByMonth[month] || 0 // Use 0 if no applications for the month
    }));

    // Example list of all possible job categories (you can modify this based on your database or requirements)
    const allJobCategories = [
      'content Writer',
      'Human Resource',
      'Finance',
      'Management',
      'Market Research',
      'Retail & Product',
      'Market & Sale',
      'Software'
    ];

    // Count the total number of jobs
    const totalJobs = getJobs.length;

    // Calculate counts for each job category
    const categoryCounts = getJobs.reduce((acc, job) => {
      const category = job.job_category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Ensure all categories are represented, even if they have no jobs
    const categoryPercentages = allJobCategories.map(category => ({
      job_category: category,
      percentage: (((categoryCounts[category] || 0) / totalJobs) * 100).toFixed(
        2
      ) // Format percentage to 2 decimal places
    }));

    const jobs = {
      totalJobs: getJobs.length,
      categories: categoryPercentages
    };

    // format the application object
    const applications = {
      totalApplications,
      statuses,
      month: applicationOfMonth
    };
    
    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: {
        jobs,
        applications
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

