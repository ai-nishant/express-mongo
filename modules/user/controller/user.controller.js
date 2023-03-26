const userServices = require('../services/user-services');
// caching import redis
const redis = require('redis');
const util = require('util');

const redisConnection = redis.createClient();
(async () => {
  redisConnection.on('error', (err) => console.log(err));
  await redisConnection.connect();

})();






async function createUser(req, res, next) {
  try {
    let payload = req.body;
    return await userServices.createUser(res,payload);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getUser(req, res, next) {
  try {

    const redisSearchGet = util.promisify(redisConnection.get).bind(redisConnection);
    const redisSearchSet = util.promisify(redisConnection.set).bind(redisConnection);
  
    const cacheKey = JSON.stringify(req.query);
    console.log(cacheKey,"query");
    // Check if the data is cached
    // const cacheResult = await redisSearchGet(cacheKey);
    cacheResult = false;
    
    if (cacheResult) {
      const users = JSON.parse(cacheResult);
      return res.status(200).send(users);
    } else {
      console.log(cacheResult, "redis cache");
      let userResult = await userServices.final(req,res);
      console.log(userResult,"userResult")
     const setCache =  await redisSearchSet(cacheKey, JSON.stringify(userResult), 'EX', 60 * 100); // Expires after 5 minutes
      console.log(setCache)
      return userResult;
      
    }
   
  } catch (error) {
    console.log(error,"error")
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



exports.create = createUser;
exports.get = getUser;
exports.finalOutput = finalOutput;
// exports.delete = deleteUser;
