import { PingPongProps } from "../rendering/pingPongRenderer"
import { StroboscopeProps } from "../rendering/stroboscopeRenderer"

type PingPong = {
    type: "pingPong",
    props: PingPongProps
}

type Stroboscope = {
    type: "stroboscope",
    props: StroboscopeProps
}

export type EffectPreset = {
    type: "effect"
    effect: PingPong | Stroboscope
}