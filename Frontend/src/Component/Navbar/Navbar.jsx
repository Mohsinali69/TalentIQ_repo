import { MdLogin } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../Redux/Slices/userSlice'

const Navbar = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navbarOptions = (
    <>
      <li className='text-lg md:mr-5'>
        <Link to={'/jobs/?category=content Writer'}>Jobs</Link>
      </li>
      <li className='text-lg md:mr-5'>
        <Link to='/blogs'>Blogs</Link>
      </li>
      <li className='text-lg md:mr-5'>
        <Link to='/contact'>Contact</Link>
      </li>
    </>
  )
  return (
    <div className='navbar bg-base-00 fixed z-10 bg-opacity-50  bg-blue-800 text-white'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-blue-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {navbarOptions}
          </ul>
        </div>
        <Link to='/'>
          <a className='btn btn-ghost text-xl'>Talent IQ</a>
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{navbarOptions}</ul>
      </div>
      <div className=' navbar-end'>
        {user ? (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS Navbar component'
                  src={
                    user?.photo
                      ? user?.photo
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black'
            >
              <li>
                <Link to="/dashboard/home">
                  <a className='justify-between'>Profile</a>
                </Link>
              </li>
              <li onClick={() => dispatch(logOut())}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/login'>
            <div className='text-xl'>
              <MdLogin />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
