const {Router} = require('express');
const {isAuthenticated, isAdmin} = require('../middleware/authMiddleware.js');
const {
	registerUser, 
	loginUser, 
	logoutUser, 
	forgotPassword, 
	resetPassword, 
	changePassword,
	getUserDetail, 
	getUserProfile, 
	updateProfile,
	getAllUsers,
	getSingleUser,
	updateUserRole,
	deleteUser,
	getEmployees,
	addEmployee,
	updateEmployee,
	deleteEmployee
} = require('../controllers/authControllers.js');

const router = Router();

//auth routes
router.post('/api/v1/register', registerUser);
router.post('/api/v1/login', loginUser);
router.post('/api/v1/password/forgot', forgotPassword);
router.put('/api/v1/password/reset/:token', resetPassword)
router.put('/api/v1/password/change', isAuthenticated, changePassword);
router.get('/api/v1/logout', isAuthenticated, logoutUser);
router.get('/api/v1/profile', isAuthenticated, getUserProfile);
router.get('/api/v1/user/:userId', isAuthenticated, getUserDetail);
router.put('/api/v1/profile/update', isAuthenticated, updateProfile);


//admin routes

router.get('/api/v1/admin/users', isAuthenticated, isAdmin("admin"), getAllUsers);
router.route('/api/v1/admin/users/:id').get(isAuthenticated, isAdmin("admin"), getSingleUser);
router.route('/api/v1/admin/users/:id').put(isAuthenticated, isAdmin("admin"), updateUserRole);
router.route('/api/v1/admin/users/:id').delete(isAuthenticated, isAdmin("admin"), deleteUser);

router.get('/api/v1/admin/employees', isAuthenticated, isAdmin("admin"), getEmployees);
router.post('/api/v1/admin/employee/new', isAuthenticated, isAdmin('admin'), addEmployee);
router.put('/api/v1/admin/employee/update', isAuthenticated, isAdmin('admin'), updateEmployee);
router.delete('/api/v1/admin/employee/:id', isAuthenticated, isAdmin("admin"), deleteEmployee);



module.exports = router;