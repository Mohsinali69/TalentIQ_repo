import { BsBank } from "react-icons/bs"
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from "react-icons/fa"
import { GrCloudSoftware, GrPersonalComputer } from "react-icons/gr"
import { MdProductionQuantityLimits } from "react-icons/md"
import { TfiHeadphoneAlt } from "react-icons/tfi"
import { useNavigate } from "react-router-dom"

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      icon:<FaRegFileAlt />,
      name: 'content Writer',
      job: 3
    },
    {
      id: 2,
      icon:<TfiHeadphoneAlt />,
      name: 'Human Resource',
      job: 2
    },
    {
      id: 3,
      icon:<BsBank/>,
      name: 'Finance',
      job: 1
    },
    {
      id: 4,
      icon:<GrPersonalComputer />,
      name: 'Management',
      job: 0
    },
    {
      id: 5,
      icon:<FaSearchengin />,
      name: 'Market Research',
      job: 1
    },
    {
      id: 6,
      icon:<FaRegFolderOpen />,
      name: 'Retail Product',
      job: 0
    },
    {
      id: 7,
      icon:<MdProductionQuantityLimits />,
      name: 'Market Sale',
      job: 0
    },
    {
      id: 8,
      icon:<GrCloudSoftware />,
      name: 'Software',
      job: 0
    }
  ]

  const navigate = useNavigate()
  return (
    <section className='mt-14 w-full'>
      <h1 className='text-center text-3xl font-semibold'>Browse by Category</h1>
      <p className='text-center text-gray-500 mt-2'>
        Find the job that’s perfect for you. about 800+ new jobs everyday{' '}
      </p>
      <div className='mt-8 flex justify-center '>
        <div className='grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-y-4 gap-x-5'>
          {categories.map(category => (
            <div onClick={()=>navigate(`/jobs/?category=${category.name}`)}  key={category.id} className="flex items-center justify-around w-[180px] border rounded-md px-2 py-4 hover:shadow-lg cursor-pointer">
              <div className="text-3xl text-blue-700">{category?.icon}</div>
              <div>
                <span className="font-semibold">{category.name}</span>
                <br />
                <span className="text-sm text-gray-500 font-semibold">{category.job} jobs available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
