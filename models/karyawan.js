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
        foreignKey: "id_jabatan",
        as: "jabatan",
      });

      Karyawan.hasMany(models.Absensi, {
        foreignKey: "id_karyawan",
        as: "absensi",
      });
    }
  }
  Karyawan.init(
    {
      id_jabatan: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      shift: DataTypes.STRING,
      nomer_karyawan: DataTypes.STRING,
      nomer_telepon: DataTypes.STRING,
      nomer_rekening: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Karyawan",
    }
  );
  return Karyawan;
};
