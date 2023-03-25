const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();


router.route('/')
      .get(userController.get)
      .post(userController.create)
    //   .put(userController.update)
    //   .delete(userController.delete)


module.exports = router;