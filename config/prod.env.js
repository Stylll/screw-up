'use strict'
require('dotenv').config();

module.exports = {
  NODE_ENV: '"production"',
  APIKEY:'"'+process.env.APIKEY+'"',
  AUTHDOMAIN:'"'+process.env.AUTHDOMAIN+'"',
  DATABASEURL:'"'+process.env.DATABASEURL+'"',
  STORAGEBUCKET:'"'+process.env.STORAGEBUCKET+'"'
}
