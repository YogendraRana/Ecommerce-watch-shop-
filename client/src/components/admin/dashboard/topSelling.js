import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

// import css
import './topSelling.css'

const TopSelling = () => {
	const {orders} = useSelector(state => state.admin);
	const [topSelling, setTopSelling] = useState([]);

	useEffect(() => {
		setTopSelling([]);

		let uniqueItems = orders.reduce((acc, curr) => {
			curr.orderItems.forEach((item) => {
				if (acc[item.id]) {
					acc[item.id].quantity += item.quantity;
				} else {
					acc[item.id] = { ...item };
				}
			});
		
			return acc;
		}, {});

		let result = Object.values(uniqueItems);
		result = result.slice(0, 5);
		setTopSelling(result);

	}, [orders])
	
	return(
		<div className='top-selling'>
			<h3>Top Selling</h3>
			<ul>
				{!topSelling && <p>Nothing has been sold yet</p>} 
				{
					topSelling && topSelling.map((product, index) => {
						return (
							<li key={index}>
								<div>
									<img src={product.image} alt='product-pic' />
									<div>
										<span>Name:</span> 
										<p>{product.name}</p>
									</div>
								</div>
								
														
								<div>
									<span>Price:</span> 
									<p>{product.price}</p>
								</div>

								<div>
									<span>Category:</span> 
									<p>{product.category}</p>
								</div>

								<div>
									<span>Quantity Sold:</span> 
									<p>{product.quantity}</p>
								</div>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default TopSelling;