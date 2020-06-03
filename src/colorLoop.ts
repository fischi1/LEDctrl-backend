import sleep from "./functions/sleep"
import { setColorAtPos, BLANK_COLOR, render } from "./functions/ledCommands"
import environment from "./environment"

let running = true
let currentColor = "FFFFFF"

function getRunning() {
    return running
}

function setRunning(val: boolean) {
    running = val
    if (running) startColorLoop()
}

function setCurrentColor(val: string) {
    currentColor = val
}

let pos = 0
let dir = true

async function startColorLoop() {
    while (running) {
        for (let i = 0; i < environment.LED_AMOUNT; i++) {
            determineColor(pos, i, dir)
        }

        pos++

        if (pos >= environment.LED_AMOUNT) {
            pos = 0
            dir = !dir
        }

        await render()

        await sleep(environment.LOOP_INTERVAL_MS)
    }
}

function determineColor(curpos: number, ledIndex: number, dir: boolean) {
    if (Math.abs(curpos - ledIndex) < environment.COLOR_LOOP_WIDTH)
        setColorAtPos(
            currentColor,
            dir ? ledIndex : environment.LED_AMOUNT - 1 - ledIndex
        )
    else
        setColorAtPos(
            BLANK_COLOR,
            dir ? ledIndex : environment.LED_AMOUNT - 1 - ledIndex
        )
}

export { getRunning, setRunning, setCurrentColor, startColorLoop }
