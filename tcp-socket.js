import net from "net"

// import historyRepository from "./db/repository/history.repository.js"

const server = net.createServer((socket) => {


    socket.on("data", dataString => {
        // console.log(dataString)

        let data = dataString.toString()
        console.log(data)
        //
        // try{
        //     data = JSON.parse(data)
        // }catch (e){
        //     console.log(e.message)
        //     return
        // }
        //
        // historyRepository.save(data).then((result) => {
        //     console.log(result)
        // })
    })

})

const serverListen = async (socketPort, socketHost) =>{

    return new Promise((resolve, reject) => {

        server.listen(socketPort, socketHost, (err) => {
            if(err)
                reject(err)

            resolve(true)
        })
    })
}

export default {
    serverListen
}