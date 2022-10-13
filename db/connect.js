// DB IMPORTS
import mongoose from "mongoose";
import db_config from "../db/dbconfig.js"
import db_config_additional from "../db/dbconfig_additional.js"
import constants from "../app/constant/constants.js";

// local db connection string
// const connectionString = `${db_config.db_prefix}${db_config.db_host}:${db_config.db_port}/${db_config.db_name}`
// remote db connection string
const connectionString = `${db_config.db_prefix}${db_config.db_user}:${db_config.db_pass}@${db_config.db_host}/${db_config.db_name}?retryWrites=true&w=majority`

// EXPORT FUNCTION FOR DB CONNECTION TO USE IN INDEX.JS FILE
export default {
    connect: (resolve, reject) => {
        return new Promise((resolve, reject) => {
            mongoose.connect(
                connectionString,
                db_config_additional, async (err) => {
                    if (!err)
                        resolve(`CONNECTED TO DB WITH PORT:${db_config.db_port}`)
                    else {
                        console.log(err)
                        reject(err)
                    }
                }
            )
        })
    },
    getMongoose() {
        return mongoose;
    },
    connectionStr() {
        return connectionString
    }
}