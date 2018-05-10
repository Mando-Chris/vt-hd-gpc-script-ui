var express = require('express');
var router = express.Router();
// TEMPORARY LOCATION FOR THIS CODE
const io = require('socket.io')();
io.on('connection', (client) => {
  // If we felt like it would could take an action when a client connects
});
const port = 8000;
io.listen(port);

/* GET note listing. */
router.get('/notes', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST an update */
router.post('/update', (req, res, next) => {
  io.emit('update',req.body);
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
