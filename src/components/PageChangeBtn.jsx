import React from 'react';

const PageChangeBtn = ({ page, setPage, maxPage }) => {


    const handleNextPageBtn = () => {

        if ((maxPage || 1000) > page) {
            setPage(page + 1);
        }

    }

    const handlePrevPageBtn = () => {

        if (page > 1) {
            setPage(page - 1);
        }

    }


    return (
        <div className='flex gap-x-5 p-10 justify-center'>

            {/* prevous Button  */}

            {page > 1 && (
                <button onClick={handlePrevPageBtn} className='flex items-center justify-evenly py-2 px-3 font-medium bg-[#00000084] hover:bg-[#fdfdfd12] rounded-md lg:py-3 lg:px-4 lg:text-xl'>
                    <img src="/assets/chevron_left.svg" alt="Previous" className="w-7" />
                    <p className='px-2'>Prev</p>
                </button>
            )}


            {/* next button  */}

            {(maxPage || 1000) > page && (
                <button onClick={handleNextPageBtn} className='flex items-center justify-evenly py-2 px-3 font-medium  bg-[#00000084]  hover:bg-[#fdfdfd12] rounded-md lg:py-3 lg:px-4 lg:text-xl'>
                    <p className='px-2'>Next</p>
                    <img src="/assets/chevron_right.svg" alt="Next" className="w-7" />
                </button>
            )}



        </div>
    );
};

export default PageChangeBtn;
