import * as R from 'ramda'

import { readInput } from "../common";

const EMPTY_SEAT = 'L'
const FLOOR = '.'
const OCCUPIED_SEAT = '#'

const partOne = () => {
    let layout = readInput('day11/input.txt').map(line => Array.from(line))

    let running = true

    while (running) {
        const oldLayout = R.clone(layout)

        const checkAdjacentSeats = (x: number, y: number) => {
            let count = 0
            try {
                if (y !== 0) {
                    for (let i = 0; i < 3; i++) {
                        if (oldLayout[y - 1][x + 1 - i] === OCCUPIED_SEAT) {
                            count++
                        }
                    }
                }
            } catch {}

            try {
                if (x !== 0) {
                    if (oldLayout[y][x - 1] === OCCUPIED_SEAT) {
                        count++
                    }
                }
                if (oldLayout[y][x + 1] === OCCUPIED_SEAT) {
                    count++
                }
            } catch {}

            try {
                if (y !== layout.length - 1) {
                    for (let i = 0; i < 3; i++) {
                        if (oldLayout[y + 1][x + 1 - i] === OCCUPIED_SEAT) {
                            count++
                        }
                    }
                }
            } catch {}

            return count
        }

        const shouldChangeToEmpty = (x: number, y: number) => {
            return checkAdjacentSeats(x, y) >= 4
        }
        
        const shouldChangeToOccupied = (x: number, y: number) => {
            return checkAdjacentSeats(x, y) === 0
        }
         
        for (let y = 0; y < layout.length; y++) {
            let row = layout[y]
            for (let x = 0; x < row.length; x++) {
                const spot = row[x]

                if (spot === EMPTY_SEAT && shouldChangeToOccupied(x, y)) {
                    row[x] = OCCUPIED_SEAT
                } else if (spot === OCCUPIED_SEAT && shouldChangeToEmpty(x, y)) {
                    row[x] = EMPTY_SEAT
                }
            }
        }

        if (R.equals(oldLayout, layout)) {
            running = false
        }
    }

    const allSpots = R.flatten(layout)
    const numberOfOccupiedSeats = allSpots.filter(spot => spot === OCCUPIED_SEAT).length
    console.log('Part 1 solution:', numberOfOccupiedSeats)
}

const partTwo = () => {
    let layout = readInput('day11/input.txt').map(line => Array.from(line))

    const directions = [
        [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
    ]

    const X_MIN = 0
    const X_MAX = layout[0].length - 1
    const Y_MIN = 0
    const Y_MAX = layout.length - 1

    let running = true

    while (running) {
        const oldLayout = R.clone(layout)

        const findSeatInDirection = (x: number, y: number, direction: number[]): string | null => {
            let currentPos = [x, y]
            let running = true

            while (running) {
                currentPos = [currentPos[0] + direction[0], currentPos[1] + direction[1]]

                const y = currentPos[1]
                const x = currentPos[0]

                if (x >= X_MIN && x <= X_MAX && y <= Y_MAX && y >= Y_MIN) {
                    if (oldLayout[y][x] === OCCUPIED_SEAT) {
                        return OCCUPIED_SEAT
                    }
                    if (oldLayout[y][x] === EMPTY_SEAT) {
                        return EMPTY_SEAT
                    }
                } else {
                    running = false
                }
            }
            return null
        }

        const getNumberOfVisibleOccupiedSeats = (x: number, y: number) => {
            let numberOfOccupiedSeats = 0
            for (let direction of directions) {
                if (findSeatInDirection(x, y, direction) === OCCUPIED_SEAT) {
                    numberOfOccupiedSeats++
                }
            }
            return numberOfOccupiedSeats
        }

        for (let y = 0; y < layout.length; y++) {
            let row = layout[y]
            for (let x = 0; x < row.length; x++) {
                if (row[x] === EMPTY_SEAT) {
                    if (getNumberOfVisibleOccupiedSeats(x, y) === 0) {
                        row[x] = OCCUPIED_SEAT
                    }
                } else if (row[x] === OCCUPIED_SEAT) {
                    if (getNumberOfVisibleOccupiedSeats(x, y) >= 5) {
                        row[x] = EMPTY_SEAT
                    }
                }
            }
        }

        if (R.equals(oldLayout, layout)) {
            running = false
        }
    }

    const allSpots = R.flatten(layout)
    const numberOfOccupiedSeats = allSpots.filter(spot => spot === OCCUPIED_SEAT).length
    console.log('Part 2 solution:', numberOfOccupiedSeats)
}

partOne()
partTwo()