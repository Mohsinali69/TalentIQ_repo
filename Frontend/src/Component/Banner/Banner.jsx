import JobSearchBar from "../JobSearchBar/JobSearchBar"
import pic1 from '../../../public/Assessts/a68b6889-0a34-4ebc-b5e4-a9cd03a08258.webp'

const Banner = () => {
  return (
    <div>
      <section className="md:flex items-center justify-evenly pt-20 pb-5 bg-[url('https://www.zmo.ai/wp-content/uploads/2023/09/powerpoint-slide-with-white-background-SB02298-min-scaled.jpg')] bg-no-repeat bg-cover">
      <div className='w-full md:w-1/2 md:ml-24'>
        <div className='text-4xl font-semibold'>
          <h1>
            Get The <span className='text-blue-700'>Right Job</span>
          </h1>
          <h1>You Deserve</h1>
        </div>
        <p className='w-full md:w-4/6 mt-5 text-xl text-gray-500'>
          Each Month, more than 3 million job seekers turn to website in their
          search for work, making over 140,000 applications every single day
        </p>

        <p className='mt-3'>
          Popular Searches: <span className='underline'>Content Writer</span> ,{' '}
          <span className='underline'>Finance</span> ,{' '}
          <span className='underline'>Human Resource</span> ,{' '}
          <span className='underline'>Management</span>
        </p>

        <div className="mt-5">
         <JobSearchBar/>
        </div>
      </div>
      <div>
        <img
          className='w-[600px] h-[350px]'
          src={pic1}
          alt=''
        />
      </div>
    </section>
    </div>
  )
}

export default Banner
