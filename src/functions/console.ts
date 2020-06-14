import environment from "../environment"

const consoleLog = (message: any) => {
    if (environment.DEBUG) console.log(message)
}

export { consoleLog }
