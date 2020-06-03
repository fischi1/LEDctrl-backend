import { connect, disconnect } from "../ws2812srvConnection"
import { setup, setColor, render, setBrightness, clear } from "./ledCommands"
import sleep from "./sleep"

async function testInit(port: number, host: string) {
    try {
        await connect(port, host)

        setup(101, 255)

        setColor("ff0000")
        await render()

        await sleep(500)

        setBrightness(30)
        setColor("00ff00")
        await render()

        await sleep(500)

        setBrightness(2)
        setColor("0000ff")
        await render()

        await sleep(500)

        await clear()

        disconnect()
    } catch (err) {
        console.error(err)
    }

    process.exit(0)
}

export default testInit
