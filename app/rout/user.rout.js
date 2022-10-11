import express from "express";
const router = express.Router();

import login from '../service/auth/login.js'
import verify from "../service/auth/verify.js";
import onlyAdmin from "../service/auth/onlyAdmin.js";

import user_controller from "../controller/user.controller.js"

let prefix = '/user'

router.post('/login', login)

router.post('/reset-password-request', user_controller.resetPasswordRequest)
router.post('/reset-password-link-check', user_controller.changePasswordLinkCheck)
router.post('/reset-password-main', user_controller.changePasswordMain)

router.get('/my-devices', verify,  user_controller.myDevices)

router.post('/save', user_controller.save)
router.delete('/delete/:id', verify, onlyAdmin,user_controller.delete)
router.get('/list', verify, onlyAdmin, user_controller.list)
router.get('/get', verify , user_controller.getUser)
router.post('/change-status', verify , onlyAdmin, user_controller.changeStatus)
router.get('/get-for-admin/:id', verify , onlyAdmin, user_controller.getUserForAdmin)

export default { router, prefix }