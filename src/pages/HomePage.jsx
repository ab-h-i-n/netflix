import React from 'react';
import CardCarousel from '../components/CardCarousel';
import CatagorieCard from '../components/CatagorieCard';
import { MovieCatagories } from '../MovieCatagories';
import HomeNav from '../components/HomeNav';

const HomePage = ({ usrData }) => {


    const apiUrl = MovieCatagories[0].catagorie_url;


    return (
        <div className='home-page min-h-screen text-white'>
            {/* all */}

            <div >

                <div className='bg-transparent absolute top-0 z-[100] w-full'><HomeNav /></div>

                <>
                    <CardCarousel apiUrl={apiUrl} />

                    <div className='grid gap-y-10 my-10'>

                        {MovieCatagories.map((cat, index) => (

                            <CatagorieCard key={`catagorie_${index}`} apiUrl={cat.catagorie_url} CatagorieTitle={cat.catagorie_titile} pagePath={cat.catagorie_path} type={cat.type} />

                        ))}

                    </div>
                </>

            </div>

        </div>
    );
};

export default HomePage;
