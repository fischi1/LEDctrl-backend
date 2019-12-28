import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import asdf from './asdf'

const app : Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send(`TS App is Running, Hello ${asdf(799)}`)
})

const PORT = process.env.PORT ?? 3000


app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})