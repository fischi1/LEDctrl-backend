import bodyParser from "body-parser"
import cors from "cors"
import express, { Application, Request, Response } from "express"
import environment from "./environment"
import { consoleLog } from "./functions/console"
import { setup } from "./functions/ledCommands"
import { getRunning, setRenderer, setRunning } from "./render"
import presetToRenderer from "./rendering/presetToRenderer"
import { Preset } from "./types/Preset"
import { connect } from "./ws2812srvConnection"
import {
    setupDirectory,
    savePreset,
    retrieveLastPresetIfSet
} from "./presetStorage"

const app: Application = express()

async function init() {
    try {
        setupDirectory()
        const preset = retrieveLastPresetIfSet()
        await connect(environment.LED_PORT, environment.LED_HOST)

        setup(environment.LED_AMOUNT, environment.BRIGHTNESS)

        setRunning(true)
        if (preset) setRenderer(presetToRenderer(preset))
    } catch (err) {
        console.error(err)
        process.exit(1)
    }

    app.use(bodyParser.json())
    app.use(cors())

    app.post("/toggle", (req, res) => {
        setRunning(!getRunning())

        res.status(200).send({ running: getRunning() })
    })

    app.post("/toggleOn", (req, res) => {
        setRunning(true)

        res.status(200).send({ running: getRunning() })
    })

    app.get("/toggle", (req, res) => {
        res.status(200).send(getRunning())
    })

    app.post("/toggleOff", (req, res) => {
        setRunning(false)

        res.status(200).send({ running: getRunning() })
    })

    app.post("/set", (req: Request, res: Response) => {
        const preset = req.body as Preset

        consoleLog(preset)

        setRenderer(presetToRenderer(preset))

        savePreset(preset)

        res.status(200).send({ message: "ok" })
    })

    app.listen(environment.PORT, () => {
        console.log(`server is running on PORT ${environment.PORT}`)
    })
}

init()
