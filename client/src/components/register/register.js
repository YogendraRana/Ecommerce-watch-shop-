import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './register.css'

// import actions
import {registerUser, clearError} from '../../store/slices/userSlice.js'

const Register = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {loading, error, isAuthenticated} = useSelector(state => state.user)

	const [user, setUser] = useState({name: "", email: "", password: "", cpassword: ""});
	
	const handleRegisterDataChange = (e) => {
		setUser({...user, [e.target.name]: e.target.value});
	}

	const handleRegistration = async (e) => {
		e.preventDefault();
    	const {name, email, password, cpassword} = user
	    dispatch(registerUser({name, email, password, cpassword}));
	}

	useEffect(() => {
		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(isAuthenticated){
			toast.success('User registered successfully!')
			history.push('/');
		}
	}, [dispatch, error, history, isAuthenticated]);


	return(	
		<>
			<Seo title='Register Page' descripion='Page for registering new user.' />

			<section className="register-section">
				
				<form className="register-form">
					<div>
			    		<h2>Register</h2>
			      	</div>

		        	<div>	
		          		<input type="text" name="name" value={user.name} onChange={handleRegisterDataChange} placeholder="Name" autoComplete="off" />
		        	</div>

		        	<div>
		          		<input type="email" name="email" value={user.email}  onChange={handleRegisterDataChange} placeholder="Email" autoComplete="off" />
		        	</div>

		        	<div>	
		          		<input type="password" name="password" value={user.password} onChange={handleRegisterDataChange} placeholder="Password" autoComplete="off" />
		        	</div>

		        	<div>	        		
			          	<input type="password" name="cpassword" value={user.cpassword} onChange={handleRegisterDataChange} placeholder="Confirm Password" autoComplete="off" />
		        	</div>

		        	<div>
		        		<button type="submit" onClick={handleRegistration}>{loading ? "Loading..." : "Register"}</button>
		        	</div>

		        	<div className="log-in-link">
				    	<p>Already have an account? If yes, just log in. We've missed you!</p>
				   		<Link to="/login">Log In</Link>	    
				   	</div>
	      		</form> 
			</section>
		</>
	)
}

export default Register