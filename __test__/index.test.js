const crud = require('../src/CRUD');
const mock = require('../__mocks__/request');

test('CRUD TESTS - DROPALLKEYS - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.create(mock.key2, mock.req2)).resolves.toBe('success');
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
});

test('CRUD TESTS - KEYEXISTS - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  await expect(crud.keyExists(mock.key1)).resolves.toBe(false);
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.keyExists(mock.key1)).resolves.toBe(true);
});

test('CRUD TESTS - CREATE - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.create(mock.key2, mock.req2)).resolves.toBe('success');
  // Insere duplicado
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('error');
});

test('CRUD TESTS - READ - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  // Test Mock 1
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.read(mock.key1)).resolves.toEqual(mock.req1);
  // Test Mock 2
  await expect(crud.create(mock.key2, mock.req2)).resolves.toBe('success');
  await expect(crud.read(mock.key2)).resolves.toEqual(mock.req2);
});

test('CRUD TESTS - CREATE AND READ - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  // Leitura de valor inexistente
  await expect(crud.read(mock.key1)).resolves.toBe('error');
  // Test Mock 1
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.read(mock.key1)).resolves.toEqual(mock.req1);
  // Test Mock 2
  await expect(crud.create(mock.key2, mock.req2)).resolves.toBe('success');
  await expect(crud.read(mock.key2)).resolves.toEqual(mock.req2);
  // Test Mock 3
  await expect(crud.create(mock.key3, mock.req3)).resolves.toBe('success');
  await expect(crud.read(mock.key3)).resolves.toEqual(mock.req3);
  // Test Mock 4
  await expect(crud.create(mock.key4, mock.req4)).resolves.toBe('success');
  await expect(crud.read(mock.key4)).resolves.toEqual(mock.req4);
  // Test diferente key and value
  await expect(crud.read(mock.key2)).resolves.not.toEqual(mock.req4);
  await expect(crud.read(mock.key1)).resolves.not.toEqual(mock.req2);
  await expect(crud.read(mock.key3)).resolves.not.toEqual(mock.req1);
});

test('CRUD TESTS - DELETE - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  // Insere mock 1
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.read(mock.key1)).resolves.toEqual(mock.req1);
  await expect(crud.remove(mock.key1)).resolves.toEqual('success');
  // Valor removido não deve ser encontrado
  await expect(crud.read(mock.key1)).resolves.toBe('error');
});

test('CRUD TESTS - UPDATE - Tests should be ok', async () => {
  await expect(crud.dropAllKeys()).resolves.toBe('OK');
  // Insere mock 1
  await expect(crud.create(mock.key1, mock.req1)).resolves.toBe('success');
  await expect(crud.read(mock.key1)).resolves.toEqual(mock.req1);
  // Atualiza mock 1
  await expect(crud.update(mock.key1, mock.req2)).resolves.toEqual('success');
  await expect(crud.read(mock.key1)).resolves.not.toEqual(mock.req1);
  await expect(crud.read(mock.key1)).resolves.toEqual(mock.req2);
});
