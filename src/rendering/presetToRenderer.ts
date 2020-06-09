import { Preset } from "../types/Preset"
import { Renderer, RenderFunction } from "../types/Rendering"
import breakpointsToColors from "./breakpointsToColors"
import { colorArrayRenderer } from "./colorArrayRenderer"
import { EffectPreset } from "../types/EffectPreset"
import pingPongRenderer from "./pingPongRenderer"

const nullRenderer = {
    changing: false,
    render: () => {}
}

function effectPresetToRenderer(preset: EffectPreset): Renderer {
    const effect = preset.effect

    switch (effect.type) {
        case "pingPong":
            return pingPongRenderer(effect.props)
        default:
            return nullRenderer
    }
}

function presetToRenderer(preset: Preset): Renderer {
    switch (preset.type) {
        case "simple":
            const colorArray = breakpointsToColors(preset.breakpoints)
            return colorArrayRenderer(colorArray)
        case "effect":
            return effectPresetToRenderer(preset)
        default:
            console.error("unknown preset type")
            return nullRenderer
    }
}

export default presetToRenderer
