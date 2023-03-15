import React, {useState} from 'react';

//Contact.css
import './contact.css'

// import seo
import Seo from '../seo/seo.js'

const Contact = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('admin@gmail.com');

    return (
    	<>
    		<Seo title='Contact Page' descripion='Contact page of Time Zn' />

		    <section className="contact-section">
		    	<div className='contact-container'>
			    	<div className="left-column">		    		
			   			<form>
			    			<h3>Contact Us</h3>
							<input type="text" placeholder="full name" value={name} onChange={(e) => setName(e.target.value)} required/>
							<input type="email" placeholder="email" value={email} />
							<textarea placeholder="write your message here"></textarea>
							<button className="submit-btn" type="submit">Send</button>
						</form>
			    	</div>

			    	<div className="right-column">
			    		<div className="contact-info">
			    			<div className="info-card">
								<div className="info-topic">
									<i className="fa fa-mobile" aria-hidden="true"></i>	
									<span>Phone</span>
								</div>
								<div className="info">+977 9812375849</div>	
							</div>

							<div className="info-card">
								<div className="info-topic">
									<i className="fa fa-map-marker" aria-hidden="true"></i>
									<span>Address</span>
								</div>
								<div className="info">Bay Area, California</div>	
							</div>

							<div className="info-card">
								<div className="info-topic">
									<i className="fa fa-envelope" aria-hidden="true"></i>
									<span>Email</span>
								</div>
								<div className="info">imperialtime@gmail.com</div>	
							</div>
						</div>
			    	</div>
		    	</div>
	    	</section>
 		</>
    )
}

export default Contact



