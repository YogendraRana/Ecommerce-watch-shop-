import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './changePassword.css'

// import actions
import {changePassword, changePasswordReset, clearError} from '../../store/slices/profileSlice.js'
import {getUserDetail} from '../../store/slices/userSlice.js'

const ChangePassword = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [showPassword, setShowpassword] = useState(false);

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		dispatch(changePassword({oldPassword, newPassword, confirmNewPassword}));
	}

	useEffect(() => {
		if (error) {
	      toast.error(error);
	      dispatch(clearError());
	    }

		if (isUpdated) {
			toast.success('Password changed successfully!');
			dispatch(getUserDetail());
			dispatch(changePasswordReset())
			history.push('/profile');
		}

	}, [dispatch, error, isUpdated, history])


	return(	
		<>
			<Seo title='Change Password' descripion='Page for changing password.' />
			
			<div className="change-password-container">	
	  			<form className="change-password-form">
			    	<div>
			    		<h2>Change Password</h2>
			    		<i className= {!showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => setShowpassword(!showPassword)}></i>
			      	</div>

			      	<div>
			        	<input type={showPassword ? "text" : "password"} name="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Old Password" autoComplete="off" required/>
			      	</div>

			      	
			      	<div>
			        	<input type={showPassword ? "text" : "password"} name="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" autoComplete="off" required/>
			      	</div>


			      	<div>
			        	<input type={showPassword ? "text" : "password"} name="confirmNewPassword" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} placeholder="Confirm Password" autoComplete="off" required/>
			      	</div>

					<div>
						<button type="submit" onClick={handlePasswordSubmit}>{loading ? "Loading..." : "Confirm Change"}</button>
					</div>

					<div className="forgot-password">
						<Link to='/password/forgot'>Forgot Password?</Link>
		            </div>

				    <div className="profile-link">
				    	<p>Want to return to your profile? Click here!</p>
				   		<Link to="/profile">Profile</Link>	    
				   	</div>
				</form>
			</div>
		</>
	)
}

export default ChangePassword