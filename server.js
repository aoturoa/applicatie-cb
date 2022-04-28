const express = require('express');
const app = express()

app.use(express.static('component-library'));

app.get('/', (req, res) => {} );

app.listen(3000, () => {
  console.log('Server started, at port 3000');
})