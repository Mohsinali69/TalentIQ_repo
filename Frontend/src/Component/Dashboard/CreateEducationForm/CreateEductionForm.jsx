import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createEducation } from '../../../Redux/Slices/educationSlice'

const CreateEductionForm = () => {
  const [title, setTitle] = useState('')
  const [institution, setInstitution] = useState('')
  const [subject, setCourse] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const handleAddEducation = () => {
    const data = {
      title,
      institution,
      subject,
      startDate,
      endDate,
      description
    }
    dispatch(createEducation(data))
  }
  return (
    <section>
      <div>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Title *</span>
          </div>
          <select
            onChange={e => setTitle(e.target.value)}
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          >
            <option value='0' disabled selected>
              Select Education
            </option>
            <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
            <option value="Master's Degree">Master&apos;s Degree</option>
            <option value='PhD'>PhD</option>
          </select>
        </label>
      </div>
      <div className='grid grid-cols-2 gap-x-5'>
        <div className='mt-3'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Institution *</span>
            </div>
            <input
              onChange={e => setInstitution(e.target.value)}
              type='text'
              placeholder='Name of Institution'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
            />
          </label>
        </div>
        <div className='mt-3'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Courses *</span>
            </div>
            <input
              onChange={e => setCourse(e.target.value)}
              type='text'
              placeholder='Course'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
            />
          </label>
        </div>
      </div>
      <div className='mt-3'>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Year *</span>
          </div>
          <div className='grid grid-cols-2 gap-x-5'>
            <div>
              <input
                type='date'
                placeholder='Name of Institution'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <input
                type='date'
                placeholder='Name of Institution'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </label>
      </div>
      <div className='mt-3'>
        <label className='form-control w-full '>
          <div className='label'>
            <span className='font-semibold'>Description</span>
          </div>
          <textarea
            onChange={e => setDescription(e.target.value)}
            className='p-2 rounded-lg  w-full border border-black'
            placeholder='Bio'
            style={{
              height: '150px',
              resize: 'none'
            }}
          ></textarea>
        </label>
      </div>
      <div className='modal-action'>
        <form method='dialog'>
          {/* if there is a button, it will close the modal */}
          <button className='btn btn-info' onClick={handleAddEducation}>
            Save
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreateEductionForm
