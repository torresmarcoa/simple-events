const router = require('express').Router();

// Welcome message, we will delete this route latter
router.get('/', (req, res) => {
  //#swagger.tags=['Welcome Message']
  res.send('Welcome to Simple Events');
});

router.use('/', require('./swagger'));

router.use('/users', require('./userRoutes'));
router.use('/events', require('./eventRoutes'));

module.exports = router;
