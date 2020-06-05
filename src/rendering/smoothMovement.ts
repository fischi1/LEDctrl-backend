import environment from "../environment"
import { multiplyScalar } from "../functions/colorHelpers"
import { setColorAtPos } from "../functions/ledCommands"
import { randomColor } from "../functions/randomColor"
import { Color } from "../types/Color"
import { RenderFunction } from "../types/RenderFunction"

let timer = 0
const transTime = 5

const color: Color = randomColor()

let up = true

function normFunc(val: number, maxDistance: number): number {
    if (val > maxDistance) return 0

    const relativeDistance = 1 - val / maxDistance

    return Math.pow(relativeDistance, 5)
}

const smoothMovement: RenderFunction = (time) => {
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

        setColorAtPos(multiplyScalar(color, normFunc(relativeDistance, 15)), i)
    }
}

export default smoothMovement
