var express = require('express');
var router = express.Router();

/* GET note listing. */
router.get('/notes', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST an update */
router.post('/update', (req, res, next) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
