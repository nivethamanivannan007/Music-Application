const multer = require('multer');
const ffmpeg = require("fluent-ffmpeg");

const audioVideoFilter = (req, file, cb) => {
    // Define an array of allowed MIME types for audio and video files.
    const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'video/mp4', 'video/quicktime'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb("Kindly Upload an audio or video file (e.g., mp3, wav, mp4, or mov)", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for storing audio and video files.
        cb(null, './media/');
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by adding the current timestamp to the original filename.
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName);
    }
});

var upload = multer({ storage: storage, fileFilter: audioVideoFilter });



module.exports = upload;
