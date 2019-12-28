const asdf = (count = 1) => {
    let ret = 0

    for(let i = 0; i< count; i++)
        ret += Math.random()

    return ret
}

export default asdf