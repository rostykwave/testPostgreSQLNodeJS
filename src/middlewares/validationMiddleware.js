const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addUserValidation: (req, res, next) => {
    const schema = Joi.object({
      first_name: Joi.string()
        .pattern(/[a-z0-9 ]/i)
        .required(),
      last_name: Joi.string()
        .pattern(/[a-z0-9 ]/i)
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: true },
        })
        .required(),
      phone: Joi.string()
        .pattern(/^\+?3?8?(0[5-9][0-9]\d{7})$/)
        .required(),
      password: Joi.string()
        .pattern(/[a-z0-9]/i)
        .required(),
      //   phone: Joi.number().min(6).max(14).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const [validationError] = validationResult.error.details;
      next(new ValidationError(`missing ${validationError.message}`));
    }

    next();
  },
};
