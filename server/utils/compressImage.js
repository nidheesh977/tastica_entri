import sharp from "sharp"

export const compressImage = (fileImage, resize, compressValue) => {
    const compressImage = sharp(fileImage).resize(resize, null, { fit: "inside" }).webp({ quality: compressValue }).toBuffer()

    return compressImage
}