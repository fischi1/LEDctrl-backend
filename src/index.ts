import bodyParser from "body-parser"
import express, { Application, Request, Response } from "express"
import { PURPLE, RED, YELLOW } from "./constants/Colors"
import environment from "./environment"
import { setup } from "./functions/ledCommands"
import {
    renderSimplePreset,
    setPreset
} from "./rendering/simplePresetRendering"
import {
    getRunning,
    setRenderFunction,
    setRunning,
    startLoop
} from "./renderLoop"
import { Preset } from "./types/Preset"
import { SimplePreset } from "./types/SimplePreset"
import { connect } from "./ws2812srvConnection"

const app: Application = express()

const step = 1 / 3

const simplePreset: SimplePreset = {
    type: "simple",
    breakpoints: [
        {
            brightness: 1,
            color: YELLOW,
            position: 0
        },
        {
            brightness: 1,
            color: RED,
            position: step * 2
        },
        {
            brightness: 1,
            color: PURPLE,
            position: step * 3
        }
    ]
}

async function init() {
    try {
        await connect(environment.LED_PORT, environment.LED_HOST)

        setup(environment.LED_AMOUNT, environment.BRIGHTNESS)

        setPreset(simplePreset)
        setRenderFunction(renderSimplePreset)

        startLoop()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }

    app.use(bodyParser.json())

    app.post("/toggle", (req, res) => {
        setRunning(!getRunning())

        res.status(200).send({ running: getRunning() })
    })

    app.post("/set", (req: Request, res: Response) => {
        const preset = req.body as Preset

        console.log(preset)

        res.status(200).send({ message: "ok" })
    })

    app.listen(environment.PORT, () => {
        console.log(`server is running on PORT ${environment.PORT}`)
    })
}

init()
