var express = require('express');
var app = express();
app.listen(3200, () => {
  console.log(`Server is listening on port 3200`);
});
module.exports = app;
