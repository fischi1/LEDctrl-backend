import environment from "./environment"
import { clear, renderBuffer, setColorAtPos } from "./functions/ledCommands"
import sleep from "./functions/sleep"
import { Color } from "./types/Color"
import { Time } from "./types/Time"
import convertColorToString from "./functions/convertColor"
import { multiplyScalar } from "./functions/colorHelpers"

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
const transTime = 5

const color: Color = {
    r: 1,
    g: 0,
    b: 0
}

function normFunc(val: number, maxDistance: number): number {
    if (val > maxDistance) return 0

    const relativeDistance = 1 - val / maxDistance

    return Math.pow(relativeDistance, 5)
}

const render = (time: Time) => {
    timer += time.deltaTime

    if (timer > transTime) {
        timer = 0
    }

    const pos = (timer / transTime) * environment.LED_AMOUNT
    // const pos = 50

    for (let i = 0; i < environment.LED_AMOUNT; i++) {
        const relativeDistance = Math.abs(i - pos)

        setColorAtPos(multiplyScalar(color, normFunc(relativeDistance, 5)), i)
    }
}

export { startLoop, setRunning, getRunning }
