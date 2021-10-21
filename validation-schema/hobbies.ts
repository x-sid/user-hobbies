import joi from "joi";
import { Hobbies } from "../types";

const { LOW, HIGH, MEDIUM, VERY_HIGH } = Hobbies;

export const createHobbiesSchema = joi.object().keys({
  passionLevel: joi.string().valid(LOW, HIGH, MEDIUM, VERY_HIGH).required(),
  year: joi.number().required(),
  name: joi.string().max(150).required(),
});
