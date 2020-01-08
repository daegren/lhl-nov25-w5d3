const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const db = require('./database');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

const projectRoutes = require('./routes/projects')(db);
app.use('/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
