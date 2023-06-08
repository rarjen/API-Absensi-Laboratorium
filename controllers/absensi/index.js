const {
  postAbsen,
  getAbsensi,
  todayAbsen,
  postAbsenPulang,
} = require("../../services/absensi");
const { StatusCodes } = require("http-status-codes");

const absen = async (req, res, next) => {
  try {
    const result = await postAbsen(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Data Recorded",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const absenPulang = async (req, res, next) => {
  try {
    const result = await postAbsenPulang(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Data Recorded",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getAbsensi(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success Get Data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const showNow = async (req, res, next) => {
  try {
    const result = await todayAbsen(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get absen",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { absen, show, showNow, absenPulang };
