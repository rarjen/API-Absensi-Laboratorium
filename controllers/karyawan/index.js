const {
  createKaryawan,
  editKaryawan,
  showAllKaryawan,
} = require("../../services/karyawan");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await showAllKaryawan();

    if (result <= 0) {
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "No Data",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success menampilkan semua karyawan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createKaryawan(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success menambahkan karyawan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editKaryawan(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success edit karyawan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// const destroy = async

module.exports = { create, update, index };
