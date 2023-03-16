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
	deleteEmployee,
	sendMailFromContact
} = require('../controllers/authControllers.js');

const router = Router();

//auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword)
router.put('/password/change', isAuthenticated, changePassword);
router.get('/logout', isAuthenticated, logoutUser);
router.get('/profile', isAuthenticated, getUserProfile);
router.get('/user/:userId', isAuthenticated, getUserDetail);
router.put('/profile/update', isAuthenticated, updateProfile);
router.post('/send/email', sendMailFromContact);


//admin routes

router.get('/admin/users', isAuthenticated, isAdmin("admin"), getAllUsers);
router.route('/admin/users/:id').get(isAuthenticated, isAdmin("admin"), getSingleUser);
router.route('/admin/users/:id').put(isAuthenticated, isAdmin("admin"), updateUserRole);
router.route('/admin/users/:id').delete(isAuthenticated, isAdmin("admin"), deleteUser);

router.get('/admin/employees', isAuthenticated, isAdmin("admin"), getEmployees);
router.post('/admin/employee/new', isAuthenticated, isAdmin('admin'), addEmployee);
router.put('/admin/employee/update', isAuthenticated, isAdmin('admin'), updateEmployee);
router.delete('/admin/employee/:id', isAuthenticated, isAdmin("admin"), deleteEmployee);



module.exports = router;