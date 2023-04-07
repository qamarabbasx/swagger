const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fileUpload = require('express-fileupload');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
const app = express();
app.use(express.json());
app.use(fileUpload());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
let users = [
  {
    id: 1,
    name: 'John',
    age: 30,
  },
  {
    id: 2,
    name: 'Jane',
    age: 25,
  },
  {
    id: 3,
    name: 'Bob',
    age: 40,
  },
];
app.get('/string', (req, res) => {
  res.status(200).send('Hello World!');
});
app.get('/user', (req, res) => {
  const obj = {
    id: 1,
    name: 'John',
    age: 30,
  };
  res.status(200).send(obj);
});
app.get('/users', (req, res) => {
  res.status(200).send(users);
});
app.get('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  res.status(200).send(user);
});
app.get('/usersQuery', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.query.id));
  res.status(200).send(user);
});
app.post('/create', (req, res) => {
  users = [req.body, ...users];
  res.status(201).send(users);
});
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  console.log('headers', req.headers);
  const file = req.files.file;
  let path = __dirname + '/uploads/' + 'file' + Date.now() + '.jpg';
  file.mv(path, (err) => {
    res.send('OK');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
