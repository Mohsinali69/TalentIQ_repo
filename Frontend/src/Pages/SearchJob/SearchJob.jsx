
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getJobs } from '../../Redux/Slices/jobSlice';
import SingleJob from '../../Component/SingleJob/SingleJob';
import ResponsivePaginationComponent from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const SearchJob = () => {
    const {jobs} = useSelector(state=>state.job)
    const location = useLocation();

    // Parse query parameters from the location.search
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title'); // Extract 'title' parameter
    const category = queryParams.get('category'); // Extract 'category' parameter
    const country = queryParams.get('country'); // Extract 'category' parameter
 const [currentPage, setCurrentPage] = useState(1)

 const itemsPerPage = 8 // Number of items to show per page
 const totalPages = Math.ceil(jobs?.length / itemsPerPage)
 const handlePageChange = page => {
   setCurrentPage(page)
 }
 const indexOfLastItem = currentPage * itemsPerPage
 const indexOfFirstItem = indexOfLastItem - itemsPerPage
 const items = jobs?.slice(indexOfFirstItem, indexOfLastItem)


    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getJobs({title,category,country}))
    },[category, country, dispatch, title])

    return (
        <section className='pt-20'>
            <div className='h-[500px]'>
            <div className='flex justify-center mt-10  '>
              <div className='grid grid-cols-1 md:grid-cols-4  gap-x-10 gap-y-10'>
                {items.map((tab, index) => (
                  <SingleJob job={tab} key={index}/>
                ))}
              </div>
            </div>
            </div>
            <div className=' pb-1 pt-1'>
            <ResponsivePaginationComponent
              total={totalPages}
              current={currentPage}
              onPageChange={page => handlePageChange(page)}
            />
          </div>
        </section>
    );
};

export default SearchJob;