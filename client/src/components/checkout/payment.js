import React, {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//import css
import './payment.css'

// import actions
import {createOrder, clearError} from '../../store/slices/orderSlice.js'
import {clearCart} from '../../store/slices/cartSlice.js'

// stripe imports
import {useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';

const Payment = ({grandTotal, prevStep, nextStep}) => {
	const stripe = useStripe();
  	const elements = useElements();
  	const dispatch = useDispatch();
  	const payBtn = useRef(null)
  	const [paymentLoading, setPaymentLoading] = useState(false);

  	//useSelector
  	const {user} = useSelector(state => state.user);
  	const {shippingInfo} = useSelector(state => state.checkout);
  	const {error} = useSelector(state => state.order);
  	const {cartItems} = useSelector(state => state.cart);

  	//payment-options
	const paymentOptions = ['Credit',  'Bank-transfer', 'Khalti'];
	const [activePayment, setActivePayment] = useState(paymentOptions[0]);
	const [cardName, setCardName] = useState('');

	const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

	const orderData = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.orderSubtotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharge,
		totalPrice: orderInfo.grandTotal
	};

	//payment-submmit-handler
	const handlePaymentSubmit = async (e) => {
		e.preventDefault();

		try{
			setPaymentLoading(true);
			if(!stripe || !elements){
				return;
			};

			const res = await fetch('https://mern-watch-shop-client.onrender.com/payment/process', {
				method: 'POST',
				body: JSON.stringify({amount: grandTotal, email: user.email}),
				headers: {
			    	'Content-Type': 'application/json'
			    }
			});

			const data = await res.json();

			const result = await stripe.confirmCardPayment(data.client_secret, {
				payment_method: {
				  card: elements.getElement(CardNumberElement),
				  billing_details: {
				    name: user.name,
				    email: user.email,
				   	address: {
				   		state: shippingInfo.province, 
				   		city: shippingInfo.city,
				   		line1: shippingInfo.address_line1
				   	}
				  },
				},
			});	

			if(result.error){
				setPaymentLoading(false);
				payBtn.current.disabled = false;
				toast.error(result.error.message);	
			}

			if(result.paymentIntent && result.paymentIntent.status === 'succeeded'){
				toast.success('Payment successful');

				localStorage.removeItem('cart');

				dispatch(clearCart());
				
				orderData.paymentInfo = {
		            id: result.paymentIntent.id,
		            status: result.paymentIntent.status,
		        };

		        dispatch(createOrder(orderData));

		        setPaymentLoading(false);

				nextStep();
			}

		}

		catch(err){
			payBtn.current.disabled = false;
			toast.error(err);
		}
	};

	useEffect(() => {
		if(error) toast.error(error);
		dispatch(clearError());
	}, [dispatch, error])

	return(
		<>
			<Seo title='Checkout - payment' descripion='Checkout page for collectiong payment information.' />

			<div className='payment-container'>
				<ul className="payment-options">
					{
						paymentOptions.map(option => {
							return(						
								<li 
								key={option} 
								className={activePayment === option ? 'active' : ''} 
								onClick = {() => setActivePayment(option)} 
								style={{width: `calc(${(100/paymentOptions.length)-1}%)`}}
								>
									<span>{option}</span>
								</li>
							)
						})
					}
				</ul>

				<div className='payment-methods'>
					{activePayment === paymentOptions[0] && (
						<form className='card-payment' onSubmit={handlePaymentSubmit}>
							<div>
								<label>Cardholder's Name</label>
								<input type="text" autoComplete='off' value={cardName} onChange={e => setCardName(e.target.value)} />
							</div>

							<div>
								<label>Card Number</label>
								<CardNumberElement className='input-field' />
							</div>

							<div>
								<label>Expiration</label>
								<CardExpiryElement className='input-field' />
							</div>

							<div>
								<label>Security Code</label>
								<CardCvcElement className='input-field' />
							</div>

							<div className='payment-btns'>
								<button type='button' onClick={e => prevStep()}>Previous</button>
								<button type='submit' ref={payBtn} disabled={!stripe}>
									{paymentLoading ? 'Processing...' : 'Pay'}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</>
	)
};

export default Payment;