export const POST_ERRORS = {
    invalidPayload: 'Invalid payload',
    invalidFile: 'Invalid file name',
    imageNotSupport: 'Try with another image',
    imageNotProcessable: 'Image processing error',
    imageNotCompressible: 'Image compressing limit reached',
    uploadFailed: 'Unable to write to database',
    imgUploadFailed: 'Image upload failed',
    compressionAborted: 'Compression aborted',
    noFieldToUpdate: 'No fields provided to update',
    postNotExistToUpdate: `Update failed as post doesn't exist`,
    getPostFailure: 'Unable to get posts'

}

export const MULTER_ERRORS = {
    imageNotSupport: '[MULTER] Image not supported',
    fileTooBig: '[MULTER] File too big',
    unexpectedFile: '[MULTER] Unexpected file field or too many files',
    uploadFailed: '[MULTER] File upload failed'
};

export const HEIC_ERRORS = {
    conversionFailed: 'HEIC/HEIF image conversion failed'
}

export const AUTH_ERRORS = {
    badFormat: 'username/password unacceptable',
    invalidCredentials: 'username/password invalid',
    userNotExist: `user doesn't exist`,
    passwordIncorrect: 'incorrect password',
    tokenFailure: 'Unable to generate token',
    unauthorizedAccess: 'Unauthorized access',
    signupServerFailure: 'Adding user to server failed',
    loginFailure: 'Login failed',
    signupFailure: 'Signup failed',
    usernameDuplicate: 'User already exists',
    duplicateCheckFailed: 'Unable to check user duplicate',
    keyNotProvided: 'Token key not provided in environment',
    tokenNotProvided: 'Token key not provided in request'

}

export const USER_ERRORS = {
    duplicateUsers: 'Users with same id exist',
    invalidUserId: 'User ID is required',
    getUserFailure: 'Unable to get user'
}