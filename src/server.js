const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser())

const users = [
  { id: 1, name: 'zo', password: 'abc' },
  { id: 2, name: 'maya', password: 'abc' },
]

const publicDir = path.join(__dirname, '..', 'public');
const staticAssets = express.static(publicDir);
app.use(staticAssets);

let count = 0;

app.get('/size', (req, res) => {
  // generate an absolutely massive 1mb json object and then send it
  const size = 1024 * 1024;
  const data = new Array(size).fill('a');
  res.send({ data });
})

app.get('/count', function (req, res) {
  console.log(req.cookies);

  let count = (Number(req.cookies.count) + 1) || 1;

  res.cookie('count', count)
  res.cookie('test', 'HIIII')

  count++;
  res.send({ count });
})

app.delete('/count', (req, res) => {
  console.log(req.cookies);
  // res.clearCookie('count')
  res.send({ count: 0 })
})

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Up! http://localhost:${port}`));
