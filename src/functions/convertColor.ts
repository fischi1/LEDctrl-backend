import { Color } from "../types/Color"

/**
 *
 * @param value color value from 0 to 1
 */
const componentToHex = (value: number) => {
    const hex = Math.floor(Math.max(0, Math.min(value * 255, 255))).toString(16)
    return hex.length == 1 ? "0" + hex : hex
}

const convertColorToString = (color: Color) => {
    return `${componentToHex(color.r)}${componentToHex(
        color.g
    )}${componentToHex(color.b)}`
}

export default convertColorToString
