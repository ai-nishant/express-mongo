const userServices = require('../services/user-services');
// caching import redis
const redis = require('redis');
const util = require('util');






async function createUser(req, res, next) {
  try {
    let payload = req.body;
    return await userServices.createUser(res, payload);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getUser(req, res, next) {
  try {

    let cacheSetting = false;

    if (cacheSetting === true) {      
      const cacheGetResult = await redisCacheGet(req, res);
    }
    // getting result from user
    let userResult = await userServices.final(req, res);

    // setting value in redis cache
    if (cacheSetting === true) {
      let cacheSetResult = await redisCacheSet(req, userResult);
    }
    res.status(200).send({ res: userResult });


  } catch (error) {
    return error
  }
}

async function finalOutput(req, res, next) {
  try {
    const payload = req.body;
    const id = req.query.id;
    return await userServices.final(id, payload, res);
  } catch (error) {
    res.status(400).send(error);
  }
}



async function redisCacheGet(req, res) {
  try {
    const redisConnection = await redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });



    //  (async () => {
    //   redisConnection.on('error', (err) => console.log(err, "noconnection in redis"));
    //   await redisConnection.connect();

    // })();
    // logic to get data

    let tempKey = JSON.stringify(req.query);
    const getCachedData = await redisConnection.get(tempKey);

    if (getCachedData != null) {
      const users = JSON.parse(getCachedData);
      return res.status(200).send(users);
    }
    return getCachedData
  } catch (error) {
    return error
  }
}



async function redisCacheSet(req, userResult) {
  try {
    const redisConnection = await redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

    // (async () => {
    //   redisConnection.on('error', (err) => console.log(err, "noconnection in redis"));
    //   await redisConnection.connect();

    // })();

    // logic to get data

    let tempKey = JSON.stringify(req.query);


    const setCachedData = await redisConnection.set(tempKey, JSON.stringify(userResult));

    return setCachedData

  } catch (error) {
    return error

  }
}
// exporting module

exports.create = createUser;
exports.get = getUser;
exports.finalOutput = finalOutput;
// exports.delete = deleteUser;
