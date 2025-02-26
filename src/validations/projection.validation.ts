import { Prisma } from "@prisma/client";
import Joi from "joi";

const getHistogram = (() => {
  const possibleColumns = Prisma.dmmf.datamodel.models[0].fields
    .map((field) => field.name)
    .filter((col) => col !== "id");

  return {
    params: Joi.object().keys({
      column: Joi.string()
        .valid(...possibleColumns)
        .required(),
    }),
  };
})();

export default {
  getHistogram,
};
