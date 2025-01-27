import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createApplication } from "../../Redux/Slices/applicationSlice";

const ApplicationJob = () => {
  const { job } = useSelector(state => state.job);
  const {user} = useSelector(state=>state.user)

  const [name,setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cover,setCover] = useState('')
  const [resume,setResume] = useState(user?.resume[0])

  const dispatch = useDispatch()

  useEffect(()=>{
    setResume(user?.resume[0])
  },[user])
  const handleSubmitApplication = () =>{
    const data ={
      name,
      phone,
      email:user?.email,
      cover,
      resume,
      job: job._id
    }
    dispatch(createApplication(data))
  }
    return (
      <section>
        <div className='flex justify-center'>
          <h1 className='mb-5 w-[250px] text-center bg-blue-200 text-xl text-blue-800 rounded-md py-1 font-bold'>
          {job?.company_name}
          </h1>
        </div>
        <h1 className='text-3xl font-semibold text-center'>
          Start Your Career Today
        </h1>
        <p className='text-center text-gray-400'>
          Please fill up the information for application
        </p>
        <div className='flex justify-center mt-10'>
          {/* Updated table class */}
          <table className='w-full border-separate border-spacing-y-4'>
            <tbody>
              <tr>
                <th className='text-left'>
                  Full name <span className='text-red-600'>*</span>
                </th>
                <td>
                  <input
                  onChange={e=>setName(e.target.value)}
                    type='text'
                    className='border-2 border-gray-400 p-2 w-full rounded-md'
                    required
                  />
                </td>
              </tr>
              <tr>
                <th className='text-left'>Email</th>
                <td>
                  <input
               
                    type='text'
                    className='border-2 border-gray-400 p-2 w-full rounded-md'
                    value={user?.email}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <th className='text-left'>
                  Phone <span className='text-red-600'>*</span>
                </th>
                <td>
                  <input
                  onChange = {e=>setPhone(e.target.value)}
                    type='text'
                    className='border-2 border-gray-400 p-2 w-full rounded-md'
                    required
                  />
                </td>
              </tr>
              <tr>
                <th className='text-left'>Cover</th>
                <td>
                  <textarea
                  onChange={e=>setCover(e.target.value)}
                    className='textarea-lg w-full border-2 border-gray-400 rounded-md h-[150px]'
                    placeholder='Cover Letter'
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th className='text-left'>
                  Resume <span className='text-red-600'>*</span>
                </th>
                <td>
                  {
                    user?.resume?.map((item,index)=><div key={index} className='flex items-center mb-2'>
                      <input
                      onChange={e=>setResume(e.target.checked)}
                        type='radio'
                        name='radio-1'
                        className='radio mr-5'
                        defaultChecked
                      />
                      <a
                        target='_blank'
                        href={item}
                      >
                        {item?.split('/')[6]}
                      </a>
                    </div>)
                  }
                </td>
              </tr>
              <tr>
                <th className='text-left'></th>
                <td>
                  <div className="modal-action">
                    <form method="dialog">

                  <button onClick={handleSubmitApplication} className='btn btn-primary w-[100px] text-lg'>
                    Submit
                  </button>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  };
  
  export default ApplicationJob;
  