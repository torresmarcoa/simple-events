const router = require('express').Router();
const userController = require('../controllers/userController');
const { userValidationRules, validateUser } = require('../middlewares/userValidator');

router.post('/', userValidationRules(), validateUser, userController.createUser);

router.put('/:id', userValidationRules(), validateUser, userController.updateUser);

module.exports = router;
