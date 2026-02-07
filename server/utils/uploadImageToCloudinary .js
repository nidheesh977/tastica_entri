import { cloudinaryInstance } from "../config/cloudineryConfig.js"
import crypto from "node:crypto"
import { Readable } from "stream"

export const uploadImageToCloudinary = async (bufferImage, folderName, type, resourceType) => {



    const results = await new Promise((resolve, reject) => {
        const uploadStream = cloudinaryInstance.uploader.upload_stream({ folder: folderName, public_id: crypto.randomUUID(), type: type, resource_type: resourceType }, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })

        Readable.from(bufferImage).pipe(uploadStream)
    })


    return results
}