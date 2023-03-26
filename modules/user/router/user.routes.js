const express = require('express');
const userController = require('../controller/user.controller');

// importing validators

const searchValidatorSchema = require('../validators/get-api-validators');
const commonValidator = require("../validators/commo-validator");

// initiating router
const router = express.Router();


router.route('/')
      .get(commonValidator(searchValidatorSchema),userController.get)
      .post(userController.create)
    //   .put(userController.update)
    //   .delete(userController.delete)

    router.route('/final')
          .get(userController.finalOutput)
module.exports = router;