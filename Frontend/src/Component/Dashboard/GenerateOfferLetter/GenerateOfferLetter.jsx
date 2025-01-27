import { useDispatch, useSelector } from 'react-redux'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import SignatureCanvas from 'react-signature-canvas'
import { useEffect, useRef, useState } from 'react'
import './GenerateOfferLetter.css'
import PreviewPDF from '../PreviewPDF/PreviewPDF'
import { MdPreview } from 'react-icons/md'
import {
  reset,
  uploadOfferLetter
} from '../../../Redux/Slices/applicationSlice'
import Swal from 'sweetalert2'

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
}

const GenerateOfferLetter = () => {
  const {
    singleApplication,
    uploadOfferLetterError,
    uploadOfferLetterSuccess
  } = useSelector(state => state.application)
  const sigCanvas = useRef({})
  const [value, setValue] = useState('')
  const [preview, setPreview] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [signature, setSignature] = useState('')
  const [sincerely, setSincerely] = useState()
  const [position, setPosition] = useState()
  const [email, setEmail] = useState()
  const [data, setData] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    if (uploadOfferLetterError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error deleting resume',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (uploadOfferLetterSuccess) {
        setValue('');
        setPreview(false);
        setSignature(null);
        setSincerely(null);
        setPosition(null);
        setEmail(null);
      Swal.fire({
        position: 'top-end',
        icon: 'Success',
        title: 'Offer letter uploaded successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  }, [dispatch, uploadOfferLetterError, uploadOfferLetterSuccess])

  const clear = () => sigCanvas.current.clear()

  const saveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const sig = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
      setSignature(sig)
    } else {
      console.log('Signature canvas is empty!')
    }
  }

  const handleSavePDF = async () => {
    const data = {
      candidate: singleApplication?.candidate?.name,
      description: value,
      signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'),
      sincerely,
      position,
      date: new Date().toLocaleDateString(),
      company: singleApplication?.company?.name,
      phone: singleApplication?.candidate?.phone,
      email
    }
    const blob = await pdf(<PreviewPDF data={data} />).toBlob()

    // const url = URL.createObjectURL(blob)
    // const a = document.createElement('a')
    // a.href = url
    // a.download = `${data?.candidate}_offer_letter.pdf`
    // a.click()
    // URL.revokeObjectURL(url)

    const formData = new FormData()
    formData.append('file', blob, `${data?.candidate}_offer_letter.pdf`) // Add the file

    dispatch(uploadOfferLetter({ id: singleApplication?._id, data: formData }))
  }

  const handlePreviewPDF = () => {
    setPreview(true)
    const data = {
      candidate: singleApplication?.candidate?.name,
      description: value,
      signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'),
      sincerely,
      position,
      date: new Date().toLocaleDateString(),
      company: singleApplication?.company?.name,
      phone: singleApplication?.candidate?.phone,
      email
    }
    setData(data)
  }
  return (
    <section>
      <h1 className='text-center text-xl font-semibold'>
        Create the Offer Letter
      </h1>
      {singleApplication?.offer_letter && (
        <div className='mt-5 flex justify-center'>
          <div className='flex items-center gap-2 border border-gray-300 rounded-md p-3 shadow-md bg-gray-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-blue-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 11.828m0 0L19.414 10.414a2 2 0 00-2.828-2.828L11 14.586M12 20h9m-9-4h6'
              />
            </svg>
            <a
              target='_blank'
              href={singleApplication?.offer_letter}
              className='text-blue-600 font-semibold hover:underline'
              rel='noopener noreferrer'
            >
              {singleApplication?.offer_letter?.split('/')[5]}
            </a>
          </div>
        </div>
      )}
      <div className='mt-5'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='font-semibold'>Candidate Name *</span>
          </div>
          <input
            value={singleApplication?.candidate?.name}
            type='text'
            placeholder='Ex: Product Designer'
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          />
        </label>
      </div>
      <div className='mt-5'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='font-semibold'>Company Email *</span>
          </div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='text'
            placeholder='Name of resume maker'
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          />
        </label>
      </div>
      <div className='mt-5'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='font-semibold'>Sincerely *</span>
          </div>
          <input
            value={sincerely}
            onChange={e => setSincerely(e.target.value)}
            type='text'
            placeholder='Name of resume maker'
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          />
        </label>
      </div>
      <div className='mt-5'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='font-semibold'>Position *</span>
          </div>
          <input
            value={position}
            onChange={e => setPosition(e.target.value)}
            type='text'
            placeholder='Position of resume maker'
            className='p-2 rounded-lg w-full border border-black focus:border-black'
          />
        </label>
      </div>
      <div className='mt-5'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='font-semibold'>Description *</span>
          </div>
          <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            modules={modules}
            className='custom-quill'
          />
        </label>
      </div>
      <div className='mt-5'>
        <div className='border-2 border-black'>
          <SignatureCanvas
            penColor='black'
            ref={sigCanvas}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        </div>
        <div className='mt-5'>
          <button className='btn btn-warning btn-sm' onClick={clear}>
            Clear
          </button>
          <button className='btn btn-info btn-sm ml-5' onClick={saveSignature}>
            Save
          </button>
        </div>
      </div>
      <div className='mt-5'>
        <button className='btn btn-sm' onClick={() => handlePreviewPDF()}>
          Preview <MdPreview />
        </button>
        <button className='btn btn-info btn-sm ml-5' onClick={handleSavePDF}>
          Save PDF
        </button>
      </div>
      {preview && (
        <div className='mt-5'>
          <PDFViewer width='100%' height='600'>
            <PreviewPDF data={data} />
          </PDFViewer>
        </div>
      )}
    </section>
  )
}

export default GenerateOfferLetter
