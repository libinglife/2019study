const redis = require('redis');

const redisClient = redis.createClient('6379', 'localhost');


redisClient.set("name", "老铁");
redisClient.get('name', function(err, res) {
    console.log(err);
    console.log(res);
})