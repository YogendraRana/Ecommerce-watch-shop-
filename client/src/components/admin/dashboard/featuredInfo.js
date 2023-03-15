import React from 'react'

// import css
import './featuredInfo.css'

const FeaturedInfo = ({adminProducts, users, orders, totalSales}) => {
	return (
		<div className='featured-info'>
			<div className='featured-item'>
				<p>Total Products</p>
				<p>{adminProducts ? adminProducts.length : 'No products yet'}</p>
			</div>

			<div className='featured-item'>
				<p>Users</p>
				<p>{users ? users.length : 'No users yet'}</p>
			</div>

			<div className='featured-item'>
				<p>Orders</p>
				<p>{orders ? orders.length : 'No orders yet'}</p>
			</div>

			<div className='featured-item'>
				<p>Total Sales</p>
				<p>Rs {totalSales ? Math.round(totalSales) : 'No sales yet'}</p>
			</div>
		</div>
	)
}

export default FeaturedInfo;