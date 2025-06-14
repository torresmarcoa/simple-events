const router = require('express').Router();
const commentController = require('../controllers/commentController');
const { commentValidationRules, validateComment } = require('../middlewares/commentValidator');
const { isAuthenticated } = require('../middlewares/authMiddleware');

/**
 * ============================================
 * 🔐 ROUTE PROTECTION NOTICE
 * ============================================
 * If you want to protect any route (e.g. limit to logged-in users),
 * make sure to add the `isAuthenticated` middleware like this:
 *
 *    router.get('/your-protected-route', isAuthenticated, yourControllerFunction);
 *
 * This ensures only authenticated users can access the route.
 *
 * You can find the `isAuthenticated` middleware in: 
 *    middleware/authMiddleware.js  (or wherever it's defined)
 *
 * Don't forget to apply it consistently across routes that need protection!
 * ============================================
 */
router.post('/', isAuthenticated, commentController.createComment);

router.get('/', commentController.getAllComments);

router.get('/:id', commentController.getCommentById);

router.put('/:id', isAuthenticated, commentValidationRules(), validateComment, commentController.updateComment);

router.delete('/:id', isAuthenticated, commentController.deleteComment);

module.exports = router;
