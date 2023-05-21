import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

// import component
import Spinner from '../spinner/spinner.js'
import Message from '../utils/message.js'
import Carousel from '../utils/carousel.js'

// import css
import './hero.css'

// import actions
import useGet from '../../hook/useGet.js'
import {addToCart} from '../../store/slices/cartSlice.js'

const Hero = () => {
    const { data, isLoading } = useGet('/products/recommendation');

	const dispatch = useDispatch();
	const history = useHistory();

	const [heroProduct, setHeroProduct] = useState({});

	const newPrice = heroProduct.price - (heroProduct.discount * heroProduct.price / 100);

	const handleAddToCart = () => {
		dispatch(addToCart(
			{
				id: heroProduct._id,
				name: heroProduct.name,
				price: newPrice,
				category: heroProduct.category,
				image: heroProduct.images[0].url,
				stock: heroProduct.stock,
				quantity: 1
			}
		))

		history.push('/cart');
	}

    useEffect(() => {
        if(data && data.specialOffers[0]){
            setHeroProduct(data.specialOffers[0]);
        }
    }, [data])

	return(
		<>
			<section className='hero-section'>
				<div className='hero-container'>
				<div className="left-column">
					<div className='ribbon'>
						<p>{heroProduct.discount === null ? 'Featured Product' : 'Special Offer'}</p>
						{heroProduct.discount !== null && <span>{-heroProduct.discount}%</span>}
					</div>
					
					<div className='watch-info'>		
					    <h1>{heroProduct.name}</h1>				    
					    <p>{heroProduct.description}</p>		            
					</div>
					
					<p>
						Price: <span>$ {newPrice}</span>
						{heroProduct.discount !== null && <s>$ {heroProduct.price}</s>}
					</p>
					
					<button onClick={handleAddToCart}>Shop Now</button>  
				</div>

				<div className="right-column">
					{isLoading ? <Spinner /> :
						!heroProduct.images ? <Message message='Something went wrong...' /> :
						<Carousel data={heroProduct}/>
					}
				</div>
			</div>
			</section>
		</>
	)
}

export default Hero;