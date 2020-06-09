import { WHITE } from "../constants/Colors"
import { setColor } from "../functions/ledCommands"
import { Color } from "../types/Color"
import { Renderer } from "../types/Rendering"

export type StroboscopeProps = {
    color?: Color
    toggleDuration?: number
}

function stroboscopeRenderer(props: StroboscopeProps = {}): Renderer {
    const { color = WHITE, toggleDuration = 0.25 } = props

    let toggle = false
    let timer = 0

    return {
        changing: true,
        render: (time) => {
            timer += time.deltaTime

            if (timer > toggleDuration) {
                timer = timer - toggleDuration
                toggle = !toggle
            }

            if (toggle) setColor(color)
        }
    }
}

export default stroboscopeRenderer
