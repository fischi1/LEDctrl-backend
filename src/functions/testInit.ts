import { connect, disconnect } from "../ws2812srvConnection"
import { clear, renderBuffer, setBrightness, setColorStr, setup } from "./ledCommands"
import sleep from "./sleep"

async function testInit(port: number, host: string) {
    try {
        await connect(port, host)

        setup(101, 255)

        setColorStr("ff0000")
        await renderBuffer()

        await sleep(500)

        setBrightness(30)
        setColorStr("00ff00")
        await renderBuffer()

        await sleep(500)

        setBrightness(2)
        setColorStr("0000ff")
        await renderBuffer()

        await sleep(500)

        await clear()

        disconnect()
    } catch (err) {
        console.error(err)
    }

    process.exit(0)
}

export default testInit
