"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shift.hasMany(models.Karyawan, {
        foreignKey: "shift_id",
        as: "karyawan",
      });
    }
  }
  Shift.init(
    {
      shift: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shift",
    }
  );
  return Shift;
};
