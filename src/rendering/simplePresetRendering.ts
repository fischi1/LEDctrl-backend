import deepCopy from "../functions/deepCopy"
import { setColorAtPos } from "../functions/ledCommands"
import { Color } from "../types/Color"
import { RenderFunction } from "../types/Rendering"
import { SimplePreset } from "../types/SimplePreset"
import breakpointsToColors from "./breakpointsToColors"

let preset: SimplePreset | null = null

let calculcatedColors: Color[] = []

function setPreset(newPreset: SimplePreset) {
    preset = deepCopy(newPreset)
    calculcatedColors = breakpointsToColors(newPreset.breakpoints)
}

const renderSimplePreset: RenderFunction = (time) => {
    calculcatedColors.forEach((c, i) => setColorAtPos(c, i))
}

export { renderSimplePreset, setPreset }
