import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

//import components
import Spinner from '../../spinner/spinner.js';
import AddProduct from './addProduct.js'
import UpdateProduct from './updateProduct.js'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './adminProducts.css'

//import actions
import {getAdminProducts, deleteProduct, clearError, resetDeleted, resetAdded, resetUpdated} from '../../../store/slices/adminSlice.js' 

const AdminProducts = () => {
	const [activeAddProduct, setActiveAddProduct] = useState(false);
	const [activeUpdateProduct, setActiveUpdateProduct] = useState(false);
	const [currentProduct, setCurrentProduct] = useState({});

	const {error, adminProducts, loading, isDeleted, isAdded, isUpdated} = useSelector(state => state.admin);

	const dispatch = useDispatch();

	const toggleAddProductModel = () => {
		setActiveAddProduct(!activeAddProduct);
	}

	const toggleUpdateProductModel = () => {
		setActiveUpdateProduct(!activeUpdateProduct);
	}

	const deleteProductHandler = (id) => {
		dispatch(deleteProduct(id))
	}

	useEffect(() => {
		dispatch(getAdminProducts());
		
		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(isAdded){
			toast.success('Product added successfully!');
			dispatch(resetAdded());
		}

		if(isUpdated){
			toast.success('Product updated successfully!');
			dispatch(resetUpdated());
		}

		if(isDeleted){
			toast.success('Product deleted successfully!');
			dispatch(resetDeleted());
		}
	}, [dispatch, error, isDeleted, isAdded, isUpdated])

	return(
		<>
			{activeAddProduct && <AddProduct toggleAddProductModel={toggleAddProductModel} />}
			{activeUpdateProduct && <UpdateProduct currentProduct={currentProduct} toggleUpdateProductModel={toggleUpdateProductModel} />}

			<Seo title='Admin - products' descripion='Admin page for products.' />
			
			<div className='products-container'>
			
				<div className='products-heading'>
					<h2>All Products</h2>
					<div onClick={toggleAddProductModel}>
						<i className='fa fa-plus'></i>
						Add Product
					</div>
				</div>

				<div className='products'>
				{
					loading ? <Spinner style={{height: `100%`}} /> : (
						<ul>
							{adminProducts.map((product, index) => {
								return (
									<li key={index}>
										<div>
											<img src={product.images[0].url} alt={product.images[0].url} />
											<div>
												<p>{product.name}</p>
												<p>{product.price}</p>
											</div>
										</div>
										<div>
											<span>Stock: </span>
											<p>{product.stock}</p>
										</div>
										<div>
											<span>Category: </span>
											<p>{product.category}</p>
										</div>
										<div className='actions'>
											<div>
												<i className='fa fa-pen' onClick={() => {
													setCurrentProduct(product);
													toggleUpdateProductModel();
												}}></i>
												<i className='fa fa-trash' onClick={() => deleteProductHandler(product._id)}></i>
											</div>
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

export default AdminProducts;