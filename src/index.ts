import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import { getRunning, setCurrentColor, setRunning, startColorLoop } from './colorLoop'
import { setup } from './functions/ledCommands'
import { connect } from './ws2812srvConnection'

const LED_HOST = process.env.LED_HOST ?? "192.168.0.212"
const LED_PORT = process.env.LED_PORT ? +process.env.LED_PORT : 9999
const PORT = process.env.PORT ?? 3000
const LED_AMOUNT = process.env.LED_AMOUNT ? +process.env.LED_AMOUNT : 101

const BRIGHTNESS = 5

const app : Application = express()

async function init() {
    try {
        await connect(LED_PORT, LED_HOST)

        setup(LED_AMOUNT, BRIGHTNESS)

        startColorLoop()
    } catch(err) {
        console.error(err)
        process.exit(1)
    }    

    app.use(bodyParser.json())

    app.get("/toggle", (req, res) => {
        setRunning(!getRunning())
        
        res.status(200).send({running: getRunning()})
    })

    app.post(
        "/set",
        (req: Request , res: Response) => {
            let color = req.body.color as string;

            if(color.startsWith("#"))
                color = color.replace("#", "")

            setCurrentColor(color)

            res.status(200).send({message: "ok"})
        }
    )


    app.listen(PORT,() => {
        console.log(`server is running on PORT ${PORT}`)
    })
}

init()