import {
  celebrate,
  Joi
} from 'celebrate';

const validation = (body) => {
  return celebrate({
    body: Joi.object(body)
  });
};

export default validation;