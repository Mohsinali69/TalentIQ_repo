import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        status: 'Failed',
        message: 'You are not login'
      })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET)

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        status: 'Failed',
        message: 'You are not authorized to access this route'
      })
    }
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({
      status: 'fail',
      message: 'Invalid token',
      error: error.message
    })
  }
}

export default verifyAdminToken