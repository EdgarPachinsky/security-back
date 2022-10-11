import roleRepository from "../../db/repository/role.repository.js"

export default {

    save: async (req, res) => {
        const result = await roleRepository.save(req.body);
        res.send(result);
    },

    delete: async (req, res) => {
        const result = await roleRepository.delete(req.body);
        res.send(result);
    },

    list: async (req, res) => {
        const result = await roleRepository.list();

        res.send({
            status:"success",
            message:result && result.length>0?"Roles found":"No any role",
            data:result
        });
    },
};
