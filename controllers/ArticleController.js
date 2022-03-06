const { mongoDB } = require('../modules/mongoDB');
const { elasticsearch } = require('../modules/elasticsearch');
const { redis } = require('../modules/redis');

const get = async (req, res) => {
  const { query, author } = req.query

  if (query || author) {
    let queryMust = []

    if (query) {
      queryMust.push({
        "bool": {
          "should": [
            { "match": { title: query } },
            { "match": { body: query } }
          ]
        }
      });
    }

    if (author) {
      queryMust.push({
        match: {
          author: author
        }
      });
    }
    try {
      const result = await elasticsearch.search({
        index: 'articles',
        sort: 'created:desc',
        query: {
          bool: { must: queryMust }
        }
      })

      const result_reduce = result.hits.hits.reduce((acc, curr) => {
        acc.push(curr._source)
        return acc
      }, [])

      if (result_reduce && result_reduce.length > 0) {
        return res.status(200).json({
          "status": true,
          "message": "",
          "data": result_reduce
        })
      } else {
        return res.status(404).json({
          "status": false,
          "message": "",
          "data": []
        })
      }

    } catch (error) {
      return res.status(404).json({
        "status": false,
        "message": "",
        "data": []
      })
    }

  } else {

    const articleKeys = await redis.keys("article:*");

    const allArticles = await Promise.all(articleKeys.map(async (key) => {
      const article = await redis.get(key);
      return JSON.parse(article);
    }));

    allArticles.sort((a, b) => {
      return a.created < b.created ? 1 : -1;
    });

    if (allArticles && allArticles.length > 0) {
      return res.status(200).json({
        "status": true,
        "message": "",
        "data": allArticles
      })
    } else {
      return res.status(404).json({
        "status": false,
        "message": "",
        "data": []
      })
    }
  }
}

const store = async (req, res) => {
  const { author, title, body } = req.body;

  const database = mongoDB.db('kumparan');
  const articles = database.collection('articles');
  const created = new Date();

  const doc = {
    author,
    title,
    body,
    created,
  }
  const response = await articles.insertOne(doc);

  const insertedDocument = {
    id: response.insertedId,
    author,
    title,
    body,
    created,
  }

  await elasticsearch.index({
    index: 'articles',
    document: insertedDocument
  })

  await redis.set(`article:${response.insertedId}`, JSON.stringify(insertedDocument));

  return res.status(200).json({
    "status": true,
    "message": "",
    "data": {
      id: response.insertedId,
      author,
      title,
      body,
      created,
    }
  })
}

module.exports = {
  get,
  store
};