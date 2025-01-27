import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './newsblogs.css'

import { EffectCoverflow, Pagination } from 'swiper/modules'
import { FaAngleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const cards = [
  {
    id: 1,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_19.jpg',
    badge: 'SOLUTION',
    date: 'Featured - 18 Jul 2022',
    title: 'Print, publishing qui visual quis layout mockups.',
  },
  // {
  //   id: 2,
  //   image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_18.jpg',
  //   badge: 'DESIGN',
  //   date: '18 Jul 2022',
  //   title: 'Designer checklist for every UX/UI project.',
  // },
  {
    id: 3,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_20.jpg',
    badge: 'DEVELOPMENT',
    date: '18 Jul 2022',
    title: 'How to build a complete web application using React and Node.js.',
  },
  {
    id: 4,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_21.jpg',
    badge: 'BUSINESS',
    date: '18 Jul 2022',
    title: 'Make more productive working flow daily.',
  },
  {
    id: 5,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_22.jpg',
    badge: 'BRANDING',
    date: '18 Jul 2022',
    title: 'Quis nostrud exercitation ullamco laboris nisi.',
  },
  {
    id: 6,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_23.jpg',
    badge: 'MARKETING',
    date: '18 Jul 2022',
    title: 'Make Your WordPress dus Journal.',
  },
];


const NewsBlogs = () => {
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quasi, adipisci natus culpa consequuntur quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quasi, adipisci natus culpa consequuntur quos'

    const navigate = useNavigate()
  return (
    <section className='mt-12'>
      <h1 className='text-center text-3xl font-semibold'>News and Blog</h1>
      <p className='text-center text-gray-500 mt-2 mb-5'>
        Get the latest news, updates and tips{' '}
      </p>

      <div className='mb-10'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className='mySwiper'
        >
          {
            cards.map((card,index)=><SwiperSlide key={index} onClick={() => navigate(`/read-blog/${card.title}`)}>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src={card.image}
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  {card.title}
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>{card.date}</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>)
          }
  
        </Swiper>
      </div>
      <div className='flex justify-center '>
        <button onClick={()=>navigate('/blogs')} className='btn btn-active btn-neutral btn-md'>
          See More <FaAngleRight />
        </button>
      </div>
    </section>
  )
}

export default NewsBlogs
