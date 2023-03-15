import React, {useState, useEffect} from 'react'

import './carousel.css'

const Carousel = ({data, style}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prev = () => currentIndex > 0 ? setCurrentIndex(prevState => prevState - 1) : setCurrentIndex(data.images.length - 1);   
	const next = () => currentIndex < data.images.length - 1 ? setCurrentIndex(prevState => prevState + 1) : setCurrentIndex(0);

	useEffect(()=> {
   		const changeImage = setTimeout(next, 4500);
   		return () => clearTimeout(changeImage);
	})

	return (
		<div className="carousel" style={style}>
			{data.images && <img src={data.images[currentIndex].url} alt='data-pic' /> }

			<div className='actions-indicators'>
				<i className="fa fa-chevron-left" aria-hidden="true" onClick={prev}></i>
				<div className='dots'>
	       			{
	       				data.images && data.images.map((image, index) => (
	       					<div className='dot' key={index} onClick={() => setCurrentIndex(index)} style={{background: index===currentIndex ? 'white' : ''}}></div>)
	       				)
	       			}
	       		</div>
	       		<i className="fa fa-chevron-right" aria-hidden="true" onClick={next}></i>
			</div>
        </div>
	)
}

export default Carousel;