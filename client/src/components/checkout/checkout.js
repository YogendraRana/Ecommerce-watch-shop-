import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

//import components
import Payment from './payment.js'
import Shipping from './shipping.js'
import FinishOrder from './finishOrder.js'

//import css
import './checkout.css'

const Checkout = () => {	
	const steps = ['shipping info', 'payment info', 'finish'];
	const [currentStep, setCurrentStep] = useState(0);
	const {cartItems} = useSelector(state => state.cart);

	//steps handler
	const prevStep = () => currentStep === 0 ? setCurrentStep(0) : setCurrentStep(prevState => prevState - 1);		
	const nextStep = () => currentStep === 2 ? setCurrentStep(2) : setCurrentStep(nextState => nextState + 1);		

	//grand-total
	const orderSubtotal = cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
	const shippingCharge = orderSubtotal > 1000 ? 50 : 100;
	const tax = orderSubtotal * 0.18;
	const grandTotal = orderSubtotal + shippingCharge + tax;

	return (
		<section className='checkout-section'>
			<div className='checkout-container'>
				<header>
					<h1>Checkout System <span> - {steps[currentStep]}</span></h1>
					<ul className="progressbar">
				    	<li className={currentStep >= 0 ? "active" : ""}><span>Shipping</span><i className='fa fa-chevron-right'></i></li>
				    	<li className={currentStep >= 1 ? "active" : ""}><span>Payment</span><i className='fa fa-chevron-right'></i></li>
				    	<li className={currentStep === 2 ? "active" : ""}><span>Finish</span></li>
				  	</ul>	
				</header>

				<div className='checkout-content'>	
					{currentStep === 0 && <Shipping nextStep={nextStep} orderSubtotal={orderSubtotal} shippingCharge={shippingCharge} tax={tax} grandTotal={grandTotal} />}
					{currentStep === 1 && <Payment grandTotal={grandTotal} prevStep={prevStep} nextStep={nextStep}/>}
					{currentStep === 2 && <FinishOrder />} 
				</div>
			</div>

			<div className='summary-container'>
				<h2>Order Summary</h2>

				<ul>
				{
					cartItems.map((item, index) => {
						return(
							<li key={index}>
								<img src={item.image} alt={item.image} />

								<div>
									<p>{item.name}</p>
									<span>$ {item.price}  ({item.quantity} of this kind)</span>
								</div>

								<Link to=''><i className="fa fa-info" aria-hidden="true"></i></Link>
							</li>
						)
					})
				}	
				</ul>					

				<div className="summary-total">
					<div>
						<p>Order Subtotal:</p>
						<span>$ {orderSubtotal}</span>
					</div>
					<div>
						<p>Delivery Charge:</p>
						<span>$ {shippingCharge}</span>
					</div>
					<div>
						<p>Tax:</p>
						<span>$ {tax}</span>
					</div>
					<div className="grand-total">
						<p>Grand Total:</p>
						<span>$ {grandTotal}</span>
					</div>
				</div>
			</div>
		</section>
	)
};

export default Checkout