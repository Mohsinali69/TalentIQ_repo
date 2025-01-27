import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar'
import CurrentUser from '../utilis/CurrentUser'
import { logOut } from '../Redux/Slices/userSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

const Main = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isLoginPage =
    location.pathname.includes('login') ||
    location.pathname.includes('register')
  CurrentUser()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkTokenExpiration = () => {
    const storedToken = localStorage.getItem('userToken')
    if (storedToken) {
      const { expiration } = JSON.parse(storedToken)
      const currentTime = new Date().getTime()
      if (currentTime > expiration) {
        // Token has expired, log out the user
        localStorage.removeItem('userToken')
        // Redirect to the login page or show a logged-out state
        dispatch(logOut())
        // window.location.href = "/";
        // history.push('/login');
      }
    }
  }

  useEffect(() => {
    // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
    const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000)
    // Clean up the interval on component unmount
    return () => clearInterval(tokenExpirationInterval)
  }, [checkTokenExpiration])

  return (
    <div>
      {isLoginPage || <Navbar></Navbar>}
      <Outlet />
    </div>
  )
}

export default Main
