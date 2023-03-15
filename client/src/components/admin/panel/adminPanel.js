import React, {useState} from 'react';

// import components
import AdminDashboard from '../dashboard/adminDashboard.js'
import AdminProducts from '../product/adminProducts.js'
import AdminUsers from '../user/adminUsers.js'
import AdminEmployees from '../employee/adminEmployees.js'
import AdminOrders from '../order/adminOrders.js'

//import css
import './adminPanel.css'

const AdminPanel = () => {

	const [currentMenu, setCurrentMenu] = useState('dashboard');

	const sidebar = [
		{title: 'dashboard', icon: <i className="fas fa-home"></i>},
		{title: 'products', icon: <i className="fas fa-shopping-bag"></i>},
		{title: 'users', icon: <i className="fas fa-users"></i>},
		{title: 'employees', icon: <i className="fas fa-user"></i>},
		{title: 'orders', icon: <i className="fas fa-bags-shopping"></i>}
	];
	
	return(
		<>
			<div className='admin-panel'>
				<div className='admin-sidebar'>
					<div className='admin-sidebar-heading'>Admin Panel</div>
				 	<ul>
				 		{sidebar.map((menu, index) => {
				 			return(
					 			<li key={index} 
					 				onClick={() => setCurrentMenu(menu.title)}
					 				className={currentMenu === menu.title ? "active" : ""}
					 			>
					 				{menu.icon}
					 				<p>{menu.title}</p>
					 			</li>
				 			)
				 		})}
					</ul>
				</div>

				<div className='admin-panel-content'>
					{currentMenu === 'dashboard' && <AdminDashboard />}
					{currentMenu === 'products' && <AdminProducts />}
					{currentMenu === 'users' && <AdminUsers />}
					{currentMenu === 'employees' && <AdminEmployees />}
					{currentMenu === 'orders' && <AdminOrders />}
				</div>
			</div>
		</>
	)
};

export default AdminPanel;