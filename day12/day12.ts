import { readInput } from "../common";

const instructions = readInput('day12/input.txt').map(instruction => {
    const splitInstruction = instruction.split('')
    return {
        action: splitInstruction.shift(),
        amount: parseInt(splitInstruction.join(''))
    }
})

type Forward = 'F'
type Direction = 'N' | 'E' | 'S' | 'W'
type Rotate = 'R' | 'L'
type Status = {
    direction?: Direction,
    pos: {
        x: number,
        y: number
    }
}

const directions: { [key in Direction]: number[] } = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
}

const directionAmount = Object.keys(directions).length
const directionKeys: Direction[] = ['N', 'E', 'S', 'W']
const forwardKey: Forward = 'F'
const rotationKeys: Rotate[] = ['R', 'L']

const directionChange = deg => deg / 90

const NavigationSystem = {
    calculateNewDirection: (oldDirection: Direction, rotation: Rotate, degrees: number) => {
        const currentDirectionIndex = Object.keys(directions).indexOf(oldDirection)
        
        if (rotation === 'R') {
            const change = directionChange(degrees)
            const newDirectionIndex = (currentDirectionIndex + change) < directionAmount ? currentDirectionIndex + change 
                : (currentDirectionIndex + change) - directionAmount 
            return Object.keys(directions)[newDirectionIndex]
        } else {
            const change = -(directionChange(degrees))
            const newDirectionIndex = (currentDirectionIndex + change) >= 0 ? currentDirectionIndex + change 
                : (currentDirectionIndex + change) + directionAmount 
            return Object.keys(directions)[newDirectionIndex]
        }
    },
    rotateWaypoint: (status: Status, rotation: Rotate, degrees: number) => {
        const { x, y } = status.pos
        const amount = directionChange(degrees)

        if (rotation === 'R') {
            switch (amount) {
                case 1:
                    return {
                        x: y,
                        y: x * -1
                    }
                case 2:
                    return {
                        x: x * -1,
                        y: y * -1
                    }
                case 3:
                    return {
                        x: y * -1,
                        y: x
                    }
            }
        } else {
            switch (amount) {
                case 1:
                    return {
                        x: y * -1,
                        y: x
                    }
                case 2:
                    return {
                        x: x * -1,
                        y: y * -1
                    }
                case 3:
                    return {
                        x: y,
                        y: x * -1
                    }
            }
        }
    },
    moveShipForward: (wayPointStatus: Status, shipPos: { x: number, y: number }, amount: number) => {
        let newShipPos = { ...shipPos }
        const { pos: wayPointPos } = wayPointStatus 
        
        for (let i = 0; i < amount; i++) {
            newShipPos = {
                x: newShipPos.x + wayPointPos.x,
                y: newShipPos.y + wayPointPos.y
            }
        }

        return { ...newShipPos }
    },
    calculateNewPosition: (direction: Direction | Forward, amount: number, status: Status) => {
        let newPos = status.pos

        if (direction === 'F') {
            const movement = directions[status.direction]
            for (let i = 0; i < amount; i++) {
                newPos = {
                    x: newPos.x + movement[0],
                    y: newPos.y + movement[1]
                }
            }
        } else {
            const movement = directions[direction]
            for (let i = 0; i < amount; i++) {
                newPos = {
                    x: newPos.x + movement[0],
                    y: newPos.y + movement[1]
                }
            }
        }

        return newPos
    }
}

const partOne = () => {
    let shipStatus: Status = {
        direction: 'E',
        pos: {
            x: 0,
            y: 0,
        }
    }

    for (let instruction of instructions) {
        const { action, amount } = instruction
        if (directionKeys.includes(action as Direction) || action === forwardKey) {
            const newShipPosition = NavigationSystem.calculateNewPosition(action as (Direction | Forward), amount,  shipStatus)
            shipStatus = {
                ...shipStatus,
                pos: newShipPosition
            }
        } else if (rotationKeys.includes(action as Rotate)) {
            const newShipDirection = NavigationSystem.calculateNewDirection(shipStatus.direction, action as Rotate, amount)
            shipStatus = {
                ...shipStatus,
                direction: newShipDirection as Direction
            }
        }
    }

    const manhattanDistance = Math.abs(shipStatus.pos.x) + Math.abs(shipStatus.pos.y)
    console.log('Part 1 solution:', manhattanDistance)
}

const partTwo = () => {
    let shipPos = { 
        x: 0,
        y: 0,
    }

    let wayPointStatus: Status = {
        // Relative position to ship
        pos: {
            x: 10,
            y: 1,
        }
    }

    for (let instruction of instructions) {
        const { action, amount } = instruction
        
        if (directionKeys.includes(action as (Direction))) {
            const newWaypointPos = NavigationSystem.calculateNewPosition(action as Direction, amount,  wayPointStatus)
            wayPointStatus = {
                pos: newWaypointPos
            }
        } else if (rotationKeys.includes(action as Rotate)) {
            const newWaypointPos = NavigationSystem.rotateWaypoint(wayPointStatus, action as Rotate, amount)
            wayPointStatus = {
                ...wayPointStatus,
                pos: newWaypointPos
            }
        } else if (action === forwardKey) {
            shipPos = NavigationSystem.moveShipForward(wayPointStatus, shipPos, amount)
        }
    }

    const manhattanDistance = Math.abs(shipPos.x) + Math.abs(shipPos.y)
    console.log('Part 2 solution:', manhattanDistance)
}

partOne()
partTwo()