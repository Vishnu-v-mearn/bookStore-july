const multer = require("multer");

// In multer two items

// storage :
const storage = multer.diskStorage({
  // *)inside these location to store files
  // multer function have 3 args , request,file and callback function
  //We describe the operations inside the cal;l back function
  destination: (req, file, callBack) => {
    callBack(null, './uploads');
  },

  //          *)modify the file name

  filename: (req, file, callBack) => {
    let date = Date.now();
    callBack(null, `Bookstore-${date}-${file.originalname}`);
  },
});
// file filter : *)to filter the file according to type, size etc..,
//mimetype means file type (pdf,doc,png,jpeg)
const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image.jpg"
  ) {
    //proceed to save
    callBack(null, true);
  } else {
    //return an error
    callBack(null, false);
  }
};

const multerConfig = multer({storage,fileFilter})

module.exports = multerConfig
