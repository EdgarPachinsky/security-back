import net from "net"

const client = new net.Socket();

const PORT = 8080
const HOST = "localhost"

const id = "61a7df71272dc338cc9c4c53"

client.connect(PORT, HOST, function() {
    console.log(`CONNECTING TO->${HOST}:${PORT}, writing handshake to server`);
});

const dataToSend = {
    device: id,
    goatId: 1,
    weight: 300,
}

setTimeout(function (){
    client.write(JSON.stringify(dataToSend));
},1000)

setTimeout(function (){
    client.destroy();
},3000)