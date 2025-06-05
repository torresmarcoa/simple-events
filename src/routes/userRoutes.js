const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

module.exports = router;
