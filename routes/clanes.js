const db = require('../mongodb').getDb();
const router = require('express').Router();

router.post('/permissions', async (req, res) => {
  let guild = req.body.guild;
  let dbguild = await db.Guild.findOne({ _id: guild });
  let dbTextPermissions = dbguild.config.clanes.text.permissions;
  let dbVoicePermissions = dbguild.config.clanes.voice.permissions;
  req.body.textPermissions.forEach((permission) => {
    if (permission.id == '') {
      return;
    }
    if (dbTextPermissions.some((p) => { return p.id == permission.id })) {
      db.Guild.updateOne(
        { _id : guild, "config.clanes.text.permissions.id": permission.id },
        { $set: { "config.clanes.text.permissions.$.allow": permission.allow } }
      )
    } else {
      db.Guild.updateOne(
        { _id: guild },
        { $push: { "config.clanes.text.permissions": permission } }
      );
    }
  });

  req.body.voicePermissions.forEach((permission) => {
    if (permission.id == '') {
      return;
    }
    if (dbVoicePermissions.some((p) => { return p.id == permission.id })) {
      db.Guild.updateOne(
        { _id : guild, "config.clanes.voice.permissions.id": permission.id },
        { $set: { "config.clanes.voice.permissions.$.allow": permission.allow } }
      )
    } else {
      db.Guild.updateOne(
        { _id: guild },
        { $push: { "config.clanes.voice.permissions": permission } }
      );
    }
  });
  res.sendStatus(200);
});

router.post('/lider', async (req, res) => {
  await db.Guild.updateOne(
    { _id: req.body.guild },
    { $set: {"config.clanes.lider": req.body.lider} }
  );
  res.sendStatus(200);
});

router.post('/extraRoles', async (req, res) => {
  await db.Guild.updateOne(
    { _id: req.body.guild },
    { $set: {"config.clanes.extraRoles": req.body.extraRoles} }
  );
  res.sendStatus(200);
});

router.post('/parent', async (req, res) => {
  await db.Guild.updateOne(
    { _id: req.body.guild },
    { $set:
      {
        "config.clanes.text.parent": req.body.textParent,
        "config.clanes.voice.parent": req.body.voiceParent,
      }
    }
  );
  res.sendStatus(200);
});

module.exports = router;