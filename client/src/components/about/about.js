import React from 'react';
import { Link } from 'react-router-dom'

// import seo
import Seo from '../seo/seo.js'

//importing css
import './about.css';

const About = () => {
	return (
		<>
			<Seo title='About Page' descripion='About page of Time Zn' />

			<section className="about-section">
				<div className='about-container'>
					<div>About Us</div>
					
					<h3>Our Story</h3>
	            	<p>
	            		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa ultrices non. 
	            		Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. 
	            		Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
	            		Maecenas varius egestas diam, eu sodales metus scelerisque congue.          		
	            	</p>

	            	<h3>Our Goals</h3>
	            	<p>
	            		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	            		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
	            		Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	            	</p>

	            	<h3>Our Specialities</h3>
	            	<p>
	            		Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
	            		Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
	            		It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
	            	</p>

	            	<p>
	            		Any questions? Please contact us and let us know.
	            	</p>
				
					<Link to="/contact">Contact</Link>			
				</div>	
			</section>
		</>
	);
}

export default About;
