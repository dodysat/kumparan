const express = require('express');
const router = express.Router();

const { get, store } = require("../controllers/ArticleController")
const { newArticleValidate } = require('../validators/ArticleValidator');


router.get('/', get);
router.post('/', newArticleValidate, store);


// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a article');
// });

// router.post('/', function (req, res, next) {
//   res.send('respond with a article');
// });

module.exports = router;
