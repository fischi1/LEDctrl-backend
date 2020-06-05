import { SimplePreset } from "./SimplePreset"

//transitions

export type SmoothTransition = {
    type: "smooth"
    //duration in s
    duration: number
}

export type ImmediateTransition = {
    type: "immediate"
}

export type Transition = SmoothTransition | ImmediateTransition

//complex preset

export type ComplexPresetItem = {
    preset: SimplePreset
    transition: Transition
}

export type ComplexPreset = {
    type: "complex"
    items: ComplexPresetItem[]
}
