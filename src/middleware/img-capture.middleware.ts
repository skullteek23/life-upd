
import multer from 'multer';
import { allowedTypes, MAX_INPUT_FILE_SIZE } from 'src/features/posts/posts.service';

const storage = multer.memoryStorage();
const capture = multer({
    storage: storage,
    limits: {
        fileSize: MAX_INPUT_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Image not supported'));
        }
    }
})

export function captureImages() {
    return capture.single('photo');
}