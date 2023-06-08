"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Jabatan.hasMany(models.Karyawan, {
        foreignKey: "jabatan_id",
        as: "karyawan",
      });
    }
  }
  Jabatan.init(
    {
      jabatan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Jabatan",
    }
  );
  return Jabatan;
};
