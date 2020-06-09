import { PingPongProps } from "../rendering/pingPongRenderer"

type PingPong = {
    type: "pingPong",
    props: PingPongProps
}


export type EffectPreset = {
    type: "effect"
    effect: PingPong
}