/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import ApiError from "../utils/ApiError";

const pick = (obj: object, keys: string[]) => {
  return keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key as keyof typeof obj];
    }
    return finalObj;
  }, {});
};

const validate =
  (schema: object) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const obj = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(obj);
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
