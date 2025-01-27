import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateApplicationStatus } from '../../../../Redux/Slices/applicationSlice'

const InterviewFeedBack = () => {
  const { singleApplication, updateApplicationStatusLoading } = useSelector(
    state => state.application
  )

  const [interviewDetails, setInterviewDetails] = useState()
  const [score, setScore] = useState()
  const [feedback, setFeedback] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    setInterviewDetails(singleApplication?.interview)
  }, [singleApplication])

  const handleSave = () => {
    const interview = {
      ...interviewDetails,
      score: parseInt(score),
      feedback: feedback
    }
    const data = {
      interview
    }
    console.log(data)
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
    setScore('')
    setFeedback('')
  }
  return (
    <section>
      <h1 className='text-center text-2xl font-bold'>Interview Feedback</h1>
      <div>
        <div className='mt-3 md:mx-32'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Interview Score </span>
            </div>
            <input
              value={score}
              type='text'
              placeholder='interview Score'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => setScore(e.target.value)}
            />
          </label>
        </div>
        <div className='mt-3 md:mx-32'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Interview Feedback </span>
            </div>
            <textarea
              value={feedback}
              type='text'
              placeholder='Feedback'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => setFeedback(e.target.value)}
            />
          </label>
        </div>
        <div className='flex justify-center mt-5'>
          {updateApplicationStatusLoading ? (
            <p>...Loading</p>
          ) : (
            <button
              className='btn btn-primary text-white py-2 px-4 rounded-lg '
              type='submit'
              onClick={handleSave}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default InterviewFeedBack
