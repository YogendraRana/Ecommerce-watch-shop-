import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './updateOrder.css'

//import actions
import {updateOrder} from '../../../store/slices/adminSlice.js'

const UpdateOrder = ({currentOrder, toggleUpdateOrderModel}) => {
    const id = currentOrder._id;
    const [status, setStatus] = useState('');
  
    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.admin)

    const updateOrderHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder({id, status}))
        toggleUpdateOrderModel();   
    };

    return (
        <div className='update-order'>
            <Seo title='Update order' descripion='Admin page for updating order.' />
            <form>
                <h2>Update Order</h2>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option disabled value=''>Order Status</option>
                    <option disabled={currentOrder.orderStatus !== 'processing'} value='shipped'>Shipped</option>
                    <option disabled={currentOrder.orderStatus !== 'shipped'} value='delivered'>Delivered</option>}
                </select>
                <button type='submit' onClick={updateOrderHandler} disabled={loading ? true : false || status === ''}>Update</button>      
            </form>

            <i className='fas fa-times' onClick={toggleUpdateOrderModel}></i>
        </div>
    );
}

export default UpdateOrder;