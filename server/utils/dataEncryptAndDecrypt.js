import crypto from "crypto"


const algorithm = "aes-256-gcm";

const keys = {
    v1: Buffer.from(process.env.ENC_KEY_V1, "hex")
};

export const encryptData = (text) => {

    const CURRENT_VERSION = "v1"


    const key = keys[CURRENT_VERSION]

    const iv = crypto.randomBytes(12)

    const cipher = crypto.createCipheriv(algorithm, key, iv)


    const encryptedData = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ])

    const authTag = cipher.getAuthTag()

    return {
        encryptedData: encryptedData.toString("hex"),
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
        version: CURRENT_VERSION
    }

}



export const decryptData = (data) => {

    const { encryptedData, iv, authTag, version } = data;

    const key = keys[version]

    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(iv, "hex")
    )

    decipher.setAuthTag(Buffer.from(authTag, "hex"))

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, "hex")),
        decipher.final()
    ])

    return decrypted.toString("utf8");
}