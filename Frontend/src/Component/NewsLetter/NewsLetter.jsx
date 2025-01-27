import newsLetterImg_right from '../../assets/images/newsletter-right.png'
import newsLetterImg_left from '../../assets/images/newsletter-left.png'
const NewsLetter = () => {
  return (
    <section className='md:flex md:justify-center mt-10 mb-5'>
      <div className="bg-[url('https://static.vecteezy.com/system/resources/thumbnails/002/375/040/small_2x/modern-white-background-free-vector.jpg')] bg-cover bg-center md:w-4/5 p-5 md:mx-0 mx-5 rounded-md">
        <div className='flex items-center justify-between'>
          <div className='hidden md:block'>
            <img src={newsLetterImg_left} alt='' />
          </div>
          <div>
            <h1 className='text-xl md:text-3xl text-black font-bold mb-6 text-center'>
              New Things Will Always Update Regularly
            </h1>
            <div className='flex justify-center'>
              <label className='input input-bordered flex items-center gap-2 w-4/5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                  <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                </svg>
                <input type='text' className='grow' placeholder='Email' />
              </label>
            </div>
              <div className='flex justify-center mt-4'>
              <button className="btn btn-active btn-accent text-white btn-wide">Subscribe</button>
              </div>
          </div>
          <div className='hidden md:block'>
            <img src={newsLetterImg_right} alt='' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
