import multer from "multer";
import path from 'path';
import { v4 as uuidv4 } from "uuid";

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public", "propertypic"))
        },
        filename: function (req, file, cb) {
            // cb(null, new Date().getTime() + "_" + file.originalname);
            cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        },
    }),
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

export default upload;