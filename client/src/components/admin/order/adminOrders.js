import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

//import components
import Spinner from '../../spinner/spinner.js';
import UpdateOrder from './updateOrder.js'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './adminOrders.css'

//import actions
import {getAllOrders, deleteOrder, clearError, resetUpdated, resetDeleted} from '../../../store/slices/adminSlice.js' 

const AdminOrders = () => {
	const [activeUpdateOrder, setActiveUpdateOrder] = useState(false);
	const [currentOrder, setCurrentOrder] = useState({});

	const dispatch = useDispatch();
	const {orders, loading, error, isDeleted, isUpdated} = useSelector(state => state.admin);

	const toggleUpdateOrderModel = () => {
		setActiveUpdateOrder(!activeUpdateOrder);
	}

	const deleteOrderHandler = (id) => {
		dispatch(deleteOrder(id));
	}

	useEffect(() => {
		dispatch(getAllOrders());

		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(isUpdated){
			toast.success('Order updated successfully!');
			dispatch(resetUpdated());
		}

		if(isDeleted){
			toast.success('Order deleted successfully.');
			dispatch(resetDeleted());
		}
	}, [dispatch, error, isDeleted, isUpdated]);

	return(
		<>
			{activeUpdateOrder && <UpdateOrder currentOrder={currentOrder} toggleUpdateOrderModel={toggleUpdateOrderModel} />}

			<Seo title='Admin - orders' descripion='Admin page for orders.' />

			<div className='orders-container'>

				<div className='orders-heading'>
					<h2>All Orders</h2>
				</div>
			
				<div className='orders'>
					{
						loading ? <Spinner style={{height: `100%`}} /> : (
						<ul>
							{
								orders.map((order, index) => {
								return (
									<li key={index}>
										<div>
											<span>ID:</span> 
											<p>{order._id}</p>
										</div>
										<div>
											<span>Status:</span>
											<p>{order.orderStatus}</p>
										</div>
										<div>
											<span>Quantity:</span> 
											<p>{order.orderItems.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)}</p>
										</div>
										<div>
											<span>Amount:</span> 
											<p>{order.totalPrice}</p>
										</div>
										<div className='actions'>
											<div>
												<i className='fa fa-pen' onClick={() => {
													setCurrentOrder(order);
													toggleUpdateOrderModel();
												}}></i>
												<i className='fa fa-trash' onClick={() => deleteOrderHandler(order._id)}></i>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					)
				}
				</div>
			</div>
		</>
	)
};

export default AdminOrders;