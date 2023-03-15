import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// import seo
import Seo from '../../seo/seo.js'

//import css
import './updateEmployee.css'

//import actions
import {updateEmployee} from '../../../store/slices/adminSlice.js'

const UpdateEmployee = ({currentEmployee, toggleUpdateEmployeeModel}) => {
    const id = currentEmployee._id;
    const [name, setName] = useState(currentEmployee.name);
    const [email, setEmail] = useState(currentEmployee.email);
    const [role, setRole] = useState(currentEmployee.role);

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.admin)

    const updateEmployeeHandler = (e) => {
        e.preventDefault();
        dispatch(updateEmployee({id, name, email, role}))
        toggleUpdateEmployeeModel();  
    };

    return (
        <div className='update-employee'> 
            <Seo title='Update employee' descripion='Admin page for uppdating employee.' />
            <form>
                <div>
                    <h2>Update Employee</h2>
                </div>

                <div>
                    <label>Name</label>
                    <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}></input>
                </div>

                <div>
                    <label>Email</label>
                     <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label>Role</label>
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option disabled value=''>Role</option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                        <option value='employee'>Employee</option>
                    </select>
                </div>
                <button type='submit' onClick={updateEmployeeHandler} disabled={loading ? true : false}>Update</button>      
            </form>

            <i className='fas fa-times' onClick={toggleUpdateEmployeeModel}></i>
        </div>
    );
}

export default UpdateEmployee;