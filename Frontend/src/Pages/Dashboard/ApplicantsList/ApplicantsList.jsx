import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  evaluateApplication,
  getJobApplicants,
  setSingleApplication,
  setSingleApplicationNull
} from '../../../Redux/Slices/applicationSlice'
import { FcViewDetails } from 'react-icons/fc'
import ApplicantsDetails from '../../../Component/Dashboard/ApplicantsDetails/ApplicantsDetails'
import { FaDownload } from 'react-icons/fa'
import { BsCalendar2DateFill } from 'react-icons/bs'
import InterviewDetails from '../../../Component/Dashboard/InterviewDetails/InterviewDetails'
import * as XLSX from 'xlsx'
import { RiFeedbackFill } from 'react-icons/ri'
import InterviewFeedBack from '../../../Component/Dashboard/CreateEducationForm/InterviewFeedBack/InterviewFeedBack'
import { SlEnvolopeLetter } from 'react-icons/sl'
import GenerateOfferLetter from '../../../Component/Dashboard/GenerateOfferLetter/GenerateOfferLetter'

const ApplicantsList = () => {
  const { applicants, singleApplication, updateApplicationAtsScoreLoading } =
    useSelector(state => state.application)
  const [filteredApplicants, setFilteredApplicants] = useState()
  const [newApplicants, setNewApplicants] = useState()
  // const [formattedData, setFormattedData] = useState()
  const [activeTab, setActiveTab] = useState('All')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabs = ['All', 'Short Listed', 'Offered', 'Rejected']
  const { id } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobApplicants(id))
  }, [dispatch, id, singleApplication])

  useEffect(() => {
    if (activeTab === 'All') {
      setNewApplicants(applicants)
      setFilteredApplicants(applicants)
    } else if (activeTab === 'Short Listed') {
      setFilteredApplicants(
        applicants.filter(app => app.application_status === 'interviewing')
      )
      setNewApplicants(
        applicants.filter(app => app.application_status === 'interviewing')
      )
    } else if (activeTab === 'Offered') {
      setFilteredApplicants(
        applicants.filter(app => app.application_status === 'offered')
      )
      setNewApplicants(
        applicants.filter(app => app.application_status === 'offered')
      )
    } else if (activeTab === 'Rejected') {
      setFilteredApplicants(
        applicants.filter(app => app.application_status === 'rejected')
      )
      setNewApplicants(
        applicants.filter(app => app.application_status === 'rejected')
      )
    }
  }, [applicants, activeTab])

  const handleCalculateATS = () => {
    dispatch(evaluateApplication(id))
  }

  const handleSearchApplicant = e => {
    if (e == '' || e == undefined) {
      setFilteredApplicants(newApplicants)
    } else {
      setFilteredApplicants(
        filteredApplicants.filter(app =>
          app.name.toLowerCase().includes(e.toLowerCase())
        )
      )
    }
  }

  const handleDownload = () => {
    const data = filteredApplicants?.map(item => ({
      applicant: item?.candidate?.name,
      interview_date: item?.interview?.date,
      interview_type: item?.interview?.type,
      details: item?.interview?.location,
      resume_link: {
        t: 's',
        v: 'Resume', // Display text for the cell
        l: { Target: item?.resume } // Hyperlink target (URL)
      }
    }))
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: [
        'applicant',
        'interview_date',
        'interview_type',
        'details',
        'resume_link'
      ]
    })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Interviews')

    // Generate and download Excel file
    XLSX.writeFile(
      workbook,
      `InterviewList-${newApplicants[0]?.job?.title}.xlsx`
    )
  }
  return (
    <section className='min-h-screen'>
      <div className='flex items-center justify-between'>
        <h1 className='text-md md:text-4xl m-7'>{applicants[0]?.job?.title}</h1>
        <div className='md:mr-10 flex'>
          <input
            type='text'
            placeholder='Search'
            className='p-1 border border-black rounded-md hover:border hover:border-black'
            onChange={e => handleSearchApplicant(e.target.value)}
          />
          {activeTab === 'Short Listed' && (
            <button
              onClick={() => handleDownload()}
              className='btn btn-accent btn-sm ml-2'
            >
              <FaDownload />
            </button>
          )}
        </div>
      </div>
      <div className='flex space-x-4 items-center py-2 px-4'>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
              activeTab === tab
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='flex px-10 mt-5'>
        {activeTab === 'All' && (
          <>
            {updateApplicationAtsScoreLoading ? (
              '...Loading'
            ) : (
              <button
                onClick={() => handleCalculateATS()}
                className='btn btn-primary btn-sm'
              >
                Calculate ATS
              </button>
            )}
          </>
        )}
      </div>
      <div className='bg-white h-[550px] md:mx-7 my-5 md:px-10 py-10 rounded-xl mb-10'>
        <div className='overflow-x-auto '>
          <table className='table '>
            {/* head */}
            <thead className=' bg-blue-400 text-black text-lg'>
              <tr>
                <th>Applicants</th>
                <th>Date</th>
                <th>Resume</th>
                <th>ATS</th>
                {activeTab === 'Offered' ? (
                  <th>Offer Letter</th>
                ) : (
                  <th>Details</th>
                )}
                {activeTab === 'Short Listed' && <th>Feedback</th>}
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {filteredApplicants?.map(app => (
                <tr key={app?._id} className='text-[17px]'>
                  <td className='w-[350px]'>
                    <div className='flex items-center gap-3'>
                      <div>
                        <div className='font-bold'>{app?.candidate?.name}</div>
                        <span className='text-sm text-gray-500'>
                          {app?.candidate?.email}
                        </span>
                        <br />
                        {app.application_status === 'pending' ? (
                          <div className='badge badge-warning mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>
                        ) : app.application_status === 'interviewing' ? (
                          <div className='badge badge-accent mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>
                        ) : app.application_status === 'offered' ? (
                          <div className='badge badge-success mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>
                        ) : (
                          app.application_status === 'rejected' && (
                            <div className='badge badge-error mt-2 badge-sm p-2'>
                              {app.application_status}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='w-[300px]'>{app?.createdAt.split('T')[0]}</td>
                  <td>
                    <a
                      className='hover:text-blue-600'
                      href={app?.resume}
                      target='_blank'
                    >
                      Resume
                    </a>
                  </td>
                  <td>{app?.ats_score}</td>
                  <th>
                    {activeTab === 'All' && (
                      <button
                        className='btn btn-ghost btn-xs text-2xl'
                        title='Details'
                        onClick={() => {
                          dispatch(setSingleApplication(app))
                          document.getElementById('my_modal_6').showModal()
                        }}
                      >
                        <FcViewDetails />
                      </button>
                    )}
                    {activeTab === 'Short Listed' && (
                      <button
                        className='btn btn-ghost btn-xs text-2xl'
                        title='Interview Date'
                        onClick={() => {
                          dispatch(setSingleApplication(app))
                          document.getElementById('my_modal_7').showModal()
                        }}
                      >
                        <BsCalendar2DateFill />
                      </button>
                    )}
                    {activeTab === 'Offered' && (
                    <td>
                      <button
                        className='btn btn-ghost btn-xs text-2xl'
                        title='Generate Offer Letter'
                        onClick={() => {
                          dispatch(setSingleApplication(app))
                          document.getElementById('my_modal_9').showModal()
                        }}
                      >
                        <SlEnvolopeLetter />
                      </button>
                    </td>
                  )}
                  </th>
                  {activeTab === 'Short Listed' && (
                    <td>
                      <button
                        className='btn btn-ghost btn-xs text-2xl'
                        title='Interview feedback'
                        onClick={() => {
                          dispatch(setSingleApplication(app))
                          document.getElementById('my_modal_8').showModal()
                        }}
                      >
                        <RiFeedbackFill />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dialog id='my_modal_6' className='modal'>
          <div className='modal-box w-full md:max-w-2xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <ApplicantsDetails />
          </div>
        </dialog>
        <dialog id='my_modal_7' className='modal'>
          <div className='modal-box w-full md:max-w-2xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <InterviewDetails />
          </div>
        </dialog>
        <dialog id='my_modal_8' className='modal'>
          <div className='modal-box w-full md:max-w-2xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <InterviewFeedBack />
          </div>
        </dialog>
        <dialog id='my_modal_9' className='modal'>
          <div className='modal-box w-full md:max-w-3xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <GenerateOfferLetter/>
          </div>
        </dialog>
      </div>
    </section>
  )
}

export default ApplicantsList
