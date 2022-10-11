import connection from "../connect.js"
import schemaOptions from "../../app/constant/schema_constants.js"

const mongoose = connection.getMongoose()
const Schema = mongoose.Schema;

const PasswordChangeSchema = new Schema({

    user:{
        type: Schema.ObjectId,
        ref: "user",
        required: true,
    },
    link:{
        type: String,
        required: true,
        unique:true,
    },
    expiresAt:{
        type: Date,
    }
}, schemaOptions);

const PasswordChange = mongoose.model('passwordChange', PasswordChangeSchema);
export default PasswordChange;