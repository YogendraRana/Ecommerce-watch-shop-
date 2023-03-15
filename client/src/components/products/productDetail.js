import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

//importing modals and components
import Seo from '../seo/seo.js'
import Spinner from '../spinner/spinner.js'
import SocialModal from '../modals/socialModal.js'
import FeedbackModal from '../modals/feedbackModal.js'
import Carousel from '../utils/carousel.js'

//import css
import './productDetail.css'

//importing actions
import {addToCart} from '../../store/slices/cartSlice.js'
import {getProductDetail, clearError} from '../../store/slices/productSlice.js'
import {clearError as clearReviewError, resetAdded as resetReviewAdded} from '../../store/slices/reviewSlice.js'
import {addToWishlist, clearError as clearWishlistError, resetAdded as resetWishlistAdded} from '../../store/slices/wishlistSlice.js'

const ProductDetail = () => {
	const [quantity, setQuantity] = useState(1);
	const [feedbackModal, setFeedbackModal] = useState(false);
	const [showReviews, setShowReviews] = useState(false);
	const [activeSocialModal, setActiveSocialModal] = useState(false);

	const {cartItems} = useSelector(state => state.cart);
	const {product, loading, error} = useSelector(state => state.store);
	const {error: reviewError, isAdded: reviewIsAdded} = useSelector(state => state.review);
	const {error: wishlistError, isAdded: wishlistIsAdded} = useSelector(state => state.wishlist);	
	
	const { id } = useParams();

	const history = useHistory();
	const dispatch = useDispatch();

	const toggleSociaModal = () => setActiveSocialModal(!activeSocialModal)
	
	const increaseQuantity = () => quantity < product.stock ? setQuantity(prevState => prevState + 1) : setQuantity(product.stock);
	const decreaseQuantity = () => quantity > 1 ? setQuantity(prevState => prevState - 1) : setQuantity(1);   

	const handleAddToWishlist = (product) => {
		dispatch(addToWishlist({
			productId: product._id, 
			productName: product.name, 
			productPrice: product.price, 
			productImage: product.images[0].url
		}));
	}

	const handleBuyNow = (product, quantity) => {
		dispatch(addToCart(
			{
				id: product._id,
				name: product.name,
				price: product.price,
				category: product.category,
				image: product.images[0].url,
				stock: product.stock,
				quantity
			}
		));

		history.push('/cart');
	}

	const handleAddToCart = (product, quantity) => {
		dispatch(addToCart(
			{
				id: product._id,
				name: product.name,
				price: product.price,
				category: product.category,
				image: product.images[0].url,
				stock: product.stock,
				quantity
			}
		));
	}

	const toggleFeedbackModal = () => {
		setFeedbackModal(!feedbackModal);
	}

	const toggleReviews = () => {
		setShowReviews(!showReviews);
	}

	useEffect(() => {
		dispatch(getProductDetail(id));

		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(reviewError){
			toast.error(reviewError);
			dispatch(clearReviewError());
		}

		if(reviewIsAdded){
			toast.success('Review added successfully!');
			dispatch(resetReviewAdded())
		}

		if(wishlistError){
			toast.error(wishlistError);
			dispatch(clearWishlistError());
		}

		if(wishlistIsAdded){
			toast.success('Product added to wishlist successfully!');
			dispatch(resetWishlistAdded())
		}
	}, [dispatch, id, error, reviewError, reviewIsAdded, wishlistError, wishlistIsAdded])

	return ( 
		<>
			{activeSocialModal && <SocialModal toggleSociaModal={toggleSociaModal} />}	
			{feedbackModal && <FeedbackModal toggleFeedbackModal={toggleFeedbackModal} />}
			
			<Seo title='Product Detail' descripion='Page for detail information of a specific product.' />	
			
			<section className='product-detail-section'>
				<div className="product-detail-container">
					{loading ? <Spinner /> : (
						<>
							<div className='detail-row-1'>
								<div className="detail-col-1">
									<Carousel data={product} />
								</div>

								<div className="detail-col-2">
									<div className='product-name'>
										<h1>{product.name}</h1>
										<div className='product-info'>
											<p>
												{
													[1, 2, 3, 4, 5].map((val, index) => {
														return(
															<i key={index} className={(product.avgRating + 1 === val + 0.5) ? "fas fa-star-half-alt" : (product.avgRating >= val) ? "fas fa-star" : "far fa-star"} aria-hidden='true' />
														)		
													})
												}
											</p>
											<p>{product.numOfReviews} reviews</p>
											<p>{product.stock} in stock </p>
											<p>{product.category}s watch</p>
										</div>
									</div>

									<p className='product-description'>{product.description}</p>
									
									<p className='product-price'>$ {product.price}</p>

									<div className='product-quantity'>
										<i className="fas fa-minus" onClick={decreaseQuantity}></i>		
										<input type="text" value={quantity} disabled />
										<i className="fas fa-plus" onClick={increaseQuantity}></i>	
									</div>

									<div className="product-buttons">
										<button onClick={() => handleAddToWishlist(product)}>
											<i className="far fa-bookmark" aria-hidden="true"></i>
										</button>
										<button className={cartItems.find(item => item.id === id) ? "cart-clicked" : ""} onClick={() => handleAddToCart(product, quantity)}>
											<i className={cartItems.find(item => item.id === id) ? "fa fa-check" : "far fa-cart-plus"} aria-hidden="true"></i>
										</button>
										<button onClick={toggleSociaModal}>
											<i className="far fa-share" aria-hidden="true"></i>
										</button>
										
										<div className='buy-btn' disabled={product.stock < 1 ? true : false} onClick={() => handleBuyNow(product, quantity)}>Buy Now</div>
										
										<div className='feedback-btn' onClick={toggleFeedbackModal}>Your Feedback</div>

										<div className='reviews-btn' onClick={toggleReviews}>User Reviews</div>
									</div>
								</div>
							</div>
							<div className='detail-row-2'>
								{/*Some Recommendations to be added here...*/}
							</div>
						</>
					)}
				</div>

				<div className={showReviews ? 'user-reviews-active user-reviews' : 'user-reviews-hidden user-reviews'}>
					<div className='review-heading'>
						<h1>User Reviews</h1>
						<i className='fa fa-times' aria-hidden='true' onClick={toggleReviews} />
					</div>

					{product.reviews ? (product.reviews.map((review, index) => {
						return (
							<div className='review' key={index}>
								<div className='review-rating'>
									<p>{review.name}</p>
									<div>
										{
											[1, 2, 3, 4, 5].map((val, index) => {
												return(
													<i key={index} className={val <= review.rating ? "fas fa-star" : "far fa-star"} aria-hidden='true' />
												)		
											})
										}
									</div>
								</div>

								<p className='review-comment'>{review.comment}</p>
							</div>
						)
					})) : (<p className='no-review'>No reviews yet...</p>)}
				</div>
			</section>
		</>
	);
}

export default ProductDetail;