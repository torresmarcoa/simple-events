const router = require('express').Router();
const userController = require('../controllers/userController');
const { userValidationRules, validateUser } = require('../middlewares/userValidator');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', userValidationRules(), validateUser, userController.createUser);

router.put('/:id', isAuthenticated, userValidationRules(), validateUser, userController.updateUser);

router.get('/', userController.getAllUsers);

router.get('/role/:roleName', userController.getUsersByRole);

router.get('/:id', userController.getUserById);

router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
