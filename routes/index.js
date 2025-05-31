const router = require('express').Router();

// Welcome message, we will delete this route latter
router.get('/', (req, res) => {
  //#swagger.tags=['Welcome Message']
  res.send('Welcome to Simple Events');
});

module.exports = router;
