const { check, validationResult } = require('express-validator');

const newArticleValidate = [
  check('author')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Harus diisi'),

  check('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Harus diisi'),
  check('body')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Harus diisi'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let extractedErrors = {}
      errors.array().map(err => extractedErrors[err.param] = err.msg)
      return res.status(422).json({
        status: false,
        message: 'Periksa kembali inputan anda',
        data: {},
        errors: extractedErrors
      });
    }
    next();
  },
];
module.exports = {
  newArticleValidate
};
