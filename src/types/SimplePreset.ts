import { Color } from "./Color"

export type GradientBreakpoint = {
    color: Color
    brightness: number
    /**
     * position on the gradient from 0 to 1
     */
    position: number
}

export type SimplePreset = {
    type: "simple"
    breakpoints: GradientBreakpoint[]
}