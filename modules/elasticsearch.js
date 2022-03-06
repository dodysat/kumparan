const { Client } = require('@elastic/elasticsearch')
const elasticsearch = new Client({ node: process.env.URL_ELASTICSEARCH || 'http://localhost:9200' });

module.exports = {
  elasticsearch,
}
