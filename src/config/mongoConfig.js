//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const env = process.env.NODE_ENV == 'prod' ? 'prod' : 'prod';
const config = require(`./mongo.${env}`)
const connection_string = config.url
const connection_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 // poolSize: 100
};

const db_name = config.dbName

var mongodb = null;

module.exports = async () => {

  if (mongodb && mongodb != null)
    return mongodb;

  console.log('connecting mongodb ...');
  let client = mongoose.connect(connection_string, connection_options);
  console.log('mongodb connected!');
  //mongodb = client.db(db_name);
  return mongodb;
};
