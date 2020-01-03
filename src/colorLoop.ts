import sleep from "./functions/sleep"

let running = true
let color = "000000"

let i = 0

function getRunning() {
    return running
}

function setRunning(val: boolean) {
    running = val
    if(running)
        run()
}

function setColor(val: string) {
    color = val
}

async function run() {
    while(running) {
        console.log(i++)
        console.log(color)
        await sleep(100)
    }
}

export {getRunning, setRunning, setColor, run}