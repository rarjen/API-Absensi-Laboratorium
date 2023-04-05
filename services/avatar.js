const { Avatar, Karyawan } = require("../models");
const imagekit = require("../utils/media/imagekit");
const { BadRequestError } = require("../errors");
const { DEFAULT_IMG } = process.env;

const upload = async (req) => {
  const { id_karyawan } = req.body;

  const karyawanExist = await Karyawan.findOne({ where: { id: id_karyawan } });

  if (!karyawanExist) {
    throw new BadRequestError(`Tidak ada karyawan dengan id ${id_karyawan}`);
  }

  const file = req.file.buffer.toString("base64");

  const uploadedFile = await imagekit.upload({
    file,
    fileName: req.file.originalname,
  });

  const uploaded = await Avatar.create({
    id_karyawan,
    url_image: uploadedFile.url,
  });

  return uploaded;
};

module.exports = { upload };
