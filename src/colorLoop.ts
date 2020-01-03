import sleep from "./functions/sleep"
import { setColorAtPos, BLANK_COLOR, render } from "./functions/ledCommands"

const LED_AMOUNT = process.env.LED_AMOUNT ? +process.env.LED_AMOUNT : 101

const EFFECT_WIDTH = 20

let running = true
let currentColor = "FFFFFF"

function getRunning() {
    return running
}

function setRunning(val: boolean) {
    running = val
    if(running)
        startColorLoop()
}

function setCurrentColor(val: string) {
    currentColor = val
}

let pos = 0
let dir = true

async function startColorLoop() {
    while(running) {

        for(let i = 0; i < LED_AMOUNT; i++) {
            determineColor(pos, i, dir)
        }

        pos++
        
        if(pos >= LED_AMOUNT) {
            pos = 0
            dir = !dir
        }

        await render()

        await sleep(10)
    }
}

function determineColor(curpos: number, ledIndex: number, dir: boolean) {
    if(Math.abs(curpos-ledIndex) < EFFECT_WIDTH)
        setColorAtPos(currentColor, dir ? ledIndex : (LED_AMOUNT - 1) - ledIndex)
    else
        setColorAtPos(BLANK_COLOR, dir ? ledIndex : (LED_AMOUNT - 1) - ledIndex)
}

export { getRunning, setRunning, setCurrentColor, startColorLoop }