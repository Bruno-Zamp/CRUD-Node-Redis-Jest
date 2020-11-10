const redis = require("redis");
const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis connected');
});

const crud = {
  async dropAllKeys() {
    return new Promise(resolve => {
      client.flushdb((err, succeeded) => {
        resolve(succeeded); // will be true if successfull
      });
    });
  },
  async keyExists(key) {
    return new Promise(resolve => {
      client.exists(key, (err, reply) => {
        if (reply === 1) {
            resolve(true);
        } else {
            resolve(false);
        }
      });
    });
  },
  async create(key, value) {
    const isKeyExists = await this.keyExists(key);
    return new Promise(resolve => {
      if (!isKeyExists) {
        client.set(key, JSON.stringify(value),(err, reply) => {
          if (err) resolve(err);
          resolve('success');
        });
      }
      else {
        resolve('error');
      }
    })
  },
  async read(key) {
    const isKeyExists = await this.keyExists(key);
    return new Promise(resolve => {
      if (isKeyExists) {
        client.get(key, (err, reply) => {
          if (err) resolve(err);
          resolve(JSON.parse(reply));
        });
      }
      else {
        resolve('error');
      }
    });
  },
  async remove(key) {
    const isKeyExists = await this.keyExists(key);
    return new Promise(resolve => {
      if (isKeyExists) {
        client.del(key, (err, reply) => {
          if (err) resolve(err);
          resolve('success');
        });
      }
      else {
        resolve('error');
      }
    });
  },
  async update(key, value) {
    const isKeyExists = await this.keyExists(key);
    return new Promise(resolve => {
      if (isKeyExists) {
        client.set(key, JSON.stringify(value),(err, reply) => {
          if (err) resolve(err);
          resolve('success');
        });
      }
      else {
        resolve('error');
      }
    })
  }
};

module.exports = crud;