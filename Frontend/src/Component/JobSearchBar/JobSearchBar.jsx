import { useState } from 'react'
import { BsBank } from 'react-icons/bs'
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    id: 1,
    icon: <FaRegFileAlt />,
    name: 'content Writer',
    job: 3
  },
  {
    id: 2,
    icon: <TfiHeadphoneAlt />,
    name: 'Human Resource',
    job: 2
  },
  {
    id: 3,
    icon: <BsBank />,
    name: 'Finance',
    job: 1
  },
  {
    id: 4,
    icon: <GrPersonalComputer />,
    name: 'Management',
    job: 0
  },
  {
    id: 5,
    icon: <FaSearchengin />,
    name: 'Market Research',
    job: 1
  },
  {
    id: 6,
    icon: <FaRegFolderOpen />,
    name: 'Retail & Product',
    job: 0
  },
  {
    id: 7,
    icon: <MdProductionQuantityLimits />,
    name: 'Market & Sale',
    job: 0
  },
  {
    id: 8,
    icon: <GrCloudSoftware />,
    name: 'Software',
    job: 0
  }
]
const JobSearchBar = () => {
  const [jobCategory,setJobCategory] = useState('')
  const [searchText,setSearchText] = useState('')
  const [country,setCountry] = useState('')

  const navigate = useNavigate()

  const handleSearch = () =>{
    navigate(`/search-job?title=${searchText}&category=${jobCategory}&country=${country}`)
  }
  return (
    <div className='flex items-center gap-5 p-4 bg-base-100 shadow-md rounded-lg md:w-6/7'>
      {/* Job Categories Dropdown */}
      <div className='flex flex-col'>
        <label className='text-sm text-gray-600 mb-1'>Job Categories</label>
        <select onChange={e=>setJobCategory(e.target.value)} className='select select-bordered w-full max-w-xs'>
          <option selected>Select Category</option>
          {
            categories.map(({ id, name }) => (
              <option key={id} value={name}>
                 {name}
              </option>
            ))
          }
        </select>
      </div>

      {/* Keywords or Title Input */}
      <div className='flex flex-col'>
        <label className='text-sm text-gray-600 mb-1'>Keywords or Title</label>
        <input
          type='text'
          placeholder='e.g. Software, Devops'
          className='input input-bordered w-full max-w-xs'
          onChange={e=>setSearchText(e.target.value)} 
        />
      </div>
      <div className='flex flex-col'>
        <label className='text-sm text-gray-600 mb-1'>Country</label>
        <input
          type='text'
          placeholder='Country Name'
          className='input input-bordered w-full max-w-xs'
          onChange={e=>setCountry(e.target.value)} 
        />
      </div>

      {/* Search Button */}
      <div className='flex items-end mt-5'>
        <button onClick={handleSearch} className='btn btn-sm btn-primary'>SEARCH</button>
      </div>
    </div>
  )
}

export default JobSearchBar
