
/**
 *
 * @param {Number} exitCode
 * @param {String} message
 */
let exitApp = (exitCode,message = null) => {
    message?console.error(message):""
    process.exit(exitCode)
}

/**
 *
 * @param {String} fileName
 * @param {String} replaceVersion
 * @returns {{extension: string, name: string}}
 */
let fileNameAndExtension = (fileName, replaceVersion = null) => {
    const parts = fileName.split('.')
    let name = parts.slice(0, -1).join('.')
    const extension = `.${parts.pop()}`
    if (replaceVersion) {
        const repExp = new RegExp(replaceVersion);
        name = name.replace(repExp, '')
    }
    return {name, extension}
}

/**
 *
 * @param {Number} length
 * @returns {String}
 */
let generateRandomString = (length = 6) => {
    const possible  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''

    for (let i=0; i<length; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return code
}


let getUserFromRequest = (req) => {
    return req.user.user
}

export default {
    exitApp , fileNameAndExtension , generateRandomString, getUserFromRequest
}