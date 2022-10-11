import fs from 'fs'
import slugify from "slugify";
import AWS from 'aws-sdk'
import helpers from "./helper.js";


// configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export default {

    /**
     *
     * @param {String} S3_bucketName  , your bucket name
     * @param {File} file             , file that need to be stored
     * @param {String} customFileName , custom file name for user to save
     * @returns {Promise<ManagedUpload>}
     */
    upload: async (S3_bucketName, file,customFileName = null) => {

        // create new promise
        return new Promise((async (resolve, reject) => {

            if(!file || !file.path || !file.name)
                reject({
                    error:"Not existing or damaged file",
                })

            // get uploaded file path
            let path = file.path
            // get extension and file name from main fileName
            let filename = slugify(file.name, '_')

            // get today date for folder structure
            const today = new Date()
            // create folder structure for S3 Bucket
            const folderStructure = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`

            // get filename and extension
            let {name, extension} = helpers.fileNameAndExtension(filename)
            customFileName?name=slugify(customFileName,'_'):""

            // create kay to save file ( ex 2021/07/29/fileName.ext )
            let key = `${folderStructure}/${name}`

            // check if any file exists with this name
            // note what we just finding objects with this filename
            let existing = []
            try {
                existing = await listObjects(S3_bucketName, key, extension)
            } catch (e) {
                reject(e.message)
            }

            if (!existing.length)
                // create kay to save file ( ex 2021/07/29/fileName.ext )
                key = `${folderStructure}/${name}${extension}`
            else
                try {
                    key = addVersion(existing, name, extension, folderStructure)
                } catch (e) {
                    resolve(e.message)
                }

            let params = {
                Bucket: S3_bucketName,
                Body: fs.createReadStream(path),
                Key: key,
            }

            try {

                // call main upload function
                s3.upload( params , function (err, data) {

                    // an error occurred
                    if (err) reject(err, err.stack)

                    // successful response
                    else resolve({
                        getLink: `${process.env.BASE_BACKEND_URL}/file/get/${key}`,
                        key:key,
                        filename:key.replace(`${folderStructure}/`,""),
                        data
                    })
                });
            } catch (e) {
                reject(e.message)
            }
        }))
    },

    /**
     *
     * @param {String} S3_bucketName
     * @param {String} key
     * @returns {Promise<unknown>}
     */
    delete: async (S3_bucketName, key) => {

        // create new promise
        return new Promise(((resolve, reject) => {

            //configuring parameters
            const params = {
                Bucket: S3_bucketName,
                Key: key,
            };

            // call main delete function
            try {
                s3.deleteObject(params, function (err, data) {

                    // an error occurred
                    if (err) reject(err, err.stack);

                    // successful response
                    else resolve(data)
                });
            } catch (e) {
                reject(e.message)
            }
        }))
    },


    /**
     *
     * @param {String} S3_bucketName
     * @param {String} key
     */
    get(S3_bucketName, key) {

        //configuring parameters
        const params = {
            Bucket: S3_bucketName,
            Key: key,
        };

        // call main get function
        const file = s3.getObject(params);
        return file.createReadStream()
    }
}

/**
 *
 * @param {String} S3_bucketName
 * @param {String} name
 * @param {String} extension
 * @returns {Promise<unknown>}
 */
function listObjects(S3_bucketName, name, extension) {

    return new Promise(((resolve, reject) => {

        //configuring parameters
        const params = {
            Bucket: S3_bucketName,
            Prefix: name,
        };

        // create new regexp for filter
        let reg = new RegExp(`${extension}$`)

        // find objects
        s3.listObjects(params, function (err, data) {
            // an error occurred
            if (err)
                return reject(err)

            // instant filter with regexp
            return resolve(data?.Contents?.filter((element) => reg.test(element.Key)))
        })
    }))
}

/**
 *
 * @param {Object} elements
 * @param {String} name
 * @param {String} extension
 * @param {String} folder
 * @returns {string}
 */
function addVersion(elements, name, extension, folder) {

    // name with new version key
    let nameWithVersion = null;
    // starting version
    let version = 1;

    // loop while
    while (true) {

        // create new name with version
        nameWithVersion = `${folder}/${name}-${version}${extension}`

        // find object if exists
        let obj = elements.find((element) => element.Key === nameWithVersion)
        if (obj) // if object exists means file already exists with this version
            version++
        else // if no , break loop and return new version name
            break
    }

    return nameWithVersion
}
