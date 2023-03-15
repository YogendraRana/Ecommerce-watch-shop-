import React from 'react'
import {FacebookShareButton, TwitterShareButton, EmailShareButton} from 'react-share'

// import seo
import Seo from '../seo/seo.js'

//import css
import './socialModal.css'

const SocialModal = ({toggleSociaModal, product}) => {
	let url = window.location.href;

	if(!url.includes('product')){
		url = url+'product/'+product._id;
	}

	return (
		<div className="share-modal">
			<Seo title='Share Page' descripion='Page for sharing products on social media platform.' />
			
			<div className="modal-links">
				<FacebookShareButton url={url} className="icon facebook">
					<p>Facebook</p>
					<span><i className="fab fa-facebook-f"></i></span>
				</FacebookShareButton>
				
				<div className="icon instagram">
					<p><del>Instagram</del></p>
					<span><i className="fab fa-instagram"></i></span>
				</div>
				
				<TwitterShareButton url={url} className="icon twitter">
					<p>Twitter</p>
					<span><i className="fab fa-twitter"></i></span>
				</TwitterShareButton>
				
				<div className="icon messenger">
					<p><del>Messenger</del></p>
					<span><i className="fab fa-facebook-messenger"></i></span>
				</div>
				
				<EmailShareButton url={url} className="icon mail">
					<p>Mail</p>
					<span><i className="fas fa-envelope"></i></span>
				</EmailShareButton>
			</div>
			<div className="social-modal-close" onClick={toggleSociaModal}>
				<i className="fas fa-times"></i>
			</div>
		</div>
	)
}

export default SocialModal;