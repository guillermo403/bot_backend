const { clientId, clientSecret, callbackUrl } = require('../config/config').bot;
const passport = require('passport');
const { Strategy } = require('passport-discord');
const db = require('../mongodb').getDb();
const logger = require('../logger');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.User.findOne({ _id: id });
  done(null, user);
});

passport.use(new Strategy({
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: callbackUrl,
  scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let userObj = {
      _id: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      guilds: profile.guilds
    }
    await db.User.replaceOne(
      { _id: profile.id },
      userObj,
      { upsert: true }
    );

    done(null, userObj);
  } catch(error) {
    logger.error(error.message);
    return done(error, null);
  }
}));