import connection from "./connect.js"
import User from './model/user.model.js'
import Role from './model/role.model.js'
import helper from "../app/service/helper.js";

let seedUser = async (roles) => {

    return new Promise(async (resolve, reject) => {

        let dummyData = [

            {
                fullName: "Test1 Test1",
                username: "Test1",
                email:  "test1@gmail.com",
                password: "test1",
                isDisabled: false,
                role:[roles[0]],
                device:[],
            },
            {
                fullName: "Test2 Test2",
                username: "Test2",
                email:  "test2@gmail.com",
                password: "test2",
                isDisabled: false,
                role:[roles[1]],
                device:[],
            }
        ]

        let createdUsers = []

        for (let i = 0; i < dummyData.length; i++) {

            if(!await User.findOne({ username:dummyData[i].username })) {

                await User.create(dummyData[i])
                createdUsers.push({
                    username:dummyData[i].username,
                    password:dummyData[i].password,
                })
            }
        }

        resolve(createdUsers)
    })
}
let seedRole = async () => {

    return new Promise(async (resolve, reject) => {

        let dummyData = [
            {
                name: "admin",
            },
            {
                name: "public",
            }
        ]

        let createdRoles = []

        for (let i = 0; i < dummyData.length; i++) {

            if(!await Role.findOne({ name:dummyData[i].name })) {

                let role = await Role.create(dummyData[i])
                createdRoles.push(role)
            }
        }

        resolve(createdRoles)
    })
}

// connect script to DB
connection.connect().then(() => {
    console.log("Seeder connected to db")

    // try to seed tables
    try {

        // seeding role table
        seedRole().then(data => {
            console.log('Seeded roles', data)

            // seeding user table
            seedUser(data).then(data => {
                console.log('Seeded user', data)

                helper.exitApp(0, "Tables seeded successfully")
            })
        })
    }catch (e){
        helper.exitApp(1, e.message)
    }
}).catch(() => {
    console.log("Seeder connection failed , exiting script")
    helper.exitApp(1)
})