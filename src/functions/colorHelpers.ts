import { Color } from "../types/Color"

function multiplyScalar(a: Color, s: number): Color {
    return {
        r: a.r * s,
        g: a.g * s,
        b: a.b * s
    }
}

function multiply(a: Color, b: Color): Color {
    return {
        r: a.r * b.r,
        g: a.g * b.g,
        b: a.b * b.b
    }
}

export { multiplyScalar, multiply }
