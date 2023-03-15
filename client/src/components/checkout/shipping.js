import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../seo/seo.js'

//import css
import './shipping.css'

// impport actions
import {saveShippingInfo} from '../../store/slices/checkoutSlice.js'

const Shipping = ({nextStep, currentStep, orderSubtotal, shippingCharge, tax, grandTotal}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [shipping, setShipping] = useState({name: '', address_line1: '', address_line2: '', phoneNo: '', email: '', city: '', province: ''});

	const handleChange = (e) => setShipping({...shipping, [e.target.name]: e.target.value});
	const returnToCart = (e) => history.push('/cart');

    const orderData = {orderSubtotal, shippingCharge, tax, grandTotal};
    	
	const handleShippingSubmit = async (e) => {
		e.preventDefault();

		const {name, address_line1, phoneNo, city, province} = shipping;

		if(phoneNo.length < 10 || phoneNo.length > 10){
			toast.warn('Phone number should be of 10 digits.')
			return;
		}

		if(name==='' || address_line1==='' || phoneNo==='' || city==='' || province===''){
			toast.warn('Please fill in all the necessary fields');
			return;
		}

		dispatch(saveShippingInfo({...shipping}));

		sessionStorage.setItem("orderInfo", JSON.stringify(orderData));

		nextStep();
	};


	return(
		<>
			<Seo title='Checkout - shipping' descripion='Checkout page for collectiong shipping information.'/>

			<div className='shipping-container'>
				<form onSubmit={handleShippingSubmit}>
					<div className='row-1'>
						<div>
							<label>Receiver's Name</label>
							<input type="text" name='name' placeholder="Required" value={shipping.name} onChange={handleChange} autoComplete='off' required />
						</div>

						<div>
							<label>Contact Number</label>
							<input type="number" name='phoneNo' placeholder="Required" value={shipping.phoneNo} onChange={handleChange} autoComplete='off' required />
						</div>

						<div>
							<label>Email Address</label>
							<input type="text" name='email' placeholder="Optional" value={shipping.email} onChange={handleChange} autoComplete='off' />
						</div>
					</div>

					<div className='row-2'>
						<div>
							<label>Select Province</label>
							<select name='province' value={shipping.province} onChange={handleChange} required>
								<option value='' disabled>Province</option>
								<option value='Province 1'>Province 1</option>
							    <option value='Province 2'>Province 2</option>
							    <option value='Province 3'>Province 3</option>
							    <option value='Province 4'>Province 4</option>
							    <option value='Province 5'>Province 5</option>
							    <option value='Province 6'>Province 6</option>
							    <option value='Province 7'>Province 7</option>
							</select>
						</div>

						<div>
							<label>City</label>
							<input type="text" name='city' placeholder="Required" value={shipping.city} onChange={handleChange} autoComplete='off' required />
						</div>

						<div>
							<label>Address 1</label>
							<input type="text" name='address_line1' placeholder="Required" value={shipping.address_line1} onChange={handleChange} autoComplete='off' required />
						</div>

						<div>
							<label>Address 2</label>
							<input type="text" name='address_line2' placeholder="Optional" value={shipping.address_line2} onChange={handleChange} autoComplete='off' />
						</div>
					</div>

					<div className='shipping-btns'>
						<button type='button' onClick={returnToCart}>Return to Cart</button>
						<button type='submit'>Next</button>
					</div>
				</form>
			</div>
		</>
	)
};

export default Shipping;