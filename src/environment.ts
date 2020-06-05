const environment = {
    BRIGHTNESS: process.env.BRIGHTNESS ? +process.env.BRIGHTNESS : 20,
    LED_HOST: process.env.LED_HOST ?? "localhost",
    LED_PORT: process.env.LED_PORT ? +process.env.LED_PORT : 9999,
    PORT: process.env.PORT ?? 3000,
    LED_AMOUNT: process.env.LED_AMOUNT ? +process.env.LED_AMOUNT : 101,
    LOOP_INTERVAL_MS: process.env.LOOP_INTERVAL_MS
        ? +process.env.LOOP_INTERVAL_MS
        : 10,
    COLOR_LOOP_WIDTH: process.env.COLOR_LOOP_WIDTH
        ? +process.env.COLOR_LOOP_WIDTH
        : 20
}

export default environment
