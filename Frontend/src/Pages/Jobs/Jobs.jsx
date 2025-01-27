import { BsBank } from 'react-icons/bs'
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SingleJob from '../../Component/SingleJob/SingleJob'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '../../Redux/Slices/jobSlice'
import { useLocation } from 'react-router-dom'

const tabs = [
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
    name: 'Retail Product',
    job: 0
  },
  {
    id: 7,
    icon: <MdProductionQuantityLimits />,
    name: 'Market Sale',
    job: 0
  },
  {
    id: 8,
    icon: <GrCloudSoftware />,
    name: 'Software',
    job: 0
  }
]

const Jobs = () => {
  const { jobs } = useSelector(state => state.job)
  const [jobByCategory, setJobByCategory] = useState([])
  const location = useLocation()

  // Parse query parameters from the location.search
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category') // Extract 'category' parameter

  const [tabIndex, setTabIndex] = useState(0)
  useEffect(() => {
    const index = tabs.findIndex(tab => tab.name === category)
    setTabIndex(index)
  }, [category])

  const dispatch = useDispatch()

  useEffect(() => {
    const selectedTab = tabs[tabIndex]
    const jobsByCategory = jobs.filter(
      job => job?.job_category === selectedTab.name
    )
    setJobByCategory(jobsByCategory)
  }, [jobs, tabIndex])

  useEffect(() => {
    dispatch(getJobs({ title: '', category: '',country:'' }))
  }, [dispatch])

  return (
    <section className='pt-20'>
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList className='grid md:grid-cols-8 grid-cols-3 md:space-x-4  border-b pb-1'>
          {tabs.map((tab, index) => (
            <Tab
              className='px-1 py-1 md:px-2 md:py-2 border-l border-b border-r border-t border-black rounded-md text-sm md:text-base w-full md:w-auto text-center cursor-pointer'
              key={index}
            >
              <p className='flex items-center justify-evenly'>
                <span className='text-blue-700'>{tab.icon}</span>
                <p className='text-[10px] md:text-[16px]'>{tab.name}</p>
              </p>
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <div className='flex justify-center mt-10'>
              <div className='grid grid-cols-1 md:grid-cols-4  gap-x-10 gap-y-10'>
                {jobByCategory.map((tab, index) => (
                  <SingleJob job={tab} key={index} />
                ))}
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  )
}

export default Jobs
