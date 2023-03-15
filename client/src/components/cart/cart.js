import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

// import seo
import Seo from '../seo/seo.js'

//importing css file
import './cart.css'

//importing actions
import {deleteFromCart, clearCart} from '../../store/slices/cartSlice.js'
import {increaseItemQuantity, decreaseItemQuantity} from '../../store/slices/cartSlice.js'

const Cart = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {cartItems} = useSelector(state => state.cart);

	const increaseQuantity = (item) => {
		dispatch(increaseItemQuantity(item));
	}

	const decreaseQuantity = (item) => {
		dispatch(decreaseItemQuantity(item));
	}

	const handleCheckout = () => {
		history.push('/login?redirect=checkout');
	}

	return(
		<>
			<Seo title='Cart' descripion='Cart page for cart items.' />
			
			<section className="cart-section">
				<div className="cart-container">
					<div className="cart-header">
						{cartItems.length ? <Link to='/'><i className="fas fa-chevron-left"></i>Back to shopping</Link> : <p>Empty cart</p>}
						<button onClick={()=> dispatch(clearCart())} disabled={!cartItems.length}>Clear Cart</button>
					</div>

					<div className="cart-content">
					{
						cartItems.length ? (
							<ul>
								{
									cartItems.map(item => {
										return(
											<li key={item.id}>
												<div className="item-detail">
													<img src={item.image} alt={item.image} />

													<div>
														<p>{item.name}<span> - {item.stock} in stock</span></p>
														<span>$ {item.price}</span>
													</div>
												</div>

												<div className="item-quantity">
													<i className="fas fa-plus" onClick={() => increaseQuantity(item)}></i>			
													<input type="text" value={item.quantity} disabled />
													<i className="fas fa-minus" onClick={() => decreaseQuantity(item)}></i>
												</div>

												<div className="item-price">
													<p>Price</p>
													<span>$ {item.price * item.quantity}</span>
												</div>

												<div className="item-remove" onClick={() => dispatch(deleteFromCart(item))}>
													<i className="fas fa-trash"></i>
												</div>
											</li>	
										)
									})
								}									
							</ul>
						) : (
							<div className='empty-cart'>
								<p>Empty cart. Click below to keep shopping.</p>
								<Link to='/'>Shop Now</Link>
							</div>
						)
					}					
					</div>

					<div className="cart-footer">
						<div className="total">
							<p>Cart Subtotal</p>
							<span>$ {cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)}</span>
						</div>	
						<button onClick={handleCheckout} className="checkout-btn" disabled={!cartItems.length}>
							<p>Proceed to Checkout</p>
							<i className="fas fa-chevron-right"></i>
						</button>										
					</div>
				</div>
			</section>
		</>
	);
}

export default Cart