const axios = require('axios');
const token = require('../config/config').bot.token;
const db = require('../mongodb').getDb();

const getGuilds = async () => {
  return new Promise((resolve, reject) => {
    axios.get('http://discord.com/api/v6/users/@me/guilds', {
      headers: {
        Authorization: 'Bot ' + token
      }
    })
    .then((res) => {
      resolve(res.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

const getRoles = async (guild) => {
  return new Promise((resolve, reject) => {
    axios.get('http://discord.com/api/v6/guilds/'+guild+'/roles', {
      headers: {
        Authorization: 'Bot ' + token
      }
    })
    .then((res) => {
      resolve(res.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

const getCategories = async (guild) => {
  return new Promise((resolve, reject) => {
    axios.get('http://discord.com/api/v6/guilds/'+guild+'/channels', {
      headers: {
        Authorization: 'Bot ' + token
      }
    })
    .then((res) => {
      let categories = res.data.filter((channel) => {
        return channel.type == 4;
      });
      resolve(categories);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

const getUser = async (id) => {
  let user = await db.User.findOne({ _id: id });
  let botGuilds = await getGuilds();
  user.guilds = user.guilds
    .filter((guild) => {
      return botGuilds.find((botGuild) => botGuild.id === guild.id) && (guild.permissions && 0x20) == 0x20;
    });
  return user;
}

module.exports = { getGuilds, getUser, getRoles, getCategories };