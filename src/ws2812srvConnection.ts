import net from "net";

var client : net.Socket | null = null;

let commands: string[] = []

function connect(port: number, host: string) {
    client = new net.Socket();

    return new Promise((resolve, reject) => {
        if(client) {
            client.connect({ port: port, host: host }, function() {        
                console.log('TCP connection established with the server.')
                resolve()
            });
        
            client.on('end', () => {
                client = null
                console.log('tcp connection ended');
            });
    
            client.on("error", err => {
                client = null
                reject(err);
            })
            client.on("timeout", () => {
                client = null;
                reject("timeout")
            })
        }
    })
}

function disconnect() {
    try {
        client?.destroy()
    } catch(err) {
        console.error(err);
    }
    client = null;
}

function isConnected() {
    return !!client;
}

function writeCommand(command = "") {
    commands.push(command + "\n")
}

function sendBufferedCommands() {
    return new Promise((resolve, reject) => {
        
        client?.write(commands.join(""), err => {
            
            commands = []

            if(!!err)
                reject(err)
            else 
                resolve()
        })
    })
}

export { connect, disconnect, isConnected, sendBufferedCommands, writeCommand };