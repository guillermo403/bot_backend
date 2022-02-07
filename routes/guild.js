const db = require('../mongodb').getDb();
const router = require('express').Router();

router.post('/staff', async (req, res) => {
  await db.Guild.updateOne(
    { _id: req.body.guild },
    { $set: {"staff": req.body.staff} }
  );
  res.sendStatus(200);
});

module.exports = router;