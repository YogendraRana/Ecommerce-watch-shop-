import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

//importing modal
import SocialModal from '../modals/socialModal.js'

//importing css file
import './card.css'

//importing action
import {addToCart} from '../../store/slices/cartSlice.js'
import {addToWishlist} from '../../store/slices/wishlistSlice.js'

const Card = ({product, count, show}) => {
	const [activeSocialModal, setActiveSocialModal] = useState(false);

	const {cartItems} = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	const toggleSociaModal = () => setActiveSocialModal(!activeSocialModal);

	const handleAddToWishlist = () => {
		dispatch(addToWishlist({
			productId: product._id, 
			productName: product.name, 
			productPrice: product.price, 
			productImage: product.images[0].url
		}));
	}

	const handleAddToCart = () => {
		dispatch(addToCart(
			{
				id: product._id,
				name: product.name,
				price: product.price,
				category: product.category,
				image: product.images[0].url,
				stock: product.stock,
				quantity: 1
			}
		));
	}

	
	
	return(
		<>
			{activeSocialModal && <SocialModal toggleSociaModal={toggleSociaModal} product={product}/>}

			<div className={`card-container slide-${show}`} 
				style={{transform: `translateX(-${count*100}%)`, transition: `all 0.4s cubic-bezier(0.68, -0.55,0.265, 1.55)`}}
			>
				<div className="card-wrapper">
					<div className="image">
						<img src={product.images[0].url} alt='product-pic' />
					</div>

					<div className="card-content">
						<div className="card-rating">
							<div>
								<p>Rating</p>

								<div className="stars">
								{
									[1, 2, 3, 4, 5].map((val, index) => {
										return(
											<div key={index}>
												<i className={(product.avgRating + 1 === val + 0.5) ? "fas fa-star-half-alt" : (product.avgRating >= val) ? "fas fa-star" : "far fa-star"} aria-hidden='true' />
											</div>
										)		
									})
								}
								</div>
							</div>

							<span>$ {product.price}</span>
						</div>

						<div className="card-detail">
							<h4>{product.name}</h4>
							<p>{product.description}</p>
						</div>

						<div className="card-btns">
							<div className="wish" onClick={handleAddToWishlist}>
								<i className="far fa-bookmark" aria-hidden="true"></i>
							</div>

							<div onClick={handleAddToCart} className={cartItems.find(item => item.id === product._id) ? "cart clicked" : "cart"}>
								<i className={cartItems.find(item => item.id === product._id) ? "fa fa-check" : "far fa-cart-plus"} aria-hidden="true"></i>
							</div>

							<div className="share" onClick={toggleSociaModal}>
								<i className="far fa-share" aria-hidden="true"></i>
							</div>	

							<Link to="/cart" className="buy-btn">Buy Now</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card;