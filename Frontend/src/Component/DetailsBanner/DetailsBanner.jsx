import AnimatedNumbers from 'react-animated-numbers'

const DetailsBanner = () => {
  return (
    <section className='flex justify-center mt-10'>
      <div className='grid md:grid-cols-4 grid-cols md:gap-y-0 gap-y-8 md:gap-x-20'>
        <div className='w-60 text-center'>
          <p className='text-gray-500 text-justify'>
            We always provide people a complete solution upon focused of any
            business
          </p>
          <h1 className='text-xl font-semibold mt-2'>Completed Cases</h1>
          <p className='text-5xl text-blue-800 font-bold flex justify-center'><AnimatedNumbers
            includeComma
            // className={styles.container}
            transitions={index => ({
              type: 'spring',
              duration: index + 0.1
            })}
            animateToNumber={25}
            fontStyle={{
              fontSize: 50,
              color: 'blue',
                fontWeight: 'bold'
            }}
          /> K+</p>
        </div>
        <div className='w-60 text-center'>
          <p className='text-gray-500 text-justify'>
            We always provide people a complete solution upon focused of any
            business
          </p>
          <h1 className='text-xl font-semibold mt-2'>Our Office</h1>
          <p className='text-5xl text-blue-800 font-bold flex justify-center'><AnimatedNumbers
            includeComma
            // className={styles.container}
            transitions={index => ({
              type: 'spring',
              duration: index + 0.1
            })}
            animateToNumber={17}
            fontStyle={{
              fontSize: 50,
              color: 'blue',
                fontWeight: 'bold'
            }}
          /> +</p>
        </div>
        <div className='w-60 text-center'>
          <p className='text-gray-500 text-justify'>
            We always provide people a complete solution upon focused of any
            business
          </p>
          <h1 className='text-xl font-semibold mt-2'>Skilled People</h1>
          <p className='text-5xl text-blue-800 font-bold flex justify-center'><AnimatedNumbers
            includeComma
            // className={styles.container}
            transitions={index => ({
              type: 'spring',
              duration: index + 0.1
            })}
            animateToNumber={86}
            fontStyle={{
              fontSize: 50,
              color: 'blue',
                fontWeight: 'bold'
            }}
          /> +</p>
          
        </div>
        <div className='w-60 text-center'>
          <p className='text-gray-500 text-justify'>
            We always provide people a complete solution upon focused of any
            business
          </p>
          <h1 className='text-xl font-semibold mt-2'>Happy Clients</h1>
          <p className='text-5xl text-blue-800 font-bold flex justify-center'><AnimatedNumbers
            includeComma
            // className={styles.container}
            transitions={index => ({
              type: 'spring',
              duration: index + 0.1
            })}
            animateToNumber={28}
            fontStyle={{
              fontSize: 50,
              color: 'blue',
                fontWeight: 'bold'
            }}
          /> +</p>
        </div>
      </div>
    </section>
  )
}

export default DetailsBanner
