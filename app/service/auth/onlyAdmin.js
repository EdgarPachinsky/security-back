import role_check from "./auth_utils/role_check.js";

export default async (req, res, next) => {

    const hasRole = await role_check(req, 'admin')

    if(!hasRole){

        return res.send({
            status: 'error',
            message: 'ACCESS_VIOLATION',
            description: 'Not allowed endpoint',
            payloadBody: {},
        });
    }else{
        next()
    }
};
