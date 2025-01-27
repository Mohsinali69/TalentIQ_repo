import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../Component/Banner/Banner'
import CategorySection from '../../Component/CategorySection/CategorySection'
import DetailsBanner from '../../Component/DetailsBanner/DetailsBanner'
import HiringBanner from '../../Component/HiringBanner/HiringBanner'
import LatestJob from '../../Component/LatestJob/LatestJob'
import NewsBlogs from '../../Component/NewsBlogs/NewsBlogs'
import NewsLetter from '../../Component/NewsLetter/NewsLetter'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { reset } from '../../Redux/Slices/userSlice'

const Home = () => {
  const { isCreateUserSuccess, isLoginSuccess } = useSelector(
    state => state.user
  )

  const dispatch = useDispatch()
  useEffect(() => {
    if (isCreateUserSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isLoginSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  }, [dispatch, isCreateUserSuccess, isLoginSuccess])
  return (
    <div>
      <Banner />
      {/* <div className='divider'></div> */}
      <CategorySection />
      <HiringBanner />
      <LatestJob />
      <DetailsBanner />
      <NewsBlogs />
      <NewsLetter />
    </div>
  )
}

export default Home
