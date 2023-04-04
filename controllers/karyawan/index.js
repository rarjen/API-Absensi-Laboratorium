const {
  createKaryawan,
  editKaryawan,
  showAllKaryawan,
  destroyKaryawan,
  getKaryawan,
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

const show = async (req, res, next) => {
  try {
    const result = await getKaryawan(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success menampilkan karyawan",
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

const destroy = async (req, res, next) => {
  try {
    const result = await destroyKaryawan(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete karyawan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, update, index, show, destroy };
