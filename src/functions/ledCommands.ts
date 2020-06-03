import { writeCommand, sendBufferedCommands } from "../ws2812srvConnection"

const BLANK_COLOR = "000000"

function setup(ledAmount: number, brightness: number) {
    writeCommand(`setup 1,${ledAmount},3,0,${brightness}`)
    writeCommand("init")
}

async function render() {
    writeCommand("render")
    await sendBufferedCommands()
}

function setColor(color: string) {
    writeCommand(`fill 1,${color}`)
}

function setColorAtPos(color: string, pos: number) {
    writeCommand(`fill 1,${color},${pos},1`)
}

function setBrightness(val: number) {
    writeCommand(`brightness 1,${val}`)
}

async function clear() {
    setColor(BLANK_COLOR)
    await render()
}

export {
    BLANK_COLOR,
    setup,
    render,
    setColor,
    setColorAtPos,
    setBrightness,
    clear
}
