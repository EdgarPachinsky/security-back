// load new environment variables into main env object
dotenv.config()

// CORE IMPORTS FOR APPLICATION
import express from 'express'
import bodyParser from "body-parser";
import constants from "./app/constant/constants.js";
import connection from "./db/connect.js"
import route_collector from "./app/service/route_collector.js";
import helper from "./app/service/helper.js";
import dotenv from "dotenv"
import cors from "cors"
import ip from 'ip'
import socket from "./tcp-socket.js"

const app = express()

const runOnIp = process.env.npm_config_ip || false
let host = '127.0.0.1' // default localhost

const port = process.env.npm_config_port || 3000
const socketPort = process.env.npm_config_socetport || 8080
if(runOnIp === 'true')
    host = ip.address()
else if(runOnIp !== false)
    host = runOnIp


// INITIALIZE USING APPLICATION
app.use(bodyParser.urlencoded({extended: false, limit: '10mb', parameterLimit: 30000}));
app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}));

app.listen(port , (err) => {

    if (!err) {


        console.log(`SERVER STARTED -> ${host}:${port}`)

        route_collector.collect().then( (data) => {
            try {
                for (const file of data) {
                    // try to import rout files
                    import('./app/rout/' + file).then((data) => {
                        // check if router exists and file is not empty
                        if (data && data.default && data.default.router) {
                            if (!data.default.prefix)
                                app.use(data.default.router) // then use router in app
                            else {
                                app.use(data.default.prefix, data.default.router)
                            }
                        }
                    })
                }
            } catch (e){
                helper.exitApp(0,"Failed to collect routes, exiting application")
            }

            connection.connect().then(() => {

                console.log(`CONNECTED TO DB -> ${connection.connectionStr()}`)
                socket.serverListen(socketPort, host).then(() => {

                    console.log(`SOCKET STARTED -> ${host}:${socketPort}`)
                }).catch( (err) => {
                    console.log(`SOCKET START FAIL -> ${err.message}`)
                    // helper.exitApp(0,err.message?err.message:err)
                })
            }).catch( (err) => {
                console.log(`CONNECT TO DB FAILED -> ${connection.connectionStr()}`)
                // helper.exitApp(0,err.message?err.message:err)
            })
        })
    } else {
        console.log(`APP RUN FAILED -> ${err.message}`)
        helper.exitApp(0,constants.APP_RUN_ERROR)
    }
})