const userServices = require('../services/user-services');
// caching import redis
const redis = require('redis');
const util = require('util');

// const redisSearchGet = util.promisify(redisConnection.get).bind(redisConnection);




async function createUser(req, res, next) {
  try {
    let payload = req.body;
    return await userServices.createUser(res);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getUser(req, res, next) {
  try {
    // const redisConnection = redis.createClient({ host: 'localhost', port: 8080 });
    // await redisConnection.connect();
    // const redisSearchGet = util.promisify(redisConnection.get).bind(redisConnection);
  
    // const cacheKey = req.query;
    // console.log(cacheKey);
    // // Check if the data is cached
    // const cacheResult = await redisSearchGet(cacheKey);
    // console.log(cacheResult, "redis cache");
    // if (cacheResult) {
    //   const users = JSON.parse(cacheResult);
    //   return res.send(users);
    // } else {
    //   let userResult = await userServices.final(req,res);
    //   await redisSet(cacheKey, JSON.stringify(users), 'EX', 60 * 10); // Expires after 5 minutes



    //   return userResult;
    // }
    let userResult = await userServices.final(req,res);
    return userResult;
  } catch (error) {
    console.log(error,"error")
    res.status(400).send(error);
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



exports.create = createUser;
exports.get = getUser;
exports.finalOutput = finalOutput;
// exports.delete = deleteUser;
