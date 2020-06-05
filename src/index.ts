import bodyParser from "body-parser"
import express, { Application, Request, Response } from "express"
import { getRunning, setRunning, startLoop } from "./colorLoop"
import environment from "./environment"
import { setup } from "./functions/ledCommands"
import { Preset } from "./types/Preset"
import { connect } from "./ws2812srvConnection"
import convertColorToString from "./functions/convertColor"

const app: Application = express()

async function init() {
    try {
        await connect(environment.LED_PORT, environment.LED_HOST)

        setup(environment.LED_AMOUNT, environment.BRIGHTNESS)

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

        res.status(200).send({ message: "ok" })
    })

    app.listen(environment.PORT, () => {
        console.log(`server is running on PORT ${environment.PORT}`)
    })
}

init()
