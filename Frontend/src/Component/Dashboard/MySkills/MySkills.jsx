import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../Redux/Slices/userSlice'

const MySkills = () => {
  const { user } = useSelector(state => state.user)
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    setSkills(user?.skills || [])
  }, [dispatch, user?.skills])

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = skill => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  const handleSaveSkills = () => {
    const data = {
      skills: skills
    }
    dispatch(updateUser(data))
  }
  return (
    <div className='w-full'>
      <div className='flex flex-wrap items-center gap-2 mt-10 mb-5 p-4 border border-gray-300 rounded-lg bg-gray-50'>
        {skills.map((skill, index) => (
          <div
            key={skill + index}
            className='flex items-center bg-white text-gray-700 border border-gray-300 rounded-full px-3 py-1 shadow-sm'
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className='ml-2 text-gray-500 hover:text-red-600'
            >
              &times;
            </button>
          </div>
        ))}
        <div>
          <input
            type='text'
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type a skill...'
            className='px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
          />
        </div>
        <button
          onClick={handleAddSkill}
          className='w-8 h-8 flex items-center justify-center bg-green-200 text-green-600 font-bold rounded-full hover:bg-green-300'
        >
          +
        </button>
      </div>
      <button className='btn btn-info ' onClick={handleSaveSkills}>
        Save Skills
      </button>
    </div>
  )
}

export default MySkills
