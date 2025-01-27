import Job from './job.model.js'
import { ObjectId } from 'mongodb'
export const createJob = async (req, res, next) => {
  try {
    const { _id } = req.user
    const data = req.body
    data.createdBy = _id
    const result = await Job.create(data)

    res.status(202).json({
      success: true,
      message: 'Job created successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: 'Failed',
      message: error.message
    })
  }
}

export const getJobList = async (req, res, next) => {
  try {
    const { title, category ,country} = req.query
   
    const result = await Job.find({
      title: {
        $regex: title?title:'',
        $options: 'i' // case-insensitive search
      },
      job_category: {
        $regex: category?category:'',
        $options: 'i'
      },
      'address.country':{
        $regex: country?country:'',
        $options: 'i' // case-insensitive search
      }
    }).populate({
      path: 'createdBy',
      select: 'name email phone'
    })
    res.status(200).json({
      success: 'success',
      message: 'Job list fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const editJob = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = req.body
    const result = await Job.findOne({ _id: id })

    if (!result) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Job not found'
      })
    }

    const updateJob = await Job.updateOne(
      { _id: id },
      {
        $set: data
      }
    )

    res.status(200).json({
      status: 'success',
      message: 'Job updated successfully'
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.status
    })
  }
}

export const getMyJob = async (req, res, next) => {
  try {
    const { _id } = req.user
    const result = await Job.find({ createdBy: _id })

    res.status(200).json({
      success: 'success',
      message: 'My job list fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    })
  }
}

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id } = req.user

    const deleteJob = await Job.deleteOne({ _id: id, createdBy: _id })

    res.status(200).json({
      success: 'success',
      message: 'Job deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message
    })
  }
}

export const getJobID = async (req, res) => {
  try {
    const { id } = req.params

    const result = await Job.findOne({ _id: id }).populate({
      path: 'createdBy',
      select: 'name email phone'
    })

    res.status(200).json({
      success: 'success',
      message: 'Job fetched successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    })
  }
}
