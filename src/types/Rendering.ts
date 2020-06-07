import { Time } from "./Time"

export type RenderFunction = (time: Time) => void

export type Renderer = {
    changing: boolean
    render: RenderFunction
}
