import { WHITE } from "../constants/Colors"
import environment from "../environment"
import { multiplyScalar } from "../functions/colorHelpers"
import { setColorAtPos } from "../functions/ledCommands"
import { Color } from "../types/Color"
import { Renderer } from "../types/Rendering"

function normFunc(val: number, maxDistance: number): number {
    if (val > maxDistance) return 0

    const relativeDistance = 1 - val / maxDistance

    return Math.pow(relativeDistance, 5)
}

export type PingPongProps = {
    color?: Color
    transitionTime?: number
    radius?: number
}

function pingPongRenderer(props: PingPongProps = {}): Renderer {
    const { color = WHITE, transitionTime = 5, radius = 15 } = props

    let timer = 0

    let up = true

    return {
        changing: true,
        render: (time) => {
            timer += time.deltaTime

            if (timer > transitionTime) {
                timer = 0
                up = !up
            }

            const pos =
                (up ? timer / transitionTime : 1 - timer / transitionTime) *
                environment.LED_AMOUNT

            for (let i = 0; i < environment.LED_AMOUNT; i++) {
                const relativeDistance = Math.abs(i - pos)

                setColorAtPos(
                    multiplyScalar(color, normFunc(relativeDistance, radius)),
                    i
                )
            }
        }
    }
}

export default pingPongRenderer
