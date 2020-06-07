import environment from "./environment"
import { clear, clearAndFlush, renderBuffer } from "./functions/ledCommands"
import sleep from "./functions/sleep"
import { Renderer } from "./types/Rendering"
import { Time } from "./types/Time"

let running = false

function setRunning(val: boolean) {
    running = val
    if (running) {
        rendering()
    } else {
        clearAndFlush()
    }
}

const getRunning = () => running

const nullRenderer: Renderer = {
    changing: false,
    render: () => {}
}

let renderer: Renderer = nullRenderer

function setRenderer(newRenderer: Renderer) {
    renderer = newRenderer
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

async function rendering() {
    if (!renderer) return

    const startTime = process.hrtime()
    let lastTime = startTime
    while (running) {
        console.log("render")
        const newTime = process.hrtime()

        clear()

        renderer.render(calculateTime(startTime, lastTime, newTime))

        await renderBuffer()

        if (renderer.changing) {
            await sleep(environment.LOOP_INTERVAL_MS)
        } else {
            await sleep(500)
        }

        lastTime = newTime
    }
}

export { setRunning, getRunning, setRenderer }
