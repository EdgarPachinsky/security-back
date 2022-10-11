import rolesRepository from "../../../../db/repository/role.repository.js"

export default async (req, roleName) => {

    const role = await rolesRepository.findRole(roleName)

    const user = req.user.user
    const rolesOfUser = user.role

    const contains = rolesOfUser.findIndex(event => event._id.toString() === role._id.toString())

    return contains !== -1
};
