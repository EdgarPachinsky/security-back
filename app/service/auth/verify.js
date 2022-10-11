import jwt from "jsonwebtoken"
import constants from "../../constant/constants.js";

export default (req, res, next) => {

    let bearerToken;
    let bearerHeader = req.headers["authorization"];

    if (!bearerHeader)
        res.send({
            status: 'error',
            message: 'TOKEN_VIOLATION',
            description: 'No TOKEN provided',
            payloadBody: "",
        })


    let bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];

    if (bearer[0] !== "Bearer")
        return res.send({
            status: 'error',
            message: 'TOKEN_STRUCTURE_VIOLATION',
            description: 'Wrong structure of TOKEN provided',
            payloadBody: "",
        });


    jwt.verify(bearerToken, constants.APP_SECRET, function (err, decoded) {
        if (err)
            return res.send({
                status: 'error',
                message: 'ACCESS_VIOLATION',
                description: err,
                payloadBody: bearerHeader,
            });

        req.user = decoded;
        next();
    });

};
