const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
  res.send('Hello world, from Tampa, Florida airport')
})

app.listen(8000, () => {
  console.log('app is listening on port 8000')
})
 


