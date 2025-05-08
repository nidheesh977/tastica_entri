import bcryptjs from 'bcryptjs';

export const comparePassword = async (password, hashedPassword) => {
    return await bcryptjs.compare(password, hashedPassword)
        .then(result => {
        return result;
        })
        .catch(err => {
        throw new Error('Error comparing passwords');
        });
}