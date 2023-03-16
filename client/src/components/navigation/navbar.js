import React, {useState} from 'react'
import {NavLink, Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

//import css
import './navbar.css'

// import actions
import {logoutUser} from '../../store/slices/userSlice.js'


const activeStyle = {
	background: '#ededed',
}

const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const [activeNav, setActiveNav] = useState(false);
	const [activeSpeedDial, setActiveSpeedDial] = useState(false);
	const [keyword, setKeyword] = useState('');
	const {cartItems} = useSelector(state => state.cart);
	const {user, isAuthenticated} = useSelector(state => state.user);

	const dispatch = useDispatch();

	const history = useHistory();
	
	const handleSearch = (e) => {
		e.preventDefault();

		if(!keyword){
			toast.warn('Please, enter the product first...');			
		}else if(keyword.trim()){
			history.push(`/search/${keyword}`);	
		}
	}

	const changeNavbarBackground = () => {
		if(window.scrollY > 1){
			setActiveNav(true);
		}else{
			setActiveNav(false);
		}
		
	}

	const handleLogOut = () => {
		dispatch(logoutUser());
		toast.success("Logged out successfully!");
		history.push('/');
	}

	window.addEventListener('scroll', changeNavbarBackground)

	return (
		<nav className={activeNav ? 'navbar active' : 'navbar'}> 
			<NavLink to='' className='logo'>Time Zn</NavLink>

			<div className={menu ? "menu active" : "menu"}>
				<div className="cross" onClick={() => setMenu(!menu)}>
					<i className="fas fa-times"></i>
				</div>

				<div className="nav-item" onClick={() => setMenu(!menu)}>
					<NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink>
				</div>
				<div className="nav-item" onClick={() => setMenu(!menu)}>
					<NavLink exact to='/about' activeStyle={activeStyle}>About</NavLink>
				</div>
				<div className="nav-item" onClick={() => setMenu(!menu)}>
					<NavLink exact to='/contact' activeStyle={activeStyle}>Contact</NavLink>
				</div>
			</div>

			<form>
				<input 
				type="text" 
				placeholder="Search by name..." 
				value={keyword} 
				onChange = {(e) => setKeyword(e.target.value)} 
				/>	

				<button onClick={handleSearch}>
					<i className="fas fa-search"></i>
				</button>					
			</form>

			<div className="nav-icons">
				<Link to='/chat' className="chat-link">
					<i className="fas fa-comments"></i>
				</Link>	

				<Link to="/cart" className="cart-link">
					<i className="fas fa-shopping-cart"></i>
					<div className="nav-total-quantity">{cartItems.length}</div>
				</Link>

				<div className="profile-btn" onClick={() => setActiveSpeedDial(!activeSpeedDial)}>
					<i className="fas fa-user"></i>

					<div className={activeSpeedDial ? 'speed-dial active' : 'speed-dial'}>
						{!isAuthenticated && <Link to='/login' style={{border: '1px solid #b2beb5'}}>Login</Link>}
						{isAuthenticated && <Link to='/profile' style={{border: '1px solid #b2beb5'}}>{user.name}</Link>}
						{user && user.role === 'admin' && <Link to='/admin'>Admin Panel</Link>}
						{isAuthenticated && <button onClick={handleLogOut}>Logout</button>}
					</div>
				</div>					

				<div className="hamburger" onClick={() => setMenu(!menu)}>
					<i className="fas fa-bars"></i>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
