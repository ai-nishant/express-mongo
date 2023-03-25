const express = require('express');
const masterMappingController = require('../controller/mastermapping.controller');

const router = express.Router();


router.route('/')
      .get(masterMappingController.get)
    //   .post(userController.create)
    //   .put(userController.update)
    //   .delete(userController.delete)


module.exports = router;