const router = require('express').Router();
const passport = require('passport');
const { getUser } = require('../utils/api');

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate("discord", {
  successRedirect: 'http://localhost:8080/login/346667985521475595',
  failureRedirect: 'http://localhost:8080/home'
}));

router.post('/user', async (req, res) => {
  let id = req.body.id;
  let user = await getUser(id);
  res.send(user);
});

module.exports = router;