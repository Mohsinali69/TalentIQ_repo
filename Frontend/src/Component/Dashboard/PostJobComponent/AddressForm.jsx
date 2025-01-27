import { useDispatch, useSelector } from "react-redux"
import { setAddress, setCity, setCountry, setState } from "../../../Redux/Slices/jobSlice"

const AddressForm = () => {
    const {  
        address,
        country,
        city,
        state
      } = useSelector(state => state.job)
    const dispatch = useDispatch()
  return (
    <div>
      <div className='mt-10'>
        <h1 className='text-3xl text-blue-800'>Job Details</h1>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Address * </span>
            </div>
            <input
                value={address}
              type='text'
              placeholder='Address'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => dispatch(setAddress(e.target.value))}
            />
          </label>
        </div>
        <div className='grid grid-cols-3 gap-x-5'>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Country * </span>
              </div>
              <input
                  value={country}
                type='text'
                placeholder='Name of Country'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                  onChange={e => dispatch(setCountry( e.target.value))}
              />
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>City * </span>
              </div>
              <input
                  value={city}
                type='text'
                placeholder='Name of City'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                  onChange={e => dispatch(setCity(e.target.value))}
              />
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>State * </span>
              </div>
              <input
                  value={state}
                type='text'
                placeholder='Name of State'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                  onChange={e => dispatch(setState (e.target.value))}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForm
