"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Karyawan.belongsTo(models.Jabatan, {
        foreignKey: "jabatan_id",
        as: "jabatan",
      });

      Karyawan.hasMany(models.Absensi, {
        foreignKey: "karyawan_id",
        as: "absensi",
      });

      Karyawan.belongsTo(models.Shift, {
        foreignKey: "shift_id",
        as: "shift",
      });
    }
  }
  Karyawan.init(
    {
      jabatan_id: DataTypes.INTEGER,
      shift_id: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      nomer_karyawan: DataTypes.STRING,
      nomer_telepon: DataTypes.STRING,
      nomer_rekening: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Karyawan",
    }
  );
  return Karyawan;
};
