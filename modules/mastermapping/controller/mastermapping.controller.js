const masterMappingServices = require('../services/mastermapping.services');





async function createNewMappingEntry(req, res, next) {
  try {
    let payload = req.body;
    return await masterMappingServices.createCollectionMapping(res);
  } catch (error) {
    res.status(400).send(error);
  }
}


exports.get = createNewMappingEntry;