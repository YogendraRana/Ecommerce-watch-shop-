import React from 'react'

//importing components
import Card from '../card/card'
import Message from '../utils/message.js'

//importing Category.css
import './category.css'

const Category = ({name, products, prev, next, count, show, loading}) => {	

	return(
		<section className='category-section'>
			<div className="category-container">
				<div className="head">
					<div className="category-title">
						<h3>{name}</h3>
					</div>

					<div className="arrows">
						<div className={count === 0 ? "arrow-left not-active" : "arrow-left"} onClick={prev}>
							<i className="fa fa-arrow-left" aria-hidden="true"></i>
						</div>
						<div className={products.length - count === show ? "arrow-right not-active" : "arrow-right"} onClick={next}>
							<i className="fa fa-arrow-right" aria-hidden="true"></i>
						</div>
					</div>
				</div>
	 
				<div className="category-slider" style={{height: (loading || products.length === 0) ? '30rem' : '50rem'}}>
					{
						products.length === 0 ? <Message style={{height:'30rem'}} message="Loading..." /> : 
						products.map((product, index) => (
							<Card key={index} product={product} count={count} show={show} />
						))
					}
				</div>		
			</div>
		</section>
	)
}

export default Category