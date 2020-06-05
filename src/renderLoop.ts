import environment from "./environment"
import { clear, renderBuffer } from "./functions/ledCommands"
import sleep from "./functions/sleep"
import { RenderFunction } from "./types/RenderFunction"
import { Time } from "./types/Time"

let running = true

function setRunning(val: boolean) {
    running = val
    if (running) startLoop()
}

const getRunning = () => running

let renderFunction: RenderFunction | null = null

function setRenderFunction(rf: RenderFunction) {
    renderFunction = rf
}

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
        if (renderFunction)
            renderFunction(calculateTime(startTime, lastTime, newTime))

        await renderBuffer()
        await sleep(environment.LOOP_INTERVAL_MS)

        lastTime = newTime
    }
}

export { startLoop, setRunning, getRunning, setRenderFunction }
