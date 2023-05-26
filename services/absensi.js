const { Absensi, Karyawan } = require("../models");
const { BadRequestError } = require("../errors");
const { Op } = require("sequelize");

const postAbsen = async (req) => {
  let {
    id_karyawan,
    timeDate = new Date(),
    tipe,
    status,
    image_url = "-",
  } = req.body;

  const shiftPagi = "07:00";
  const shiftSore = "14:00";

  const getKaryawan = await Karyawan.findOne({ where: { id: id_karyawan } });

  if (!getKaryawan) {
    throw new BadRequestError(`Tidak ada karyawan dengan id: ${id_karyawan}`);
  }

  const shiftKaryawan = getKaryawan.shift;

  if (tipe === "Pulang") {
    const result = await Absensi.update(
      {
        jam_pulang: timeDate.toLocaleTimeString(),
        tipe,
      },
      { where: { id_karyawan, tanggal: timeDate.toLocaleDateString() } }
    );

    if (result <= 0) {
      throw new BadRequestError("Anda belum absen datang hari ini!");
    }

    return result;
  }

  if (shiftKaryawan === "Pagi" && timeDate.toLocaleTimeString() <= shiftPagi) {
    status = "Tepat";
  } else if (
    shiftKaryawan === "Sore" &&
    timeDate.toLocaleTimeString() <= shiftSore
  ) {
    status = "Tepat";
  } else {
    status = "Telat";
  }

  const checkAbsen = await Absensi.findOne({
    where: {
      id_karyawan,
      jam_pulang: "-",
      tanggal: timeDate.toLocaleDateString(),
    },
  });

  if (checkAbsen) {
    throw new BadRequestError("Anda sudah absen hari ini!");
  }

  const result = await Absensi.create({
    id_karyawan,
    jam_masuk: timeDate.toLocaleTimeString(),
    jam_pulang: "-",
    tipe,
    status,
    image_url,
    tanggal: timeDate.toLocaleDateString(),
  });

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
