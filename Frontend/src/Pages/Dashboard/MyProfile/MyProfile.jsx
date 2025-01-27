/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { reset, updateUser, updateUserImage } from '../../../Redux/Slices/userSlice'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const MyProfile = () => {
  const {
    user,
    isUserImageUpdateSuccess,
    isUserImageUpdateError,
    isUpdateUserError,
    isUpdateUserSuccess
  } = useSelector(state => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('user')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [updateImage, setUpdateImage] = useState(null)
  const [address, setAddress] = useState({
    address: '',
    country: '',
    city: '',
    zip_code: '',
    state: ''
  })
  const [socialLink, setSocialLink] = useState({
    linkedin: '',
    github: '',
    social: ''
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setPhone(user.phone || '')
      setBio(user.bio || '')
      setRole(user.role || 'user')
      setUpdateImage(user?.photo || null)
      setImage(
        user?.photo ||
          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      )
      setAddress({
        address: user?.address?.address || '',
        country: user?.address?.country || '',
        city: user?.address?.city || '',
        zip_code: user?.address?.zip_code || '',
        state: user?.address?.state || ''
      })
      setSocialLink({
        linkedin: user?.social?.linkedin || '',
        github: user?.social?.github || '',
        social: user?.social?.social || ''
      })
    }
  }, [user])

  useEffect(() => {
    if (isUserImageUpdateSuccess || isUpdateUserSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUserImageUpdateError||isUpdateUserError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'update error',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  }, [dispatch, isUpdateUserError, isUpdateUserSuccess, isUserImageUpdateError, isUserImageUpdateSuccess])

  const handleFileChange = e => {
    const file = e.target.files[0]
    setUpdateImage(file)
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('email', user?.email)
      dispatch(updateUserImage(formData))

      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddressChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value
    }))
  }

  const handleSocialLinkChange = (field, value) => {
    setSocialLink(prevSocialLink => ({
      ...prevSocialLink,
      [field]: value
    }))
  }

  const handleUpdateProfile = () => {
    const data = {
       name,
       email,
       phone,
       role,
       bio,
       address,
       social:socialLink
    }

    dispatch(updateUser(data))
  }

  console.log(user)
  return (
    <section>
      <h1 className='text-4xl m-7'>My Profile</h1>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <div className='relative avatar'>
          <div className='w-24 rounded-full'>
            <img src={image} alt='Avatar' />
          </div>
          <label
            htmlFor='file-input'
            className='absolute top-0 right-0 p-1 bg-white rounded-full cursor-pointer'
          >
            <span role='img' aria-label='Edit'>
              ✏️
            </span>
          </label>
          <input
            id='file-input'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Full Name *</span>
            </div>
            <input
              type='text'
              placeholder='Full Name'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              value={name}
              onChange={e=>setName(e.target.value)}
            />
          </label>
        </div>
        <div className='grid grid-cols-2 gap-x-2'>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Email *</span>
              </div>
              <input
                type='text'
                placeholder='Full Name'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                value={user?.email}
                readOnly
              />
            </label>
          </div>
          <div className='mt-5'>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Phone *</span>
              </div>
              <input
                type='text'
                placeholder='Full Name'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                value={user?.phone}
                onChange={e=>setPhone(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Bio *</span>
            </div>
            <textarea
              value={bio}
              className='p-2 rounded-lg  w-full border border-black'
              placeholder='Bio'
              style={{
                height: '150px',
                resize: 'none'
              }}
            ></textarea>
          </label>
        </div>
      </div>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Social Media</h1>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Linkedin </span>
            </div>
            <input
              value={socialLink?.linkedin}
              type='text'
              placeholder='LinkedIn Link'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => handleSocialLinkChange('linkedin', e.target.value)}
            />
          </label>
        </div>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Github </span>
            </div>
            <input
              value={socialLink?.github}
              type='text'
              placeholder='Github Link'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => handleSocialLinkChange('github', e.target.value)}
            />
          </label>
        </div>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Other </span>
            </div>
            <input
              value={socialLink?.social}
              type='text'
              placeholder='Other Link'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => handleSocialLinkChange('social', e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Address & Location</h1>
        <div className='mt-5'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='font-semibold'>Address* </span>
            </div>
            <input
              value={address?.address}
              type='text'
              placeholder='Your Address'
              className='p-2 rounded-lg w-full border border-black focus:border-black'
              onChange={e => handleAddressChange('address', e.target.value)}
            />
          </label>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4  gap-x-2 mt-5'>
          <div>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Country* </span>
              </div>
              <input
                value={address?.country}
                type='text'
                placeholder='Country'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => handleAddressChange('country', e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>City * </span>
              </div>
              <input
                value={address.city}
                type='text'
                placeholder='City'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => handleAddressChange('city', e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>Zip Code * </span>
              </div>
              <input
                value={socialLink?.zip_code}
                type='text'
                placeholder='Zip Code'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => handleAddressChange('zip_code', e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className='form-control w-full '>
              <div className='label'>
                <span className='font-semibold'>State * </span>
              </div>
              <input
                value={address?.state}
                type='text'
                placeholder='State'
                className='p-2 rounded-lg w-full border border-black focus:border-black'
                onChange={e => handleAddressChange('state', e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className='mt-5 pl-8 mb-2'>
        <button className='btn btn-info' onClick={handleUpdateProfile}>Update</button>
      </div>
    </section>
  )
}

export default MyProfile
