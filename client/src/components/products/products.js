import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

//importing components
import Spinner from '../spinner/spinner.js'
import Message from '../utils/message.js'

//importing css file
import './products.css'

//importing actions
import {addToCart} from '../../store/slices/cartSlice.js'
import {getProducts} from '../../store/slices/productSlice.js'

const Products = () => {
	const dispatch = useDispatch();
	const {keyword} = useParams();
	const {products, loading, productsCount, resultPerPage, filteredProductsCount} = useSelector(state => state.store)

	const [pageNumber, setPageNumber] = useState(0);

	const categories = ['All', 'Men', 'Women', 'Kids'];
	const [currentCategory, setCurrentCategory] = useState(categories[0]);

	const handleAddToCart = (product) => {
		dispatch(addToCart({
			id: product._id, 
			name: product.name, 
			price: product.price, 
			category: product.category,
			image: product.images[0].url, 
			stock: product.stock, 
			quantity: 1
		}))
	}
	
	const prevPage = () => {
		if(pageNumber > 0){
			setPageNumber(prevState => prevState - 1);     
		}
    }

	const nextPage = () => {
		if(pageNumber < Math.floor(productsCount/resultPerPage)){
       		setPageNumber(prevState => prevState + 1);    			
		}
    }

	useEffect(() => {
		dispatch(getProducts({keyword, pageNumber, currentCategory}));

	}, [dispatch, keyword, pageNumber, currentCategory]);

	return(
		<section className='store-section'>
			<div id='store' className="store-container">
				<div className="store-header">
					<h3>All Products</h3>
				</div>

				<ul className="store-filter">
				{
					categories.map(cat => {return <li className={currentCategory === cat ? "active" : ""} key={cat} 
							onClick={e => setCurrentCategory(cat)}>{cat}
						</li>
					})
				}
				</ul>

				{
					loading ? <Spinner style={{height: '50vh'}} /> : 
					!products.length || filteredProductsCount === 0 ? <Message style={{height:'75vh'}} message='Something went wrong. No products at the moment...' /> :
					<div className="store-items">
						{
							products.map(product => {
								return(
									<div className="store-item" key={product._id}>
					                    <Link to={`/product/${product._id}`} className='item-image-link'>
					                    	<img src={product.images[0].url} alt={product.images} />
					                    </Link>

					                    <div>
						                    <p>{product.name} - $ {product.price}</p>
									
						                    <Link to="/cart">
												<button className="store-cart-btn" disabled={product.stock < 1 ? true : false} onClick={() => handleAddToCart(product)}>Buy Now</button>
											</Link>
										</div>
					                </div>	
								)
							})
						}
					</div>
				}

				{
				resultPerPage < filteredProductsCount  ? (
					<div className='pagination'>
						<ul>
							<li onClick={() => setPageNumber(0)}>First</li>
							<li onClick={prevPage}><i className='fa fa-chevron-left'></i></li>
							<li onClick={nextPage}><i className='fa fa-chevron-right'></i></li>
							<li onClick={() => setPageNumber(Math.floor(filteredProductsCount/resultPerPage))}>Last</li>
						</ul>
					</div>
				) : (null)
			}
			</div>
		</section>
	);
}

export default Products