import userRepository from "../../db/repository/user.repository.js"
import formidable from "formidable"
import s3_service from '../service/aws_s3.js'

import * as crypto from 'crypto';
import * as fs from 'fs';

export default {

    save: async (req, res) => {


        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {

            if(err)
                return res.send({status:"error",message:err});

            // if(files.file) {
            //     const uploadToS3 = await s3_service.upload(
            //         process.env.BUCKET_NAME,
            //         files.file,
            //         null,
            //     );
            //
            //     fields.avatar = uploadToS3.getLink
            // }

            // fields.role = fields.role?JSON.parse(fields.role):[]
            // fields.device = fields.device?JSON.parse(fields.device):[]

            let fullName = crypto.randomUUID();
            let originalFullName = '';
            if(fields.passportData){
                fields.passportData = JSON.parse(fields.passportData);

                if(fields.passportData && fields.passportData.fullName){
                    fullName = fields.passportData.fullName.replace(' ', '') + '_' + fullName;
                    originalFullName = fields.passportData.fullName;
                    if(fields.scannedDoc && fields.profileImage){
                        const scannedDoc = fields.scannedDoc.replace(/^data:image\/png;base64,/, "");
                        const profileImage = fields.profileImage.replace(/^data:image\/png;base64,/, "");

                        console.log(fullName)
                        return fs.writeFile(`static/doc-data/${fullName}_doc.png`, scannedDoc, 'base64', function(err) {
                            return fs.writeFile(`static/doc-data/${fullName}_profile.png`, profileImage, 'base64', function(err) {

                                let objToSave = {
                                    fullName: originalFullName,
                                    passportNo: fields.passportData.passportSerial,
                                    username: `username_${fullName}`,
                                    password: `test`
                                }
                                return userRepository.save(objToSave).then(() => {
                                    return res.send({ saved : true });
                                });
                            });
                        });
                    }
                }
            }else{
                return res.send({ saved : false });
            }
        });
    },

    delete: async (req, res) => {
        const result = await userRepository.delete({_id:req.params.id});
        res.send({
            status:result && result.ok?"success":"error",
            message:result && result.ok?"User deleted":"No any user deleted",
            data:result
        });
    },

    list: async (req, res) => {
        const result = await userRepository.list();
        res.send({
            status:"success",
            message:result && result.length>0?"Users found":"No any users",
            data:result
        });
    },

    resetPasswordRequest: async (req, res) => {
        const result = await userRepository.resetPasswordRequest(req.body);
        res.send(result);
    },
    changePasswordLinkCheck: async (req, res) => {
        const result = await userRepository.changePasswordLinkCheck(req.body);
        res.send(result);
    },
    changePasswordMain: async (req, res) => {
        const result = await userRepository.changePasswordMain(req.body);
        res.send(result);
    },


    getUser: async (req, res) => {
        let user  = req.user.user
        const result = await userRepository.getOne(user._id);

        res.send({
            status:"success",
            message:result?"User found":"No any user",
            user:result
        });
    },

    getUserForAdmin: async (req, res) => {
        const id = req.params.id
        const result = await userRepository.getOneFull(id);

        res.send({
            status:"success",
            message:result?"User found":"No any user",
            user:result
        });
    },

    changeStatus: async (req, res) => {

        const result = await userRepository.changeStatus({_id:req.body._id});

        res.send({
            status:result && result.ok?"success":"error",
            message:result && result.ok?"User deleted":"No any user deleted",
            data:result
        });
    },

    myDevices: async (req, res) => {
        let user  = req.user.user
        const result = await userRepository.getMyDevices({_id:user._id});

        res.send({
            status:"success",
            message:"Device list",
            data:result
        });
    },
};
