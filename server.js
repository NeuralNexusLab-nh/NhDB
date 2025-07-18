const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.set("trust proxy", true);

app.post('/set', (req, res) => {
  const variable = req.body.var;
  const value = req.body.data;
  var db = fs.readFileSync('db.json', 'utf8');
  db = JSON.parse(db);
  db[variable].data = value;
  db = JSON.stringify(db);
  fs.writeFileSync('db.json', db);
  res.send(200);
});

app.post('/data', (req, res) => {
  const variable = req.body.var;
  var db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.send(db[variable].data);
});

app.listen(process.env.PORT, () => {console.log('server running at https://localhost.')});
