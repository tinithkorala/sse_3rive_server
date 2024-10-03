import { Op } from "sequelize";
import AppError from "./appError.js";

class APIQueryBuilder {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    const operatorsMap = {
      in: Op.in,
      eq: Op.eq,
    };
    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "object") {
        Object.keys(queryObj[key]).forEach((opKey) => {
          let queryObjKeyOpKeyValue = queryObj[key][opKey];
          let sanitizedValue = queryObjKeyOpKeyValue;
          if (opKey === "in") {
            if (!Array.isArray(queryObjKeyOpKeyValue)) {
              // Note - Here I go with the if `queryObj[key][opKey]` is string also to filter tasks easy.
              // throw new AppError("Invalid", `Invalid filter`, 500);
              sanitizedValue = [queryObjKeyOpKeyValue];
            }
          } else {
            if (Array.isArray(queryObjKeyOpKeyValue)) {
              throw new AppError("Invalid", `Invalid filter`, 500);
            }
          }
          if (operatorsMap[opKey]) {
            queryObj[key] = { [operatorsMap[opKey]]: sanitizedValue };
          } else {
            delete queryObj[key];
          }
        });
      }
    });
    this.query.where = { ...this.query.where, ...queryObj };
    return this;
  }

  sort() {
    const sortBy = this.queryString.sort;
    let order = [];
    if (sortBy) {
      const sortFields = sortBy.split(",");
      order = sortFields.map((field) => {
        if (field.startsWith("-")) {
          return [field.slice(1), "DESC"];
        }
        return [field, "ASC"];
      });
    }
    this.query.order = order;
    return this;
  }

  limitFields() {
    const fields = this.queryString.fields;
    const selectedFields = fields ? fields.split(",") : null;
    this.query.attributes = selectedFields;
    return this;
  }

  paginate() {
    const limit = this.queryString.limit
      ? parseInt(this.queryString.limit)
      : 10;
    const page = this.queryString.page ? parseInt(this.queryString.page) : 1;
    const offset = (page - 1) * limit;
    this.query.limit = limit;
    this.query.offset = offset;
    this.query.page = page;
    return this;
  }
}

export default APIQueryBuilder;
