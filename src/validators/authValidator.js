import Joi from "joi";

const email = Joi.string().email().required().messages({
  "string.base": `"Email" should be a type of 'text'`,
  "string.empty": `"Email" cannot be an empty field`,
  "string.email": `"Email" must be a valid email address`,
  "any.required": `"Email" is a required field`,
});

const password = Joi.string().min(8).required().messages({
  "string.base": `"Password" should be a type of 'text'`,
  "string.empty": `"Password" cannot be an empty field`,
  "string.min": `"Password" should have a minimum length of {#limit}`,
  "any.required": `"Password" is a required field`,
});

export const authSignUpSchema = Joi.object({
  first_name: Joi.string().min(2).max(200).required().messages({
    "string.base": `"First Name" should be a type of 'text'`,
    "string.empty": `"First Name" cannot be an empty field`,
    "string.min": `"First Name" should have a minimum length of {#limit}`,
    "string.max": `"First Name" should have a maximum length of {#limit}`,
    "any.required": `"First Name" is a required field`,
  }),
  last_name: Joi.string().min(2).max(200).required().messages({
    "string.base": `"Last Name" should be a type of 'text'`,
    "string.empty": `"Last Name" cannot be an empty field`,
    "string.min": `"Last Name" should have a minimum length of {#limit}`,
    "string.max": `"Last Name" should have a maximum length of {#limit}`,
    "any.required": `"Last Name" is a required field`,
  }),
  email: email,
  password: password,
});

export const authSignInSchema = Joi.object({
  email: email,
  password: password,
});


export const authRefreshTokenSchema = Joi.object({
  refresh_token: Joi.string().min(2).max(200).required().messages({
    "string.base": `"Refresh Token" should be a type of 'text'`,
    "string.empty": `"Refresh Token" cannot be an empty field`,
    "any.required": `"Refresh Token" is a required field`,
  }),
});