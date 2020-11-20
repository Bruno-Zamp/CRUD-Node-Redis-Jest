const redis = require("redis");
const client = redis.createClient();
var async = require("async");

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
  async readAll() {
    return new Promise((resolve, reject)=> {
      client.keys('*', (err, keys) => {
        if(err) reject(err);
        if(keys) {
          async.map(keys, (key, cb) => {
            client.get(key, function (error, value) {
                    if (error) return cb(error);
                    cb(null, JSON.parse(value));
                });
          }, (error, results) => {
               if (error) return console.log(error);
               resolve({data:results});
          });
        }
      });
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