import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const RoleSchema = new Schema({

    name:{
        type: String,
    },
}, schemaOptions);

const Role = mongoose.model('role', RoleSchema);
export default Role;