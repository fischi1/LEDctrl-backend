import { Color } from "../types/Color"
import { sendBufferedCommands, writeCommand } from "../ws2812srvConnection"
import convertColorToString from "./convertColor"

const BLANK_COLOR = "000000"

function setup(ledAmount: number, brightness: number) {
    writeCommand(`setup 1,${ledAmount},3,0,${brightness}`)
    writeCommand("init")
}

async function renderBuffer() {
    writeCommand("render")
    await sendBufferedCommands()
}

function setColor(color: Color) {
    setColorStr(convertColorToString(color))
}

function setColorStr(color: string) {
    writeCommand(`fill 1,${color}`)
}

function setColorAtPos(color: Color, pos: number) {
    setColorAtPosStr(convertColorToString(color), pos)
}

function setColorAtPosStr(color: string, pos: number) {
    writeCommand(`fill 1,${color},${pos},1`)
}

function setBrightness(val: number) {
    writeCommand(`brightness 1,${val}`)
}

function clear() {
    setColorStr(BLANK_COLOR)
}

async function clearAndFlush() {
    setColorStr(BLANK_COLOR)
    await renderBuffer()
}

export {
    BLANK_COLOR,
    setup,
    renderBuffer,
    setColor,
    setColorStr,
    setColorAtPos,
    setColorAtPosStr,
    setBrightness,
    clear,
    clearAndFlush
}
