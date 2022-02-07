const router = require('express').Router();
const clanes = require('./clanes');
const guild = require('./guild');
const discord = require('./discord');
const auth = require('./auth');

router.use('/discord', discord);
router.use('/clanes', clanes);
router.use('/guild', guild);
router.use('/auth', auth);

// Default routes
router.get('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = router;