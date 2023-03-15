import React, {useState} from 'react'
import {Link} from 'react-router-dom'

//import style
import './footer.css'

const Footer = () => {
	const [email, setEmail] = useState('');

	return(
		<footer className="footer-wrapper">
			<div className="footer-content">
				<div className="footer-menu">
					<h4>Main Menu</h4>
					<ul>
						<Link to="#"><li>Home</li></Link>
						<Link to="#"><li>About</li></Link>
						<Link to="#"><li>Contact</li></Link>
						<Link to="#"><li>Cart</li></Link>
						<Link to="#"><li>Register</li></Link>
					</ul>
				</div>

				<div className="shop-links">
					<h4>Shop by category</h4>
					<ul>
						<Link to="#"><li>New Arrivals</li></Link>
						<Link to="#"><li>Special Offers</li></Link>
						<Link to="#"><li>Highest Selling</li></Link>
						<Link to="#"><li>Men</li></Link>
						<Link to="#"><li>Women</li></Link>
						<Link to="#"><li>Kids</li></Link>
					</ul>
				</div>

				<div className="support">
					<h4>Support</h4>
					<ul>
						<Link to="#"><li>Troubleshooting</li></Link>
						<Link to="#"><li>Common Questions</li></Link>
						<Link to="#"><li>Report a Bug</li></Link>
					</ul>
				</div>

				<div className="company">
					<h4>Company</h4>
					<ul>
						<Link to="#"><li>Customer Service</li></Link>
						<Link to="#"><li>Terms of Use</li></Link>
						<Link to="#"><li>Privacy</li></Link>
					</ul>
				</div>
			</div>

			<div className="footer-others">
				<div className="footer-social">
					<h4>Follow us on</h4>
					<div className="footer-social-links">
						<Link to="#"><i className="fab fa-facebook-f"></i></Link>
						<Link to="#"><i className="fab fa-instagram"></i></Link>
						<Link to="#"><i className="fab fa-twitter"></i></Link>
					</div>
				</div>

				<div className="footer-payment">
					<h4>Payment Methods</h4>
					<div className="footer-payment-icons">
						<i className="fab fa-cc-visa"></i>
						<i className="fab fa-cc-mastercard"></i>
						<i className="fab fa-cc-paypal"></i>
					</div>
				</div>

				<div className="footer-subscribe">
					<h4>Subscribe for newsletter</h4>
					<form action="#" className="footer-subscribe-form">
						<input 
						type="email" 
						placeholder="Email address..." 
						value={email}
						onChange = {(e) => setEmail(e.target.value)}
						required />
						<button type="submit" className="footer-subscribe-btn">Subscribe</button>
					</form>
				</div>
			</div>	
		</footer>
	)
}

export default Footer