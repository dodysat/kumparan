const { MongoClient } = require('mongodb');
const uri = process.env.URL_MONGO || "mongodb://root:root@localhost:27017/kumparan?authSource=admin";
const mongoDB = new MongoClient(uri);
mongoDB.connect();

module.exports = {
  mongoDB
}