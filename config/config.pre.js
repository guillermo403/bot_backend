module.exports = {
  port: 9000,
  bot: {
    token: "ODM1ODkyNDQyMDI4ODM0ODU2.YIWDgA.mb8eIKjbUrgL4x1BVM73LNdyIQI",
    clientId: "835892442028834856",
    clientSecret: "o_-2MbyMOi1p7LpxJj-h8iW2Kg3s6Erh",
    callbackUrl: 'http://localhost:9000/api/auth/redirect'
  },
  mongodb   : {
    host    : 'localhost',
    port    :  27017,
    db      : 'bot',
  },
  logs          : {
    rotates     : 10,
    maxLogSize  : 2000000,
    level       : 'INFO'
  }
}