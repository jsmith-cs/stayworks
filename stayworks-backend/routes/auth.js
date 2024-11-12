const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', auth, async (req, res) => {
  try {
    res.json({ id: req.user.id });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;