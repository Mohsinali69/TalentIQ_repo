import Users from '../User/user.model.js'
import Educations from './education.model.js'

export const createEducation = async (req, res, next) => {
  try {
    const { email, _id } = req.user
    console.log(_id)
    const data = req.body
    data.user = _id

    const education = await Educations.create(data)

    const users = await Users.updateOne(
      { email },
      { $push: { education: education._id } }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Education created successfully',
      data: education
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getEducationList = async (req, res, next) => {
  try {
    const { _id } = req.user
    const educationList = await Educations.find({ user: _id })

    res.status(200).json({
      status: 'Success',
      message: 'Education list fetched successfully',
      data: educationList
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id } = req.user
    const body = req.body

    const education = await Educations.findOne({ _id: id, user: _id })

    if (!education) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Education not found'
      })
    }

    const updatedEducation = await Educations.updateOne(
      { _id: id, user: _id },
      { $set: body }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Education updated successfully',
      data: updatedEducation
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id } = req.user

    const education = await Educations.deleteOne({ _id: id, user: _id })
    if (education.deletedCount == 1) {
      const userUpdate = await Users.updateOne(
        { _id },
        {
          $pull: { education: id }
        }
      )
    }
    res.status(200).json({
      status: 'Success',
      message: 'Education deleted successfully'
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}
