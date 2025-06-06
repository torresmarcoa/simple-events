const router = require('express').Router();
const userController = require('../controllers/userController');
const { userValidationRules, validateUser } = require('../middlewares/userValidator');

router.post('/', userValidationRules(), validateUser, userController.createUser);

router.put('/:id', userValidationRules(), validateUser, userController.updateUser);

router.get('/', userController.getAllUsers);

router.get('/role/:roleName', userController.getUsersByRole);

router.get('/:id', userController.getUserById); 

module.exports = router;
