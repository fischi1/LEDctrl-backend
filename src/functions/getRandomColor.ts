import { Color } from "../types/Color"

function getRandomColor(): Color {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    }
}

function getRandomColorStr() {
    const letters = "0123456789ABCDEF"
    let color = ""

    for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * letters.length)]

    return color
}

export { getRandomColor, getRandomColorStr }
