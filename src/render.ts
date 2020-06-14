import environment from "./environment"
import { consoleLog } from "./functions/console"
import { clear, clearAndFlush, renderBuffer } from "./functions/ledCommands"
import { Renderer } from "./types/Rendering"
import { Time } from "./types/Time"

let running = false

let timeout: NodeJS.Timeout | undefined
let rendererCounter = 0

function stopCurrentRenderer() {
    if (timeout) clearTimeout(timeout)
    timeout = undefined
}

function setRunning(val: boolean) {
    running = val
    if (running) {
        rendering(++rendererCounter)
    } else {
        stopCurrentRenderer()
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
    stopCurrentRenderer()
    if (running) rendering(++rendererCounter)
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

function rendering(count: number) {
    if (!renderer) return

    const localRenderer = renderer

    const startTime = process.hrtime()
    let lastTime = startTime
    const rendererCount = count

    const renderLoop = async () => {
        if (rendererCount !== rendererCounter) return

        consoleLog("render " + rendererCount)
        const newTime = process.hrtime()

        clear()

        localRenderer.render(calculateTime(startTime, lastTime, newTime))

        await renderBuffer()

        if (localRenderer.changing) {
            timeout = setTimeout(() => {
                lastTime = newTime
                renderLoop()
            }, environment.LOOP_INTERVAL_MS)
        } else {
            timeout = setTimeout(() => {
                lastTime = newTime
                renderLoop()
            }, 2000)
        }
    }
    renderLoop()
}

export { setRunning, getRunning, setRenderer }
