import {
  Joi
} from 'celebrate';

export default {
  email: Joi.string().required().email().messages({
    'string.required': 'Email is a required',
    'string.email': 'Email invalid format',
  }),
  password: Joi.string().required().label('Password is required.'),
};