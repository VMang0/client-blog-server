const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const app = express();

const getLocalizedData = (locale) => {
  const filePath = path.join(__dirname, `../data.${locale}.json`);
  return jsonServer.router(filePath);
};

const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public'),
});

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.use('/api', (req, res, next) => {
  const locale = req.query.locale || 'en';
  const router = getLocalizedData(locale);
  router(req, res, next);
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
