export type GradientBreakpoint = {
    color: string
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