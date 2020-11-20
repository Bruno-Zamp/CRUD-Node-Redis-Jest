var express = require('express');
var app = express();
var crud = require('./src/CRUD');

// ADD THIS
var cors = require('cors');
app.use(cors());
app.use(express.json())

app.post('/cadastra', async (req, res) => {
  const key = `${req.body.musica.replace(' ', '_')}_${req.body.banda.replace(' ', '_')}`;
  console.log(`CADASTRA - key: ${key}`);
  const result = await crud.create(key, req.body);
  // console.log(result);
  res.send(result);
});

app.get('/consulta/:key', async (req, res) => {
  const key = req.params.key;
  console.log(`CONSULTA - key: ${key}`);
  const result = await crud.read(key);
  // console.log(result);
  res.send(result);
});

app.get('/consulta-todos', async (req, res) => {
  console.log(`CONSULTA-TODOS`);
  const result = await crud.readAll();
  // console.log(result);
  res.send(result);
});

app.delete('/remove/:key', async (req, res) => {
  const key = req.params.key;
  console.log(`REMOVE - key: ${key}`);
  const result = await crud.remove(key);
  console.log(result);
  res.send(result);
});

app.put('/atualiza', async (req, res) => {
  const key = `${req.body.musica.replace(' ', '_')}_${req.body.banda.replace(' ', '_')}`;
  console.log(`CADASTRA - key: ${key}`);
  const result = await crud.update(key, req.body);
  // console.log(result);
  res.send(result);
});

app.get('/dropAllKeys', async (req, res) => {
  const result = await crud.dropAllKeys();
  // console.log(result);
  res.send(result);
});

app.listen(5000, function () {
  console.log('Servidor rodando');
  console.log('Cadastra - POST  http://localhost:5000/cadastra');
  console.log('Consulta - GET   http://localhost:5000/busca/:key');
  console.log('Remove - DELETE  http://localhost:5000/remove/:key');
  console.log('Atualiza - PUT  http://localhost:5000/atualiza');
});
