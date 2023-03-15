import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './addProduct.css'

// import actions
import {addProduct} from '../../../store/slices/adminSlice.js'

const AddProduct = ({toggleAddProductModel}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [discount, setDiscount] = useState(null);

    const dispatch = useDispatch();

    const addProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(old => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const handleAddProductSubmit = (e) => {
        e.preventDefault();

        if(name === '' || price === 0 || stock === 0 || category === '' || description === '' || images.length===0){
            return toast.warn('Please, fill in all the required fields.');
        }

        if(discount >= 100) return toast.warn(`Are you sure discound is ${discount} %?`);

        dispatch(addProduct({name, price, stock, category, description, images, discount}));
        toggleAddProductModel();
    };

    return (
        <div className='add-product'>
            <Seo title='Add Product' description='Admi page for adding new product.' />
            <form onSubmit={handleAddProductSubmit}>
                <h2>New Product</h2>
                
                <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} required></input>
                
                <input type='number' placeholder='Price' onChange={e => setPrice(e.target.value)} required></input>
                
                <input type='number' placeholder='Stock' onChange={e => setStock(e.target.value)} required></input>
                
                <select value={category} onChange={e => setCategory(e.target.value)} required>
                    <option disabled value=''>Category</option>
                    <option value='Men'>Men</option>
                    <option value='Women'>Women</option>
                    <option value='Kids'>Kids</option>
                </select>        

                <input type='number' placeholder='Discount' onChange={e => setDiscount(e.target.value)}/>
                
                <textarea placeholder='Write the description here...' value={description} onChange={e => setDescription(e.target.value)} required></textarea> 

                <input type="file" name="image" accept='image/*' multiple onChange={addProductImageChange} />
                
                <div className='product-images' style={{display: images.length === 0 ? 'none' : 'flex'}}>
                    {images.map((image, index) => {
                        return <img src={image} key={index} alt='product-pic' />
                    })}
                </div>

                <button type='submit' onClick={handleAddProductSubmit}>Submit</button>      
            </form>

            <i className='fas fa-times' onClick={toggleAddProductModel}></i>
        </div>
    );
}

export default AddProduct;