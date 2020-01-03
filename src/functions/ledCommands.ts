import { writeCommand } from "../ws2812srvConnection"

function setup(ledAmount: number, brightness: number) {
    writeCommand(`setup 1,${ledAmount},3,0,${brightness}`)
    writeCommand("init")
}

function render() {
    writeCommand("render")
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

function clear() {
    setColor("000000")
    render()
}

export { setup, render, setColor, setColorAtPos, setBrightness, clear }