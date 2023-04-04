// const { Absensi, Karyawan } = require("../models");

// const postAbsen = async (req) => {
//   //   const { id_karyawan, timeDate, tipe, status, image_url } = req.body;

//   const getKaryawan = await Karyawan.findOne({ where: { id: id_karyawan } });

//   return getKaryawan;
// };

// module.exports = { postAbsen };

const date = new Date();
const convert = date.toLocaleTimeString();
// const time = convert.getTime();

console.log(convert);
