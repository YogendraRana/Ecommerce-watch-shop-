import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './finishOrder.css'

const FinishOrder = () => {
	const {user} = useSelector(state => state.user);

	return(
		<>
			<Seo title='Checkout - finish' descripion='Checkout page for finishing order.' />

			<div className="finish-order">
				<i className="fa fa-check"></i>
				<p>Hey {user.name}, your order has been placed successfully.</p>
				<p>We will send you shipping confirmation email as soon as your order ships.</p>
				<div>
					<Link to='/'>Explore more products</Link>
					<Link to='/profile'>View Order Status</Link>
				</div>
			</div>
		</>
	);
}

export default FinishOrder;