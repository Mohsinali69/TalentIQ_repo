import { useEffect, useState } from 'react'
import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { FaUser, FaBookmark, FaEye, FaListOl } from 'react-icons/fa'
import { TiTick } from "react-icons/ti";
import { IoBagHandleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import AdminHome from '../../../Component/AdminHome/AdminHome'
import { getAdminData } from '../../../Redux/Slices/userSlice'
import { MdError, MdErrorOutline } from 'react-icons/md'
import { getJobs } from '../../../Redux/Slices/jobSlice'
import { useNavigate } from 'react-router-dom'
import dateDifference from '../../../utilis/formattedDate'

const stats = [
  { value: '0', label: 'Total Applications', icon: <FaListOl /> },
  { value: '0', label: 'Shortlisted', icon: <FaBookmark /> },
  { value: '0', label: 'Offered', icon: <TiTick/>},
  { value: '0', label: 'Rejected', icon: <MdErrorOutline /> }
]

const adminStats = [
  { value: '07', label: 'Posted Job', icon: <FaUser /> },
  { value: '03', label: 'Shortlisted', icon: <FaBookmark /> },
  { value: '1.7k', label: 'Application', icon: <FaEye /> },
  { value: '07', label: 'Offered', icon: <MdError /> }
]

const DashboardHome = () => {
  const { user, adminDetails } = useSelector(state => state.user)
  const {jobs} = useSelector(state=>state.job)
  const [statsOption, setStatsOption] = useState()
  const [randomJobs, setRandomJobs] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getAdminData())
    } else setStatsOption(stats)
  }, [dispatch, user])

  useEffect(() => {
    if (user.role === 'admin' && adminDetails) {
      adminStats[0]['value'] = adminDetails?.jobs?.totalJobs || 5
      adminStats[1]['value'] =
        adminDetails?.applications?.statuses?.interviewing || 0
      adminStats[2]['value'] =
        adminDetails?.applications?.totalApplications || 0
      adminStats[3]['value'] =
        adminDetails?.applications?.statuses?.offered || 0
      setStatsOption(adminStats)
    }
    if(user?.role==='user'){
      stats[0]['value'] = user?.application?.totalCount
      user.application?.groupedStatus?.map(item=>{
        if(item?._id==='interviewing')
          stats[1]['value'] = item?.count?item?.count:0
        if(item?._id==='offered')
          stats[2]['value'] = item?.count?item?.count:0
        if(item?._id==='rejected')
          stats[3]['value'] = item?.count?item?.count:0
      })
    }
  }, [adminDetails, user])

  useEffect(()=>{
    dispatch(getJobs({title:'',category:'',country:''}))
  },[dispatch])

  // Pick random jobs
  useEffect(() => {
    if (jobs?.length > 0) {
      const shuffled = [...jobs].sort(() => 0.5 - Math.random());
      setRandomJobs(shuffled.slice(0, 5)); // Pick 5 random jobs
    }
  }, [jobs]);

  return (
    <section className='pb-4 md:h-[calc(100vh)]'>
      <h1 className='text-4xl m-7'>Dashboard</h1>
      <div className=' py-5 flex justify-center w-full'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-5  px-5 mb-4'>
          {statsOption?.map((stat, index) => (
            <div
              key={index}
              className='flex  w-[250px] items-center justify-around bg-white rounded-lg shadow-md p-6 text-center'
            >
              <div>
                <div className='text-4xl font-bold text-black'>
                  {stat.value}
                </div>
                <p className='text-gray-500 mt-2'>{stat.label}</p>
              </div>
              <div className='w-14 h-14 flex items-center justify-center bg-lime-300 text-black rounded-full mt-4 text-3xl'>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
      {user?.role === 'admin' ? (
        <AdminHome />
      ) : (
        <>
          <h1 className='text-2xl font-semibold text-center'>Similar Jobs</h1>
          <div className='flex justify-center'>
            <div className='border-2 lg:h-[400px]  mt-3 overflow-y-auto bg-white mx-10 w-3/4 rounded-xl pt-5'>
              {/* similar jobs */}
              {randomJobs.map((item, index) => (
                <div onClick={()=>navigate(`/apply-job/${item?._id}`)}  className='cursor-pointer' key={index}>
                  <div className='flex px-5 hover:font-semibold'>
                    <div>
                      <img
                        src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-7.svg'
                        alt=''
                      />
                    </div>
                    <div className='ml-5'>
                      <h2 className='card-title hover:text-blue-700'>
                        {item?.title}
                      </h2>
                      <div className='flex text-sm my-1'>
                        <div className='flex items-center text-gray-600'>
                          <IoBagHandleOutline />
                          <p className='ml-1'>{item?.salary?.salary}</p>
                        </div>
                        <div className='flex items-center text-gray-600 ml-10'>
                          <CiClock2 />
                          <p className='ml-1'>{dateDifference(item?.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end items-center pr-8 text-sm text-gray-600 mb-2'>
                    <CiLocationOn /> <span className='ml-2'>{item?.address?.country}</span>
                  </div>
                  <div className='my-3 px-5'>
                    <hr />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default DashboardHome
