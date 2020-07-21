import fs from "fs"
import environment from "./environment"
import { Preset } from "./types/Preset"

const storePresetFilename = "storedPreset.json"
const getFileName = () => `${environment.DATA_DIR}/${storePresetFilename}`

function setupDirectory() {
    try {
        if (!fs.existsSync(environment.DATA_DIR)) {
            console.log(
                `directory '${environment.DATA_DIR}' doesn't exist, creating ...`
            )
            fs.mkdirSync(environment.DATA_DIR, { recursive: true })
            console.log("done")
        } else {
            console.log(`directory '${environment.DATA_DIR}' already exists`)
        }
    } catch (err) {
        console.error(err)
    }
}

function savePreset(preset: Preset) {
    try {
        const jsonStr = JSON.stringify(preset, null, 4)

        fs.writeFile(getFileName(), jsonStr, (err) => {
            if (err) {
                console.error(err)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

function retrieveLastPresetIfSet(): Preset | null {
    try {
        if (!fs.existsSync(getFileName())) {
            return null
        }

        const readStr = fs.readFileSync(getFileName(), { encoding: "utf-8" })

        return JSON.parse(readStr)
    } catch (err) {
        console.error(err)
        return null
    }
}

export { setupDirectory, savePreset, retrieveLastPresetIfSet }
