import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './updateProduct.css'

//import actions
import {updateProduct} from '../../../store/slices/adminSlice.js'

const UpdateProduct = ({currentProduct, toggleUpdateProductModel}) => {
    const id = currentProduct._id;
    const [name, setName] = useState(currentProduct.name);
    const [price, setPrice] = useState(currentProduct.price);
    const [stock, setStock] = useState(currentProduct.stock);
    const [discount, setDiscount] = useState(currentProduct.discount);
    const [category, setCategory] = useState(currentProduct.category);
    const [description, setDescription] = useState(currentProduct.description);
    const [images, setImages] = useState([]);

    const [updateImage, setUpdateImage] = useState(false);

    const dispatch = useDispatch();

    const updateProductImageChange = (e) => {
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
    }

    const handleUpdateProductSubmit = (e) => {
        e.preventDefault();

        if(name === '' || price === 0 || stock === 0 || category === '' || description === ''){
            return toast.warn('Please, fill in all the required fields.');
        }

        if(discount >= 100){
            return toast.warn(`Are you sure discount is ${discount}% ?`);
        }

        dispatch(updateProduct({id, name, price, stock, category, description, images, discount}));
        toggleUpdateProductModel();
        
    };

    return (
        <div className='update-product'> 
            <Seo title='Update Product' descripion='Admin page for updating products.' />
            <form>
                <div>
                    <h2>Update Product</h2>
                </div>
                
                <div>
                    <label>Name</label>
                    <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}></input>
                </div>

                <div>
                    <label>Price</label>
                    <input type='number' placeholder='Price' value={price} onChange={e => setPrice(e.target.value)}></input>
                </div>

                <div>
                    <label>Stock</label>
                    <input type='number' placeholder='Stock' value={stock} onChange={e => setStock(e.target.value)}></input>
                </div>

                <div>
                    <label>Discount</label>
                    <input type='number' placeholder='Discount' value={discount} onChange={e => setDiscount(e.target.value)}/>
                </div>

               <div>
                    <label>Category</label>
                     <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option disabled value=''>Category</option>
                        <option value='Men'>Men</option>
                        <option value='Women'>Women</option>
                        <option value='Kids'>Kids</option>
                    </select>
                </div> 

                <div>
                    <label>Description</label>
                     <textarea placeholder='Write the descroption here...' value={description} onChange={e => setDescription(e.target.value)}></textarea> 
                </div>
                
                {
                    updateImage && 
                    <div>
                        <label>Image</label>
                        <input type="file" name="image" accept='image/*' multiple onChange={updateProductImageChange} />
                    </div>
                }

                {
                    updateImage && 
                    <div style={{display: images.length === 0 ? 'none' : 'flex'}}>
                        <label>Preview</label>
                        <div className='update-product-images'>
                            {images.map((image, index) => {return <img src={image} key={index} alt='product-pic' />})}
                        </div>
                    </div>
                }

                <div className='update-product-btns'>
                    <button type='button' onClick={() => {
                        if(images.length !==0){
                            setImages([]);
                        }
                        setUpdateImage(!updateImage)
                    }}>{(images.length === 0) ? 'Update Image' : 'Clear Image'}</button>    
                    <button type='submit' onClick={handleUpdateProductSubmit}>Submit</button>    
                </div>
                  
            </form>

            <i className='fas fa-times' onClick={toggleUpdateProductModel}></i>
        </div>
    );
}

export default UpdateProduct;