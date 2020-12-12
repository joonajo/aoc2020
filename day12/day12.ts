import { readInput } from "../common";

const instructions = readInput('day12/input.txt').map(instruction => {
    const splitInstruction = instruction.split('')
    return {
        action: splitInstruction.shift(),
        amount: parseInt(splitInstruction.join(''))
    }
})

type Instruction = {
    action: string,
    amount: number,
}
type Forward = 'F'
type Direction = 'N' | 'E' | 'S' | 'W'
type Rotate = 'R' | 'L'
type ShipStatus = {
    direction: Direction,
    pos: {
        x: number,
        y: number
    }
}

const directions: { [key in Direction]: number[] } = {
    N: [0, -1],
    E: [1, 0],
    S: [0, 1],
    W: [-1, 0],
}

const directionAmount = Object.keys(directions).length
const directionKeys: (Direction | Forward)[] = ['N', 'E', 'S', 'W', 'F']
const rotationKeys: Rotate[] = ['R', 'L']

const directionChange = deg => deg / 90

const NavigationSystem = {
    readInstruction: (instruction: Instruction, shipStatus: ShipStatus) => {
        const { action, amount } = instruction

        if (directionKeys.includes(action as (Direction | Forward))) {
            const newShipPosition = NavigationSystem.calculateNewPosition(action as (Direction | Forward), amount,  shipStatus)
            return {
                ...shipStatus,
                pos: newShipPosition
            }
        }

        if (rotationKeys.includes(action as Rotate)) {
            const newShipDirection = NavigationSystem.calculateNewDirection(shipStatus.direction, action as Rotate, amount)
            return {
                ...shipStatus,
                direction: newShipDirection as Direction
            }
        }

        return shipStatus
    },
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
    calculateNewPosition: (direction: Direction | Forward, amount: number, shipStatus: ShipStatus) => {
        let newPos = shipStatus.pos

        if (direction === 'F') {
            const movement = directions[shipStatus.direction]
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
    let shipStatus: ShipStatus = {
        direction: 'E',
        pos: {
            x: 0,
            y: 0,
        }
    }

    for (let instruction of instructions) {
        shipStatus = NavigationSystem.readInstruction(instruction, shipStatus)
    }

    const manhattanDistance = Math.abs(shipStatus.pos.x) + Math.abs(shipStatus.pos.y)
    console.log('Part 1 solution:', manhattanDistance)
}

partOne()