import express from "express";
const router = express.Router();

import role_controller from "../controller/role.controller.js"
import verify from "../service/auth/verify.js";
import onlyAdmin from "../service/auth/onlyAdmin.js";


let prefix = '/role'

router.post('/save', verify, onlyAdmin, role_controller.save)
router.delete('/delete', verify, onlyAdmin, role_controller.delete)
router.get('/list', verify, onlyAdmin, role_controller.list)

export default { router, prefix }