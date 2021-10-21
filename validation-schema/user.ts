import joi from "joi";

export const userCreateSchema = joi.object().keys({
  name: joi.string().min(2).max(35).required(),
});
