import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import { getRunning, setRunning } from './colorLoop'
import { clear, render, setup, setColor } from './functions/ledCommands'
import sleep from './functions/sleep'
import { connect, disconnect } from './ws2812srvConnection'

const LED_HOST = process.env.LED_HOST ?? "192.168.0.212"
const LED_PORT = process.env.LED_PORT ? +process.env.LED_PORT : 9999
const PORT = process.env.PORT ?? 3000

const app : Application = express()

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

        color = color.toUpperCase()

        // setColor(color)

        console.log(req.body)
        res.status(200).send({message: "ok"})
    }
)


app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})

//run()

async function testInit() {
    try {
        await connect(LED_PORT, LED_HOST)

        setup(101, 15)

        setColor("ff0000")
        render()

        await sleep(500)

        setColor("00ff00")
        render()

        await sleep(500)

        setColor("0000ff")
        render()

        await sleep(500)

        clear()

        disconnect()
    } catch(err) {
        console.error(err)
    }

    process.exit(0)
}

testInit()
