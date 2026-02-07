import multer from "multer"


const storage = multer.memoryStorage();


const fileFilter = ((req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, or WebP allowed."), false);

    }
})

const limits = {
    fileSize: 3 * 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits })