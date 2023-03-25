const userServices = require('../services/user-services');





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
    let payload = req.body;

    return await userServices.findOne(res);
  } catch (error) {
    res.status(400).send(error);
  }
}

// async function updateUser(req, res, next) {
//   try {
//     const payload = req.body;
//     const id = req.query.id;
//     return await userServices.updateOneUser(id, payload, res);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// }

// async function deleteUser(req, res, next) {
//   try {
//     let payload = req.body.id;
//     return await userServices.deleteOneUser(payload, res);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// }

exports.create = createUser;
exports.get = getUser;
// exports.update = updateUser;
// exports.delete = deleteUser;
