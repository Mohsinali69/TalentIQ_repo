import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEnglish_fluency,
  setExperience,
  setJob_skills
} from '../../../Redux/Slices/jobSlice'

const Skill_ExperienceForm = () => {
  const { skills, experience, english_fluency } = useSelector(
    state => state.job
  )
  const [skills_value, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')

  

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills_value.includes(newSkill)) {
      setSkills([...skills_value, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = skill => {
    setSkills(skills_value.filter(s => s !== skill))
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    setSkills(skills)
  }, [ skills])

  useEffect(()=>{
    dispatch(setJob_skills(skills_value))
  },[dispatch,skills_value])


  return (
    <>
      <div>
        <h1 className='text-3xl text-blue-800 pt-10 pb-5'>
          Skill & Experience
        </h1>
        <div className='w-full'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Skills * </span>
            </div>
          </label>
          <div className='flex flex-wrap items-center gap-2  mb-5 p-4 border border-gray-300 rounded-lg bg-gray-50'>
            {skills_value.map((skill, index) => (
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
        </div>
        <div className='grid grid-cols-2 gap-x-5 mt-5'>
          <div>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Experience * </span>
              </div>
              <select
                value={experience}
                type='text'
                placeholder='Ex: Product Designer'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => dispatch(setExperience(e.target.value))}
              >
                <option disabled value=''>
                  Select Job Experience
                </option>
                <option value='Intermediate'>Intermediate</option>
                <option value='No-Experience'>No-Experience</option>
                <option value='Expert'>Expert</option>
              </select>
            </label>
          </div>
          <div>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>English Fluency * </span>
              </div>
              <select
                value={english_fluency}
                type='text'
                placeholder='Ex: Product Designer'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => dispatch(setEnglish_fluency(e.target.value))}
              >
                <option disabled value=''>
                  Select English Fluency
                </option>
                <option value='Basic'>Basic</option>
                <option value='Conversational'>Conversational</option>
                <option value='Fluent'>Fluent</option>
                <option value='Native'>Native</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Skill_ExperienceForm
