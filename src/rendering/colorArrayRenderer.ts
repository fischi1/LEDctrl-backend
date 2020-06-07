import { setColorAtPos } from "../functions/ledCommands"
import { Color } from "../types/Color"
import { Renderer } from "../types/Rendering"

const colorArrayRenderer = (colors: Color[]): Renderer => {
    return {
        changing: false,
        render: () => colors.forEach((c, i) => setColorAtPos(c, i))
    }
}

export { colorArrayRenderer }
