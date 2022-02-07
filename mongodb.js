const MongoClient = require("mongodb").MongoClient;
const mongodb = require('./config/config').mongodb;

let _db;
module.exports = {
  init: function(cb) {
    var mongoConn = "mongodb://";
    if (mongodb.user && mongodb.pwd) {
      mongoConn += mongodb.user + ":" + mongodb.pwd + "@";
    }
    mongoConn += mongodb.host;
    if (mongodb.port) {
      mongoConn += ":" + mongodb.port;
    }
    mongoConn += "/" + mongodb.db;
    MongoClient.connect(mongoConn, {
      connectTimeoutMS: 1800000,
      socketTimeoutMS: 1800000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err, client) => {
      _db = client.db(mongodb.db);
      _db['Clan'] = _db.collection('Clan');
      _db['Guild'] = _db.collection('Guild');
      _db['User'] = _db.collection('User');
      return cb(err, _db);
    });
  },

  getDb: function() {
    return _db;
  }
}