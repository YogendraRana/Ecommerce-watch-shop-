import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'

// import component
import Spinner from '../spinner/spinner.js'
import Message from '../utils/message.js'
import Carousel from '../utils/carousel.js'

// import css
import './hero.css'

// import actions
import {addToCart} from '../../store/slices/cartSlice.js'

const Hero = () => {
	const [heroProduct, setHeroProduct] = useState({});
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();
	const history = useHistory();

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
		const getRecommendations = async () => {
			try{
				const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/recommendation`);
				const data = await res.json();
				setHeroProduct(data.specialOffers[0]);
				setLoading(false);
			}catch(err){
				toast.error(err.message)
			}
		}
		
		getRecommendations();
	}, [])

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
					{loading ? <Spinner /> :
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