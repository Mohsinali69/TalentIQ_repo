import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'

const Login = () => {
  const { isLoginSuccess, isLoginError } = useSelector(state => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoginError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if (isLoginSuccess) {
      navigate('/')
    }
  }, [isLoginError, isLoginSuccess, navigate])

  const handleLogin = () => {
    const data = {
      email,
      password
    }

    dispatch(loginUser(data))
  }
  return (
    <section className='h-screen lg:flex'>
      <div className='lg:w-1/2 hidden lg:block'>
        <img
          src='https://wallpapers.com/images/hd/recruitment-process-3hcdec7ropkw8rsc.jpg'
          alt='login page'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='lg:w-1/2 h-full flex items-center'>
        <div className="w-full mt-3 bg-[url('https://vcards.infyom.com/assets/images/top-vector.png')]   bg-top">
          <div className='flex items-center justify-center'></div>
          <h1 className='text-center text-4xl font-semibold mt-4'>Sign In</h1>
          <div className='flex justify-center mt-5'>
            <div className='w-2/3'>
              <span className='ml-1 '>
                Email <span className='text-error fond-bold'>*</span>
              </span>
              <label
                className='input input-bordered flex mb-3 mt-2 items-center gap-2'
                htmlFor='email'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                  <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                </svg>

                <input
                  type='email'
                  required
                  className='grow'
                  name='email'
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <div className='flex justify-between'>
                <span className='ml-1 '>
                  Password <span className='text-error fond-bold'>*</span>
                </span>

                <span className='text-blue-500 hover:text-blue-800 cursor-pointer'>
                  Forget Password ?
                </span>
              </div>
              <label
                className='input input-bordered flex mt-2 items-center gap-2'
                htmlFor='password'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path
                    fillRule='evenodd'
                    d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type='password'
                  className='grow'
                  name='password'
                  placeholder='Password'
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <button
                className='btn btn-info text-white w-full mt-5 mb-3'
                onClick={handleLogin}
              >
                Login
              </button>

              <span>
                New Here?{' '}
                <Link to='/register'>
                  <span className='ml-1 text-blue-500 hover:text-blue-800 cursor-pointer'>
                    Create Account
                  </span>
                </Link>{' '}
              </span>
              <div className='text-center text-sm mt-5'>
                <span>
                  All Rights Reserved © 2024{' '}
                  <span className='text-blue-500'>Mohsin Ali</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
