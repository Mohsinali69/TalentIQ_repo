import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home'
import Jobs from '../Pages/Jobs/Jobs'
import Login from '../Pages/Login/Login'
import Registration from '../Pages/Registration/Registration'
import ApplyJob from '../Pages/ApplyJob/ApplyJob'
import Dashboard from '../Layout/Dashboard'
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome'
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile'
import MyResume from '../Pages/Dashboard/MyResume/MyResume'
import MyApplication from '../Pages/Dashboard/MyApplication/MyApplication'
import PostJobs from '../Pages/Dashboard/PostJobs/PostJobs'
import MyJobs from '../Pages/Dashboard/MyJobs/MyJobs'
import EditJobs from '../Pages/Dashboard/EditJobs/EditJobs'
import JobApplicants from '../Pages/Dashboard/JobApplicants/JobApplicants'
import ApplicantsList from '../Pages/Dashboard/ApplicantsList/ApplicantsList'
import SearchJob from '../Pages/SearchJob/SearchJob'
import Blogs from '../Pages/Blogs/Blogs'
import ReadBlog from '../Pages/ReadBlog/ReadBlog'
import ContactForm from '../Pages/ContactForm/ContactForm'
import PrivateRoute from '../Component/PrivateRoute/PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/jobs',
        element: <Jobs />
      },
      {
        path:'/search-job',
        element:<SearchJob />
      },
      {
        path: '/apply-job/:id',
        element: <PrivateRoute><ApplyJob /></PrivateRoute>
      },
      {
        path:'/blogs',
        element: <Blogs />
      },
      {
        path: '/read-blog/:name',
        element: <ReadBlog/>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/contact',
        element:<ContactForm/>
      },
      {
        path: '/register',
        element: <Registration />
      }
    ]
  },
  {
    path: 'dashboard/',
    element: <Dashboard />,
    children: [
      {
        path: 'home',
        element: <PrivateRoute><DashboardHome /></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><MyProfile /></PrivateRoute> 
      },
      {
        path: 'resume',
        element: <PrivateRoute><MyResume /></PrivateRoute>
      },
      {
        path: 'applications',
        element: <PrivateRoute><MyApplication /></PrivateRoute>
      },
      {
        path:'applicants',
        element:<JobApplicants/>
      },
      {
        path:'job/applicants/:id',
        element:<ApplicantsList/>
      },
      {
        path: 'post-job',
        element: <PostJobs />
      },
      {
        path:'my-jobs',
        element:<MyJobs/>
      },
      {
        path:'my-jobs/:id',
        element:<EditJobs/>
      }
    ]
  }
])
