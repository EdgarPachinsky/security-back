//TODO: fix underline in name

import fs from 'fs'
import constants from "../app/constant/constants.js";

// prototype for capitalization of string
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 *
 * @param {String} content
 * @returns {*}
 */
let replaceInContent = (content) => {
    // replace model names in text
    content = content.replace(M_N_U, modelName_capitalize)
    content = content.replace(M_N, modelName)

    return content
}

// save both names , to replace in text content
let modelName = process.env.npm_config_name
let modelName_capitalize = process.env.npm_config_name.capitalize()

console.log('----CREATING MODULE----')
console.log(`--> ${modelName}`)

// create regexp for further replacement
let M_N_U = new RegExp('__MODEL_NAME__UPPERCASE', 'g')
let M_N = new RegExp('__MODEL_NAME__', 'g')

// get templates directory
let templatesDir = '/app/template'
console.log('-----------------------')
/** -----------------------------------------CREATING MODEL------------------------------------------------ **/
// get model dir and template directories
let modelDir = '/db/model'

// read mongoose base model mock
let mockContent = fs.readFileSync(`${constants.ROOT_DIR}${templatesDir}/model.template`, "utf8")

// replace model names in text
mockContent = replaceInContent(mockContent)

fs.appendFile(`${constants.ROOT_DIR}${modelDir}/${modelName}.model.js`,
    mockContent,
    function (err) {
        if (err) throw err;
        console.log(`MODEL CREATED : 
    TYPE -> Mongoose Schema 
    DIR ->  ${constants.ROOT_DIR}${modelDir}/${modelName}.model.js
    DEFAULT FIELDS -> name: { type : String }
    `);
});
/** ---------------------------------------CREATING MODEL DONE---------------------------------------------- **/

/** ----------------------------------------- CREATING REPO ------------------------------------------------ **/
// get model dir and template directories
let repoDir = '/db/repository'

// read repository base model mock
mockContent = fs.readFileSync(`${constants.ROOT_DIR}${templatesDir}/repository.template`, "utf8")

// replace model names in text
mockContent = replaceInContent(mockContent)

fs.appendFile(`${constants.ROOT_DIR}${repoDir}/${modelName}.repository.js`,
    mockContent,
    function (err) {
        if (err) throw err;
        console.log(`REPO CREATED : 
    TYPE -> Repository for model 
    DIR ->  ${constants.ROOT_DIR}${repoDir}/${modelName}.repository.js
    DEFAULT FUNCTIONS -> save(add,edit) , list , delete 
    `);
});
/** -------------------------------------- CREATING REPO DONE --------------------------------------------- **/

/** ---------------------------------------- CREATING ROUT ------------------------------------------------ **/
// get model dir and template directories
let routDir = '/app/rout'

// read rout base model mock
mockContent = fs.readFileSync(`${constants.ROOT_DIR}${templatesDir}/rout.template`, "utf8")

// replace model names in text
mockContent = replaceInContent(mockContent)

fs.appendFile(`${constants.ROOT_DIR}${routDir}/${modelName}.rout.js`,
    mockContent,
    function (err) {
        if (err) throw err;
        console.log(`ROUT CREATED : 
    TYPE -> Rout for model 
    DIR ->  ${constants.ROOT_DIR}${routDir}/${modelName}.rout.js
    DEFAULT ROUTES -> 
         req.body -> { _id(optional): "ObjId" , ...NewOrEditedObj } -> .../${modelName}/save (will edit or save), 
         req.body -> { _id(required): "ObjId" } -> .../${modelName}/delete (will delete an object), 
         req.body -> {} -> .../${modelName}/list (will give you a list)
    `);
});
/** -------------------------------------- CREATING ROUT DONE --------------------------------------------- **/

/** ------------------------------------- CREATING CONTROLLER --------------------------------------------- **/
// get model dir and template directories
let controllerDir = '/app/controller'

// read controller base model mock
mockContent = fs.readFileSync(`${constants.ROOT_DIR}${templatesDir}/controller.template`, "utf8")

// replace model names in text
mockContent = replaceInContent(mockContent)

fs.appendFile(`${constants.ROOT_DIR}${controllerDir}/${modelName}.controller.js`,
    mockContent,
    function (err) {
        if (err) throw err;
        console.log(`CONTROLLER CREATED : 
    TYPE -> Controller for rout 
    DIR ->  ${constants.ROOT_DIR}${controllerDir}/${modelName}.controller.js
    DEFAULT FUNCTIONS -> save , delete , list 
    `);
});
/** ----------------------------------- CREATING CONTROLLER DONE ------------------------------------------ **/