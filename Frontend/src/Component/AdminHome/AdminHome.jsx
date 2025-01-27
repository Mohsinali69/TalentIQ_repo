import { useSelector } from 'react-redux'
import LineChart from '../LineChart/LineChart'
import { useEffect, useState } from 'react'
import PieChart from '../PieChart/PieChart'

const AdminHome = () => {
  const {adminDetails } = useSelector(state => state.user)
 const [lineData,setLineData] = useState()
const [pieData,setPieData] = useState()

 useEffect(()=>{
    const data = []
    adminDetails?.applications?.month?.map(item=>data.push(item?.count))
    setLineData(data)

    const newData = []
    adminDetails?.jobs?.categories.map(item=>newData.push(parseFloat(item?.percentage)))
    setPieData(newData)
 },[adminDetails])

 console.log(pieData)
  return (
    <section>
      <div className='md:flex mx-5 md:gap-x-5'>
        <div className='bg-white rounded-md w-full p-2'>
          <h1 className='text-lg font-semibold border-b pb-1 border-black'>Application Views</h1>
          <div>
            <LineChart data={lineData} />
          </div>
        </div>
        <div className='bg-white rounded-md w-full p-2 mt-5 md:mt-0'>
        <h1 className='text-lg font-semibold border-b pb-1 border-black'>Job Views</h1>
          <div className='w-full'>
            <PieChart data={pieData}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminHome
