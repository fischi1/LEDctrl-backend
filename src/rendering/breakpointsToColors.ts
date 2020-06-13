import environment from "../environment"
import { lerp } from "../functions/colorHelpers"
import deepCopy from "../functions/deepCopy"
import { Color } from "../types/Color"
import { GradientBreakpoint } from "../types/SimplePreset"

function breakpointsToColors(breakpointArray: GradientBreakpoint[]): Color[] {
    console.log(
        "generating colors from an array of breakpoints",
        breakpointArray
    )
    const breakpoints = deepCopy(breakpointArray)

    if (breakpoints.length > 0) {
        breakpoints.unshift({
            ...breakpoints[0],
            position: 0
        })

        breakpoints.push({
            ...breakpoints[breakpoints.length - 1],
            position: 1
        })

        const colors = determineColorGradient(breakpoints)
        return colors
    } else {
        console.error("no breakpoints set for this simple preset")
    }
    return []
}

function determineColorGradient(breakpoints: GradientBreakpoint[]) {
    const colors: Color[] = []
    for (let i = 0; i < environment.LED_AMOUNT; i++) {
        const relativePos = i / (environment.LED_AMOUNT - 1)

        const foundBreakpoints = findBreakpoints(relativePos, breakpoints)
        if (foundBreakpoints.length === 2) {
            const color = calcColor(
                foundBreakpoints[0],
                foundBreakpoints[1],
                relativePos
            )
            colors[i] = color
        }
    }
    return colors
}

function findBreakpoints(
    pos: number,
    breakpoints: GradientBreakpoint[]
): GradientBreakpoint[] {
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

    return lerp(breakpointA.color, breakpointB.color, t)
}

export default breakpointsToColors
