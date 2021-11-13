export const animationOne = {
    in: {
        opacity: 1,
    },
    out : {
        opacity: 0
    }
}

export const animationTwo = {
    in: {
        opacity: 1,
        x: "0",
        scale: 1
    },
    out : {
        opacity: 0,
        x: "-100vw",
        scale: 0.3
    },
    end : {
        x: "100vw",
        opacity: 1,
        scale: 0.3
    }
}

export const animationThree = {
    in: {
        opacity: 1,
        y: "0",
        scale: 1
    },
    out : {
        opacity: 0,
        y: "-300",
        scale: 0.3
    },
    end : {
        y: "300",
        opacity: 0,
        scale: 0.3
    }
}

export const transition = {
    duration: 0.8
}