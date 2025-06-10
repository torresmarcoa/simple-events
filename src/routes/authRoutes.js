const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google login
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs'); // or frontend
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
