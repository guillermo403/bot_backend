const router = require('express').Router();
const { getGuilds, getRoles, getCategories } = require('../utils/api');

router.get('/guilds', async (req, res) => {
  let guilds = await getGuilds();
  res.send(guilds);
});

router.post('/categories', async (req, res) => {
  let guild = req.body.guild;
  let categories = await getCategories(guild);
  res.send(categories);
});


router.post('/roles', async (req, res) => {
  let guild = req.body.guild;
  let roles = await getRoles(guild);
  res.send(roles);
});

module.exports = router;