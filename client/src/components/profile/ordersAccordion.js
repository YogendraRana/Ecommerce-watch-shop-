import React, {useState} from 'react'

//import css
import './ordersAccordion.css'

const Accordion = ({_id, orderItems, totalPrice, orderStatus, shippingInfo, paymentInfo}) => {
	const [showDetail, setShowDetail] = useState(false);

	return(
		<div className='order-item'>
			<div className='order-summary'>
				<div>
					<p>Order ID</p>
					<span>{_id}</span>
				</div>
				<div>
					<p>Items Quantity</p>
					<span>{orderItems.length}</span>
				</div>
				<div>
					<p>Total Amount</p>
					<span>{totalPrice}</span>
				</div>
				<div>
					<p>Status</p>
					<span>{orderStatus}</span>
				</div>
				<i className={showDetail ? "fa fa-chevron-up" : "fa fa-chevron-down"} onClick={() => setShowDetail(!showDetail)}></i>
			</div>

			{showDetail && 
				<div className='order-detail'>
					<p>Order Details</p>
					<div className='detail-content'>
						<div>
							<p>Shipping Information</p>
							<p>Name: {shippingInfo.name}</p>
							<p>Phone: {shippingInfo.phoneNo}</p>
							<p>Address: {shippingInfo.address_line1}, {shippingInfo.city}, {shippingInfo.province}</p>
						</div>

						<div>
							<p>Payment Information</p>
							<p>Status: {paymentInfo.status === 'succeeded' ? "Paid" : "Not Paid"}</p>
							<p>Amount: Rs {totalPrice}</p>
						</div>

						<div>
							<p>Order Items</p>
							<div className='order-items'>
							{
								orderItems.map(item => {
									return (
										<div key={item.id}>
											<img src={item.image} alt="Product" />

											<p>{item.name}</p>
											
											<p>{item.quantity} * Rs {item.price} = Rs {item.price * item.quantity}</p>
										</div>
									)
								})
							}
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	)
};

export default Accordion;