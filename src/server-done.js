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

app.get('/count', function (req, res) {
  console.log(req.cookies);

  let count = (Number(req.cookies.count) + 1) || 1;

  res.cookie('count', count)

  res.send({ count });
})

app.delete('/count', (req, res) => {
  res.clearCookie('count')
  res.send({ count: 0 })
})

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  const user = users.find(user => user.name === name && user.password === password)

  if (user) {
    res.cookie('userId', user.id, { maxAge: 1000 * 5 })
    res.send({ user })
  } else {
    res.status(401).send({ message: 'User not found' })
  }
})

app.get('/me', (req, res) => {
  const user = users.find(user => user.id === Number(req.cookies.userId))

  user
    ? res.send({ user })
    : res.status(404).send({ message: 'User not found' })
})

app.get('/logout', (req, res) => {
  res.clearCookie('userId')
  res.sendStatus(204)
});

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Up! http://localhost:${port}`));
