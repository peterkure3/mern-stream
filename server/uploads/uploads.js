const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './server/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('videoFile');

function checkFileType(file, cb) {
    const filetypes = /mp4|mov|ogg|webm/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Video Files Only!');
    }
}