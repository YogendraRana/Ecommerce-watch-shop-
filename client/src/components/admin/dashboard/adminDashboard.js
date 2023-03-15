import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// import components
import Seo from '../../seo/seo.js'
import Spinner from '../../spinner/spinner.js'
import FeaturedInfo from './featuredInfo.js'
import BarGraph from './barGraph.js'
import PieGraph from './pieGraph.js'
import TopSelling from './topSelling.js'

// import css
import './adminDashboard.css'

// import actions
import {getAdminProducts, getAllUsers, getAllOrders, clearError} from '../../../store/slices/adminSlice.js' 

const AdminDashboard = () => {
	const dispatch = useDispatch();
	const {loading, error, adminProducts, users, orders, totalSales} = useSelector(state => state.admin);

	// total sales in each category
	const totalMenProductsSales = orders.reduce((grandTotal, order) => {
	    const orderTotal = order.orderItems.reduce((total, item) => {
	        if(item.category === 'Men') {
	            return total = total + item.quantity*item.price;
	        }else{
	            return total = total + 0;
	        }
	    }, 0)
	    return grandTotal = grandTotal + orderTotal;
	}, 0);

	const totalWomenProductsSales = orders.reduce((grandTotal, order) => {
	    const orderTotal = order.orderItems.reduce((total, item) => {
	        if(item.category === 'Women') {
	            return total = total + item.quantity*item.price;
	        }else{
	            return total = total + 0;
	        }
	    }, 0)
	    return grandTotal = grandTotal + orderTotal;
	}, 0);

	const totalKidsProductsSales = orders.reduce((grandTotal, order) => {
	    const orderTotal = order.orderItems.reduce((total, item) => {
	        if(item.category === 'Kids') {
	            return total = total + item.quantity*item.price;
	        }else{
	            return total = total + 0;
	        }
	    }, 0)
	    return grandTotal = grandTotal + orderTotal;
	}, 0);


	// data fror pie chart
	const pieData = [
		{category: 'Men', sales: totalMenProductsSales}, 
		{category: 'Women', sales: totalWomenProductsSales}, 
		{category: 'Kids', sales: totalKidsProductsSales}
	]


	// change date string to formated date
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	const latestOrders = [...orders].sort((a, b) => a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0);

	// latest orders
	var barData = Object.values(latestOrders.reduce((final, current) => {
	    final[current.createdAt.split('T')[0]] = final[current.createdAt.split('T')[0]] || {date: current.createdAt.split('T')[0], sales: 0};
	    final[current.createdAt.split('T')[0]].sales += current.totalPrice;
	    return final;
	},{})).slice(0, 7);


	barData.forEach((order) => {
	    const orderDate = new Date(order.date); 
	    const date = orderDate.getDate();
	    const month = months[orderDate.getMonth()];
	    const year = orderDate.getFullYear();
	    
	    order.date = `${date} ${month}, ${year}`
	})
 
	useEffect(() => {
		dispatch(getAdminProducts());
		dispatch(getAllOrders());
		dispatch(getAllUsers());

		if(error){
			toast.error(error);
			dispatch(clearError());
		}
	}, [dispatch, error]);
	
	return (
		<>
			<Seo title='Admin - dashboard' descripion='Admin dashboard page.' />

			<div className='dashboard-container'>
				<div className='dashboard-heading'>
					<h2>Dashboard</h2>
				</div>
				
				<div className='dashboard'>
				{
					loading ? <Spinner /> : (
						<div className='information'>
							<FeaturedInfo adminProducts={adminProducts} users={users} orders={orders} totalSales={totalSales} />
							
							<div className='charts'>
								<BarGraph barData={barData} style={{height: '30rem'}} />
								<PieGraph pieData={pieData} style={{height: '30rem'}} />
							</div>
							
							<TopSelling />
						</div>
					)
				}
				</div>
			</div>  
		</>
	);
}

export default AdminDashboard;