export const POST_ERRORS = {
    invalidPayload: 'Invalid payload',
    invalidFile: 'Invalid file name',
    imageNotSupport: 'Try with another image',
    imageNotProcessable: 'Image processing error',
    imageNotCompressible: 'Image compressing limit reached',
    uploadFailed: 'Image Upload failed',
    compressionAborted: 'Compression aborted'
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
    duplicateCheckFailed: 'Unable to check user duplicate'
}