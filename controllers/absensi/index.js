const { postAbsen } = require("../../services/absensi");
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

module.exports = { absen };
