const Joi = require('joi');

const searchApiValidations = Joi.object({
  from:Joi.date().iso().min('1950-01-01').required(),
  to:Joi.date().iso().greater(Joi.ref("from")).required(),
  status:Joi.string().required(),
  addressIds:Joi.string(),
  zipCodes:Joi.string() 
}).xor('addressIds', 'zipCodes');;


module.exports = searchApiValidations;


// .when("addressIds",{is:Joi.undefined,then: Joi.required()