import CreateEductionForm from '../CreateEducationForm/CreateEductionForm'

const UploadEducation = () => {
  return (
    <section>
      <div className='mt-5'>
        <button
          className='btn btn-info'
          onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          Add Education
        </button>
      </div>
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box '>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <CreateEductionForm />
        </div>
      </dialog>
    </section>
  )
}

export default UploadEducation
