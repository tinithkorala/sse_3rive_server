import Joi from "joi";
import { TASK_PRIORITY, TASK_STATUS } from "../config/enumConfig.js";

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

const due_date = Joi.date().required().messages({
  "date.base": `"Due Date must be a valid date.`,
  "date.empty": `Due Date cannot be empty.`,
  "date.required": `Due Date is required.`,
});

export const taskCreateSchema = Joi.object({
  title,
  description,
  priority,
  due_date,
});

export const taskUpdateSchema = Joi.object({
  title,
  description,
  priority,
  status: Joi.string()
    .valid(...Object.values(TASK_STATUS))
    .messages({
      "string.base": `"Status" should be a type of 'text'`,
      "any.allow": `"Status" must be one of the following values: ${Object.values(
        TASK_STATUS
      ).join(", ")}`,
    }),
  due_date,
});
