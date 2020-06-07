import bodyParser from "body-parser"
import express, { Application, Request, Response } from "express"
import { BLUE, GREEN, RED } from "./constants/Colors"
import environment from "./environment"
import { setup } from "./functions/ledCommands"
import { randomColor } from "./functions/randomColor"
import breakpointsToColors from "./rendering/breakpointsToColors"
import { colorArrayRenderer } from "./rendering/colorArrayRenderer"
import smoothMovementRenderer from "./rendering/smoothMovement"
import {
    getRunning,
    setRenderer,
    setRunning,
    startLoop
} from "./render"
import { Preset } from "./types/Preset"
import { SimplePreset } from "./types/SimplePreset"
import { connect } from "./ws2812srvConnection"

const app: Application = express()

const simplePreset: SimplePreset = {
    type: "simple",
    breakpoints: [
        {
            brightness: 1,
            color: BLUE,
            position: 0
        },
        {
            brightness: 1,
            color: RED,
            position: 0.5
        },
        {
            brightness: 1,
            color: GREEN,
            position: 1
        }
    ]
}

async function init() {
    try {
        await connect(environment.LED_PORT, environment.LED_HOST)

        setup(environment.LED_AMOUNT, environment.BRIGHTNESS)

        setRenderer(smoothMovementRenderer(randomColor()))

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

    let toggle = true

    app.post("/set", (req: Request, res: Response) => {
        const preset = req.body as Preset

        console.log(preset)

        if (toggle) {
            setRenderer(
                colorArrayRenderer(
                    breakpointsToColors(simplePreset.breakpoints)
                )
            )
        } else {
            setRenderer(smoothMovementRenderer(randomColor()))
        }

        toggle = !toggle

        res.status(200).send({ message: "ok" })
    })

    app.listen(environment.PORT, () => {
        console.log(`server is running on PORT ${environment.PORT}`)
    })
}

init()
