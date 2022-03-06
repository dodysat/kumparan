const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).json({
    "status": true,
    "message": "API Ready to use",
    "data": {}
  })
});

module.exports = router;
