import { BLACK } from "../constants/Colors"
import environment from "../environment"
import { lerp, multiplyScalar } from "../functions/colorHelpers"
import deepCopy from "../functions/deepCopy"
import { setColorAtPos } from "../functions/ledCommands"
import { Color } from "../types/Color"
import { RenderFunction } from "../types/RenderFunction"
import { GradientBreakpoint, SimplePreset } from "../types/SimplePreset"

let preset: SimplePreset | null = null

const startPlaceHolder: GradientBreakpoint = {
    brightness: 1,
    color: BLACK,
    position: 0
}

const endPlaceholder: GradientBreakpoint = {
    brightness: 1,
    color: BLACK,
    position: 1
}

let calculcatedColors: Color[] = []

function setPreset(newPreset: SimplePreset) {
    preset = deepCopy(newPreset)

    if (newPreset.breakpoints.length > 0) {
        preset.breakpoints.unshift({
            ...preset.breakpoints[0],
            position: 0
        })

        preset.breakpoints.push({
            ...preset.breakpoints[preset.breakpoints.length - 1],
            position: 1
        })

        console.log(preset)

        determineColorGradient()
        calculcatedColors.forEach((c, i) => console.log(i, c))
    } else {
        console.error("no breakpoints set for this simple preset")
    }
}

function determineColorGradient() {
    calculcatedColors = []
    for (let i = 0; i < environment.LED_AMOUNT; i++) {
        const relativePos = i / (environment.LED_AMOUNT - 1)

        console.log(`${i}: ${relativePos}`)
        const foundBreakpoints = findBreakpoints(relativePos)
        console.log(foundBreakpoints)
        if (foundBreakpoints.length === 2) {
            const color = calcColor(
                foundBreakpoints[0],
                foundBreakpoints[1],
                relativePos
            )
            console.log(color)
            calculcatedColors[i] = color
        }
        console.log()
        console.log()
    }
}

function findBreakpoints(pos: number): GradientBreakpoint[] {
    if (!preset) return []
    const breakpoints = preset.breakpoints
    for (let i = 0; i < breakpoints.length; i++) {
        const prev = breakpoints[i - 1]
        const next = breakpoints[i]

        if (prev && next && pos >= prev.position && pos <= next.position)
            return [prev, next]
    }

    return []
}

function calcColor(
    breakpointA: GradientBreakpoint,
    breakpointB: GradientBreakpoint,
    pos: number
): Color {
    const denominator = Math.max(
        breakpointB.position - breakpointA.position,
        0.0000000001
    )
    const t = (pos - breakpointA.position) / denominator
    console.log("t: " + t)
    return lerp(
        multiplyScalar(breakpointA.color, breakpointA.brightness),
        multiplyScalar(breakpointB.color, breakpointB.brightness),
        t
    )
}

const renderSimplePreset: RenderFunction = (time) => {
    calculcatedColors.forEach((c, i) => setColorAtPos(c, i))
}

export { renderSimplePreset, setPreset }
