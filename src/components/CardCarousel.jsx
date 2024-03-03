
import { Carousel } from 'primereact/carousel';

const CardCarousel = ({movies}) => {

  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
];


  return (
    <div>
      <Carousel value={movies.title} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={movies[0]} />
    </div>
  )
}

export default CardCarousel


        