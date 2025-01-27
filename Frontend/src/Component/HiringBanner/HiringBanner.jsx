
const HiringBanner = () => {
  return (
    <section className="md:flex mt-10 md:justify-center" >
      <div className="border rounded-lg w-full md:w-[700px] lg:w-[900px] p-1 bg-[url('https://www.zmo.ai/wp-content/uploads/2023/09/plain-white-background-cnw05vrcsznafb3o-scaled.jpg')] bg-no-repeat bg-cover">
        <div className='flex items-center justify-evenly'>
          <div className='hidden md:block'>
            {/* <img
              src='https://media.istockphoto.com/id/1401295466/vector/halftone-spotted-background.jpg?s=612x612&w=0&k=20&c=ql7PRJ1ffHk-Zkj4cDeePpLzmqAPzgIVtfBkCsoqK2Q='
              alt=''
            /> */}
          </div>
          <div>
            <h1 className='text-xl text-gray-500 font-semibold'>WE ARE</h1>
            <h1 className='text-3xl text-black font-bold'>HIRING</h1>
          </div>
          <div className="ml-3">
            <p>Let&apos;s Work Together & Explore Opportunities</p>
          </div>
          <div>
            <img
              className='w-[250px] h-[120px]'
              src='https://st.depositphotos.com/1186248/53055/i/450/depositphotos_530552332-stock-photo-recruitment-handwritten-white-background.jpg'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HiringBanner
