import Joi from "joi";
import { TASK_PRIORITY } from "../config/enumConfig.js";

const title = Joi.string().min(2).max(200).required().messages({
  "string.base": `"Title" should be a type of 'text'`,
  "string.empty": `"Title" cannot be an empty field`,
  "string.min": `"Title" should have a minimum length of {#limit}`,
  "string.max": `"Title" should have a maximum length of {#limit}`,
  "any.required": `"Title" is a required field`,
});

const description = Joi.string().allow("").messages({
  "string.base": `"Description" should be a type of 'text'`,
});

const priority = Joi.string()
  .valid(...Object.values(TASK_PRIORITY))
  .default(TASK_PRIORITY.LOW)
  .required()
  .messages({
    "string.base": `"Priority" should be a type of 'text'`,
    "any.allow": `"Priority" must be one of the following values: ${Object.values(
      TASK_PRIORITY
    ).join(", ")}`,
    "any.required": `"Priority" is a required field`,
  });

export const taskCreateSchema = Joi.object({
  title,
  description,
  priority,
});
