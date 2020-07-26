import {
    BLUE,
    CYAN,
    GREEN,
    PURPLE,
    RED,
    WHITE,
    YELLOW
} from "../constants/Colors"
import environment from "../environment"
import { setColorAtPos } from "../functions/ledCommands"
import { Color } from "../types/Color"
import { Renderer } from "../types/Rendering"
import { multiplyScalar } from "../functions/colorHelpers"

export type RainbowProps = {
    width?: number
    ledsPerSecond?: number
    brightness?: number
}

function calcForPos(
    pos: number,
    time: number,
    width: number,
    ledsPerSecond: number
): Color {
    const val = Math.floor(pos / width + (time * ledsPerSecond) / width)
    switch (val % 6) {
        case 0:
            return RED
        case 1:
            return YELLOW
        case 2:
            return GREEN
        case 3:
            return CYAN
        case 4:
            return BLUE
        case 5:
            return PURPLE
        default:
            console.warn("invalid % result")
            return WHITE
    }
}

function rainbowRenderer(props: RainbowProps = {}): Renderer {
    const { width = 30, ledsPerSecond = 2, brightness = 1 } = props

    return {
        changing: true,
        render: (time) => {
            for (let i = 0; i < environment.LED_AMOUNT; i++) {
                setColorAtPos(
                    multiplyScalar(
                        calcForPos(i, time.time, width, ledsPerSecond),
                        brightness
                    ),
                    i
                )
            }
        }
    }
}

export default rainbowRenderer
