import { useEffect } from 'react';
import { FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

const ReadBlog = () => {
  const { name } = useParams()

  useEffect(() => {
    // Scroll to the top of the page when the component is loaded
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className='pt-24 bg-gray-50 min-h-screen px-6'>
      <h1 className='max-w-4xl mx-auto px-6 text-4xl font-semibold text-green-600'>
        {name}
      </h1>
      <div className='max-w-4xl mx-auto  p-6'>
        <img
          src='https://jobi-svelte.vercel.app/assets/images/blog/blog_img_32.jpg' // Replace with your image URL
          alt='Team discussion'
          className='w-full h-96 rounded-lg mb-6'
        />
        <p className='text-gray-700 leading-relaxed text-lg text-justify'>
          Tomfoolery crikey bits and bobs brilliant bamboozled down the pub
          amongst brolly hanky panky, cack bonnet arse over tit burke bugger all
          mate bodge. Cillum dolore eu fugiat pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Suspendisse interdum consectetur libero id faucibus
          nisl. Lacus vel facilisis volutpat est velit egestas.
        </p>
        <p className='text-gray-700 leading-relaxed text-lg text-justify mt-5'>
          Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum.
          Sit amet ris nullam eget felis. Enim praesent elementum facilisis leo.
          Ultricies leo integer.
        </p>
      </div>
      <div className='max-w-4xl mx-auto  p-6'>
        <img
          src='https://jobi-svelte.vercel.app/assets/images/blog/blog_img_33.jpg' // Replace with your image URL
          alt='Team discussion'
          className='w-full h-96 rounded-lg mb-6'
        />
        <h1 className='text-lg font-semibold my-5'>
          This response is important for our ability to from mistakes but it
          also gives rise to self-criticism imperdiet nulla malesu elit.
        </h1>
        <p className='text-gray-700 leading-relaxed text-lg text-justify'>
          One touch of a red-hot stove is usually all we need to avoid that kind
          of discomfort in future The same is true as we experienc the emotional
          of stress from our instances. We are quickly learn to fear and thus
          automatically. Lorem ipsum dolor sit amet.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Quote Section */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md mb-10">
          <blockquote className="text-2xl md:text-3xl italic font-semibold text-gray-800 text-center">
            “Everything is designed. Few things are designed well.”
          </blockquote>
          <p className="text-center mt-4 text-gray-600">
            <span className="font-bold text-green-800">Brian Reed</span>, front-end developer
          </p>
        </div>

        {/* Content Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Work Harder & Gain Success
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 text-lg text-justify">
          One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in quis elit future.
          The same Duis aute irure dolor in reprehenderit.
        </p>
        <p className="text-gray-700 leading-relaxed mb-10 text-lg text-justify">
          It is true as we experience the emotional sensation of stress from our first social rejection ridicule. 
          We quickly learn to fear and thus automatically, potentially stressful situations of all kinds, including 
          the most common of all.
        </p>

        {/* Tags and Share Section */}
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <p className="text-gray-600">
            <span className="font-semibold">Tag:</span> business, marketing, tips
          </p>
          <div className="flex space-x-4">
            <span className="font-semibold">Share:</span>
            <a href="#" className="text-gray-600 hover:text-gray-800 mt-1">
              <FaGoogle />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 mt-1">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 mt-1">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadBlog
