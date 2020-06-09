import { PingPongProps } from "../rendering/pingPongRenderer"
import { RainbowProps } from "../rendering/rainbowRenderer"
import { StroboscopeProps } from "../rendering/stroboscopeRenderer"

type PingPong = {
    type: "pingPong"
    props: PingPongProps
}

type Stroboscope = {
    type: "stroboscope"
    props: StroboscopeProps
}

type Rainbow = {
    type: "rainbow"
    props: RainbowProps
}

export type EffectPreset = {
    type: "effect"
    effect: PingPong | Stroboscope | Rainbow
}
