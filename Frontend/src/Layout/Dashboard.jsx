// import { HiOutlineBellAlert } from 'react-icons/hi2'
import { IoIosLogOut, IoMdPaper } from 'react-icons/io'
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettingsApplications
} from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom'
import CurrentUser from '../utilis/CurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { logOut } from '../Redux/Slices/userSlice'

const navbarOptions = [
  {
    label: 'Dashboard',
    to: '/dashboard/home',
    icon: <MdOutlineDashboard />
  },
  {
    label: 'Profile',
    to: '/dashboard/profile',
    icon: <MdOutlinePerson />
  },
  {
    label: 'Resume',
    to: '/dashboard/resume',
    icon: <IoMdPaper />
  },
  {
    label: 'My Applications',
    to: '/dashboard/applications',
    icon: <MdOutlineSettingsApplications />
  },
]

const adminNavbarOptions =[
  {
    label: 'Dashboard',
    to: '/dashboard/home',
    icon: <MdOutlineDashboard />
  },
  {
    label: 'Profile',
    to: '/dashboard/profile',
    icon: <MdOutlinePerson />
  },
  {
    label: 'My Jobs',
    to: '/dashboard/my-jobs',
    icon: <IoMdPaper />
  },
  {
    label:'Post Job',
    to: '/dashboard/post-job',
    icon: <FaPen />
  },
  {
    label: 'Applicants',
    to: '/dashboard/applicants',
    icon: <MdOutlineSettingsApplications />
  },
]

const Dashboard = () => {
  const { user } = useSelector(state => state.user)
  const [activeTab,setActiveTab] = useState('Dashboard')
  const [navs,setNavs] = useState(navbarOptions)
  
  const dispatch = useDispatch()

  CurrentUser()

  useEffect(()=>{
    if(user?.role === 'admin'){
      setNavs(adminNavbarOptions)
    }else{
      setNavs(navbarOptions)
    }
  },[user])

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const checkTokenExpiration = () => {
  const storedToken = localStorage.getItem('userToken');
  if (storedToken) {
    const { expiration } = JSON.parse(storedToken);
    const currentTime = new Date().getTime();
    if (currentTime > expiration) {
      // Token has expired, log out the user
      localStorage.removeItem('userToken');
      // Redirect to the login page or show a logged-out state
      dispatch(logOut());
      window.location.href = "/";
      // history.push('/login');
    }
  }
};

useEffect(() => {
  // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
  const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000);
  // Clean up the interval on component unmount
  return () => clearInterval(tokenExpirationInterval);
}, [checkTokenExpiration]);

  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='navbar bg-base-300 w-full lg:hidden'>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              aria-label='open sidebar'
              className='btn btn-square btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-6 w-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </label>
          </div>
          <div className='mx-2 flex-1 px-2'>Talent IQ</div>
        </div>
        {/* Page content here */}
        <div className='bg-base-300'>
          <Outlet />
        </div>
      </div>
      <div
        className='drawer-side'
        style={{
          overflowY: 'scroll',
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none' // For IE and Edge
        }}
      >
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='menu bg-white min-h-full w-60 p-4 '>
          <div className='text-3xl text-center my-10 h-[30px]'>
           <Link to="/">
           <p className='cursor-pointer hover:bg-gray-100 hover:rounded-lg'>Talent IQ</p>
           </Link>
          </div>
          <div className='flex justify-center'>
            <div className='avatar online'>
              <div className='w-20 rounded-full'>
                <img
                  src={
                    user?.photo
                      ? user?.photo
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
          </div>
          <p className='text-center mt-2 text-xl mb-10'>{user?.name}</p>
          {/* Sidebar content here */}
          {navs.map((option, index) => (
            <Link key={index} to={option?.to}>
              <div onClick={()=>setActiveTab(option?.label)} className={`flex items-center text-xl cursor-pointer mb-7 hover:text-green-600  p-2 ${activeTab==option?.label?'border rounded-md bg-green-700 text-white':''}`}>
                {/* border rounded-md bg-green-700 text-white */}
                <p>{option?.icon}</p>
                <p className='ml-2'>{option?.label}</p>
              </div>
            </Link>
          ))}

          <div onClick={()=>dispatch(logOut())} className='flex items-center text-xl cursor-pointer mt-5 hover:text-green-600'>
            <p>Logout</p>
            <p className='ml-2'>
              <IoIosLogOut />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
