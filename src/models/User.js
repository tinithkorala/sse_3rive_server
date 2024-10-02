import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/postgres.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty.",
        },
        len: {
          args: [2, 200],
          msg: "First name must be between 2 and 50 characters long.",
        },
        isAlpha: {
          msg: "First name can only contain letters.",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty.",
        },
        len: {
          args: [2, 200],
          msg: "Last name must be between 2 and 50 characters long.",
        },
        isAlpha: {
          msg: "Last name can only contain letters.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already in use.",
      },
      validate: {
        notEmpty: {
          msg: "Email cannot be empty.",
        },
        isEmail: {
          msg: "Must be a valid email address.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty.",
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long.",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: [/^\+?[0-9]{10,15}$/],
          msg: "Must be a valid phone number.",
        },
      },
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "user-default.jpg",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default User;