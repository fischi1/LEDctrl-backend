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

function smoothMovementRenderer(color: Color): Renderer {
    let timer = 0
    const transTime = 5

    let up = true

    return {
        changing: true,
        render: (time) => {
            timer += time.deltaTime

            if (timer > transTime) {
                timer = 0
                up = !up
            }

            const pos =
                (up ? timer / transTime : 1 - timer / transTime) *
                environment.LED_AMOUNT

            for (let i = 0; i < environment.LED_AMOUNT; i++) {
                const relativeDistance = Math.abs(i - pos)

                setColorAtPos(
                    multiplyScalar(color, normFunc(relativeDistance, 15)),
                    i
                )
            }
        }
    }
}

export default smoothMovementRenderer
