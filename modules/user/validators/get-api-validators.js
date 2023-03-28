const Joi = require('joi');

const searchApiValidations = Joi.object({
  from:Joi.date().iso().min('1950-01-01'),
  to:Joi.date().iso().greater(Joi.ref("from")),
  status:Joi.string(),
  addressIds:Joi.string(),
  zipCodes:Joi.string() 
});


module.exports = searchApiValidations;


// .when("addressIds",{is:Joi.undefined,then: Joi.required()