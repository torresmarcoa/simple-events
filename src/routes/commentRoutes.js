const router = require('express').Router();
const commentController = require('../controllers/commentController');
const { commentValidationRules, validateComment } = require('../middlewares/commentValidator');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.post('/', isAuthenticated, commentValidationRules, validateComment, commentController.createComment);
router.put('/:id', commentValidationRules, validateComment, commentController.updateComment);
router.delete('/:id', isAuthenticated, commentController.deleteComment);

module.exports = router;
