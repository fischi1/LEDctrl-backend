import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import { getRunning, setRunning } from './colorLoop'
import testInit from './functions/testInit'

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

testInit(LED_PORT, LED_HOST)
