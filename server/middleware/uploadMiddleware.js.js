import multer from 'multer';
import path from 'path';
import fs from 'fs';



const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        const uploadPath = 'uploads';
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath); // Create the directory if it doesn't exist
    }
        cb(null,'uploads')
    },

    filename:(req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req,file,cb) => {
    if(path.extname(file.originalname) === '.csv'){
        cb(null,true);
    }else{
        cb(new Error('Only CSV files are allowed'),false)
    }
}

const upload = multer({storage,fileFilter});

export default upload;