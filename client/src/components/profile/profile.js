import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// import components
import Spinner from '../spinner/spinner.js'
import OrdersAccordion from './ordersAccordion.js'

// import seo
import Seo from '../seo/seo.js'

//importing image
import profile from '../../images/profile.png'

//importing css file
import './profile.css'

// import actions
import {getUserDetail} from '../../store/slices/userSlice.js'
import {updateProfile, updateProfileReset, clearError} from '../../store/slices/profileSlice.js'
import {myOrders, clearError as ordersClearError} from '../../store/slices/orderSlice.js'
import {getWishlist, deleteFromWishlist, clearError as wishlistClearError, resetDeleted as resetWishDeleted} from '../../store/slices/wishlistSlice.js'

const Profile = () => {
	const dispatch =  useDispatch();

	const {user} = useSelector(state => state.user)
	const {loading, isUpdated, error} = useSelector(state => state.profile)
	const {orders, loading: ordersLoading, error: ordersError} = useSelector(state => state.order)
	const {list, loading: wishlistLoading, error: wishlistError, isDeleted: wishDeleted} = useSelector(state => state.wishlist)


	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);

	const handleProfileUpdate = async(e) => {
		e.preventDefault();
		dispatch(updateProfile({name, email}));
	}

	const handleWishItemDelete = (id) => {
		dispatch(deleteFromWishlist(id));
	}

	useEffect(() => {
		dispatch(myOrders());
		dispatch(getWishlist());

		if (error) {
	      toast.error(error);
	      dispatch(clearError());
	    }

	    if (isUpdated) {
			toast.success('Profile updated successfully!');
			dispatch(getUserDetail());
			dispatch(updateProfileReset())
		}
		
		if(ordersError){
			toast.error(ordersError);
			ordersClearError();
		}

		if(wishlistError){
			toast.error(wishlistError);
			dispatch(wishlistClearError());
		}	

		if(wishDeleted){
			toast.success('Item deleted successfully from wishlist!');
			dispatch(resetWishDeleted());
		}

	}, [dispatch, error, isUpdated, ordersError, wishlistError, wishDeleted])

	return(
		<>
			<Seo title='Profile' descripion='Profile page of logged in user.' />

			<section className="profile-container">	
				<div className='user-info'>
					{
						loading ? <Spinner /> : (
							<>
								<img src={profile} alt='user-profile-pic' />

								<div className='profile-info'>
									<div className='profile-information'>
										<div>
											<span>Name</span>
											<input type='text' value={name} placeholder={name} onChange={e => setName(e.target.value)} />
										</div>
										<div>
											<span>Email</span>
											<input type='text' value={email} placeholder={email} onChange={e => setEmail(e.target.value)} />
										</div>
										<div>
											<span>Role</span>{user.role}
										</div>
										<div>
											<span>Joined At</span>{String(user.joinedAt).substr(0, 10)}
										</div>
									</div>

									<div className='profile-buttons'>
										<Link to='/password/update'>Change Password</Link>
										{user?.role === 'admin' && <Link to='/admin'>Admin Panel</Link>}
										<button onClick={handleProfileUpdate}>{loading ? 'Loading...' : 'Save Changes'}</button>
									</div>
								</div>
							</>
						)
					}
				</div>

				<div className="order-info">
					<h1>My Orders</h1>
					
					<>
						{
							ordersLoading ? <Spinner style={{height: `20rem`}} /> : (
								!orders[0] ? (
									<div className='no-orders'>
										<p>You have not ordered anything yet.</p>
										<Link to='/'>Explore our products</Link>
									</div>
								) : (
									<ul className='orders'>
										 {
										 	orders.map(order => {
										 		return (
										 			<li key={order._id}>
										 				<OrdersAccordion {...order} />
										 			</li>
										 		)
										 	})
										 }
									</ul>
								)
							)
						}
					</>
				</div>

				<div className='wishlist-info'>
					<h1>My Wishlist</h1>

					<>
						{
							wishlistLoading ? <Spinner style={{height: `20rem`}} /> : (
								!list[0] ? (
									<div className='no-wishes'>
										<p>You have not added anything to wishlist yet.</p>
										<Link to='/'>Explore our products</Link>
									</div>
								) : (
									<ul className='wishes'>
										 {
										 	list.map((wish, index) => {
										 		return (
										 			<li key={index} className='wish'>
										 				<div><img src={wish.productImage} alt={'product_image'} /></div>
										 				<div><p>Name: {wish.productName}</p></div>
										 				<div><p>Price: {wish.productPrice}</p></div>
										 				<div className='action'>Action: 
										 					<i className='fa fa-trash' onClick={() => handleWishItemDelete(wish._id)}></i>
														</div>
										 			</li>
										 		)
										 	})
										 }
									</ul>
								)
							)
						}
					</>
				</div>
			</section>
		</>
	)
}

export default Profile