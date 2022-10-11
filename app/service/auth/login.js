import jwt from "jsonwebtoken"
import User from "../../../db/model/user.model.js";
import user_password_utils from "../user_password_utils.js";
import constants from "../../constant/constants.js";

export default async (req, res) => {

    // gte username and password from request
    // let username = req.body.username;
    // let password = req.body.password;
    let passportNo = req.body.passportNo;

    // initialize user variable to store user data try to find user
    let user = null
    try {
        user = await User.findOne({
            passportNo,
        })
            .select('_id fullName passportNo username')
            .lean()

    } catch (e) {
        return res.send({
            status: "error",
            message: e.message,
            data:[]
        })
    }

    if (!user)
        return res.send({
            status: "error",
            message: "wrong username or password or user disabled",
            data:[]
        })

    // now lets check if user typed right password
    // if (!await user_password_utils.isSame(password, user.password))
    //     return res.send({
    //         status: "error",
    //         message: "wrong username or password"
    //     })

    try {
        // delete password from data , we do not want to store sensitive data in encrypted token
        // delete user.password

        // sign a token with user data and 1 hour of expire time
        jwt.sign({user: user}, constants.APP_SECRET, {
            expiresIn: constants.TOKEN_EXPIRATION_TIME
        }, (err, token) => {

            return res.send({
                user,token
            })
        })
    }catch (e){
        return res.send({
            status: 'critical error',
            message: 'User login attempt failed',
            data: {
                user: user,
            },
        })
    }
};
