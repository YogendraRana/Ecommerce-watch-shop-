import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

//import components
import Spinner from '../../spinner/spinner.js';
import AddEmployee from './addEmployee.js';
import UpdateEmployee from './updateEmployee.js';

// import seo
import Seo from '../../seo/seo.js'

//import css
import './adminEmployees.css'

//import actions
import {getEmployees, deleteEmployee, clearError, resetAdded, resetUpdated, resetDeleted} from '../../../store/slices/adminSlice.js' 

const AdminEmployees = () => {
	const [activeAddEmployee, setActiveAddEmployee] = useState(false);
	const [activeUpdateEmployee, setActiveUpdateEmployee] = useState(false);
	const [currentEmployee, setCurrentEmployee] = useState({});

	const {employees, error, loading, isAdded, isUpdated, isDeleted} = useSelector(state => state.admin);

	const dispatch = useDispatch();

	const toggleAddEmployeeModel = () => {
		setActiveAddEmployee(!activeAddEmployee);
	}

	const toggleUpdateEmployeeModel = () => {
		setActiveUpdateEmployee(!activeUpdateEmployee);
	}

	const deleteEmployeeHandler = (id) =>{
		dispatch(deleteEmployee(id));
	}

	useEffect(() => {
		dispatch(getEmployees());
		
		if(error){
			toast.error(error);
			dispatch(clearError());
		}

		if(isAdded){
		   toast.success('Employee added successfully!');
		   dispatch(resetAdded());
		}

      if(isUpdated){
         toast.success('Employee updated successfully!');
         dispatch(resetUpdated());
     	}

     	if(isDeleted){
         toast.success('Employee deleted successfully!');
         dispatch(resetDeleted());
      }
	}, [error, dispatch, isAdded, isUpdated, isDeleted])

	return(
		<>
			{activeAddEmployee && <AddEmployee toggleAddEmployeeModel={toggleAddEmployeeModel} />}
			{activeUpdateEmployee && <UpdateEmployee currentEmployee={currentEmployee} toggleUpdateEmployeeModel={toggleUpdateEmployeeModel} />}

			<Seo title='Admin - employees' descripion='Admin page for employees.' />
	
			<div className='employees-container'>
				<div className='employees-heading'>
					<h2>All Employees</h2>
					<div onClick={() => setActiveAddEmployee(!activeAddEmployee)}>
						<i className='fa fa-plus'></i>
						Add Employees
					</div>
				</div>

				<div className='employees'>
				{
					loading ? <Spinner style={{height: `100%`}} /> : (
						<ul>
							{
								employees.map((employee, index) => {
								return (
									<li key={index}>
										<div>
											<span>ID:</span> 
											<p>{employee._id}</p>
										</div>
										<div>
											<span>Name:</span> 
											<p>{employee.name}</p>
										</div>
										<div>
											<span>Email:</span> 
											<p>{employee.email}</p>
										</div>
										<div>
											<span>Role:</span> 
											<p>{employee.role}</p>
										</div>
										<div className='actions'>
											<div>
												<i className='fa fa-pen' onClick={() => {
													setCurrentEmployee(employee);
													toggleUpdateEmployeeModel();

												}}></i>
												<i className='fa fa-trash' onClick={() => deleteEmployeeHandler(employee._id)}></i>
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

export default AdminEmployees;