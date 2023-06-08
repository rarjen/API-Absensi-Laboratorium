const { Absensi, Karyawan, Shift } = require("../models");
const { BadRequestError } = require("../errors");
const { Op } = require("sequelize");
const { STATUS_ABSENSI, STATUS } = require("../utils/enum");

const postAbsen = async (req) => {
  const { karyawan_id, status_absensi } = req.body;

  const timeDate = new Date();
  const shiftPagi = "07:00";
  const shiftSore = "14:00";
  const status = "";

  const getKaryawan = await Karyawan.findOne({
    where: { id: karyawan_id },
    include: [
      {
        model: Jabatan,
        as: "jabatan",
      },
      {
        model: Shift,
        as: "shift",
      },
    ],
  });

  if (!getKaryawan) {
    throw new BadRequestError(`Tidak ada karyawan dengan id: ${karyawan_id}`);
  }

  // if(getKaryawan.shift.shift ===  )

  // const shiftKaryawan = getKaryawan.shift;

  const checkAbsen = await Absensi.findOne({
    where: {
      karyawan_id,
      jam_pulang: null,
      tanggal: timeDate.toLocaleDateString(),
    },
  });
  if (checkAbsen) {
    throw new BadRequestError("Anda sudah absen datang!");
  }

  const result = await Absensi.create({});

  return result;
};

const getAbsensi = async (req) => {
  const { startDate, endDate } = req.query;

  if (startDate && endDate) {
    const result = await Absensi.findAll({
      where: {
        createdAt: {
          [Op.between]: [
            new Date(startDate).setHours(0, 0, 0),
            new Date(endDate).setHours(23, 59, 59),
          ],
        },
      },
    });
    return result;
  }

  const result = await Absensi.findAll({});

  return result;
};

module.exports = { postAbsen, getAbsensi };
