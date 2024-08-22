const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const app = express();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public')
});

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});