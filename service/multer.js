
const multer = require("multer")
const path = require("path")
const fs = require('fs')
// const  { nanoid } = require("nanoid");
const validationFileType = {
  image: ["image/jpg", "image/jpeg", "image/png"],
  fileText: ["application/pdf"],
};
function multerFun(customDest,acceptType) {
  if (!customDest || customDest == '') {
  customDest = "genalData";
}
  if (!fs.existsSync(path.join(__dirname, `../uploads/${customDest}`))) {
    // ../uploads/${customDest => ../uploads/user/profilePic
    fs.mkdirSync(path.join(__dirname, `../uploads/${customDest}`), { recursive: true });
  }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(file);
        req.destinationFile = `uploads/${customDest}`;
        cb(null, path.join(__dirname, `../uploads/${customDest}`));
      },
      filename: function (req, file, cb) {
        console.log({ file });
        const fullName = new Date().getMilliseconds() + "-" + file.originalname;
        cb(null, fullName);
      },
    });

  const fileFilter = function (req,file,cb) {
console.log(file.mimetype);
    if (acceptType.includes(file.mimetype)) {
      cb(null,true)
    } else {
      req.fileUploadError = true
      cb(null,false)
    }

  }
    const upload = multer({ dest: path.join(__dirname, `../uploads/${customDest}`), fileFilter, storage });
    return upload
}

module.exports = { multerFun, validationFileType };