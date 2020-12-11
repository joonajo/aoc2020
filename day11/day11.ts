import * as R from 'ramda'

import { readInput } from "../common";

const seats = readInput('day11/input.txt').map(line => Array.from(line))

const EMPTY_SEAT = 'L'
const FLOOR = '.'
const OCCUPIED_SEAT = '#'

const run = () => {
    let layout = [...seats]

    let round = 1
    let running = true

    while (running) {
        const oldLayout = R.clone(layout)

        const checkAdjacentSeats = (x: number, y: number) => {
            let count = 0
            try {
                for (let i = 0; i < 3; i++) {
                    if (oldLayout[y - 1][x + 1 - i] === OCCUPIED_SEAT) {
                        count++
                    }
                }
            } catch {}

            try {
                if (oldLayout[y][x - 1] === OCCUPIED_SEAT) {
                    count++
                }
                if (oldLayout[y][x + 1] === OCCUPIED_SEAT) {
                    count++
                }
            } catch {}

            try {
                for (let i = 0; i < 3; i++) {
                    if (oldLayout[y + 1][x + 1 - i] === OCCUPIED_SEAT) {
                        count++
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

                if (round === 1) {
                    if (spot === EMPTY_SEAT) {
                        row[x] = OCCUPIED_SEAT
                    }
                } else {
                    if (spot === EMPTY_SEAT && shouldChangeToOccupied(x, y)) {
                        row[x] = OCCUPIED_SEAT
                    } else if (spot === OCCUPIED_SEAT && shouldChangeToEmpty(x, y)) {
                        row[x] = EMPTY_SEAT
                    }
                }
            }
        }

        if (R.equals(oldLayout, layout)) {
            running = false
        }
        round++
    }

    const allSpots = R.flatten(layout)
    const numberOfOccupiedSeats = allSpots.filter(spot => spot === OCCUPIED_SEAT).length
    console.log('Part 1 solution:', numberOfOccupiedSeats)
}

run()