const { Avatar } = require("../models");
const imagekit = require("../utils/media/imagekit");
const { DEFAULT_IMG } = process.env;

const upload = async (req) => {
  const { id_karyawan } = req.body;

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
