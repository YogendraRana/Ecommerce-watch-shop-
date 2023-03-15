import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify'

//import components
import Spinner from '../../spinner/spinner.js'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './adminUsers.css'

//import action
import {getAllUsers, deleteUser, clearError, resetDeleted} from '../../../store/slices/adminSlice.js'

const AdminUsers = () => {
	const dispatch = useDispatch()
	const {error, loading, users, isDeleted} = useSelector(state => state.admin);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	}

	useEffect(() => {
		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(isDeleted){
			toast.success("User deleted successfully!");
			dispatch(resetDeleted());
		}

		dispatch(getAllUsers());
	}, [error, dispatch, isDeleted])

	return(
		<>
			<Seo title='Admin - users' descripion='Admin page for users.' />
				
			<div className='users-container'>
			
				<div className='users-heading'>
					<h2>All Users</h2>
				</div>
				
				<div className='users'>
				{
					loading ? <Spinner style={{height: `100%`}} /> : (
						<ul>
							{users.map((user, index) => {
								return (
									<li key={index}>
										<div>
											<span>ID:</span> 
											<p>{user._id}</p>
										</div>
										<div>
											<span>Name:</span> 
											<p>{user.name}</p>
											</div>
										<div>
											<span>Email:</span> 
											<p>{user.email}</p>
										</div>
										<div>
											<span>Role:</span> 
											<p>{user.role}</p>
										</div>
										<div className='actions'> 
											<i className='fa fa-trash' onClick={() => deleteUserHandler(user._id)}></i>
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

export default AdminUsers;