import sleep from "./functions/sleep"
import {
    setColorAtPos,
    BLANK_COLOR,
    renderBuffer,
    setColor,
    clear
} from "./functions/ledCommands"
import environment from "./environment"
import { Time } from "./types/Time"

let running = true

const setRunning = (val: boolean) => (running = val)

const getRunning = () => running

const diffTime = (a: number[], b: number[]): number[] => {
    return [a[0] - b[0], a[1] - b[1]]
}

const convertToS = (hrtime: number[]) => {
    return hrtime[0] + hrtime[1] / 1000000000
}

const calculateTime = (
    startTime: number[],
    lastTime: number[],
    newTime: number[]
): Time => {
    return {
        time: convertToS(diffTime(newTime, startTime)),
        deltaTime: convertToS(diffTime(newTime, lastTime))
    }
}

async function startLoop() {
    const startTime = process.hrtime()
    let lastTime = startTime
    while (running) {
        const newTime = process.hrtime()

        clear()
        render(calculateTime(startTime, lastTime, newTime))

        await renderBuffer()
        await sleep(environment.LOOP_INTERVAL_MS)

        lastTime = newTime
    }
}

let timer = 0
let pos = 0

const render = (time: Time) => {
    timer += time.deltaTime

    // setColorAtPos("ffffff", 100)

    if (timer > 0.025) {
        timer = 0
        setColorAtPos("ffffff", (pos++) % environment.LED_AMOUNT)
    }
}

export { startLoop, setRunning, getRunning }
