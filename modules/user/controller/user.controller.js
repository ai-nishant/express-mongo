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


    let userCache = {}
    const cacheResult = await redisCache(req,userCache);

    console.log(cacheResult, "redis cache");

    if (cacheResult ) {
      const users = JSON.parse(getCachedData);
      return res.status(200).send(users);
    } else {
      // console.log(cacheResult, "redis cache");
      let userResult = await userServices.final(req, res);
      res.status(200).send({ res: userResult })

    }

  } catch (error) {
    console.log(error, "error")
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



async function redisCache(req,userResult) {
  try {
    const redisConnection = await redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
    // await redisConnection.connect();
    (async () => {
      redisConnection.on('error', (err) => console.log(err,"noconnection in redis"));
      await redisConnection.connect();

    })();

    // logic to get data

    let tempKey = JSON.stringify(req.query);
    const getCachedData = await redisConnection.get(tempKey);
    console.log(getCachedData?Object.keys(getCachedData).length:"","data")
    if(Object.keys(getCachedData).length > 2) return getCachedData;

    const setCachedData = await redisConnection.set(tempKey, JSON.stringify(userResult));
      console.log(setCachedData,"set")
      //  const setCache =  await redisSearchSet(cacheKey, JSON.stringify(userResult), 'EX', 60 * 100); // Expires after 5 minutes
    return false;
  } catch (error) {

    console.log(error,"error")
  }
}
// exporting module

exports.create = createUser;
exports.get = getUser;
exports.finalOutput = finalOutput;
// exports.delete = deleteUser;
