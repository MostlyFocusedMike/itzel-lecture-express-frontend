const path = require('path');
const express = require('express');
const app = express();

const publicDir = path.join(__dirname, '..', 'public');
const staticAssets = express.static(publicDir);
app.use(staticAssets);

app.use(express.json());

const todos = [
  { content: 'go to store', isDone: false },
]

app.get('/api/todos', (req, res) => {
  res.send(todos)
})

app.post('/api/todos', (req, res) => {
  todos.push(req.body)
  res.send(req.body)
})

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

app.listen(port, host, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});