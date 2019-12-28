import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { run, setColor, setRunning, getRunning } from './colorLoop'

const app : Application = express()

app.use(bodyParser.json())

app.get("/toggle", (req, res) => {
    setRunning(!getRunning())
    
    res.status(200).send({running: getRunning()})
})

app.post(
    "/set",
    [
        check("color").matches(/^#?[0-9A-Fa-f]{6}$/).withMessage("not a color")
    ],
    (req: Request , res: Response) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        let color = req.body.color as string;

        if(color.startsWith("#"))
            color = color.replace("#", "")

        color = color.toUpperCase()

        setColor(color)

        console.log(req.body)
        res.status(200).send({message: "ok"})
    }
)

const PORT = process.env.PORT ?? 3000

app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})

run()