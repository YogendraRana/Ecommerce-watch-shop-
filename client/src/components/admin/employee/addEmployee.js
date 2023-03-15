import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './addEmployee.css'

//import actions
import {addEmployee} from '../../../store/slices/adminSlice.js'

const AddEmployee = ({toggleAddEmployeeModel}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [role, setRole] = useState('');

    const dispatch = useDispatch();

    const addEmployeeHandler = (e) => {
        e.preventDefault();

        if(name === '' || email === '' || password === '' || cpassword === '' || role === ''){
            return toast.warn('Please, fill in all the fields.')
        }

        if(password !== cpassword){
            return toast.warn('Password do not match!');
        }

        dispatch(addEmployee({name, email, password, cpassword, role}));
        
        toggleAddEmployeeModel();

    };

    return (
        <div className='add-employee'> 
            <Seo title='Add Employee' descripion='Admin page for adding new employee.' />
            <form>
                <h2>Add Employee</h2>
                <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} autoComplete="off" required></input>
                <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" required></input>
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" required></input>
                <input type='password' placeholder='Confirm Password' value={cpassword} onChange={e => setCpassword(e.target.value)} autoComplete="off" required></input>      
                <select value={role} onChange={e => setRole(e.target.value)} autoComplete="off" required>
                    <option disabled value=''>Role</option>
                    <option value='admin'>Admin</option>
                    <option value='employee'>Employee</option>
                </select>
                <button type='submit' onClick={addEmployeeHandler}>Add</button>      
            </form>

            <i className='fas fa-times' onClick={toggleAddEmployeeModel}></i>
        </div>
    );
}

export default AddEmployee;