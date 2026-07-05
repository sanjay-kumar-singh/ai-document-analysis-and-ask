const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.resolve(__dirname, '../../uploads');
const allowedExtensions = new Set(['pdf', 'doc', 'docx']);

const ensureUploadDirectory = (targetDir = uploadDir) => {
    if (fs.existsSync(targetDir) && !fs.statSync(targetDir).isDirectory()) {
        fs.rmSync(targetDir, { force: true });
    }

    fs.mkdirSync(targetDir, { recursive: true });
    return targetDir;
};

ensureUploadDirectory(uploadDir);

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, ensureUploadDirectory(uploadDir)),
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        const extension = path.extname(file.originalname).slice(1).toLowerCase();
        const isAllowed = allowedExtensions.has(extension);
        cb(isAllowed ? null : new Error('Only PDF and DOCX files are allowed!'), isAllowed);
    },
});

module.exports = upload;
module.exports.ensureUploadDirectory = ensureUploadDirectory;