import bodyParser from "body-parser"
import express, { Application, Request, Response } from "express"
import {
    getRunning,
    setCurrentColor,
    setRunning,
    startColorLoop
} from "./colorLoop"
import { setup } from "./functions/ledCommands"
import { connect } from "./ws2812srvConnection"
import environment from "./environment"

const app: Application = express()

async function init() {
    try {
        await connect(environment.LED_PORT, environment.LED_HOST)

        setup(environment.LED_AMOUNT, environment.BRIGHTNESS)

        startColorLoop()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }

    app.use(bodyParser.json())

    app.get("/toggle", (req, res) => {
        setRunning(!getRunning())

        res.status(200).send({ running: getRunning() })
    })

    app.post("/set", (req: Request, res: Response) => {
        let color = req.body.color as string

        if (color.startsWith("#")) color = color.replace("#", "")

        setCurrentColor(color)

        res.status(200).send({ message: "ok" })
    })

    app.listen(environment.PORT, () => {
        console.log(`server is running on PORT ${environment.PORT}`)
    })
}

init()
