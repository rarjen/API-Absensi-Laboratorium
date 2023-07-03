const { Absensi, Karyawan, Shift, Jabatan } = require("../models");
const { BadRequestError, NotFoundError } = require("../errors");
const { Op } = require("sequelize");
const { STATUS_ABSENSI, STATUS, SHIFT } = require("../utils/enum");

const postAbsen = async (req) => {
  const { karyawan_id, status_absensi } = req.body;

  if (!karyawan_id || !status_absensi) {
    throw new BadRequestError("Harap isi field!");
  }

  const timeDate = new Date();
  const shiftPagi = "07:00";
  const shiftSore = "14:00";
  let status = "";

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
    throw new BadRequestError("Karyawan tidak ada!");
  }

  if (
    getKaryawan.shift.shift === SHIFT.PAGI &&
    timeDate.toLocaleTimeString() <= shiftPagi
  ) {
    status = STATUS.TEPAT;
  } else if (
    getKaryawan.shift.shift === SHIFT.SORE &&
    timeDate.toLocaleTimeString() <= shiftSore
  ) {
    status = STATUS.TEPAT;
  } else {
    status = STATUS.TELAT;
  }

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

  const result = await Absensi.create({
    karyawan_id,
    jam_masuk: timeDate.toLocaleTimeString(),
    status_absensi,
    tanggal: timeDate.toLocaleDateString(),
    status,
  });

  return result;
};

const postAbsenPulang = async (req) => {
  const { absen_id } = req.params;
  const timeDate = new Date();

  const checkAbsen = await Absensi.findOne({
    where: { id: absen_id, tanggal: timeDate.toLocaleDateString() },
  });

  if (!checkAbsen) {
    throw new NotFoundError("Absensi tidak ada!");
  }

  if (
    checkAbsen.jam_pulang &&
    checkAbsen.status_absensi === STATUS_ABSENSI.PULANG
  ) {
    throw new BadRequestError("Anda sudah absen pulang hari ini!");
  }

  const result = await Absensi.update(
    {
      status_absensi: STATUS_ABSENSI.PULANG,
      jam_pulang: timeDate.toLocaleTimeString(),
    },
    { where: { id: absen_id } }
  );

  return result;
};

const todayAbsen = async (req) => {
  const timeDate = new Date();

  const result = await Absensi.findAll({
    where: { tanggal: timeDate.toLocaleDateString(), jam_pulang: null },
    include: [
      {
        model: Karyawan,
        as: "karyawan",
        include: [
          {
            model: Shift,
            as: "shift",
          },
        ],
      },
    ],
  });

  return result;
};

const getAbsensi = async (req) => {
  const { startDate, endDate } = req.query;

  let where = {};

  if (startDate && endDate) {
    where = {
      createdAt: {
        [Op.between]: [
          new Date(startDate).setHours(0, 0, 0),
          new Date(endDate).setHours(23, 59, 59),
        ],
      },
    };
  }

  const result = await Absensi.findAll({
    where,
    include: [
      {
        model: Karyawan,
        as: "karyawan",
        include: [
          {
            model: Shift,
            as: "shift",
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
    raw: true,
  });

  return result;
};

const showAbsensi = async (req) => {
  const { absen_id } = req.params;

  const result = await Absensi.findOne({
    where: { id: absen_id },
    include: [
      {
        model: Karyawan,
        as: "karyawan",
        include: [
          {
            model: Shift,
            as: "shift",
          },
        ],
      },
    ],
    raw: true,
  });

  if (!result) {
    throw new NotFoundError("Absensi tidak ada!");
  }

  return result;
};

module.exports = {
  postAbsen,
  getAbsensi,
  todayAbsen,
  postAbsenPulang,
  showAbsensi,
};
